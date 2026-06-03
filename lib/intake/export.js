/**
 * Export, import, and submission helpers for the advanced intake form.
 * NOTE: Real PHI submission requires a secure HTTPS backend with encryption,
 * access controls, audit logs, and signed BAAs — not localStorage alone.
 */

export function downloadJson(filename, payload) {
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download = filename;
  anchor.click();
  URL.revokeObjectURL(url);
}

export function exportFullPacket(data, meta) {
  return {
    app: "Eden ABA Therapy Advanced Intake",
    version: "2026.06.03",
    exportedAt: new Date().toISOString(),
    intake: data,
    documents: meta.documents || {},
    messages: meta.messages || [],
    audit: meta.audit || [],
    notice:
      "Backup export only. Do not email unencrypted PHI. Production records are stored securely on the Eden ABA server after successful submission.",
  };
}

export function exportIntakeJson(data) {
  downloadJson("eden-intake-form-backup.json", data);
}

export function exportPacketFile(data, meta) {
  downloadJson("eden-aba-advanced-intake-packet.json", exportFullPacket(data, meta));
}

/**
 * Submit intake via multipart/form-data to POST /api/intake.
 * @param {Record<string, unknown>} data
 * @param {{ documents?: Record<string, unknown> }} meta
 * @param {Record<string, File>} [files]
 * @returns {Promise<{ ok: boolean, mode?: 'backend' | 'export', message: string, confirmationId?: string, submittedAt?: string }>}
 */
export async function submitIntake(data, meta, files = {}) {
  const formData = new FormData();
  formData.append("intake", JSON.stringify(data));
  formData.append("documentMeta", JSON.stringify(meta.documents || {}));

  for (const [fieldName, file] of Object.entries(files)) {
    if (file instanceof File) {
      formData.append(fieldName, file, file.name);
    }
  }

  let response;
  try {
    response = await fetch("/api/intake", {
      method: "POST",
      body: formData,
    });
  } catch {
    return {
      ok: false,
      message:
        "Network error while submitting. Your local draft is still saved — please try again or call Eden ABA Therapy for help.",
    };
  }

  let result = {};
  try {
    result = await response.json();
  } catch {
    return {
      ok: false,
      message: "Unexpected server response. Your local draft is still saved.",
    };
  }

  if (response.ok && result.ok) {
    return {
      ok: true,
      mode: "backend",
      message: result.message || "Your intake has been submitted successfully.",
      confirmationId: result.confirmationId,
      submittedAt: result.submittedAt,
    };
  }

  return {
    ok: false,
    message:
      result.message ||
      "Submission failed. Your local draft is still saved in this browser. You may export a backup JSON and contact Eden ABA Therapy.",
  };
}

export async function importPacketFile(file) {
  const text = await file.text();
  const parsed = JSON.parse(text);
  return {
    intake: parsed.intake || parsed,
    meta: {
      documents: parsed.documents || {},
      messages: parsed.messages || [],
      audit: parsed.audit || [],
    },
  };
}
