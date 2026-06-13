import { appendFile, mkdir } from "fs/promises";
import path from "path";
import { cwd } from "node:process";

export type PortalAuditAction =
  | "portal_verify_success"
  | "portal_verify_failed"
  | "portal_verify_locked"
  | "portal_verify_rate_limited";

export type PortalAuditEntry = {
  action: PortalAuditAction;
  timestamp: string;
  clientIp: string;
  requestId?: string;
  reason?: string;
};

function getPortalAuditPath() {
  const storagePath = process.env.INSURANCE_STORAGE_PATH || "./storage/insurance";
  return path.resolve(cwd(), storagePath, "_portal_audit.jsonl");
}

/** Append-only portal audit — never includes DOB, SSN, Medicaid ID, email, or phone. */
export async function logPortalAudit(entry: PortalAuditEntry) {
  const auditPath = getPortalAuditPath();
  await mkdir(path.dirname(auditPath), { recursive: true });
  await appendFile(auditPath, `${JSON.stringify(entry)}\n`, "utf8");
}
