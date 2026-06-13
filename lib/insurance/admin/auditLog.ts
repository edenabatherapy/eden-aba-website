import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { cwd } from "node:process";

export type AdminAuditAction =
  | "admin_login_success"
  | "admin_login_failed"
  | "admin_login_rate_limited"
  | "admin_logout"
  | "verification_status_changed"
  | "verification_notes_updated"
  | "verification_record_updated"
  | "verification_export"
  | "PHI_REVEALED";

export type AdminAuditEntry = {
  action: AdminAuditAction;
  timestamp: string;
  staffName?: string;
  clientIp?: string;
  requestId?: string;
  previousStatus?: string;
  newStatus?: string;
  notesChanged?: boolean;
  exportRecordCount?: number;
  error?: string;
};

function getAdminAuditPath() {
  const storagePath = process.env.INSURANCE_STORAGE_PATH || "./storage/insurance";
  return path.resolve(cwd(), storagePath, "_admin_audit.jsonl");
}

/** Append-only admin audit log — never includes SSN, Medicaid ID, or full DOB. */
export async function logAdminAudit(entry: AdminAuditEntry) {
  const auditPath = getAdminAuditPath();
  await mkdir(path.dirname(auditPath), { recursive: true });
  await appendFile(auditPath, `${JSON.stringify(entry)}\n`, "utf8");
}
