import type { InsuranceStatus } from "@/lib/insurance/portal/status";

export const VERIFICATION_STATUSES = [
  "Pending Staff Review",
  "Active",
  "Inactive",
  "Unable To Verify",
] as const;

export type VerificationStatus = (typeof VERIFICATION_STATUSES)[number];

export type { InsuranceStatus };

export type DocumentCategory = "insurance_card" | "medicaid_document" | "referral";

export type ActivityLogType =
  | "submitted"
  | "reviewed"
  | "status_changed"
  | "notes_added"
  | "contact_updated"
  | "document_uploaded"
  | "document_removed"
  | "portal_submitted_for_review";

export const STAFF_REVIEW_INTERNAL_STATUSES = [
  "awaiting_family_submission",
  "new_submission",
  "in_review",
  "missing_information",
  "verified",
  "unable_to_verify",
] as const;

export type StaffReviewInternalStatus = (typeof STAFF_REVIEW_INTERNAL_STATUSES)[number];

export interface StaffReview {
  assignedTo: string | null;
  reviewedAt: string | null;
  reviewNotes: string;
  internalStatus: StaffReviewInternalStatus;
}

export interface ActivityLogEntry {
  id: string;
  type: ActivityLogType;
  timestamp: string;
  description: string;
  staffName?: string;
  previousStatus?: string;
  newStatus?: string;
}

export interface InsuranceDocumentUpload {
  id: string;
  category: DocumentCategory;
  safeName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  storageName: string;
}

export interface InsuranceVerificationRecord {
  id: string;
  clientName: string;
  /** Canonical storage format YYYY-MM-DD */
  dateOfBirth: string;
  medicaidIdEncrypted: string | null;
  ssnEncrypted: string | null;
  status: VerificationStatus;
  /** Family-facing insurance status shown on the client portal. */
  insuranceStatus?: InsuranceStatus;
  planName: string | null;
  /** Storage format YYYY-MM-DD when set */
  effectiveDate: string | null;
  programType: string | null;
  subprogramType: string | null;
  notes: string | null;
  submittedAt: string;
  /** Set when the family completes the portal “Submit for Staff Review” step. */
  familyPortalSubmittedAt?: string | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  updatedAt: string;
  staffReview?: StaffReview;
  /** Non-PHI metadata for staff context */
  email: string;
  phone: string;
  zipCode: string;
  insuranceProvider: string;
  verificationType: "child" | "adult";
  parentFirstName: string | null;
  parentLastName: string | null;
  consentTimestamp: string;
  activityLog?: ActivityLogEntry[];
  documents?: InsuranceDocumentUpload[];
  /** Set when status becomes Active — intake scheduling available */
  intakeReadyAt?: string | null;
  familyEmailsSent?: {
    coverageActive?: string;
    unableToVerify?: string;
  };
}

export interface FamilyContactUpdate {
  email?: string;
  phone?: string;
  zipCode?: string;
}

export interface InsuranceVerificationListItem {
  id: string;
  clientName: string;
  /** Display format MM/DD/YYYY */
  dateOfBirth: string;
  status: VerificationStatus;
  planName: string | null;
  effectiveDate: string | null;
  submittedAt: string;
  familyPortalSubmittedAt: string | null;
  verifiedAt: string | null;
  insuranceProvider: string;
  verificationType: "child" | "adult";
  email: string;
  phone: string;
  zipCode: string;
  documentsUploaded: number;
  staffReviewInternalStatus: StaffReviewInternalStatus;
}

export interface StaffVerificationUpdate {
  status?: VerificationStatus;
  insuranceStatus?: InsuranceStatus;
  planName?: string | null;
  effectiveDate?: string | null;
  programType?: string | null;
  subprogramType?: string | null;
  notes?: string | null;
  verifiedBy?: string;
  internalStatus?: StaffReviewInternalStatus;
  assignedTo?: string | null;
  reviewNotes?: string;
}
