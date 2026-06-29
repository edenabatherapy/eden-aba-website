import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

export type SmtpSendResult = {
  sent: boolean;
  skipped?: boolean;
  reason?: string;
  messageId?: string;
};

export type SmtpEmailInput = {
  to: string | string[];
  subject: string;
  text: string;
  html?: string;
  logTag?: string;
};

export type SmtpConfig = {
  host: string;
  port: number;
  user: string;
  pass: string;
  from: string;
};

export function getLiveVideoIntakeNotificationEmail(): string {
  return (
    process.env.LIVE_VIDEO_INTAKE_NOTIFICATION_EMAIL?.trim() || "info@edenabatherapy.com"
  );
}

export function getSmtpConfig(): SmtpConfig | null {
  const host = process.env.SMTP_HOST?.trim();
  const portRaw = process.env.SMTP_PORT?.trim();
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();
  const from = process.env.SMTP_FROM?.trim();

  if (!host || !user || !pass || !from) {
    return null;
  }

  const port = Number(portRaw || "587");
  if (!Number.isFinite(port) || port <= 0) {
    return null;
  }

  return { host, port, user, pass, from };
}

export function isSmtpConfigured(): boolean {
  return getSmtpConfig() !== null;
}

function createSmtpTransporter(config: SmtpConfig) {
  const transportOptions: SMTPTransport.Options = {
    host: config.host,
    port: config.port,
    secure: config.port === 465,
    auth: {
      user: config.user,
      pass: config.pass,
    },
  };

  return nodemailer.createTransport(transportOptions);
}

/**
 * Send email via SMTP (server-only). Used for live video intake notifications.
 */
export async function sendSmtpEmail(input: SmtpEmailInput): Promise<SmtpSendResult> {
  const logTag = input.logTag || "smtp-email";
  const recipients = Array.isArray(input.to) ? input.to : [input.to];
  const smtpConfig = getSmtpConfig();

  if (!smtpConfig) {
    console.warn(`[${logTag}] SMTP not configured — email notification skipped.`, {
      subject: input.subject,
      to: recipients,
      required: ["SMTP_HOST", "SMTP_PORT", "SMTP_USER", "SMTP_PASS", "SMTP_FROM"],
    });
    return {
      sent: false,
      skipped: true,
      reason: "SMTP not configured — set SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS, and SMTP_FROM.",
    };
  }

  console.info(`[${logTag}] sending staff email via SMTP`, {
    subject: input.subject,
    to: recipients,
    from: smtpConfig.from,
    host: smtpConfig.host,
    port: smtpConfig.port,
    hasHtml: Boolean(input.html),
  });

  try {
    const transporter = createSmtpTransporter(smtpConfig);
    const info = await transporter.sendMail({
      from: smtpConfig.from,
      to: recipients.join(", "),
      subject: input.subject,
      text: input.text,
      ...(input.html ? { html: input.html } : {}),
    });

    console.info(`[${logTag}] staff email sent via SMTP`, {
      subject: input.subject,
      to: recipients,
      from: smtpConfig.from,
      messageId: info.messageId,
    });

    return { sent: true, messageId: info.messageId };
  } catch (error) {
    const detail = error instanceof Error ? error.message : "Unknown SMTP error";
    console.error(`[${logTag}] staff email failed via SMTP`, {
      message: detail,
      stack: error instanceof Error ? error.stack : undefined,
      subject: input.subject,
      to: recipients,
      from: smtpConfig.from,
      host: smtpConfig.host,
    });
    return { sent: false, reason: detail };
  }
}
