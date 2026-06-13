import type { EdenChatIntakeFields } from "@/lib/openai/parse-chat-intake";

function str(value: unknown): string {
  return String(value ?? "").trim();
}

const REQUIRED: Array<[keyof EdenChatIntakeFields, string]> = [
  ["parentGuardianName", "Parent/Guardian Name"],
  ["childName", "Child Name"],
  ["childAge", "Child Age"],
  ["diagnosisStatus", "Autism Diagnosis Status"],
  ["state", "State"],
  ["city", "City"],
  ["serviceType", "Preferred Service Type"],
  ["goals", "Primary Concerns or Goals"],
  ["insuranceProvider", "Insurance Provider"],
  ["phoneNumber", "Phone Number"],
  ["emailAddress", "Email Address"],
  ["preferredContactMethod", "Preferred Contact Method"],
  ["conversationSummary", "Conversation Summary"],
];

export function validateEdenChatIntake(
  fields: EdenChatIntakeFields,
): { ok: true } | { ok: false; message: string } {
  for (const [key, label] of REQUIRED) {
    if (!str(fields[key])) {
      return { ok: false, message: `Missing required intake field: ${label}.` };
    }
  }

  const email = str(fields.emailAddress);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, message: "A valid email address is required." };
  }

  return { ok: true };
}

export function edenChatIntakeToApiBody(fields: EdenChatIntakeFields): Record<string, unknown> {
  return {
    source: "eden-chat",
    parentGuardianName: fields.parentGuardianName,
    childName: fields.childName,
    childAge: fields.childAge,
    autismDiagnosisStatus: fields.diagnosisStatus,
    state: fields.state,
    city: fields.city,
    preferredServiceType: fields.serviceType,
    primaryConcernsOrGoals: fields.goals,
    insuranceProvider: fields.insuranceProvider,
    phoneNumber: fields.phoneNumber,
    emailAddress: fields.emailAddress,
    preferredContactMethod: fields.preferredContactMethod,
    conversationSummary: fields.conversationSummary,
  };
}
