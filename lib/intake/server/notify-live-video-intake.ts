import {
  getLiveVideoPreferredLanguageLabel,
  getLiveVideoReasonLabel,
  type LiveVideoPreCallIntake,
} from "@/lib/daily/live-video-intake-payload";
import {
  getLiveVideoIntakeNotificationEmail,
  sendSmtpEmail,
  type SmtpSendResult,
} from "./smtp";

const EMAIL_SUBJECT = "New Live Video Intake Request - Eden ABA Therapy";

export type LiveVideoIntakeNotificationPayload = {
  joinUrl: string;
  roomName: string;
  pageUrl: string;
  intake: LiveVideoPreCallIntake;
  requestedAt?: Date;
};

function formatRequestedAt(date: Date): string {
  return date.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "long",
  });
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function formatIntakeSection(intake: LiveVideoPreCallIntake): string {
  return [
    `Parent/Guardian Name: ${intake.parentName}`,
    `Phone: ${intake.phone}`,
    `Email: ${intake.email}`,
    intake.childAge ? `Child's Age: ${intake.childAge}` : "",
    `Preferred Language: ${getLiveVideoPreferredLanguageLabel(intake.preferredLanguage)}`,
    `Reason for Call: ${getLiveVideoReasonLabel(intake.reasonForCall)}`,
  ]
    .filter(Boolean)
    .join("\n");
}

function buildEmailText(payload: LiveVideoIntakeNotificationPayload, requestedAt: Date): string {
  return [
    "A visitor requested a live video intake session on the Eden ABA Therapy website.",
    "",
    `Date/Time: ${formatRequestedAt(requestedAt)}`,
    `Page: ${payload.pageUrl || "—"}`,
    `Daily Video Room: ${payload.joinUrl}`,
    `Room Name: ${payload.roomName}`,
    "",
    "Visitor / Intake Details:",
    formatIntakeSection(payload.intake),
    "",
    "Join Video Call:",
    payload.joinUrl,
    "",
    "This message is intended for Eden ABA Therapy intake staff only.",
  ].join("\n");
}

function buildEmailHtml(payload: LiveVideoIntakeNotificationPayload, requestedAt: Date): string {
  const joinUrl = escapeHtml(payload.joinUrl);
  const pageUrl = escapeHtml(payload.pageUrl || "—");
  const intakeHtml = escapeHtml(formatIntakeSection(payload.intake)).replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 640px;">
      <h2 style="margin: 0 0 16px; color: #0b4f4f;">New Live Video Intake Request</h2>
      <p style="margin: 0 0 16px;">A visitor requested a live video intake session on the Eden ABA Therapy website.</p>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Date/Time</td><td style="padding: 8px 0;">${escapeHtml(formatRequestedAt(requestedAt))}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Page</td><td style="padding: 8px 0;">${pageUrl}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Room Name</td><td style="padding: 8px 0;">${escapeHtml(payload.roomName)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Visitor / Intake Details</td><td style="padding: 8px 0;">${intakeHtml}</td></tr>
      </table>
      <p style="margin: 0 0 20px;">
        <a href="${joinUrl}" style="display: inline-block; background: #0b4f4f; color: #ffffff; text-decoration: none; font-weight: 700; padding: 12px 20px; border-radius: 999px;">
          Join Video Call
        </a>
      </p>
      <p style="margin: 0; font-size: 14px; color: #64748b;">Room link: <a href="${joinUrl}">${joinUrl}</a></p>
    </div>
  `.trim();
}

/**
 * Notify Eden intake staff that a visitor started a live Daily video request.
 */
export async function notifyLiveVideoIntakeRequest(
  payload: LiveVideoIntakeNotificationPayload,
): Promise<SmtpSendResult> {
  const requestedAt = payload.requestedAt ?? new Date();
  const recipient = getLiveVideoIntakeNotificationEmail();

  console.info("[live-video-intake] preparing staff notification via SMTP", {
    recipient,
    roomName: payload.roomName,
    pageUrl: payload.pageUrl,
    parentName: payload.intake.parentName,
    reasonForCall: payload.intake.reasonForCall,
    joinUrlIncluded: Boolean(payload.joinUrl),
  });

  return sendSmtpEmail({
    to: recipient,
    subject: EMAIL_SUBJECT,
    text: buildEmailText(payload, requestedAt),
    html: buildEmailHtml(payload, requestedAt),
    logTag: "live-video-intake",
  });
}
