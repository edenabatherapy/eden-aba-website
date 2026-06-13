import { formatDOBForDisplay } from "@/lib/insurance/dates";
import type { InsuranceVerificationRecord, VerificationStatus } from "@/lib/insurance/db/model";
import {
  buildFamilyStatusTimeline,
  type FamilyTimelineStep,
} from "@/lib/insurance/statusTimeline";

export type PublicVerificationStatusLabel =
  | "Pending Staff Review"
  | "Coverage Active"
  | "Coverage Inactive"
  | "Unable To Verify";

export type PublicVerificationStatus = {
  requestId: string;
  status: PublicVerificationStatusLabel;
  planName: string | null;
  effectiveDate: string | null;
  programType: string | null;
  subprogramType: string | null;
  submittedAt: string;
  familyPortalSubmittedAt: string | null;
  verifiedAt: string | null;
  updatedAt: string;
  timeline: FamilyTimelineStep[];
  documentsUploaded: number;
  portalSubmittedForReview: boolean;
};

export type FamilyPortalDocument = {
  id: string;
  category: string;
  safeName: string;
  size: number;
  uploadedAt: string;
};

export type FamilyPortalStatus = PublicVerificationStatus & {
  email: string;
  phone: string;
  zipCode: string;
  documents: FamilyPortalDocument[];
  canSubmitForReview: boolean;
  hasInsuranceCard: boolean;
  hasMedicaidDocuments: boolean;
  hasReferralDocuments: boolean;
  contactInfoComplete: boolean;
};

export function staffStatusToPublicLabel(
  status: VerificationStatus,
): PublicVerificationStatusLabel {
  switch (status) {
    case "Active":
      return "Coverage Active";
    case "Inactive":
      return "Coverage Inactive";
    case "Unable To Verify":
      return "Unable To Verify";
    default:
      return "Pending Staff Review";
  }
}

function hasCategory(
  record: InsuranceVerificationRecord,
  category: string,
): boolean {
  return (record.documents || []).some((doc) => doc.category === category);
}

/** Public-safe status payload — no PHI, no staff fields, no internal notes. */
export function toPublicVerificationStatus(
  record: InsuranceVerificationRecord,
): PublicVerificationStatus {
  const updatedAt = record.updatedAt || record.verifiedAt || record.submittedAt;
  const familyPortalSubmittedAt = record.familyPortalSubmittedAt ?? null;

  return {
    requestId: record.id,
    status: staffStatusToPublicLabel(record.status),
    planName: record.planName,
    effectiveDate: record.effectiveDate
      ? formatDOBForDisplay(record.effectiveDate)
      : null,
    programType: record.programType,
    subprogramType: record.subprogramType,
    submittedAt: record.submittedAt,
    familyPortalSubmittedAt,
    verifiedAt: record.verifiedAt,
    updatedAt,
    timeline: buildFamilyStatusTimeline(record),
    documentsUploaded: record.documents?.length || 0,
    portalSubmittedForReview: Boolean(familyPortalSubmittedAt),
  };
}

/** Family portal view — contact info + document manifest, no PHI identifiers. */
export function toFamilyPortalStatus(
  record: InsuranceVerificationRecord,
): FamilyPortalStatus {
  const base = toPublicVerificationStatus(record);
  const contactInfoComplete = Boolean(
    record.email?.trim() && record.phone?.trim() && record.zipCode?.trim(),
  );
  const hasInsuranceCard = hasCategory(record, "insurance_card");

  return {
    ...base,
    email: record.email,
    phone: record.phone,
    zipCode: record.zipCode,
    documents: (record.documents || []).map((doc) => ({
      id: doc.id,
      category: doc.category,
      safeName: doc.safeName,
      size: doc.size,
      uploadedAt: doc.uploadedAt,
    })),
    canSubmitForReview:
      !base.portalSubmittedForReview && contactInfoComplete && hasInsuranceCard,
    hasInsuranceCard,
    hasMedicaidDocuments: hasCategory(record, "medicaid_document"),
    hasReferralDocuments: hasCategory(record, "referral"),
    contactInfoComplete,
  };
}
