import { getInsuranceConfig } from "@/lib/insurance/config";
import type {
  FamilyStatusChangeParams,
  NewVerificationNotificationParams,
  NotificationProvider,
  NotificationSendResult,
} from "@/lib/insurance/notifications/NotificationProvider";
import {
  buildCoverageActiveEmail,
  buildUnableToVerifyEmail,
} from "@/lib/insurance/notifications/familyEmailTemplates";

export class EmailNotificationProvider implements NotificationProvider {
  readonly name = "email";

  private async sendEmail(params: {
    to: string;
    subject: string;
    text: string;
    html?: string;
  }): Promise<NotificationSendResult> {
    const { resendApiKey, notificationFromEmail } = getInsuranceConfig();

    if (!resendApiKey) {
      return { sent: false, reason: "RESEND_API_KEY not configured — email notification skipped." };
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: notificationFromEmail,
        to: [params.to],
        subject: params.subject,
        text: params.text,
        ...(params.html ? { html: params.html } : {}),
      }),
    });

    if (!response.ok) {
      return { sent: false, reason: "Email notification could not be sent." };
    }

    return { sent: true };
  }

  async notifyNewVerificationRequest(
    params: NewVerificationNotificationParams,
  ): Promise<NotificationSendResult> {
    const { resendApiKey, staffNotificationEmail } = getInsuranceConfig();

    if (!resendApiKey) {
      return { sent: false, reason: "RESEND_API_KEY not configured — email notification skipped." };
    }

    const submittedDisplay = new Date(params.submittedAt).toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "full",
      timeStyle: "short",
    });

    const subject = "New insurance verification request — Eden ABA";
    const text = [
      "A new Medicaid insurance verification request was submitted.",
      "",
      `Request ID: ${params.requestId}`,
      `Submitted: ${submittedDisplay} (US/Eastern display)`,
      `Verification type: ${params.verificationType}`,
      `Insurance provider: ${params.insuranceProvider}`,
      `Status: ${params.status}`,
      "",
      "Review the request in the secure staff queue:",
      "/admin/insurance-verifications",
      "",
      "This notification intentionally does not include PHI (no names, DOB, SSN, or Medicaid ID).",
    ].join("\n");

    return this.sendEmail({ to: staffNotificationEmail, subject, text });
  }

  async notifyFamilyStatusChange(
    params: FamilyStatusChangeParams,
  ): Promise<NotificationSendResult> {
    const templateParams = {
      requestId: params.requestId,
      portalUrl: params.portalUrl,
      memberFirstName: params.memberFirstName,
    };

    if (
      params.previousStatus === "Pending Staff Review" &&
      params.newStatus === "Active"
    ) {
      const { subject, text, html } = buildCoverageActiveEmail(templateParams);
      return this.sendEmail({
        to: params.recipientEmail,
        subject,
        text,
        html,
      });
    }

    if (
      params.previousStatus === "Pending Staff Review" &&
      params.newStatus === "Unable To Verify"
    ) {
      const { subject, text, html } = buildUnableToVerifyEmail(templateParams);
      return this.sendEmail({
        to: params.recipientEmail,
        subject,
        text,
        html,
      });
    }

    return { sent: false, reason: "No family email template for this status transition." };
  }
}
