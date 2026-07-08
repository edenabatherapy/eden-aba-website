export const LIVE_VIDEO_REASON_IDS = [
  "start-aba-therapy",
  "insurance-question",
  "schedule-appointment",
  "provider-referral",
  "general-question",
  "other",
] as const;

export type LiveVideoReasonForCall = (typeof LIVE_VIDEO_REASON_IDS)[number];

export type LiveVideoPreferredLanguage = "en" | "vi";

export type LiveVideoPreCallIntake = {
  parentName: string;
  phone: string;
  email: string;
  childAge?: string;
  preferredLanguage: LiveVideoPreferredLanguage;
  reasonForCall: LiveVideoReasonForCall;
};

const REASON_LABELS_EN: Record<LiveVideoReasonForCall, string> = {
  "start-aba-therapy": "Start ABA Therapy",
  "insurance-question": "Insurance Question",
  "schedule-appointment": "Schedule Appointment",
  "provider-referral": "Provider Referral",
  "general-question": "General Question",
  other: "Other",
};

function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function parseReasonForCall(value: unknown): LiveVideoReasonForCall | null {
  if (typeof value !== "string") return null;
  return LIVE_VIDEO_REASON_IDS.includes(value as LiveVideoReasonForCall)
    ? (value as LiveVideoReasonForCall)
    : null;
}

function parsePreferredLanguage(value: unknown): LiveVideoPreferredLanguage | null {
  return value === "en" || value === "vi" ? value : null;
}

export function getLiveVideoReasonLabel(reason: LiveVideoReasonForCall): string {
  return REASON_LABELS_EN[reason];
}

export function getLiveVideoPreferredLanguageLabel(language: LiveVideoPreferredLanguage): string {
  return language === "vi" ? "Vietnamese" : "English";
}

export function parseLiveVideoPreCallIntake(
  value: unknown,
): { ok: true; data: LiveVideoPreCallIntake } | { ok: false; error: string } {
  if (!value || typeof value !== "object") {
    return { ok: false, error: "Intake details are required." };
  }

  const record = value as Record<string, unknown>;
  const parentName = typeof record.parentName === "string" ? record.parentName.trim() : "";
  const phone = typeof record.phone === "string" ? record.phone.trim() : "";
  const email = typeof record.email === "string" ? record.email.trim() : "";
  const childAge = typeof record.childAge === "string" ? record.childAge.trim() : "";
  const preferredLanguage = parsePreferredLanguage(record.preferredLanguage);
  const reasonForCall = parseReasonForCall(record.reasonForCall);

  if (!parentName) {
    return { ok: false, error: "Parent or guardian name is required." };
  }
  if (!phone) {
    return { ok: false, error: "Phone number is required." };
  }
  if (!email || !isValidEmail(email)) {
    return { ok: false, error: "A valid email address is required." };
  }
  if (!preferredLanguage) {
    return { ok: false, error: "Preferred language is required." };
  }
  if (!reasonForCall) {
    return { ok: false, error: "Reason for call is required." };
  }

  return {
    ok: true,
    data: {
      parentName,
      phone,
      email,
      childAge: childAge || undefined,
      preferredLanguage,
      reasonForCall,
    },
  };
}

export function buildLiveVideoLeadMessage(params: {
  intake: LiveVideoPreCallIntake;
  pageUrl: string;
  roomName: string;
  joinUrl: string;
}): string {
  const { intake, pageUrl, roomName, joinUrl } = params;

  return [
    `Source: Live Video Intake (${pageUrl})`,
    `Preferred Language: ${getLiveVideoPreferredLanguageLabel(intake.preferredLanguage)}`,
    `Reason for Call: ${getLiveVideoReasonLabel(intake.reasonForCall)}`,
    intake.childAge ? `Child's Age: ${intake.childAge}` : "",
    `Page: ${pageUrl}`,
    `Daily Room: ${roomName}`,
    `Join URL: ${joinUrl}`,
  ]
    .filter(Boolean)
    .join("\n");
}
