import { getIntakeConfig } from "./config";
import type { IntakeSubmissionSummary } from "./submission-summary";
import { summaryToEmailText } from "./submission-summary";

/**
 * Email a copy of the intake submission to the Eden ABA intake team.
 * Uses Resend when RESEND_API_KEY is configured.
 */
export async function notifyStaffIntakeSubmitted(
  summary: IntakeSubmissionSummary,
  fileCount = 0,
): Promise<{ sent: boolean; reason?: string }> {
  const { resendApiKey, staffEmail, fromEmail } = getIntakeConfig();

  if (!resendApiKey) {
    return {
      sent: false,
      reason: "RESEND_API_KEY not configured — intake email notification skipped.",
    };
  }

  const subject = `New Eden ABA intake — ${summary.childName || summary.parentName || summary.confirmationId}`;
  const text = [
    summaryToEmailText(summary),
    "",
    fileCount > 0 ? `Encrypted documents attached with submission: ${fileCount}` : "No documents attached with this submission.",
    "",
    "This message is intended for Eden ABA Therapy intake staff only.",
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
        to: [staffEmail],
        subject,
        text,
      }),
    });

    const payload = (await response.json()) as { message?: string; name?: string };

    if (!response.ok) {
      const detail = payload.message || payload.name || `Resend HTTP ${response.status}`;
      console.error("[intake-delivery] staff email failed", {
        status: response.status,
        detail,
        confirmationId: summary.confirmationId,
      });
      return { sent: false, reason: detail };
    }

    return { sent: true };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown email error";
    const stack = error instanceof Error ? error.stack : undefined;
    console.error("[intake-delivery] staff email exception", {
      detail,
      stack,
      confirmationId: summary.confirmationId,
    });
    return { sent: false, reason: detail };
  }
}
