export const INSURANCE_DOCUMENT_BUCKET = "insurance-documents";

export const INSURANCE_DOCUMENT_MAX_BYTES = 10 * 1024 * 1024;

export const INSURANCE_DOCUMENT_ACCEPT =
  "image/jpeg,image/png,application/pdf,.jpg,.jpeg,.png,.pdf";

export const INSURANCE_DOCUMENT_FIELD_KEYS = [
  "insurance_front",
  "insurance_back",
  "parent_id",
  "diagnosis_report",
  "referral",
  "iep_document",
] as const;

export type InsuranceDocumentFieldKey = (typeof INSURANCE_DOCUMENT_FIELD_KEYS)[number];

export type InsuranceDocumentColumnKey =
  | "insurance_front_url"
  | "insurance_back_url"
  | "parent_id_url"
  | "diagnosis_report_url"
  | "referral_url"
  | "iep_document_url";

export type InsuranceDocumentFieldConfig = {
  key: InsuranceDocumentFieldKey;
  column: InsuranceDocumentColumnKey;
  label: string;
  required: boolean;
};

export const INSURANCE_DOCUMENT_FIELDS: InsuranceDocumentFieldConfig[] = [
  {
    key: "insurance_front",
    column: "insurance_front_url",
    label: "Insurance Card Front",
    required: true,
  },
  {
    key: "insurance_back",
    column: "insurance_back_url",
    label: "Insurance Card Back",
    required: true,
  },
  {
    key: "parent_id",
    column: "parent_id_url",
    label: "Parent/Guardian Photo ID",
    required: false,
  },
  {
    key: "diagnosis_report",
    column: "diagnosis_report_url",
    label: "Autism Diagnosis Report",
    required: false,
  },
  {
    key: "referral",
    column: "referral_url",
    label: "Physician Referral",
    required: false,
  },
  {
    key: "iep_document",
    column: "iep_document_url",
    label: "IEP or School Documents",
    required: false,
  },
];

export const INSURANCE_DOCUMENT_COLUMN_BY_FIELD: Record<
  InsuranceDocumentFieldKey,
  InsuranceDocumentColumnKey
> = Object.fromEntries(
  INSURANCE_DOCUMENT_FIELDS.map((field) => [field.key, field.column]),
) as Record<InsuranceDocumentFieldKey, InsuranceDocumentColumnKey>;

export function isInsuranceDocumentFieldKey(value: string): value is InsuranceDocumentFieldKey {
  return (INSURANCE_DOCUMENT_FIELD_KEYS as readonly string[]).includes(value);
}

export function validateInsuranceDocumentClient(file: File): string | null {
  if (!file || file.size <= 0) {
    return "Please choose a file.";
  }
  if (file.size > INSURANCE_DOCUMENT_MAX_BYTES) {
    return "File must be 10 MB or smaller.";
  }
  const name = file.name.toLowerCase();
  const allowedExt = [".jpg", ".jpeg", ".png", ".pdf"];
  if (!allowedExt.some((ext) => name.endsWith(ext))) {
    return "Only JPG, PNG, and PDF files are allowed.";
  }
  const mime = (file.type || "").toLowerCase();
  if (
    mime &&
    mime !== "application/pdf" &&
    mime !== "image/jpeg" &&
    mime !== "image/png" &&
    mime !== "application/octet-stream"
  ) {
    return "Only JPG, PNG, and PDF files are allowed.";
  }
  return null;
}

export function isImageInsuranceDocument(file: File): boolean {
  const mime = (file.type || "").toLowerCase();
  if (mime === "image/jpeg" || mime === "image/png") return true;
  const name = file.name.toLowerCase();
  return name.endsWith(".jpg") || name.endsWith(".jpeg") || name.endsWith(".png");
}
