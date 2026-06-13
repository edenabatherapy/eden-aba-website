import type { InsuranceVerificationRequest, InsuranceVerificationResponse } from "@/types/insurance";
import { ClearinghouseVerificationProvider } from "@/lib/insurance/providers/ClearinghouseVerificationProvider";
import { ManualVerificationProvider } from "@/lib/insurance/providers/ManualVerificationProvider";
import { MesProviderVerificationProvider } from "@/lib/insurance/providers/MesProviderVerificationProvider";
import {
  isClearinghouseConfigured,
  isLiveVerificationEnabled,
} from "@/lib/insurance/providers/clearinghouse/client";
import type {
  InsuranceVerificationProvider,
  VerificationMemberInput,
} from "@/lib/insurance/providers/types";

export type MedicaidVerificationMode = "manual" | "clearinghouse" | "mes_provider_api";

export function getVerificationMode(): MedicaidVerificationMode {
  const mode = process.env.MEDICAID_VERIFICATION_MODE || "manual";
  if (mode === "clearinghouse" || mode === "mes_provider_api") {
    return mode;
  }
  return "manual";
}

export function getVerificationProvider(): InsuranceVerificationProvider {
  const mode = getVerificationMode();
  if (mode === "clearinghouse") return new ClearinghouseVerificationProvider();
  if (mode === "mes_provider_api") return new MesProviderVerificationProvider();
  return new ManualVerificationProvider();
}

function toMemberInput(request: InsuranceVerificationRequest): VerificationMemberInput {
  return {
    fullName: request.fullName,
    dateOfBirth: request.dateOfBirth,
    medicaidId: request.medicaidId,
    ssn: request.ssn,
    zipCode: request.zipCode,
    insuranceProvider: request.insuranceProvider,
    verificationType: request.verificationType,
  };
}

export async function verifyInsurance(
  request: InsuranceVerificationRequest,
  requestId?: string,
): Promise<InsuranceVerificationResponse> {
  const provider = getVerificationProvider();
  const result = await provider.verifyMember(toMemberInput(request));

  return {
    verified: result.verified,
    verificationStatus: result.verificationStatus,
    memberName: result.memberName,
    dateOfBirth: result.dateOfBirth,
    programType: result.programType,
    subprogramType: result.subprogramType,
    currentEnrollmentChoice: result.currentEnrollmentChoice,
    effectiveDate: result.effectiveDate,
    futureEnrollmentChoice: result.futureEnrollmentChoice,
    eligibilityStatus: result.eligibilityStatus,
    notes: result.notes,
    verificationMode: getVerificationMode(),
    liveVerificationAvailable: isLiveVerificationEnabled() && result.providerConfigured,
    verificationTimestamp: result.verificationTimestamp,
    requestId,
  };
}

export { isLiveVerificationEnabled, isClearinghouseConfigured };

export function hasClearinghouseCredentials() {
  return isClearinghouseConfigured();
}

export function hasMesProviderCredentials() {
  return Boolean(
    process.env.MES_PROVIDER_API_URL?.trim() &&
      process.env.MES_PROVIDER_CLIENT_ID?.trim() &&
      process.env.MES_PROVIDER_CLIENT_SECRET?.trim(),
  );
}
