import type { InsuranceVerificationRecord } from "@/lib/insurance/db/model";
import { decryptPhiField } from "@/lib/insurance/encryptField";
import type { VerificationMemberInput } from "@/lib/insurance/providers/types";
import { resolvePayerId } from "@/lib/insurance/eligibility/payerIds";
import type { LiveEligibilityRequest } from "@/lib/insurance/eligibility/types";

const DEFAULT_SERVICE_TYPE = "30";

export function splitClientName(fullName: string): { firstName: string; lastName: string } {
  const parts = fullName.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return { firstName: "", lastName: "" };
  if (parts.length === 1) return { firstName: parts[0], lastName: parts[0] };
  return { firstName: parts[0], lastName: parts.slice(1).join(" ") };
}

export function resolvePatientState(zipCode?: string): string {
  const configured = process.env.ELIGIBILITY_DEFAULT_PATIENT_STATE?.trim();
  if (configured) return configured.toUpperCase();

  const prefix = zipCode?.trim().slice(0, 2);
  if (prefix === "23" || prefix === "24") return "VA";

  return "VA";
}

function buildBaseRequest(
  input: {
    payerId: string;
    payerName?: string;
    memberId: string;
    firstName: string;
    lastName: string;
    dob: string;
    dateOfService: string;
    zipCode?: string;
    medicaidId?: string;
    ssn?: string;
  },
): LiveEligibilityRequest {
  return {
    payerId: input.payerId,
    payerName: input.payerName,
    memberId: input.memberId,
    firstName: input.firstName,
    lastName: input.lastName,
    dob: input.dob,
    dateOfService: input.dateOfService,
    zipCode: input.zipCode,
    medicaidId: input.medicaidId,
    ssn: input.ssn,
    patientState: resolvePatientState(input.zipCode),
    serviceType: DEFAULT_SERVICE_TYPE,
  };
}

export function buildLiveEligibilityRequestFromRecord(
  record: InsuranceVerificationRecord,
  dateOfService?: string,
): LiveEligibilityRequest | null {
  const medicaidPlain = decryptPhiField(record.medicaidIdEncrypted || "");
  const memberId = medicaidPlain?.trim() || "";

  if (!memberId) return null;

  const { firstName, lastName } = splitClientName(record.clientName);
  const payerId = resolvePayerId(record.insuranceProvider);

  if (!payerId || !firstName || !lastName || !record.dateOfBirth) {
    return null;
  }

  return buildBaseRequest({
    payerId,
    payerName: record.insuranceProvider,
    memberId,
    firstName,
    lastName,
    dob: record.dateOfBirth,
    dateOfService: dateOfService || new Date().toISOString().slice(0, 10),
    zipCode: record.zipCode,
    medicaidId: memberId,
  });
}

export function buildLiveEligibilityRequestFromMemberInput(
  input: VerificationMemberInput,
  dateOfService?: string,
): LiveEligibilityRequest | null {
  const memberId = input.medicaidId?.trim() || "";
  if (!memberId && !input.ssn?.trim()) return null;

  const { firstName, lastName } = splitClientName(input.fullName);
  const payerId = resolvePayerId(input.insuranceProvider || "");

  if (!payerId || !firstName || !lastName || !input.dateOfBirth) {
    return null;
  }

  return buildBaseRequest({
    payerId,
    payerName: input.insuranceProvider,
    memberId: memberId || input.ssn!.trim(),
    firstName,
    lastName,
    dob: input.dateOfBirth,
    dateOfService: dateOfService || new Date().toISOString().slice(0, 10),
    zipCode: input.zipCode,
    medicaidId: input.medicaidId,
    ssn: input.ssn,
  });
}

/** @deprecated Use buildLiveEligibilityRequestFromRecord */
export const buildLiveEligibilityInputFromRecord = buildLiveEligibilityRequestFromRecord;
