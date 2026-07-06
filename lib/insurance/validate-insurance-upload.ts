import path from "path";
import {
  INSURANCE_DOCUMENT_MAX_BYTES,
  type InsuranceDocumentFieldKey,
} from "@/lib/insurance/insurance-document-fields";

const ALLOWED_EXTENSIONS = new Set([".pdf", ".jpg", ".jpeg", ".png"]);
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/octet-stream",
]);

const UNSAFE_NAME = /(\.\.|[\x00-\x1f<>:"|?*\\])/;

export type ValidatedInsuranceUpload = {
  fieldKey: InsuranceDocumentFieldKey;
  safeName: string;
  contentType: string;
  size: number;
  buffer: Buffer;
};

function sanitizeInsuranceFilename(originalName: string): string {
  const base = path.basename(String(originalName || "upload").trim());
  if (!base || UNSAFE_NAME.test(base)) {
    throw new Error("Invalid file name.");
  }
  const ext = path.extname(base).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error("Only JPG, PNG, and PDF files are allowed.");
  }
  const stem = path.basename(base, ext).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  return `${stem || "document"}${ext}`.slice(0, 180);
}

export function validateInsuranceUploadMetadata(params: {
  fieldKey: InsuranceDocumentFieldKey;
  fileName: string;
  mimeType: string;
  size: number;
}): void {
  if (params.size <= 0) {
    throw new Error("Invalid file upload.");
  }
  if (params.size > INSURANCE_DOCUMENT_MAX_BYTES) {
    throw new Error("File exceeds 10 MB limit.");
  }

  sanitizeInsuranceFilename(params.fileName);

  const mimeType = (params.mimeType || "").toLowerCase();
  if (mimeType && !ALLOWED_MIME.has(mimeType)) {
    throw new Error("File type is not allowed.");
  }
}

export function validateInsuranceUploadFile(params: {
  fieldKey: InsuranceDocumentFieldKey;
  fileName: string;
  mimeType: string;
  size: number;
  buffer: Buffer;
}): ValidatedInsuranceUpload {
  if (!params.buffer.length) {
    throw new Error("Invalid file upload.");
  }
  if (params.size > INSURANCE_DOCUMENT_MAX_BYTES) {
    throw new Error("File exceeds 10 MB limit.");
  }

  const safeName = sanitizeInsuranceFilename(params.fileName);
  const mimeType = (params.mimeType || "").toLowerCase();
  if (mimeType && !ALLOWED_MIME.has(mimeType)) {
    throw new Error("File type is not allowed.");
  }

  const contentType =
    mimeType === "application/octet-stream" || !mimeType
      ? safeName.endsWith(".pdf")
        ? "application/pdf"
        : safeName.endsWith(".png")
          ? "image/png"
          : "image/jpeg"
      : mimeType;

  return {
    fieldKey: params.fieldKey,
    safeName,
    contentType,
    size: params.size,
    buffer: params.buffer,
  };
}
