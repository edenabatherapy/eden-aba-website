import { formatDOBForDisplay } from "@/lib/insurance/dates";
import { decryptPhiField } from "@/lib/insurance/encryptField";
import { maskMedicaidId, maskSsnForDisplay } from "@/lib/insurance/maskPhi";
import type {
  InsuranceDocumentUpload,
  InsuranceVerificationRecord,
  StaffReview,
  StaffReviewInternalStatus,
} from "@/lib/insurance/db/model";
import {
  getInsuranceStatusLabel,
  resolveInsuranceStatus,
  type InsuranceStatus,
} from "@/lib/insurance/portal/status";

export type AdminDocumentSummary = {
  id: string;
  category: string;
  safeName: string;
  size: number;
  uploadedAt: string;
  mimeType: string;
};

export type AdminRecordResponse = {
  id: string;
  clientName: string;
  dateOfBirth: string;
  status: InsuranceVerificationRecord["status"];
  insuranceStatus: InsuranceStatus;
  insuranceStatusLabel: string;
  planName: string | null;
  effectiveDate: string | null;
  programType: string | null;
  subprogramType: string | null;
  notes: string | null;
  submittedAt: string;
  familyPortalSubmittedAt: string | null;
  verifiedAt: string | null;
  verifiedBy: string | null;
  updatedAt: string;
  email: string;
  phone: string;
  zipCode: string;
  insuranceProvider: string;
  verificationType: InsuranceVerificationRecord["verificationType"];
  parentFirstName: string | null;
  parentLastName: string | null;
  medicaidIdMasked: string | null;
  ssnMasked: string | null;
  hasMedicaidId: boolean;
  hasSsn: boolean;
  documents: AdminDocumentSummary[];
  staffReview: StaffReview;
  documentsUploaded: number;
};

function defaultStaffReview(): StaffReview {
  return {
    assignedTo: null,
    reviewedAt: null,
    reviewNotes: "",
    internalStatus: "awaiting_family_submission",
  };
}

function serializeDocuments(docs: InsuranceDocumentUpload[] = []): AdminDocumentSummary[] {
  return docs.map((doc) => ({
    id: doc.id,
    category: doc.category,
    safeName: doc.safeName,
    size: doc.size,
    uploadedAt: doc.uploadedAt,
    mimeType: doc.mimeType,
  }));
}

/** Admin API/detail serializer — never includes full SSN or Medicaid ID. */
export function serializeAdminRecord(
  record: InsuranceVerificationRecord,
): AdminRecordResponse {
  const medicaidPlain = decryptPhiField(record.medicaidIdEncrypted || "") || null;
  const ssnPlain = decryptPhiField(record.ssnEncrypted || "") || null;

  const insuranceStatus = resolveInsuranceStatus(record);

  return {
    id: record.id,
    clientName: record.clientName,
    dateOfBirth: formatDOBForDisplay(record.dateOfBirth),
    status: record.status,
    insuranceStatus,
    insuranceStatusLabel: getInsuranceStatusLabel(insuranceStatus),
    planName: record.planName,
    effectiveDate: record.effectiveDate
      ? formatDOBForDisplay(record.effectiveDate)
      : null,
    programType: record.programType,
    subprogramType: record.subprogramType,
    notes: record.notes,
    submittedAt: record.submittedAt,
    familyPortalSubmittedAt: record.familyPortalSubmittedAt ?? null,
    verifiedAt: record.verifiedAt,
    verifiedBy: record.verifiedBy,
    updatedAt: record.updatedAt || record.verifiedAt || record.submittedAt,
    email: record.email,
    phone: record.phone,
    zipCode: record.zipCode,
    insuranceProvider: record.insuranceProvider,
    verificationType: record.verificationType,
    parentFirstName: record.parentFirstName,
    parentLastName: record.parentLastName,
    medicaidIdMasked: medicaidPlain ? maskMedicaidId(medicaidPlain) || null : null,
    ssnMasked: ssnPlain ? maskSsnForDisplay(ssnPlain) || null : null,
    hasMedicaidId: Boolean(medicaidPlain),
    hasSsn: Boolean(ssnPlain),
    documents: serializeDocuments(record.documents),
    staffReview: record.staffReview || defaultStaffReview(),
    documentsUploaded: record.documents?.length || 0,
  };
}

export type RevealedPhiResponse = {
  medicaidId: string | null;
  ssn: string | null;
};

/** Staff-only reveal response — use only after PHI_REVEALED audit entry. */
export function serializeRevealedPhi(
  record: InsuranceVerificationRecord,
): RevealedPhiResponse {
  return {
    medicaidId: decryptPhiField(record.medicaidIdEncrypted || "") || null,
    ssn: decryptPhiField(record.ssnEncrypted || "") || null,
  };
}

export function internalStatusLabel(status: StaffReviewInternalStatus): string {
  switch (status) {
    case "awaiting_family_submission":
      return "Awaiting Family Submission";
    case "new_submission":
      return "New Submission";
    case "in_review":
      return "In Review";
    case "missing_information":
      return "Missing Information";
    case "verified":
      return "Verified";
    case "unable_to_verify":
      return "Unable to Verify";
    default:
      return status;
  }
}
