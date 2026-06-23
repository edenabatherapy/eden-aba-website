import { getConsentAckFields } from "@/lib/intake/consent-docs";
import { prepareIntakePayload } from "@/lib/intake/legal-global";

type IntakeRecord = Record<string, unknown>;

function str(value: unknown): string {
  return String(value ?? "").trim();
}

function hasRadio(value: unknown): boolean {
  return str(value).length > 0;
}

function hasCheckboxGroup(value: unknown): boolean {
  return Array.isArray(value) ? value.length > 0 : hasRadio(value);
}

function hasConsent(value: unknown): boolean {
  return value === "Yes" || value === true;
}

/** Minimum server-side required fields for production submission. */
const CORE_REQUIRED = [
  "childFullName",
  "primaryLanguageChild",
  "street",
  "phone",
  "email",
  "emergencyContactName",
  "emergencyContactPhone",
  "intakeReason",
  "contactMethod",
];

const STEP5_REQUIRED = [
  "infoAccurate",
  "notifyChanges",
  "documentsUploaded",
  "finalName",
  "finalDate",
  "finalSignature",
];

const LEGAL_GLOBAL = ["legalGlobalName", "legalGlobalDate", "legalGlobalSignature"];

const LEGAL_FIELD_MESSAGES: Record<(typeof LEGAL_GLOBAL)[number], string> = {
  legalGlobalName: "Please enter your full legal name in the Legal Signature section.",
  legalGlobalDate: "Please confirm the legal signature date in the Legal Signature section.",
  legalGlobalSignature: "Please enter your legal signature in the Legal Signature section.",
};

export function validateIntakeSubmission(intake: IntakeRecord): { ok: true } | { ok: false; message: string } {
  if (!intake || typeof intake !== "object") {
    return { ok: false, message: "Missing intake data." };
  }

  const normalized = prepareIntakePayload(intake);

  for (const field of CORE_REQUIRED) {
    if (field === "contactMethod") {
      if (!hasCheckboxGroup(normalized[field])) {
        return { ok: false, message: "Preferred contact method is required." };
      }
      continue;
    }
    if (!str(normalized[field])) {
      return { ok: false, message: `Missing required field: ${field}` };
    }
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(normalized.email))) {
    return { ok: false, message: "A valid email address is required." };
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

  for (const field of STEP5_REQUIRED) {
    if (!hasRadio(normalized[field])) {
      return { ok: false, message: `Missing required final verification field: ${field}` };
    }
  }

  return { ok: true };
}
