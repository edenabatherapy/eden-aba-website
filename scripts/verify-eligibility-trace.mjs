/**
 * Dev-only trace: eligibility config + resolvePortalEligibility with a mock record.
 * Usage: NODE_ENV=development node scripts/verify-eligibility-trace.mjs
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

const envKeys = [
  "ELIGIBILITY_VENDOR",
  "ELIGIBILITY_API_CLIENT_ID",
  "ELIGIBILITY_API_CLIENT_SECRET",
  "ELIGIBILITY_PROVIDER_NPI",
  "ELIGIBILITY_PAYER_ID_MAP",
  "MEDICAID_LIVE_VERIFICATION_ENABLED",
  "ELIGIBILITY_PORTAL_LIVE_ENABLED",
];

console.log("=== Environment detection ===");
for (const key of envKeys) {
  const present = Boolean(process.env[key]?.trim());
  console.log(`${key}: present=${present}`);
}

const { getEligibilityConfig, isPortalLiveEligibilityEnabled } = await import(
  "../lib/insurance/eligibility/config.ts"
);
const { createLiveEligibilityAdapter } = await import(
  "../lib/insurance/eligibility/adapters/restAdapter.ts"
);
const { resolvePortalEligibility } = await import(
  "../lib/insurance/eligibility/liveEligibilityService.ts"
);
const { buildLiveEligibilityRequestFromRecord } = await import(
  "../lib/insurance/eligibility/buildLiveEligibilityInput.ts"
);

const config = getEligibilityConfig();
console.log("\n=== Config resolution ===");
console.log({
  configured: Boolean(config),
  vendor: config?.vendor ?? "none",
  kind: config?.kind ?? "none",
  portalLiveEnabled: isPortalLiveEligibilityEnabled(),
});

if (config) {
  const adapter = createLiveEligibilityAdapter(config);
  console.log("\n=== Adapter instantiation ===");
  console.log({
    adapterClass: adapter.constructor.name,
    vendor: adapter.vendor,
  });
}

const mockRecord = {
  id: "trace-test-record",
  clientName: "Jane Demo",
  dateOfBirth: "2018-05-15",
  medicaidIdEncrypted: null,
  ssnEncrypted: null,
  status: "Pending Staff Review",
  insuranceStatus: "pending",
  planName: null,
  effectiveDate: null,
  programType: null,
  subprogramType: null,
  notes: null,
  submittedAt: new Date().toISOString(),
  verifiedAt: null,
  verifiedBy: null,
  updatedAt: new Date().toISOString(),
  email: "parent@example.com",
  phone: "8045550100",
  zipCode: "23230",
  insuranceProvider: "Virginia Medicaid",
  verificationType: "child",
  parentFirstName: null,
  parentLastName: null,
  consentTimestamp: new Date().toISOString(),
};

console.log("\n=== Request build (mock record, no encrypted medicaid) ===");
const request = buildLiveEligibilityRequestFromRecord(mockRecord);
console.log({ requestBuilt: Boolean(request), reason: request ? null : "missing_medicaid_id" });

console.log("\n=== resolvePortalEligibility (mock record) ===");
const result = await resolvePortalEligibility(mockRecord);
console.log({
  live: result.live,
  source: result.source,
  status: result.status,
  statusLabel: result.statusLabel,
  checkedAt: result.checkedAt,
});
