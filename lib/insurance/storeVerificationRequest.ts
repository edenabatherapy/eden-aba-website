import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { cwd } from "node:process";
import { encryptUtf8 } from "@/lib/intake/server/crypto";
import { encryptPhiField } from "@/lib/insurance/encryptField";
import type { InsuranceVerificationRecord } from "@/lib/insurance/db/model";
import type { InsuranceVerificationRequest } from "@/types/insurance";

function getStorageConfig() {
  const encryptionKey =
    process.env.INSURANCE_ENCRYPTION_KEY?.trim() ||
    process.env.INTAKE_ENCRYPTION_KEY?.trim();
  const storagePath = process.env.INSURANCE_STORAGE_PATH || "./storage/insurance";

  if (!encryptionKey) {
    return null;
  }

  return {
    encryptionKey,
    storagePath: path.resolve(cwd(), storagePath),
  };
}

/**
 * Persist encrypted verification request at rest (legacy blob backup).
 * SSN and Medicaid ID are encrypted as separate fields before inclusion in payload.
 */
export async function storeVerificationRequest(params: {
  request: InsuranceVerificationRequest;
  consentTimestamp: string;
  normalizedDob: string;
  queueRecord: InsuranceVerificationRecord | null;
}) {
  const config = getStorageConfig();
  if (!config || !params.queueRecord) {
    return { stored: false as const, requestId: null };
  }

  const requestId = params.queueRecord.id;
  const submittedAt = params.queueRecord.submittedAt;
  const baseDir = path.join(config.storagePath, requestId);

  await mkdir(baseDir, { recursive: true });

  const payload = {
    requestId,
    submittedAt,
    consentTimestamp: params.consentTimestamp,
    request: {
      ...params.request,
      dateOfBirth: params.normalizedDob,
      medicaidId: undefined,
      ssn: undefined,
      medicaidIdEncrypted: encryptPhiField(params.request.medicaidId || ""),
      ssnEncrypted: encryptPhiField(params.request.ssn || ""),
    },
  };

  await writeFile(
    path.join(baseDir, "verification.json.enc"),
    encryptUtf8(JSON.stringify(payload), config.encryptionKey),
  );

  return { stored: true as const, requestId, submittedAt };
}
