/**
 * Dev trace for a specific portal ref.
 * Usage: node scripts/trace-portal-ref.mjs [requestId]
 */
import { readFileSync, existsSync } from "fs";
import { resolve } from "path";

const root = resolve(import.meta.dirname, "..");
const envPath = resolve(root, ".env.local");
const REF = process.argv[2] || "e2ac0b2b-bdd8-451a-8a40-85264b0ae88b";

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

async function main() {
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
  const { getVerificationRecord } = await import("../lib/insurance/db/repository.ts");
  const { findRecordForPortalVerification } = await import(
    "../lib/insurance/portal/verifyIdentity.ts"
  );

  const envKeys = [
    "ELIGIBILITY_VENDOR",
    "ELIGIBILITY_API_CLIENT_ID",
    "ELIGIBILITY_API_CLIENT_SECRET",
    "ELIGIBILITY_PROVIDER_NPI",
    "ELIGIBILITY_PAYER_ID_MAP",
    "ELIGIBILITY_PORTAL_LIVE_ENABLED",
  ];

  console.log("=== Env ===");
  for (const key of envKeys) {
    console.log(`${key}: present=${Boolean(process.env[key]?.trim())}`);
  }

  const config = getEligibilityConfig();
  console.log("\n=== Config ===", {
    configured: Boolean(config),
    vendor: config?.vendor ?? "none",
    portalLive: isPortalLiveEligibilityEnabled(),
  });

  if (config) {
    const adapter = createLiveEligibilityAdapter(config);
    console.log("Adapter:", adapter.constructor.name, adapter.vendor);
  } else {
    console.log("Adapter: NOT instantiated (no config)");
  }

  const record = await getVerificationRecord(REF);
  console.log("\n=== Record ===", {
    found: Boolean(record),
    insuranceProvider: record?.insuranceProvider,
    hasMedicaidEnc: Boolean(record?.medicaidIdEncrypted),
  });

  const identity = await findRecordForPortalVerification({
    requestId: REF,
    dateOfBirth: "2018-01-05",
    lastFour: "9015",
    emailOrPhone: "edenabatherapy@gmail.com",
  });
  console.log("\n=== Identity ===", identity);

  const req = record ? buildLiveEligibilityRequestFromRecord(record) : null;
  console.log("\n=== Request build ===", req
    ? {
        payerId: req.payerId,
        patientState: req.patientState,
        serviceType: req.serviceType,
        hasMemberId: Boolean(req.memberId),
        firstName: req.firstName,
        lastName: req.lastName,
      }
    : { built: false });

  if (record) {
    const result = await resolvePortalEligibility(record);
    console.log("\n=== resolvePortalEligibility ===", result);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
