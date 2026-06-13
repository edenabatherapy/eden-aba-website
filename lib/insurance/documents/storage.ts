import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { cwd } from "node:process";
import { randomUUID } from "crypto";
import { encryptBuffer } from "@/lib/intake/server/crypto";
import { sanitizeFilename } from "@/lib/intake/server/validate-files";
import type { DocumentCategory, InsuranceDocumentUpload } from "@/lib/insurance/db/model";

const MAX_FILE_BYTES = 10 * 1024 * 1024;
const ALLOWED_EXTENSIONS = new Set([".pdf", ".jpg", ".jpeg", ".png"]);
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/octet-stream",
]);

function getStorageRoot() {
  const storagePath = process.env.INSURANCE_STORAGE_PATH || "./storage/insurance";
  return path.resolve(cwd(), storagePath);
}

function getEncryptionKey(): string {
  const key =
    process.env.INSURANCE_ENCRYPTION_KEY?.trim() ||
    process.env.INTAKE_ENCRYPTION_KEY?.trim();
  if (!key) {
    throw new Error("Encryption key not configured.");
  }
  return key;
}

function filesDir(requestId: string) {
  return path.join(getStorageRoot(), requestId, "files");
}

export function validateInsuranceDocument(file: File): {
  safeName: string;
  mimeType: string;
  size: number;
} {
  if (!(file instanceof File) || file.size <= 0) {
    throw new Error("Invalid file upload.");
  }
  if (file.size > MAX_FILE_BYTES) {
    throw new Error("File exceeds 10MB limit.");
  }

  const safeName = sanitizeFilename(file.name);
  const ext = path.extname(safeName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error("Only JPG, PNG, and PDF files are allowed.");
  }

  const mimeType = (file.type || "").toLowerCase();
  if (mimeType && !ALLOWED_MIME.has(mimeType)) {
    throw new Error("File type is not allowed.");
  }

  return { safeName, mimeType: mimeType || "application/octet-stream", size: file.size };
}

export async function storeInsuranceDocument(params: {
  requestId: string;
  category: DocumentCategory;
  file: File;
}): Promise<InsuranceDocumentUpload> {
  const { safeName, mimeType, size } = validateInsuranceDocument(params.file);
  const buffer = Buffer.from(await params.file.arrayBuffer());
  const encryptionKey = getEncryptionKey();
  const id = randomUUID();
  const storageName = `${params.category}__${id}__${safeName}.enc`;

  await mkdir(filesDir(params.requestId), { recursive: true });
  const encrypted = encryptBuffer(buffer, encryptionKey);
  await writeFile(path.join(filesDir(params.requestId), storageName), encrypted);

  return {
    id,
    category: params.category,
    safeName,
    mimeType,
    size,
    uploadedAt: new Date().toISOString(),
    storageName,
  };
}

export async function readInsuranceDocument(
  requestId: string,
  storageName: string,
): Promise<Buffer> {
  const { decryptBuffer } = await import("@/lib/intake/server/crypto");
  const payload = await readFile(path.join(filesDir(requestId), storageName));
  return decryptBuffer(payload, getEncryptionKey());
}

export async function deleteInsuranceDocument(
  requestId: string,
  storageName: string,
): Promise<void> {
  const { unlink } = await import("fs/promises");
  try {
    await unlink(path.join(filesDir(requestId), storageName));
  } catch {
    // File may already be removed.
  }
}
