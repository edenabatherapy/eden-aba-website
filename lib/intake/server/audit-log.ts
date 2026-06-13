import { readFile } from "fs/promises";
import path from "path";
import { cwd } from "node:process";
import { getIntakeConfig } from "./config";

export type IntakeAuditEntry = {
  action: string;
  confirmationId: string;
  submittedAt: string;
  fileCount: number;
};

export function getIntakeAuditLogPath(): string {
  const { storagePath } = getIntakeConfig();
  return path.resolve(cwd(), storagePath, "_audit.jsonl");
}

/**
 * Read intake submission entries from the append-only audit log (no PHI).
 */
export async function readIntakeAuditEntries(): Promise<IntakeAuditEntry[]> {
  const auditPath = getIntakeAuditLogPath();

  let raw = "";
  try {
    raw = await readFile(auditPath, "utf8");
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") {
      return [];
    }
    throw error;
  }

  const entries: IntakeAuditEntry[] = [];

  for (const line of raw.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed) continue;

    try {
      const parsed = JSON.parse(trimmed) as Partial<IntakeAuditEntry>;
      if (parsed.action !== "intake_submitted" || !parsed.confirmationId || !parsed.submittedAt) {
        continue;
      }

      entries.push({
        action: parsed.action,
        confirmationId: parsed.confirmationId,
        submittedAt: parsed.submittedAt,
        fileCount: typeof parsed.fileCount === "number" ? parsed.fileCount : 0,
      });
    } catch {
      console.warn("[intake-audit] skipping malformed audit line");
    }
  }

  return entries.sort(
    (a, b) => new Date(b.submittedAt).getTime() - new Date(a.submittedAt).getTime(),
  );
}
