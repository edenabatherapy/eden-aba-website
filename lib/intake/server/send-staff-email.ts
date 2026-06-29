import { getIntakeConfig } from "./config";

export type StaffEmailResult = {
  sent: boolean;
  skipped?: boolean;
  reason?: string;
};

export type SendStaffEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
};

/**
 * Send a staff notification email via Resend (server-only).
 */
export async function sendIntakeStaffEmail(input: SendStaffEmailInput): Promise<StaffEmailResult> {
  const { resendApiKey, fromEmail } = getIntakeConfig();

  if (!resendApiKey) {
    console.warn("[intake-email] RESEND_API_KEY not configured — email notification skipped.", {
      subject: input.subject,
      to: input.to,
    });
    return {
      sent: false,
      skipped: true,
      reason: "RESEND_API_KEY not configured — email notification skipped.",
    };
  }

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: fromEmail,
        to: [input.to],
        subject: input.subject,
        text: input.text,
        ...(input.html ? { html: input.html } : {}),
      }),
    });

    const result = (await response.json()) as { message?: string; name?: string };

    if (!response.ok) {
      const detail = result.message || result.name || `Resend HTTP ${response.status}`;
      console.error("[intake-email] staff email failed", {
        message: detail,
        status: response.status,
        subject: input.subject,
        to: input.to,
      });
      return { sent: false, reason: detail };
    }

    console.info("[intake-email] staff email sent", {
      subject: input.subject,
      to: input.to,
    });

    return { sent: true };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown email error";
    console.error("[intake-email] staff email exception", {
      message: detail,
      stack: error instanceof Error ? error.stack : undefined,
      subject: input.subject,
      to: input.to,
    });
    return { sent: false, reason: detail };
  }
}

export function isResendConfigured(): boolean {
  return Boolean(getIntakeConfig().resendApiKey);
}
