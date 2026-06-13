/**
 * Dev-only: attempt Availity OAuth + coverage with env credentials.
 * Usage: NODE_ENV=development npx tsx scripts/verify-eligibility-oauth.mjs
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env.local");

if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf8").split("\n")) {
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

process.env.NODE_ENV = "development";

const { runLiveEligibilityCheck } = await import(
  "../lib/insurance/eligibility/liveEligibilityService.ts"
);

const attempt = await runLiveEligibilityCheck(
  {
    payerId: process.env.ELIGIBILITY_PAYER_ID_MAP
      ? JSON.parse(process.env.ELIGIBILITY_PAYER_ID_MAP)["Virginia Medicaid"] || "123"
      : "123",
    payerName: "Virginia Medicaid",
    memberId: "ABC123",
    firstName: "Jane",
    lastName: "Demo",
    dob: "2018-05-15",
    dateOfService: new Date().toISOString().slice(0, 10),
    patientState: "VA",
    serviceType: "30",
  },
  "oauth-trace-test",
);

console.log("\n=== OAuth / coverage attempt result ===");
console.log({
  ok: attempt.ok,
  status: attempt.status,
  errorReason: attempt.errorReason,
  rawReferenceId: attempt.rawReferenceId,
});
