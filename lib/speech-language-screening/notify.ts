import { getIntakeConfig } from "@/lib/intake/server/config";
import { formatResendFromAddress, sendResendEmail } from "@/lib/intake/server/resend";

const SCREENING_TEAM_EMAIL = "info@edenabatherapy.com";

export type SpeechLanguageScreeningEmailPayload = {
  confirmationId: string;
  parentName: string;
  childName: string;
  phone: string;
  email: string;
  screeningScore: number;
  riskLevel: string;
  redFlags: boolean;
  concerns: string;
};

export async function notifySpeechLanguageScreeningTeam(
  payload: SpeechLanguageScreeningEmailPayload,
) {
  const subject = `New Speech & Language Screening Submission - ${payload.childName || "Child"}`;

  const text = [
    "New Speech & Language Therapy screening submission",
    "",
    `Parent name: ${payload.parentName || "—"}`,
    `Child name: ${payload.childName || "—"}`,
    `Phone: ${payload.phone || "—"}`,
    `Email: ${payload.email || "—"}`,
    `Screening score: ${payload.screeningScore}`,
    `Risk level: ${payload.riskLevel}`,
    `Red flags: ${payload.redFlags ? "Yes" : "No"}`,
    "",
    "Main concerns:",
    payload.concerns || "—",
    "",
    `Confirmation ID: ${payload.confirmationId}`,
    "",
    "This message is intended for Eden ABA Therapy intake staff only.",
    "This screening does not diagnose and does not replace evaluation by a licensed Speech-Language Pathologist.",
  ].join("\n");

  const { fromEmail } = getIntakeConfig();

  return sendResendEmail({
    to: SCREENING_TEAM_EMAIL,
    subject,
    text,
    html: text.replace(/\n/g, "<br>"),
    logTag: "speech-language-screening-email",
  });
}

export function getSpeechLanguageScreeningFromAddress(): string {
  return formatResendFromAddress(getIntakeConfig().fromEmail);
}
