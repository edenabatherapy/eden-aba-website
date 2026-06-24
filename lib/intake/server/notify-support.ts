import { getIntakeConfig } from "./config";

const SUPPORT_TEAM_EMAIL = "info@edenabatherapy.com";

export type SupportMessageEmailPayload = {
  parentName: string;
  parentEmail: string;
  parentPhone: string;
  confirmationId: string;
  subject: string;
  message: string;
};

export type SupportEmailResult = {
  sent: boolean;
  skipped?: boolean;
  reason?: string;
};

/**
 * Email intake support request to info@edenabatherapy.com via Resend.
 */
export async function notifySupportTeamMessage(
  payload: SupportMessageEmailPayload,
): Promise<SupportEmailResult> {
  const { resendApiKey, fromEmail } = getIntakeConfig();

  if (!resendApiKey) {
    console.warn("[support-message] RESEND_API_KEY not configured — email notification skipped.", {
      confirmationId: payload.confirmationId,
    });
    return {
      sent: false,
      skipped: true,
      reason: "RESEND_API_KEY not configured — email notification skipped.",
    };
  }

  const emailSubject = `[Eden ABA Support Request] ${payload.subject}`;
  const text = [
    "New support message from the 6-step intake Messages tab",
    "",
    `Parent Name: ${payload.parentName || "—"}`,
    `Parent Email: ${payload.parentEmail || "—"}`,
    `Parent Phone: ${payload.parentPhone || "—"}`,
    `Confirmation ID: ${payload.confirmationId || "—"}`,
    `Message Subject: ${payload.subject}`,
    "",
    "Message:",
    payload.message,
    "",
    "This message is intended for Eden ABA Therapy support staff only.",
  ].join("\n");

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [SUPPORT_TEAM_EMAIL],
        subject: emailSubject,
        text,
      }),
    });

    const result = (await response.json()) as { message?: string; name?: string };

    if (!response.ok) {
      const detail = result.message || result.name || `Resend HTTP ${response.status}`;
      console.error("[support-message] staff email failed", {
        message: detail,
        code: String(response.status),
        details: result,
        confirmationId: payload.confirmationId,
      });
      return { sent: false, reason: detail };
    }

    console.info("[support-message] staff email sent", {
      confirmationId: payload.confirmationId,
      to: SUPPORT_TEAM_EMAIL,
    });

    return { sent: true };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown email error";
    console.error("[support-message] staff email exception", {
      message: detail,
      stack: error instanceof Error ? error.stack : undefined,
      confirmationId: payload.confirmationId,
    });
    return { sent: false, reason: detail };
  }
}

export function isResendConfigured(): boolean {
  return Boolean(getIntakeConfig().resendApiKey);
}
