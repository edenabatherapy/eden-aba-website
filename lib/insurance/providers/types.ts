import type { VerificationType } from "@/types/insurance";

export type EligibilityVerificationStatus =
  | "Verified"
  | "Pending Staff Review"
  | "Not Found"
  | "Inactive"
  | "Unable To Verify";

export type EligibilityMemberStatus =
  | "Active"
  | "Inactive"
  | "Pending Staff Review"
  | "Not Found"
  | "Unable To Verify";

export interface VerificationMemberInput {
  fullName: string;
  /** Canonical storage format YYYY-MM-DD */
  dateOfBirth: string;
  medicaidId?: string;
  ssn?: string;
  zipCode?: string;
  insuranceProvider?: string;
  verificationType: VerificationType;
}

export interface EligibilityResult {
  verified: boolean;
  providerConfigured: boolean;
  providerMessage?: string;
  verificationStatus: EligibilityVerificationStatus;
  eligibilityStatus: EligibilityMemberStatus;
  memberName: string;
  dateOfBirth: string;
  programType?: string;
  subprogramType?: string;
  currentEnrollmentChoice?: string;
  effectiveDate?: string;
  futureEnrollmentChoice?: string;
  notes: string;
  /** ISO timestamp when a live provider returned eligibility (clearinghouse/MES only). */
  verificationTimestamp?: string;
}

export interface InsuranceVerificationProvider {
  readonly name: string;
  verifyMember(input: VerificationMemberInput): Promise<EligibilityResult>;
}
