import { formatDOBForDisplay } from "@/lib/insurance/dates";
import type {
  EligibilityResult,
  InsuranceVerificationProvider,
  VerificationMemberInput,
} from "@/lib/insurance/providers/types";

export const MANUAL_PENDING_NOTES =
  "Your request has been received. Eden ABA Therapy staff will verify eligibility through approved Medicaid verification workflows.";

export function buildPendingEligibilityResult(
  input: VerificationMemberInput,
  notes: string = MANUAL_PENDING_NOTES,
  providerConfigured = true,
  providerMessage?: string,
): EligibilityResult {
  return {
    verified: false,
    providerConfigured,
    providerMessage,
    verificationStatus: "Pending Staff Review",
    eligibilityStatus: "Pending Staff Review",
    memberName: input.fullName,
    dateOfBirth: formatDOBForDisplay(input.dateOfBirth),
    notes,
  };
}

export class ManualVerificationProvider implements InsuranceVerificationProvider {
  readonly name = "manual";

  async verifyMember(input: VerificationMemberInput): Promise<EligibilityResult> {
    return buildPendingEligibilityResult(input);
  }
}
