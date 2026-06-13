import { getInsuranceConfig } from "@/lib/insurance/config";
import type {
  FamilyStatusChangeParams,
  NewVerificationNotificationParams,
  NotificationProvider,
  NotificationSendResult,
} from "@/lib/insurance/notifications/NotificationProvider";

export class SlackNotificationProvider implements NotificationProvider {
  readonly name = "slack";

  async notifyNewVerificationRequest(
    params: NewVerificationNotificationParams,
  ): Promise<NotificationSendResult> {
    const { slackWebhookUrl } = getInsuranceConfig();

    if (!slackWebhookUrl) {
      return {
        sent: false,
        reason: "INSURANCE_SLACK_WEBHOOK_URL not configured — Slack notification skipped.",
      };
    }

    const submittedDisplay = new Date(params.submittedAt).toLocaleString("en-US", {
      timeZone: "America/New_York",
      dateStyle: "medium",
      timeStyle: "short",
    });

    const response = await fetch(slackWebhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: "New insurance verification request submitted",
        blocks: [
          {
            type: "header",
            text: { type: "plain_text", text: "New Insurance Verification Request" },
          },
          {
            type: "section",
            fields: [
              { type: "mrkdwn", text: `*Request ID:*\n${params.requestId}` },
              { type: "mrkdwn", text: `*Submitted:*\n${submittedDisplay} ET` },
              { type: "mrkdwn", text: `*Type:*\n${params.verificationType}` },
              { type: "mrkdwn", text: `*Provider:*\n${params.insuranceProvider}` },
              { type: "mrkdwn", text: `*Status:*\n${params.status}` },
            ],
          },
          {
            type: "context",
            elements: [
              {
                type: "mrkdwn",
                text: "PHI-free notification. Review in /admin/insurance-verifications",
              },
            ],
          },
        ],
      }),
    });

    if (!response.ok) {
      return { sent: false, reason: "Slack webhook notification could not be sent." };
    }

    return { sent: true };
  }

  async notifyFamilyStatusChange(
    _params: FamilyStatusChangeParams,
  ): Promise<NotificationSendResult> {
    return { sent: false, reason: "Slack does not send family status emails." };
  }
}
