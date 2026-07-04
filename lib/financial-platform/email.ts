type EmailTemplate =
  | "application_received"
  | "documents_requested"
  | "approval_notice"
  | "denial_notice"
  | "donation_receipt"
  | "sponsor_thank_you"
  | "monthly_impact_summary"
  | "admin_alert";

export async function sendPlatformEmail(input: {
  template: EmailTemplate;
  to: string;
  data: Record<string, unknown>;
}): Promise<{ queued: boolean; message: string }> {
  if (!process.env.SMTP_HOST?.trim()) {
    return {
      queued: false,
      message: `Email stub: ${input.template} for ${input.to} (SMTP not configured).`,
    };
  }

  // Future: integrate with nodemailer or transactional provider
  return {
    queued: true,
    message: `Email queued: ${input.template}`,
  };
}

export async function notifyAdmins(input: {
  event: string;
  message: string;
  metadata?: Record<string, unknown>;
}) {
  const alertEmail = process.env.FINANCIAL_PLATFORM_ALERT_EMAIL?.trim();
  if (alertEmail) {
    await sendPlatformEmail({
      template: "admin_alert",
      to: alertEmail,
      data: { event: input.event, message: input.message, ...input.metadata },
    });
  }
}
