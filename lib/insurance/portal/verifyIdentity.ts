import { timingSafeEqual } from "crypto";
import { normalizeDOB } from "@/lib/insurance/dates";
import { decryptPhiField } from "@/lib/insurance/encryptField";
import type { InsuranceVerificationRecord } from "@/lib/insurance/db/model";
import {
  getVerificationRecord,
  listVerificationRecordsRaw,
} from "@/lib/insurance/db/repository";
import { PORTAL_VERIFY_FAILURE_MESSAGE } from "@/lib/insurance/portal/messages";
import {
  normalizeLast4,
  normalizeProvidedLastFour,
} from "@/lib/insurance/portal/normalizeLast4";

export { PORTAL_VERIFY_FAILURE_MESSAGE };

export type PortalVerifyFailureField =
  | "dob"
  | "last4"
  | "contact"
  | "ref"
  | "ambiguous"
  | "invalid_input";

export type PortalVerifyDiagnosis = {
  ok: boolean;
  failedFields: PortalVerifyFailureField[];
};

function normalizePhone(value: string): string {
  return value.replace(/\D/g, "");
}

function safeEqualStrings(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

/** SSN last 4 — digits only. Example: 999-00-5678 → 5678 */
function ssnLastFour(ssnPlain: string | null): string | null {
  if (!ssnPlain?.trim()) return null;
  const digits = ssnPlain.replace(/\D/g, "");
  if (digits.length < 4) return null;
  return digits.slice(-4);
}

/**
 * Medicaid last 4 — last 4 characters of the stored ID (numeric IDs like
 * 350887649015 → 9015). Also accepts digit-only tail when formatting differs.
 */
function medicaidLastFourCandidates(medicaidPlain: string | null): string[] {
  if (!medicaidPlain?.trim()) return [];

  const raw = medicaidPlain.trim();
  const candidates = new Set<string>();

  if (raw.length >= 4) {
    candidates.add(normalizeLast4(raw));
  }

  const digits = raw.replace(/\D/g, "");
  if (digits.length >= 4) {
    candidates.add(digits.slice(-4));
  }

  return [...candidates];
}

function logPortalIdentityDebug(
  record: InsuranceVerificationRecord | null,
  flags: {
    refMatches: boolean;
    dobMatches: boolean;
    last4Matches: boolean;
    contactMatches: boolean;
  },
): void {
  if (process.env.NODE_ENV !== "development") return;

  console.log("Portal identity verification debug", {
    refMatches: flags.refMatches,
    dobMatches: flags.dobMatches,
    last4Matches: flags.last4Matches,
    contactMatches: flags.contactMatches,
    medicaidIdEncryptedExists: Boolean(record?.medicaidIdEncrypted),
  });
}

function recordContactMatches(
  record: InsuranceVerificationRecord,
  emailOrPhone: string,
): boolean {
  const input = emailOrPhone.trim();
  if (!input) return false;

  if (input.includes("@")) {
    return record.email.trim().toLowerCase() === input.toLowerCase();
  }

  const inputDigits = normalizePhone(input);
  const recordDigits = normalizePhone(record.phone);
  if (inputDigits.length < 10 || recordDigits.length < 10) return false;
  return inputDigits === recordDigits;
}

export { recordContactMatches as contactMatches };

export function identifierMatches(
  record: InsuranceVerificationRecord,
  lastFour: string,
): boolean {
  const provided = normalizeProvidedLastFour(lastFour);
  if (!provided || provided.length !== 4) {
    if (process.env.NODE_ENV === "development") {
      console.log("Portal last4 verification", {
        expectedType: "ssn_or_medicaid",
        enteredLength: provided?.length ?? 0,
        matched: false,
      });
    }
    return false;
  }

  const ssnPlain = decryptPhiField(record.ssnEncrypted || "");
  const medicaidPlain = decryptPhiField(record.medicaidIdEncrypted || "");

  const ssnTail = ssnLastFour(ssnPlain);
  let matched = false;

  if (ssnTail && safeEqualStrings(ssnTail, provided)) {
    matched = true;
  }

  if (!matched) {
    for (const candidate of medicaidLastFourCandidates(medicaidPlain)) {
      if (safeEqualStrings(candidate, provided)) {
        matched = true;
        break;
      }
    }
  }

  if (process.env.NODE_ENV === "development") {
    console.log("Portal last4 verification", {
      expectedType: "ssn_or_medicaid",
      enteredLength: provided.length,
      matched,
    });
  }

  return matched;
}

export function diagnosePortalVerification(
  record: InsuranceVerificationRecord,
  params: {
    normalizedDob: string;
    lastFour: string;
    emailOrPhone: string;
  },
): PortalVerifyDiagnosis {
  const dobMatches = record.dateOfBirth === params.normalizedDob;
  const last4Matches = identifierMatches(record, params.lastFour);
  const contactMatches = recordContactMatches(record, params.emailOrPhone);

  const failedFields: PortalVerifyFailureField[] = [];

  if (!dobMatches) {
    failedFields.push("dob");
  }
  if (!contactMatches) {
    failedFields.push("contact");
  }
  if (!last4Matches) {
    failedFields.push("last4");
  }

  return { ok: failedFields.length === 0, failedFields };
}

export function recordMatchesPortalVerification(
  record: InsuranceVerificationRecord,
  params: {
    normalizedDob: string;
    lastFour: string;
    emailOrPhone: string;
  },
): boolean {
  return diagnosePortalVerification(record, params).ok;
}

export type PortalVerifyLookupResult =
  | { ok: true; record: InsuranceVerificationRecord }
  | {
      ok: false;
      failedFields: PortalVerifyFailureField[];
      matchFlags: {
        dobMatches: boolean;
        last4Matches: boolean;
        contactMatches: boolean;
        refMatches: boolean;
      };
    };

export async function findRecordForPortalVerification(params: {
  requestId?: string;
  dateOfBirth: string;
  lastFour: string;
  emailOrPhone: string;
}): Promise<PortalVerifyLookupResult> {
  const normalizedDob = normalizeDOB(params.dateOfBirth);
  const lastFour = normalizeProvidedLastFour(params.lastFour);
  const hasRequestId = Boolean(params.requestId?.trim());

  if (!normalizedDob || !lastFour || lastFour.length !== 4) {
    return {
      ok: false,
      failedFields: ["invalid_input"],
      matchFlags: {
        dobMatches: Boolean(normalizedDob),
        last4Matches: Boolean(lastFour && lastFour.length === 4),
        contactMatches: false,
        refMatches: false,
      },
    };
  }

  const matchParams = {
    normalizedDob,
    lastFour,
    emailOrPhone: params.emailOrPhone.trim(),
  };

  if (hasRequestId) {
    const record = await getVerificationRecord(params.requestId!.trim());
    if (!record) {
      logPortalIdentityDebug(null, {
        refMatches: false,
        dobMatches: false,
        last4Matches: false,
        contactMatches: false,
      });
      return {
        ok: false,
        failedFields: ["ref"],
        matchFlags: {
          dobMatches: false,
          last4Matches: false,
          contactMatches: false,
          refMatches: false,
        },
      };
    }

    const dobMatches = record.dateOfBirth === matchParams.normalizedDob;
    const last4Matches = identifierMatches(record, matchParams.lastFour);
    const contactMatches = recordContactMatches(record, matchParams.emailOrPhone);
    const refMatches = true;

    logPortalIdentityDebug(record, {
      refMatches,
      dobMatches,
      last4Matches,
      contactMatches,
    });

    if (!dobMatches || !last4Matches || !contactMatches) {
      const failedFields: PortalVerifyFailureField[] = [];
      if (!dobMatches) failedFields.push("dob");
      if (!contactMatches) failedFields.push("contact");
      if (!last4Matches) failedFields.push("last4");

      return {
        ok: false,
        failedFields,
        matchFlags: {
          dobMatches,
          last4Matches,
          contactMatches,
          refMatches,
        },
      };
    }

    return { ok: true, record };
  }

  const records = await listVerificationRecordsRaw();
  const matches = records.filter((record) =>
    recordMatchesPortalVerification(record, matchParams),
  );

  if (matches.length === 1) {
    return { ok: true, record: matches[0] };
  }

  if (matches.length > 1) {
    return {
      ok: false,
      failedFields: ["ambiguous"],
      matchFlags: {
        dobMatches: true,
        last4Matches: true,
        contactMatches: true,
        refMatches: true,
      },
    };
  }

  return {
    ok: false,
    failedFields: ["dob", "last4", "contact"],
    matchFlags: {
      dobMatches: false,
      last4Matches: false,
      contactMatches: false,
      refMatches: true,
    },
  };
}
