/**
 * Canonical support message payload — single source of truth for field names.
 * Textarea content MUST use `message` (maps to public.support_messages.message).
 */

export type SupportMessageApiRequest = {
  confirmationId?: string;
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
  subject: string;
  /** Textarea body — required */
  message: string;
};

export type SupportMessageDbRow = {
  confirmation_id: string | null;
  parent_name: string | null;
  parent_email: string | null;
  parent_phone: string | null;
  subject: string;
  message: string;
  status: string;
};

function str(value: unknown): string {
  return String(value ?? "").trim();
}

/** Read textarea body from API request JSON (canonical: message). */
export function extractSupportMessageBody(requestBody: Record<string, unknown>): string {
  const candidates = [
    requestBody.message,
    requestBody.portalMsgBody,
    requestBody.messageText,
    requestBody.supportMessage,
    requestBody.messageBody,
    requestBody.body,
  ];

  for (const candidate of candidates) {
    const text = str(candidate);
    if (text) return text;
  }

  return "";
}

export function parseSupportMessageRequest(
  requestBody: Record<string, unknown>,
): { ok: true; data: SupportMessageApiRequest } | { ok: false; error: string } {
  const subject = str(requestBody.subject);
  const message = extractSupportMessageBody(requestBody);

  if (!subject) {
    return { ok: false, error: "Subject is required." };
  }

  if (!message) {
    return { ok: false, error: "Message is required." };
  }

  return {
    ok: true,
    data: {
      confirmationId: str(requestBody.confirmationId),
      parentName: str(requestBody.parentName),
      parentEmail: str(requestBody.parentEmail),
      parentPhone: str(requestBody.parentPhone),
      subject,
      message,
    },
  };
}

export function buildSupportMessageDbRow(
  data: SupportMessageApiRequest,
  status = "new",
): SupportMessageDbRow {
  return {
    confirmation_id: data.confirmationId || null,
    parent_name: data.parentName || null,
    parent_email: data.parentEmail || null,
    parent_phone: data.parentPhone || null,
    subject: data.subject,
    message: data.message,
    status,
  };
}
