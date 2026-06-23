import { getConsentAckFields } from "@/lib/intake/consent-docs";
import { prepareIntakePayload } from "@/lib/intake/legal-global";
import { getChildFirstName } from "@/lib/intake/required-fields";

type IntakeRecord = Record<string, unknown>;

function str(value: unknown): string {
  return String(value ?? "").trim();
}

function hasConsent(value: unknown): boolean {
  return value === "Yes" || value === true;
}

const LEGAL_GLOBAL = ["legalGlobalName", "legalGlobalDate", "legalGlobalSignature"];

const LEGAL_FIELD_MESSAGES: Record<(typeof LEGAL_GLOBAL)[number], string> = {
  legalGlobalName: "Please enter your full legal name in the Legal Signature section.",
  legalGlobalDate: "Please confirm the legal signature date in the Legal Signature section.",
  legalGlobalSignature: "Please enter your legal signature in the Legal Signature section.",
};

const FIELD_MESSAGES: Record<string, string> = {
  guardianName: "Primary parent / guardian name is required.",
  childFullName: "Child first name is required.",
  city: "City is required.",
  state: "State is required.",
  phone: "Enter a phone number or email address so we can reach you.",
  email: "Enter a phone number or email address so we can reach you.",
  infoAccurate: "Please confirm the information is accurate.",
  finalName: "Parent / guardian name is required for the final signature.",
  finalDate: "Signature date is required.",
  finalSignature: "Signature is required.",
};

function hasPhoneOrEmail(intake: IntakeRecord): boolean {
  return Boolean(str(intake.phone) || str(intake.email));
}

function isValidEmail(value: unknown): boolean {
  const email = str(value);
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validateIntakeSubmission(intake: IntakeRecord): { ok: true } | { ok: false; message: string } {
  if (!intake || typeof intake !== "object") {
    return { ok: false, message: "Missing intake data." };
  }

  const normalized = prepareIntakePayload(intake);

  if (!str(normalized.guardianName) && !str(normalized.legalGlobalName)) {
    return { ok: false, message: FIELD_MESSAGES.guardianName };
  }

  if (!getChildFirstName(normalized)) {
    return { ok: false, message: FIELD_MESSAGES.childFullName };
  }

  if (!str(normalized.city)) {
    return { ok: false, message: FIELD_MESSAGES.city };
  }

  if (!str(normalized.state)) {
    return { ok: false, message: FIELD_MESSAGES.state };
  }

  if (!hasPhoneOrEmail(normalized)) {
    return { ok: false, message: FIELD_MESSAGES.phone };
  }

  if (!isValidEmail(normalized.email)) {
    return { ok: false, message: "A valid email address is required when email is provided." };
  }

  for (const field of LEGAL_GLOBAL) {
    if (!str(normalized[field])) {
      return { ok: false, message: LEGAL_FIELD_MESSAGES[field] };
    }
  }

  for (const consent of getConsentAckFields()) {
    if (!hasConsent(normalized[consent.name])) {
      return { ok: false, message: "All consent acknowledgments must be completed before submission." };
    }
  }

  const finalFields = ["infoAccurate", "finalName", "finalDate", "finalSignature"] as const;
  for (const field of finalFields) {
    if (field === "infoAccurate") {
      if (normalized[field] !== "Yes") {
        return { ok: false, message: FIELD_MESSAGES.infoAccurate };
      }
      continue;
    }
    if (!str(normalized[field])) {
      return { ok: false, message: FIELD_MESSAGES[field] };
    }
  }

  return { ok: true };
}
