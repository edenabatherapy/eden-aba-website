import { getIntakeConfig } from "./config";

export type ResendSendResult = {
  sent: boolean;
  skipped?: boolean;
  reason?: string;
  resendId?: string;
};

export type ResendEmailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  logTag?: string;
};

type ResendApiResponse = {
  id?: string;
  message?: string;
  name?: string;
};

/**
 * Format the Resend "from" address with a display name for deliverability.
 */
export function formatResendFromAddress(fromEmail: string): string {
  const trimmed = fromEmail.trim();
  if (!trimmed) {
    return "Eden ABA Therapy <notifications@edenabatherapy.com>";
  }

  const bracketMatch = trimmed.match(/^(.+?)\s*<([^>]+)>$/);
  if (bracketMatch) {
    const name = bracketMatch[1].trim() || "Eden ABA Therapy";
    const email = bracketMatch[2].trim();
    return `${name} <${email}>`;
  }

  return `Eden ABA Therapy <${trimmed}>`;
}

/**
 * Send email via Resend (server-only). Returns detailed result for logging.
 */
export async function sendResendEmail(input: ResendEmailInput): Promise<ResendSendResult> {
  const logTag = input.logTag || "intake-email";
  const { resendApiKey, fromEmail } = getIntakeConfig();
  const recipients = Array.isArray(input.to) ? input.to : [input.to];

  if (!resendApiKey) {
    console.warn(`[${logTag}] RESEND_API_KEY not configured — email notification skipped.`, {
      subject: input.subject,
      to: recipients,
    });
    return {
      sent: false,
      skipped: true,
      reason: "RESEND_API_KEY not configured — email notification skipped.",
    };
  }

  const from = formatResendFromAddress(fromEmail);

  console.info(`[${logTag}] sending staff email`, {
    subject: input.subject,
    to: recipients,
    from,
    hasHtml: Boolean(input.html),
  });

  try {
    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: recipients,
        subject: input.subject,
        text: input.text,
        ...(input.html ? { html: input.html } : {}),
      }),
    });

    const result = (await response.json().catch(() => ({}))) as ResendApiResponse;

    if (!response.ok || !result.id) {
      const detail = result.message || result.name || `Resend HTTP ${response.status}`;
      console.error(`[${logTag}] staff email failed`, {
        message: detail,
        status: response.status,
        subject: input.subject,
        to: recipients,
        from,
        response: result,
      });
      return { sent: false, reason: detail };
    }

    console.info(`[${logTag}] staff email sent`, {
      subject: input.subject,
      to: recipients,
      from,
      resendId: result.id,
    });

    return { sent: true, resendId: result.id };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown email error";
    console.error(`[${logTag}] staff email exception`, {
      message: detail,
      stack: error instanceof Error ? error.stack : undefined,
      subject: input.subject,
      to: recipients,
      from,
    });
    return { sent: false, reason: detail };
  }
}

export function isResendConfigured(): boolean {
  return Boolean(getIntakeConfig().resendApiKey);
}
