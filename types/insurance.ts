export type VerificationType = "child" | "adult";

export interface InsuranceVerificationRequest {
  verificationType: VerificationType;

  parentFirstName?: string;
  parentLastName?: string;

  fullName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  zipCode: string;
  insuranceProvider: string;

  medicaidId?: string;
  ssn?: string;
  consent: boolean;
}

export interface InsuranceVerificationResponse {
  verified: boolean;
  verificationStatus:
    | "Verified"
    | "Pending Staff Review"
    | "Not Found"
    | "Inactive"
    | "Unable To Verify";
  memberName: string;
  dateOfBirth: string;
  age?: string;
  programType?: string;
  subprogramType?: string;
  currentEnrollmentChoice?: string;
  effectiveDate?: string;
  futureEnrollmentChoice?: string;
  eligibilityStatus:
    | "Active"
    | "Inactive"
    | "Pending Staff Review"
    | "Not Found"
    | "Unable To Verify";
  notes: string;
  requestId?: string;
  success?: boolean;
  /** Server verification adapter mode (manual, clearinghouse, mes_provider_api). */
  verificationMode?: "manual" | "clearinghouse" | "mes_provider_api";
  /** True only when an approved live eligibility API is connected and returns data. */
  liveVerificationAvailable?: boolean;
  /** ISO timestamp when live eligibility check completed (approved providers only). */
  verificationTimestamp?: string;
}

export type PublicVerificationStatus = {
  requestId: string;
  status:
    | "Pending Staff Review"
    | "Coverage Active"
    | "Coverage Inactive"
    | "Unable To Verify";
  planName: string | null;
  effectiveDate: string | null;
  programType: string | null;
  subprogramType: string | null;
  submittedAt: string;
  familyPortalSubmittedAt: string | null;
  verifiedAt: string | null;
  updatedAt: string;
  timeline: Array<{
    key: string;
    label: string;
    state: "complete" | "current" | "upcoming";
    timestamp: string | null;
  }>;
  documentsUploaded: number;
  portalSubmittedForReview: boolean;
};

export type FamilyPortalStatus = PublicVerificationStatus & {
  email: string;
  phone: string;
  zipCode: string;
  documents: Array<{
    id: string;
    category: string;
    safeName: string;
    size: number;
    uploadedAt: string;
  }>;
  canSubmitForReview: boolean;
  hasInsuranceCard: boolean;
  hasMedicaidDocuments: boolean;
  hasReferralDocuments: boolean;
  contactInfoComplete: boolean;
};
