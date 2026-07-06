import { mkdir, readFile, readdir, writeFile } from "fs/promises";
import path from "path";
import { cwd } from "node:process";
import { randomUUID } from "crypto";
import { formatDOBForDisplay, normalizeDOB } from "@/lib/insurance/dates";
import { encryptPhiField } from "@/lib/insurance/encryptField";
import { appendActivity, createActivityEntry } from "@/lib/insurance/db/activity";
import { mapVerificationStatusToInsuranceStatus } from "@/lib/insurance/portal/status";
import type {
  DocumentCategory,
  FamilyContactUpdate,
  InsuranceDocumentUpload,
  InsuranceVerificationListItem,
  InsuranceVerificationRecord,
  StaffReview,
  StaffVerificationUpdate,
  VerificationStatus,
} from "@/lib/insurance/db/model";
import type { InsuranceVerificationRequest } from "@/types/insurance";

function getQueuePath() {
  const storagePath = process.env.INSURANCE_STORAGE_PATH || "./storage/insurance";
  return path.resolve(cwd(), storagePath, "queue");
}

function recordPath(id: string) {
  return path.join(getQueuePath(), `${id}.json`);
}

async function ensureQueueDir() {
  await mkdir(getQueuePath(), { recursive: true });
}

export async function createVerificationRecord(params: {
  request: InsuranceVerificationRequest;
  consentTimestamp: string;
  normalizedDob: string;
  id?: string;
}): Promise<{ stored: boolean; record: InsuranceVerificationRecord | null }> {
  const encryptionKey =
    process.env.INSURANCE_ENCRYPTION_KEY?.trim() ||
    process.env.INTAKE_ENCRYPTION_KEY?.trim();

  if (!encryptionKey) {
    return { stored: false, record: null };
  }

  await ensureQueueDir();

  const id = params.id || randomUUID();
  const submittedAt = new Date().toISOString();

  const record: InsuranceVerificationRecord = {
    id,
    clientName: params.request.fullName.trim(),
    dateOfBirth: params.normalizedDob,
    medicaidIdEncrypted: encryptPhiField(params.request.medicaidId || ""),
    ssnEncrypted: encryptPhiField(params.request.ssn || ""),
    status: "Pending Staff Review",
    insuranceStatus: "pending",
    planName: null,
    effectiveDate: null,
    programType: null,
    subprogramType: null,
    notes: null,
    submittedAt,
    verifiedAt: null,
    verifiedBy: null,
    updatedAt: submittedAt,
    email: params.request.email.trim(),
    phone: params.request.phone.trim(),
    zipCode: params.request.zipCode.trim(),
    insuranceProvider: params.request.insuranceProvider.trim(),
    verificationType: params.request.verificationType,
    parentFirstName: params.request.parentFirstName?.trim() || null,
    parentLastName: params.request.parentLastName?.trim() || null,
    consentTimestamp: params.consentTimestamp,
    activityLog: [
      createActivityEntry({
        type: "submitted",
        description: "Verification request submitted by family.",
      }),
    ],
    documents: [],
    intakeReadyAt: null,
    familyEmailsSent: {},
    familyPortalSubmittedAt: null,
    staffReview: defaultStaffReview(),
  };

  await writeFile(recordPath(id), JSON.stringify(record, null, 2), "utf8");

  return { stored: true, record };
}

async function readRecord(id: string): Promise<InsuranceVerificationRecord | null> {
  try {
    const raw = await readFile(recordPath(id), "utf8");
    return normalizeRecord(JSON.parse(raw) as InsuranceVerificationRecord);
  } catch {
    return null;
  }
}

function defaultStaffReview(): StaffReview {
  return {
    assignedTo: null,
    reviewedAt: null,
    reviewNotes: "",
    internalStatus: "awaiting_family_submission",
  };
}

function normalizeRecord(record: InsuranceVerificationRecord): InsuranceVerificationRecord {
  return {
    ...record,
    activityLog: record.activityLog || [],
    documents: record.documents || [],
    familyEmailsSent: record.familyEmailsSent || {},
    familyPortalSubmittedAt: record.familyPortalSubmittedAt ?? null,
    staffReview: record.staffReview || defaultStaffReview(),
  };
}

function hasInsuranceCard(record: InsuranceVerificationRecord): boolean {
  return (record.documents || []).some((doc) => doc.category === "insurance_card");
}

export function canSubmitPortalForReview(record: InsuranceVerificationRecord): boolean {
  const normalized = normalizeRecord(record);
  if (normalized.familyPortalSubmittedAt) return false;
  return Boolean(
    normalized.email?.trim() &&
      normalized.phone?.trim() &&
      normalized.zipCode?.trim() &&
      hasInsuranceCard(normalized),
  );
}

function toListItem(record: InsuranceVerificationRecord): InsuranceVerificationListItem {
  const normalized = normalizeRecord(record);
  return {
    id: normalized.id,
    clientName: normalized.clientName,
    dateOfBirth: formatDOBForDisplay(normalized.dateOfBirth),
    status: normalized.status,
    planName: normalized.planName,
    effectiveDate: normalized.effectiveDate
      ? formatDOBForDisplay(normalized.effectiveDate)
      : null,
    submittedAt: normalized.submittedAt,
    familyPortalSubmittedAt: normalized.familyPortalSubmittedAt ?? null,
    verifiedAt: normalized.verifiedAt,
    insuranceProvider: normalized.insuranceProvider,
    verificationType: normalized.verificationType,
    email: normalized.email,
    phone: normalized.phone,
    zipCode: normalized.zipCode,
    documentsUploaded: normalized.documents?.length || 0,
    staffReviewInternalStatus: normalized.staffReview?.internalStatus || "awaiting_family_submission",
  };
}

export async function listVerificationRecords(): Promise<InsuranceVerificationListItem[]> {
  await ensureQueueDir();

  let files: string[];
  try {
    files = await readdir(getQueuePath());
  } catch {
    return [];
  }

  const records: InsuranceVerificationRecord[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const id = file.replace(/\.json$/, "");
    const record = await readRecord(id);
    if (record) records.push(record);
  }

  records.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );

  return records.map(toListItem);
}

/** Full records for metrics and internal aggregation — not for public API. */
export async function listVerificationRecordsRaw(): Promise<InsuranceVerificationRecord[]> {
  await ensureQueueDir();

  let files: string[];
  try {
    files = await readdir(getQueuePath());
  } catch {
    return [];
  }

  const records: InsuranceVerificationRecord[] = [];

  for (const file of files) {
    if (!file.endsWith(".json")) continue;
    const id = file.replace(/\.json$/, "");
    const record = await readRecord(id);
    if (record) records.push(record);
  }

  records.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );

  return records;
}

export async function getVerificationRecord(
  id: string,
): Promise<InsuranceVerificationRecord | null> {
  return readRecord(id);
}

export async function updateVerificationRecord(
  id: string,
  update: StaffVerificationUpdate,
): Promise<InsuranceVerificationRecord | null> {
  const record = await readRecord(id);
  if (!record) return null;

  const next: InsuranceVerificationRecord = {
    ...record,
    activityLog: record.activityLog || [],
    documents: record.documents || [],
    familyEmailsSent: record.familyEmailsSent || {},
  };

  if (update.status !== undefined && update.status !== record.status) {
    next.status = update.status;
    if (update.insuranceStatus === undefined) {
      next.insuranceStatus = mapVerificationStatusToInsuranceStatus(update.status);
    }
    next.activityLog = appendActivity(
      next.activityLog,
      createActivityEntry({
        type: "status_changed",
        description: `Status changed from ${record.status} to ${update.status}.`,
        staffName: update.verifiedBy?.trim(),
        previousStatus: record.status,
        newStatus: update.status,
      }),
    );

    if (update.status !== "Pending Staff Review") {
      next.verifiedAt = new Date().toISOString();
      next.activityLog = appendActivity(
        next.activityLog,
        createActivityEntry({
          type: "reviewed",
          description: "Staff completed verification review.",
          staffName: update.verifiedBy?.trim(),
        }),
      );
      if (update.verifiedBy?.trim()) {
        next.verifiedBy = update.verifiedBy.trim();
      }
      if (update.status === "Active") {
        next.intakeReadyAt = next.verifiedAt;
      }
    }
  }

  if (update.insuranceStatus !== undefined) {
    next.insuranceStatus = update.insuranceStatus;
  }

  if (update.planName !== undefined) {
    next.planName = update.planName?.trim() || null;
  }

  if (update.effectiveDate !== undefined) {
    if (!update.effectiveDate?.trim()) {
      next.effectiveDate = null;
    } else {
      const normalized = normalizeDOB(update.effectiveDate);
      next.effectiveDate = normalized || update.effectiveDate.trim();
    }
  }

  if (update.programType !== undefined) {
    next.programType = update.programType?.trim() || null;
  }

  if (update.subprogramType !== undefined) {
    next.subprogramType = update.subprogramType?.trim() || null;
  }

  if (update.notes !== undefined) {
    const trimmed = update.notes?.trim() || null;
    if (trimmed !== record.notes) {
      next.notes = trimmed;
      next.activityLog = appendActivity(
        next.activityLog,
        createActivityEntry({
          type: "notes_added",
          description: trimmed ? "Staff notes updated." : "Staff notes cleared.",
          staffName: update.verifiedBy?.trim(),
        }),
      );
    }
  }

  if (update.verifiedBy?.trim() && !next.verifiedBy) {
    next.verifiedBy = update.verifiedBy.trim();
  }

  if (
    update.internalStatus !== undefined ||
    update.assignedTo !== undefined ||
    update.reviewNotes !== undefined
  ) {
    const staffReview = next.staffReview || defaultStaffReview();
    if (update.internalStatus !== undefined) {
      staffReview.internalStatus = update.internalStatus;
      if (update.internalStatus === "in_review" && !staffReview.reviewedAt) {
        staffReview.reviewedAt = new Date().toISOString();
      }
      if (update.internalStatus === "verified" && update.status === undefined) {
        next.status = "Active";
        next.insuranceStatus = "active";
        next.verifiedAt = new Date().toISOString();
        next.intakeReadyAt = next.verifiedAt;
      }
      if (update.internalStatus === "unable_to_verify" && update.status === undefined) {
        next.status = "Unable To Verify";
        next.insuranceStatus = "unknown";
      }
      if (update.internalStatus === "missing_information" && update.status === undefined) {
        next.status = "Pending Staff Review";
      }
    }
    if (update.assignedTo !== undefined) {
      staffReview.assignedTo = update.assignedTo;
    }
    if (update.reviewNotes !== undefined) {
      staffReview.reviewNotes = update.reviewNotes.trim();
    }
    next.staffReview = staffReview;
  }

  next.updatedAt = new Date().toISOString();

  await writeFile(recordPath(id), JSON.stringify(next, null, 2), "utf8");
  return next;
}

export async function updateFamilyContact(
  id: string,
  update: FamilyContactUpdate,
): Promise<InsuranceVerificationRecord | null> {
  const record = await readRecord(id);
  if (!record) return null;

  const next: InsuranceVerificationRecord = {
    ...record,
    activityLog: record.activityLog || [],
    documents: record.documents || [],
  };

  const changes: string[] = [];
  if (update.email?.trim() && update.email.trim() !== record.email) {
    next.email = update.email.trim();
    changes.push("email");
  }
  if (update.phone?.trim() && update.phone.trim() !== record.phone) {
    next.phone = update.phone.trim();
    changes.push("phone");
  }
  if (update.zipCode?.trim() && update.zipCode.trim() !== record.zipCode) {
    next.zipCode = update.zipCode.trim();
    changes.push("zip code");
  }

  if (changes.length === 0) return record;

  next.updatedAt = new Date().toISOString();
  next.activityLog = appendActivity(
    next.activityLog,
    createActivityEntry({
      type: "contact_updated",
      description: `Family updated contact information (${changes.join(", ")}).`,
    }),
  );

  await writeFile(recordPath(id), JSON.stringify(next, null, 2), "utf8");
  return next;
}

export async function appendDocumentToRecord(
  id: string,
  document: InsuranceDocumentUpload,
  options?: { replaceCategory?: boolean },
): Promise<InsuranceVerificationRecord | null> {
  const record = await readRecord(id);
  if (!record) return null;

  const categoryLabel =
    document.category === "insurance_card"
      ? "insurance card"
      : document.category === "medicaid_document"
        ? "Medicaid document"
        : "referral document";

  let documents = [...(record.documents || [])];
  if (options?.replaceCategory) {
    documents = documents.filter((doc) => doc.category !== document.category);
  }

  const next: InsuranceVerificationRecord = {
    ...record,
    documents: [...documents, document],
    activityLog: appendActivity(record.activityLog, {
      ...createActivityEntry({
        type: "document_uploaded",
        description: `Family uploaded ${categoryLabel}.`,
      }),
      id: document.id,
    }),
    updatedAt: new Date().toISOString(),
  };

  await writeFile(recordPath(id), JSON.stringify(next, null, 2), "utf8");
  return next;
}

export async function removeDocumentFromRecord(
  id: string,
  documentId: string,
): Promise<InsuranceVerificationRecord | null> {
  const record = await readRecord(id);
  if (!record) return null;

  const target = (record.documents || []).find((doc) => doc.id === documentId);
  if (!target) return record;

  const next: InsuranceVerificationRecord = {
    ...record,
    documents: (record.documents || []).filter((doc) => doc.id !== documentId),
    activityLog: appendActivity(
      record.activityLog,
      createActivityEntry({
        type: "document_removed",
        description: `Family removed ${target.safeName}.`,
      }),
    ),
    updatedAt: new Date().toISOString(),
  };

  await writeFile(recordPath(id), JSON.stringify(next, null, 2), "utf8");
  return next;
}

export async function submitFamilyPortalForReview(
  id: string,
  contact: FamilyContactUpdate,
): Promise<{ ok: true; record: InsuranceVerificationRecord } | { ok: false; error: string }> {
  const record = await readRecord(id);
  if (!record) return { ok: false, error: "Request not found." };
  if (record.familyPortalSubmittedAt) {
    return { ok: false, error: "This request has already been submitted for staff review." };
  }

  const next: InsuranceVerificationRecord = {
    ...record,
    email: contact.email?.trim() || record.email,
    phone: contact.phone?.trim() || record.phone,
    zipCode: contact.zipCode?.trim() || record.zipCode,
  };

  if (!canSubmitPortalForReview(next)) {
    return {
      ok: false,
      error: "Please complete contact information and upload your insurance card before submitting.",
    };
  }

  const submittedAt = new Date().toISOString();
  const submitted: InsuranceVerificationRecord = {
    ...next,
    status: "Pending Staff Review",
    insuranceStatus: "pending",
    familyPortalSubmittedAt: submittedAt,
    updatedAt: submittedAt,
    staffReview: {
      assignedTo: null,
      reviewedAt: null,
      reviewNotes: "",
      internalStatus: "new_submission",
    },
    activityLog: appendActivity(
      next.activityLog,
      createActivityEntry({
        type: "portal_submitted_for_review",
        description: "Family submitted insurance verification for staff review.",
      }),
    ),
  };

  await writeFile(recordPath(id), JSON.stringify(submitted, null, 2), "utf8");
  return { ok: true, record: submitted };
}

export async function markFamilyEmailSent(
  id: string,
  kind: "coverageActive" | "unableToVerify",
): Promise<void> {
  const record = await readRecord(id);
  if (!record) return;

  const next: InsuranceVerificationRecord = {
    ...record,
    familyEmailsSent: {
      ...(record.familyEmailsSent || {}),
      [kind]: new Date().toISOString(),
    },
  };

  await writeFile(recordPath(id), JSON.stringify(next, null, 2), "utf8");
}

export function isTerminalStatus(status: VerificationStatus): boolean {
  return status === "Active" || status === "Inactive" || status === "Unable To Verify";
}
