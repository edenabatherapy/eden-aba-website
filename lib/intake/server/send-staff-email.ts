import {
  sendResendEmail,
  type ResendSendResult,
  isResendConfigured,
} from "./resend";

export type StaffEmailResult = ResendSendResult;

export type SendStaffEmailInput = {
  to: string;
  subject: string;
  text: string;
  html?: string;
  logTag?: string;
};

/**
 * Send a staff notification email via Resend (server-only).
 */
export async function sendIntakeStaffEmail(input: SendStaffEmailInput): Promise<StaffEmailResult> {
  return sendResendEmail({
    to: input.to,
    subject: input.subject,
    text: input.text,
    html: input.html,
    logTag: input.logTag || "intake-email",
  });
}

export { isResendConfigured };
