import { appendFile, mkdir, writeFile } from "fs/promises";
import path from "path";
import { cwd } from "node:process";
import { encryptBuffer, encryptUtf8 } from "./crypto";
import { getIntakeConfig } from "./config";

export type StoredFileMeta = {
  fieldName: string;
  safeName: string;
  mimeType: string;
  size: number;
  storageName: string;
};

export type IntakeStorageResult = {
  confirmationId: string;
  submittedAt: string;
  fileCount: number;
  storagePath: string;
};

/**
 * Persist encrypted intake JSON and uploaded files to server storage.
 * Files and intake payload are encrypted at rest with AES-256-GCM.
 *
 * Optional DATABASE_URL: append non-PHI index row when configured (see storeIndexRecord).
 */
export async function storeIntakeSubmission(params: {
  confirmationId: string;
  intake: Record<string, unknown>;
  documentMeta: Record<string, unknown>;
  files: Array<{ fieldName: string; safeName: string; mimeType: string; buffer: Buffer }>;
}): Promise<IntakeStorageResult> {
  const config = getIntakeConfig();
  const submittedAt = new Date().toISOString();
  const baseDir = path.resolve(cwd(), config.storagePath, params.confirmationId);
  const filesDir = path.join(baseDir, "files");

  await mkdir(filesDir, { recursive: true });

  const storedFiles: StoredFileMeta[] = [];

  for (const file of params.files) {
    const storageName = `${file.fieldName}__${file.safeName}.enc`;
    const encrypted = encryptBuffer(file.buffer, config.encryptionKey);
    await writeFile(path.join(filesDir, storageName), encrypted);
    storedFiles.push({
      fieldName: file.fieldName,
      safeName: file.safeName,
      mimeType: file.mimeType,
      size: file.buffer.length,
      storageName,
    });
  }

  const manifest = {
    confirmationId: params.confirmationId,
    submittedAt,
    fileCount: storedFiles.length,
    files: storedFiles,
    documentMeta: params.documentMeta,
  };

  const intakePayload = {
    confirmationId: params.confirmationId,
    submittedAt,
    intake: params.intake,
  };

  await writeFile(
    path.join(baseDir, "manifest.json.enc"),
    encryptUtf8(JSON.stringify(manifest), config.encryptionKey)
  );
  await writeFile(
    path.join(baseDir, "intake.json.enc"),
    encryptUtf8(JSON.stringify(intakePayload), config.encryptionKey)
  );

  await appendAuditEntry({
    action: "intake_submitted",
    confirmationId: params.confirmationId,
    submittedAt,
    fileCount: storedFiles.length,
  });

  if (config.databaseUrl) {
    await storeIndexRecord({
      confirmationId: params.confirmationId,
      submittedAt,
      fileCount: storedFiles.length,
    });
  }

  return {
    confirmationId: params.confirmationId,
    submittedAt,
    fileCount: storedFiles.length,
    storagePath: baseDir,
  };
}

/** Append-only audit log — never write PHI field values here. */
async function appendAuditEntry(entry: Record<string, unknown>) {
  const config = getIntakeConfig();
  const auditPath = path.resolve(cwd(), config.storagePath, "_audit.jsonl");
  await mkdir(path.dirname(auditPath), { recursive: true });
  await appendFile(auditPath, `${JSON.stringify(entry)}\n`, "utf8");
}

/**
 * Optional DATABASE_URL index — stores confirmation metadata only (no PHI).
 * Requires a `intake_submissions` table or compatible REST endpoint configured by ops.
 *
 * HIPAA: Full organizational DB access controls, audit logging, retention, and BAAs
 * must still be implemented before production PHI workflows.
 */
async function storeIndexRecord(record: {
  confirmationId: string;
  submittedAt: string;
  fileCount: number;
}) {
  const { databaseUrl } = getIntakeConfig();
  if (!databaseUrl) return;

  /*
   * Example Postgres table (run once in your secure database):
   *
   * CREATE TABLE intake_submissions (
   *   confirmation_id TEXT PRIMARY KEY,
   *   submitted_at TIMESTAMPTZ NOT NULL,
   *   file_count INTEGER NOT NULL DEFAULT 0,
   *   status TEXT NOT NULL DEFAULT 'received'
   * );
   *
   * Wire an internal API or ORM here using DATABASE_URL.
   * This stub intentionally avoids sending PHI to the database index.
   */
  void record;
}
