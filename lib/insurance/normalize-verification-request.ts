import { normalizeDOB, validateDOB } from "@/lib/insurance/dates";
import type { InsuranceVerificationRequest, VerificationType } from "@/types/insurance";

export const INSURANCE_VERIFICATION_ERROR_MESSAGES = {
  invalidEmail: "Invalid email format",
  invalidPhone: "Invalid phone number",
  invalidZip: "Invalid ZIP code",
  invalidDob: "Invalid date of birth",
  memberIdOrSsn: "Please enter either the Member ID or Social Security Number.",
  recaptcha: "Please complete the reCAPTCHA",
  verificationTypeRequired: "Verification type is required.",
  childNameRequired: "Child name is required.",
  adultNameRequired: "Full name is required.",
  parentFirstNameRequired: "Parent/guardian first name is required.",
  parentLastNameRequired: "Parent/guardian last name is required.",
  emailRequired: "Email is required.",
  phoneRequired: "Phone number is required.",
  zipRequired: "ZIP code is required.",
  insuranceProviderRequired: "Insurance provider is required.",
  consentRequired: "Consent is required before verification.",
} as const;

export type NormalizedInsuranceVerificationRequest = {
  verificationType: VerificationType;
  parentFirstName: string | null;
  parentLastName: string | null;
  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  zipCode: string;
  insuranceProvider: string;
  medicaidId: string | null;
  ssn: string | null;
  consent: boolean;
};

function trimToNull(value: string | undefined | null): string | null {
  const trimmed = (value ?? "").trim();
  return trimmed === "" ? null : trimmed;
}

export function isValidInsuranceEmail(email: string): boolean {
  const trimmed = email.trim();
  if (!trimmed) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
}

export function phoneDigits(value: string): string {
  return value.replace(/\D/g, "");
}

export function isValidInsurancePhone(phone: string): boolean {
  return phoneDigits(phone).length === 10;
}

/** Store as (XXX) XXX-XXXX; accepts input with or without punctuation. */
export function normalizeInsurancePhone(phone: string): string | null {
  const digits = phoneDigits(phone);
  if (digits.length !== 10) return null;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

export function formatInsurancePhoneInput(value: string): string {
  const digits = phoneDigits(value).slice(0, 10);
  if (digits.length > 6) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
  }
  if (digits.length > 3) {
    return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  }
  return digits;
}

export function isValidInsuranceZip(zip: string): boolean {
  return /^\d{5}$/.test(zip.replace(/\D/g, "").slice(0, 5));
}

/** Keep 5-digit ZIP only. */
export function normalizeInsuranceZip(zip: string): string | null {
  const digits = zip.replace(/\D/g, "").slice(0, 5);
  if (digits.length !== 5) return null;
  return digits;
}

export function formatInsuranceZipInput(value: string): string {
  return value.replace(/\D/g, "").slice(0, 5);
}

export function normalizeInsuranceSsn(ssn: string | undefined | null): string | null {
  const digits = (ssn ?? "").replace(/\D/g, "");
  if (!digits) return null;
  if (digits.length !== 9) return null;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

export function formatInsuranceSsnInput(value: string): string {
  const digits = value.replace(/\D/g, "").slice(0, 9);
  if (digits.length > 5) {
    return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
  }
  if (digits.length > 3) {
    return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  }
  return digits;
}

export function normalizeInsuranceMemberId(memberId: string | undefined | null): string | null {
  return trimToNull(memberId);
}

export type InsuranceVerificationValidationResult =
  | { ok: true; data: NormalizedInsuranceVerificationRequest }
  | { ok: false; error: string; status: number };

export function validateAndNormalizeInsuranceVerificationRequest(
  body: InsuranceVerificationRequest,
): InsuranceVerificationValidationResult {
  if (!body.verificationType) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.verificationTypeRequired,
      status: 400,
    };
  }

  const fullName = trimToNull(body.fullName);
  if (!fullName) {
    return {
      ok: false,
      error:
        body.verificationType === "child"
          ? INSURANCE_VERIFICATION_ERROR_MESSAGES.childNameRequired
          : INSURANCE_VERIFICATION_ERROR_MESSAGES.adultNameRequired,
      status: 400,
    };
  }

  const dobValidation = validateDOB(body.dateOfBirth || "");
  if (!dobValidation.valid) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidDob,
      status: 400,
    };
  }

  const normalizedDob = normalizeDOB(body.dateOfBirth);
  if (!normalizedDob) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidDob,
      status: 400,
    };
  }

  const email = trimToNull(body.email);
  if (!email) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.emailRequired,
      status: 400,
    };
  }
  if (!isValidInsuranceEmail(email)) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidEmail,
      status: 400,
    };
  }

  const phoneRaw = trimToNull(body.phone);
  if (!phoneRaw) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.phoneRequired,
      status: 400,
    };
  }
  if (!isValidInsurancePhone(phoneRaw)) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidPhone,
      status: 400,
    };
  }
  const phone = normalizeInsurancePhone(phoneRaw);
  if (!phone) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidPhone,
      status: 400,
    };
  }

  const zipRaw = trimToNull(body.zipCode);
  if (!zipRaw) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.zipRequired,
      status: 400,
    };
  }
  const zipCode = normalizeInsuranceZip(zipRaw);
  if (!zipCode) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.invalidZip,
      status: 400,
    };
  }

  const insuranceProvider = trimToNull(body.insuranceProvider);
  if (!insuranceProvider) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.insuranceProviderRequired,
      status: 400,
    };
  }

  const memberId = normalizeInsuranceMemberId(body.medicaidId);
  const ssn = memberId ? null : normalizeInsuranceSsn(body.ssn);

  if (!memberId && !ssn) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.memberIdOrSsn,
      status: 400,
    };
  }

  if (!body.consent) {
    return {
      ok: false,
      error: INSURANCE_VERIFICATION_ERROR_MESSAGES.consentRequired,
      status: 400,
    };
  }

  let parentFirstName: string | null = null;
  let parentLastName: string | null = null;

  if (body.verificationType === "child") {
    parentFirstName = trimToNull(body.parentFirstName);
    parentLastName = trimToNull(body.parentLastName);
    if (!parentFirstName) {
      return {
        ok: false,
        error: INSURANCE_VERIFICATION_ERROR_MESSAGES.parentFirstNameRequired,
        status: 400,
      };
    }
    if (!parentLastName) {
      return {
        ok: false,
        error: INSURANCE_VERIFICATION_ERROR_MESSAGES.parentLastNameRequired,
        status: 400,
      };
    }
  }

  return {
    ok: true,
    data: {
      verificationType: body.verificationType,
      parentFirstName,
      parentLastName,
      fullName,
      dateOfBirth: normalizedDob,
      email: email.toLowerCase(),
      phone,
      zipCode,
      insuranceProvider,
      medicaidId: memberId,
      ssn,
      consent: body.consent,
    },
  };
}
