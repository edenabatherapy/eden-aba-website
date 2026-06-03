import path from "path";

const ALLOWED_EXTENSIONS = new Set([".pdf", ".jpg", ".jpeg", ".png", ".doc", ".docx"]);
const ALLOWED_MIME = new Set([
  "application/pdf",
  "image/jpeg",
  "image/png",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
]);

const UNSAFE_NAME = /(\.\.|[\x00-\x1f<>:"|?*\\])/;
const MAX_FILENAME_LENGTH = 180;

export type ValidatedUpload = {
  fieldName: string;
  safeName: string;
  mimeType: string;
  size: number;
  buffer: Buffer;
};

export function sanitizeFilename(originalName: string): string {
  const base = path.basename(String(originalName || "upload").trim());
  if (!base || UNSAFE_NAME.test(base)) {
    throw new Error("Invalid file name.");
  }
  const ext = path.extname(base).toLowerCase();
  const stem = path.basename(base, ext).replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 80);
  const safe = `${stem || "document"}${ext}`.slice(0, MAX_FILENAME_LENGTH);
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`File type not allowed: ${ext || "unknown"}`);
  }
  return safe;
}

export function validateUploadedFile(
  fieldName: string,
  file: File,
  maxBytes: number
): { safeName: string; mimeType: string; size: number; buffer: Buffer } {
  if (!(file instanceof File)) {
    throw new Error("Invalid upload payload.");
  }
  if (file.size <= 0) {
    throw new Error("Empty file uploads are not allowed.");
  }
  if (file.size > maxBytes) {
    throw new Error(`File exceeds maximum size of ${Math.round(maxBytes / (1024 * 1024))}MB.`);
  }

  const safeName = sanitizeFilename(file.name);
  const ext = path.extname(safeName).toLowerCase();
  if (!ALLOWED_EXTENSIONS.has(ext)) {
    throw new Error(`File type not allowed: ${ext}`);
  }

  const mimeType = (file.type || "").toLowerCase();
  if (mimeType && !ALLOWED_MIME.has(mimeType)) {
    throw new Error("File MIME type is not allowed.");
  }

  return { safeName, mimeType: mimeType || "application/octet-stream", size: file.size, buffer: Buffer.alloc(0) };
}

export async function fileToBuffer(file: File): Promise<Buffer> {
  const arrayBuffer = await file.arrayBuffer();
  return Buffer.from(arrayBuffer);
}
