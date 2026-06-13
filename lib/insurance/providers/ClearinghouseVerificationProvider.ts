import { formatDOBForDisplay } from "@/lib/insurance/dates";
import {
  getClearinghouseConfig,
  isClearinghouseConfigured,
  isLiveVerificationEnabled,
  submitClearinghouseEligibilityInquiry,
} from "@/lib/insurance/providers/clearinghouse/client";
import { logProviderError } from "@/lib/insurance/providers/logging";
import {
  buildPendingEligibilityResult,
  MANUAL_PENDING_NOTES,
} from "@/lib/insurance/providers/ManualVerificationProvider";
import type {
  EligibilityResult,
  InsuranceVerificationProvider,
  VerificationMemberInput,
} from "@/lib/insurance/providers/types";

const NOT_CONFIGURED_MESSAGE = "Provider not configured";

function mapClearinghouseResponse(
  input: VerificationMemberInput,
  data: unknown,
): EligibilityResult | null {
  if (!data || typeof data !== "object") return null;

  const record = data as Record<string, unknown>;
  const statusRaw = String(record.eligibilityStatus || record.status || "").toLowerCase();

  if (!statusRaw) return null;

  const active = statusRaw.includes("active") && !statusRaw.includes("inactive");
  const inactive = statusRaw.includes("inactive");
  const notFound = statusRaw.includes("not found") || statusRaw.includes("not_found");

  if (notFound) {
    return {
      verified: false,
      providerConfigured: true,
      verificationStatus: "Not Found",
      eligibilityStatus: "Not Found",
      memberName: input.fullName,
      dateOfBirth: formatDOBForDisplay(input.dateOfBirth),
      notes: "Member not found in clearinghouse response.",
      verificationTimestamp: new Date().toISOString(),
    };
  }

  if (inactive) {
    return {
      verified: false,
      providerConfigured: true,
      verificationStatus: "Inactive",
      eligibilityStatus: "Inactive",
      memberName: input.fullName,
      dateOfBirth: formatDOBForDisplay(input.dateOfBirth),
      notes: "Clearinghouse reported inactive eligibility.",
      verificationTimestamp: new Date().toISOString(),
    };
  }

  if (active) {
    return {
      verified: true,
      providerConfigured: true,
      verificationStatus: "Verified",
      eligibilityStatus: "Active",
      memberName: input.fullName,
      dateOfBirth: formatDOBForDisplay(input.dateOfBirth),
      programType: record.programType ? String(record.programType) : undefined,
      subprogramType: record.subprogramType ? String(record.subprogramType) : undefined,
      currentEnrollmentChoice: record.planName
        ? String(record.planName)
        : record.currentEnrollmentChoice
          ? String(record.currentEnrollmentChoice)
          : undefined,
      effectiveDate: record.effectiveDate ? String(record.effectiveDate) : undefined,
      futureEnrollmentChoice: record.futureEnrollmentChoice
        ? String(record.futureEnrollmentChoice)
        : undefined,
      notes: "Eligibility confirmed via clearinghouse.",
      verificationTimestamp: new Date().toISOString(),
    };
  }

  return null;
}

export class ClearinghouseVerificationProvider implements InsuranceVerificationProvider {
  readonly name = "clearinghouse";

  async verifyMember(input: VerificationMemberInput): Promise<EligibilityResult> {
    if (!isClearinghouseConfigured()) {
      return buildPendingEligibilityResult(
        input,
        MANUAL_PENDING_NOTES,
        false,
        NOT_CONFIGURED_MESSAGE,
      );
    }

    if (!isLiveVerificationEnabled()) {
      return buildPendingEligibilityResult(input);
    }

    const config = getClearinghouseConfig();
    if (!config) {
      return buildPendingEligibilityResult(
        input,
        MANUAL_PENDING_NOTES,
        false,
        NOT_CONFIGURED_MESSAGE,
      );
    }

    const result = await submitClearinghouseEligibilityInquiry({
      memberName: input.fullName,
      dateOfBirth: input.dateOfBirth,
      medicaidId: input.medicaidId,
      ssn: input.ssn,
      zipCode: input.zipCode,
      payerName: input.insuranceProvider,
    });

    if (result.ok === false) {
      await logProviderError("clearinghouse", result.error, {
        statusCode: result.statusCode,
        memberName: input.fullName,
      });
      return buildPendingEligibilityResult(
        input,
        `Verification could not be completed automatically (${result.error}). Eden ABA staff must complete Medicaid eligibility verification manually.`,
        true,
        result.error,
      );
    }

    const mapped = mapClearinghouseResponse(input, result.data);
    if (!mapped) {
      await logProviderError("clearinghouse", "Unrecognized clearinghouse response shape", {
        memberName: input.fullName,
      });
      return buildPendingEligibilityResult(
        input,
        "Clearinghouse returned an unrecognized response. Eden ABA staff must complete verification manually.",
        true,
        "Unrecognized clearinghouse response",
      );
    }

    return mapped;
  }
}
