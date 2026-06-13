import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { cwd } from "node:process";
import { maskMedicaidId, maskSsn } from "./maskPhi";

export type VerificationAuditEntry = {
  action: "verification_submitted" | "verification_completed" | "verification_failed";
  verificationType: string;
  mode: string;
  outcome: string;
  verified: boolean;
  consentTimestamp: string;
  memberName: string;
  verificationStatus?: string;
  eligibilityStatus?: string;
  medicaidId?: string;
  ssn?: string;
  requestId?: string;
  error?: string;
  timestamp: string;
};

function getAuditPath() {
  const storagePath = process.env.INSURANCE_STORAGE_PATH || "./storage/insurance";
  return path.resolve(cwd(), storagePath, "_audit.jsonl");
}

/** Append-only audit log — never write raw SSN or unmasked PHI. */
export async function logVerificationAudit(entry: VerificationAuditEntry) {
  const auditPath = getAuditPath();
  await mkdir(path.dirname(auditPath), { recursive: true });

  const safeEntry = {
    ...entry,
    ssn: maskSsn(entry.ssn),
    medicaidId: maskMedicaidId(entry.medicaidId),
  };

  await appendFile(auditPath, `${JSON.stringify(safeEntry)}\n`, "utf8");
}
