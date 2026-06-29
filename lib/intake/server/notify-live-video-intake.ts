import { sendIntakeStaffEmail, type StaffEmailResult } from "./send-staff-email";

const LIVE_VIDEO_INTAKE_EMAIL = "info@edenabatherapy.com";
const EMAIL_SUBJECT = "New Live Video Intake Request - Eden ABA Therapy";

export type LiveVideoIntakeVisitor = {
  parentName?: string;
  parentEmail?: string;
  parentPhone?: string;
};

export type LiveVideoIntakeNotificationPayload = {
  joinUrl: string;
  roomName: string;
  pageUrl: string;
  language?: string;
  visitor?: LiveVideoIntakeVisitor;
  requestedAt?: Date;
};

function formatRequestedAt(date: Date): string {
  return date.toLocaleString("en-US", {
    timeZone: "America/New_York",
    dateStyle: "full",
    timeStyle: "long",
  });
}

function formatLanguageLabel(language?: string): string {
  if (language === "vi") return "Vietnamese (vi)";
  if (language === "en") return "English (en)";
  return language?.trim() || "—";
}

function formatVisitorSection(visitor?: LiveVideoIntakeVisitor): string {
  if (!visitor) return "—";

  const lines = [
    visitor.parentName ? `Parent/Guardian Name: ${visitor.parentName}` : "",
    visitor.parentEmail ? `Email: ${visitor.parentEmail}` : "",
    visitor.parentPhone ? `Phone: ${visitor.parentPhone}` : "",
  ].filter(Boolean);

  return lines.length > 0 ? lines.join("\n") : "—";
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function buildEmailText(payload: LiveVideoIntakeNotificationPayload, requestedAt: Date): string {
  return [
    "A visitor requested a live video intake session on the Eden ABA Therapy website.",
    "",
    `Date/Time: ${formatRequestedAt(requestedAt)}`,
    `Daily Video Room: ${payload.joinUrl}`,
    `Room Name: ${payload.roomName}`,
    `Page: ${payload.pageUrl || "—"}`,
    `Visitor Language: ${formatLanguageLabel(payload.language)}`,
    "",
    "Visitor / Contact Information:",
    formatVisitorSection(payload.visitor),
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
  const visitorHtml = escapeHtml(formatVisitorSection(payload.visitor)).replace(/\n/g, "<br />");

  return `
    <div style="font-family: Arial, sans-serif; color: #0f172a; line-height: 1.6; max-width: 640px;">
      <h2 style="margin: 0 0 16px; color: #0b4f4f;">New Live Video Intake Request</h2>
      <p style="margin: 0 0 16px;">A visitor requested a live video intake session on the Eden ABA Therapy website.</p>
      <table style="border-collapse: collapse; width: 100%; margin-bottom: 20px;">
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Date/Time</td><td style="padding: 8px 0;">${escapeHtml(formatRequestedAt(requestedAt))}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Page</td><td style="padding: 8px 0;">${pageUrl}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Visitor Language</td><td style="padding: 8px 0;">${escapeHtml(formatLanguageLabel(payload.language))}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Room Name</td><td style="padding: 8px 0;">${escapeHtml(payload.roomName)}</td></tr>
        <tr><td style="padding: 8px 0; font-weight: 700; vertical-align: top;">Visitor / Contact</td><td style="padding: 8px 0;">${visitorHtml}</td></tr>
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
): Promise<StaffEmailResult> {
  const requestedAt = payload.requestedAt ?? new Date();

  return sendIntakeStaffEmail({
    to: LIVE_VIDEO_INTAKE_EMAIL,
    subject: EMAIL_SUBJECT,
    text: buildEmailText(payload, requestedAt),
    html: buildEmailHtml(payload, requestedAt),
  });
}
