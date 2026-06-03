import { getIntakeConfig } from "./config";

/**
 * Notify Eden ABA staff without including PHI in email body.
 * Uses Resend HTTP API when RESEND_API_KEY is configured.
 *
 * HIPAA: Email vendor BAA, TLS in transit, and staff mailbox access controls
 * are still required for production compliance.
 */
export async function notifyStaffIntakeSubmitted(params: {
  confirmationId: string;
  submittedAt: string;
  fileCount: number;
}): Promise<{ sent: boolean; reason?: string }> {
  const { resendApiKey, staffEmail, fromEmail } = getIntakeConfig();

  if (!resendApiKey) {
    return { sent: false, reason: "RESEND_API_KEY not configured — notification skipped." };
  }

  const submittedDisplay = new Date(params.submittedAt).toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "short",
  });

  const subject = "New Eden ABA intake submitted";
  const text = [
    "A new intake form was submitted through the Eden ABA Therapy website.",
    "",
    `Confirmation ID: ${params.confirmationId}`,
    `Submitted: ${submittedDisplay} (US/Eastern display)`,
    `Documents attached: ${params.fileCount}`,
    "",
    "Open your secure intake admin system to review encrypted records.",
    "This notification intentionally does not include PHI.",
  ].join("\n");

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

  if (!response.ok) {
    return { sent: false, reason: "Staff notification could not be sent." };
  }

  return { sent: true };
}
