/**
 * Create a test intake submission (same storage + delivery path as POST /api/start-aba-therapy).
 * Usage: NODE_ENV=development npx tsx scripts/submit-test-intake.mjs
 */
import { existsSync, readFileSync, readdirSync, statSync } from "fs";
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
process.env.NODE_ENV = process.env.NODE_ENV || "development";

const { generateConfirmationId } = await import("../lib/intake/server/confirmation.ts");
const { assertIntakeBackendReady } = await import("../lib/intake/server/config.ts");
const { deliverIntakeSubmission } = await import("../lib/intake/server/delivery.ts");
const { buildSummaryFromStartAbaTherapy } = await import(
  "../lib/intake/server/submission-summary.ts"
);
const { storeIntakeSubmission } = await import("../lib/intake/server/storage.ts");
const { decryptBuffer } = await import("../lib/intake/server/crypto.ts");
const { getIntakeConfig } = await import("../lib/intake/server/config.ts");
const { resolveGoogleSheetsAuthMethod } = await import(
  "../lib/intake/server/google-credentials.ts"
);

assertIntakeBackendReady();

const submittedAt = new Date().toISOString();
const confirmationId = generateConfirmationId();

const submission = {
  _source: "start-aba-therapy",
  parentName: "Test Parent (Automated)",
  childFirstName: "Test",
  childLastName: "Child",
  childBirthdate: "2018-06-01",
  phone: "555-0199",
  email: "test-intake@example.com",
  preferredContact: "Email",
  diagnosisStatus: "Evaluation scheduled",
  state: "VA",
  city: "Richmond",
  serviceType: "ABA Therapy",
  insuranceProvider: "Test Insurance",
  message: "Automated test intake submission — safe to delete",
  consentUpdates: false,
  submittedAt,
};

const stored = await storeIntakeSubmission({
  confirmationId,
  intake: submission,
  documentMeta: { source: "test-script", note: "submit-test-intake.mjs" },
  files: [],
});

const summary = buildSummaryFromStartAbaTherapy(submission, stored.confirmationId, stored.submittedAt);
const delivery = await deliverIntakeSubmission(summary, 0);

const config = getIntakeConfig();
const intakeEncPath = resolve(stored.storagePath, "intake.json.enc");
const manifestEncPath = resolve(stored.storagePath, "manifest.json.enc");
const intakeEncExists = existsSync(intakeEncPath);
const manifestEncExists = existsSync(manifestEncPath);

let decryptedOk = false;
let decryptedParentName = "";

if (intakeEncExists) {
  try {
    const payload = decryptBuffer(readFileSync(intakeEncPath), config.encryptionKey);
    const parsed = JSON.parse(payload.toString("utf8"));
    decryptedOk = parsed.confirmationId === stored.confirmationId;
    decryptedParentName = parsed.intake?.parentName || "";
  } catch {
    decryptedOk = false;
  }
}

const storageRoot = resolve(root, config.storagePath);
const folders = readdirSync(storageRoot, { withFileTypes: true })
  .filter((e) => e.isDirectory())
  .map((e) => e.name);

console.log(JSON.stringify({
  ok: true,
  confirmationId: stored.confirmationId,
  storagePath: stored.storagePath,
  storageFolderName: confirmationId,
  files: {
    intakeJsonEnc: intakeEncExists,
    manifestJsonEnc: manifestEncExists,
    intakeEncBytes: intakeEncExists ? statSync(intakeEncPath).size : 0,
  },
  decryption: {
    ok: decryptedOk,
    parentName: decryptedParentName,
  },
  delivery: {
    sheets: delivery.sheets,
    email: delivery.email,
    allSucceeded: delivery.allSucceeded,
  },
  googleSheetsAuthMethod: resolveGoogleSheetsAuthMethod(),
  storageIntakeFolders: folders.filter((n) => !n.startsWith("_")),
}, null, 2));
