/**
 * List saved intake submissions from _audit.jsonl (PHI-free).
 * Usage: npm run admin:intake-list
 */
import { existsSync, readFileSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env.local");

function loadEnvFile(filePath) {
  if (!existsSync(filePath)) return;
  for (const line of readFileSync(filePath, "utf8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    let value = trimmed.slice(eq + 1).trim();
    if (
      (value.startsWith('"') && value.endsWith('"')) ||
      (value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }
    if (process.env[key] === undefined) process.env[key] = value;
  }
}

loadEnvFile(envPath);

const { readIntakeAuditEntries, getIntakeAuditLogPath } = await import(
  "../lib/intake/server/audit-log.ts"
);

const entries = await readIntakeAuditEntries();

console.log(`Intake audit log: ${getIntakeAuditLogPath()}`);
console.log(`Total submissions: ${entries.length}\n`);

if (entries.length === 0) {
  console.log("No submissions found.");
  process.exit(0);
}

console.log("Confirmation ID".padEnd(28), "Submitted (UTC)".padEnd(28), "Files");
console.log("-".repeat(70));

for (const row of entries) {
  console.log(
    row.confirmationId.padEnd(28),
    row.submittedAt.padEnd(28),
    String(row.fileCount),
  );
}
