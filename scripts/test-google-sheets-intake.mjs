/**
 * Verify Google Sheets intake integration and optionally append a test row.
 *
 * Usage:
 *   npm run test:google-sheets
 *   npm run test:google-sheets:append
 */
import { existsSync, readFileSync } from "fs";
import { homedir } from "os";
import { join, resolve } from "path";

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

const appendTestRow = process.argv.includes("--append-test-row");

const {
  getGoogleServiceAccountEmail,
  getGoogleSheetsAuthIdentity,
  isAdcPotentiallyAvailable,
  isGoogleSheetsConfigured,
  resolveGoogleSheetsAuthMethod,
} = await import("../lib/intake/server/google-credentials.ts");
const { appendIntakeSubmissionToGoogleSheet, verifyGoogleSheetsAccess, GOOGLE_SHEETS_HEADER_ROW } =
  await import("../lib/intake/server/google-sheets.ts");

console.log("=== Eden intake → Google Sheets test ===\n");

const spreadsheetId = process.env.GOOGLE_SHEETS_SPREADSHEET_ID?.trim() || "";
const tabName = process.env.GOOGLE_SHEETS_TAB_NAME?.trim() || "Intake Submissions";
const authMethod = resolveGoogleSheetsAuthMethod();
const authIdentity = getGoogleSheetsAuthIdentity();
const serviceAccountEmail = getGoogleServiceAccountEmail();
const keyFile = resolve(root, "secrets/google-sheets-service-account.json");
const gcloudAdc = join(homedir(), ".config", "gcloud", "application_default_credentials.json");
const configured = isGoogleSheetsConfigured();

console.log("Configuration:");
console.log(`  Spreadsheet ID: ${spreadsheetId || "(missing)"}`);
console.log(`  Tab name: ${tabName}`);
console.log(`  Auth method: ${authMethod || "(none)"}`);
console.log(`  Auth identity: ${authIdentity}`);
console.log(`  Service account email: ${serviceAccountEmail || "(n/a — using ADC)"}`);
console.log(`  Key file present: ${existsSync(keyFile) ? "yes" : "no"}`);
console.log(`  gcloud ADC file: ${existsSync(gcloudAdc) ? gcloudAdc : "(not found)"}`);
console.log(`  GOOGLE_APPLICATION_CREDENTIALS: ${process.env.GOOGLE_APPLICATION_CREDENTIALS?.trim() || "(not set)"}`);
console.log(`  ADC potentially available: ${isAdcPotentiallyAvailable() ? "yes" : "no"}`);
console.log(`  Ready: ${configured ? "yes" : "no"}`);
console.log(`\nExpected header row (${GOOGLE_SHEETS_HEADER_ROW.length} columns):`);
console.log(`  ${GOOGLE_SHEETS_HEADER_ROW.join(" | ")}`);

if (!configured) {
  console.log("\nResult: NOT WORKING — credentials or spreadsheet ID missing.");
  console.log("\nNext steps (pick one auth method):");
  console.log("  A. Application Default Credentials (no JSON key):");
  console.log("     gcloud auth application-default login --scopes=https://www.googleapis.com/auth/spreadsheets");
  console.log("     Ensure your Google account has Editor access to the spreadsheet.");
  console.log("  B. Service account env vars:");
  console.log("     GOOGLE_SERVICE_ACCOUNT_EMAIL + GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY in .env.local");
  console.log("  C. Service account JSON key file:");
  console.log("     secrets/google-sheets-service-account.json");
  console.log(`\n  Spreadsheet ID in .env.local: ${spreadsheetId || "(set GOOGLE_SHEETS_SPREADSHEET_ID)"}`);
  process.exit(1);
}

console.log("\nVerifying spreadsheet access...");
const access = await verifyGoogleSheetsAccess();

if (!access.ok) {
  console.log("\nResult: NOT WORKING");
  console.log(`  Error: ${access.error}`);
  console.log(`  Auth method: ${access.authMethod || authMethod}`);
  console.log(`  Auth identity: ${access.authIdentity || authIdentity}`);
  if (authMethod === "json_key" || authMethod === "env_private_key") {
    console.log("\nIf using a service account, share the spreadsheet with Editor access:");
    console.log(`  ${serviceAccountEmail || "(service account email from credentials)"}`);
  }
  if (authMethod === "adc") {
    console.log("\nIf using ADC, sign in with a Google account that has Editor access to the sheet.");
  }
  process.exit(1);
}

console.log(`  Spreadsheet title: ${access.spreadsheetTitle}`);
console.log(`  Tab found: ${access.tabName}`);
console.log(`  Auth method: ${access.authMethod}`);
console.log(`  Auth identity: ${access.authIdentity}`);

if (!appendTestRow) {
  console.log("\nResult: WORKING — credentials and spreadsheet access verified.");
  console.log("Run with --append-test-row to write a test submission row:");
  console.log("  npm run test:google-sheets:append");
  process.exit(0);
}

console.log("\nAppending test row...");
const testSummary = {
  parentName: "Sheets Integration Test (Parent)",
  childName: "Sheets Integration Test (Child)",
  age: "7",
  diagnosisStatus: "Test — safe to delete",
  state: "VA",
  city: "Richmond",
  serviceType: "Integration test",
  goals: "Verify Google Sheets append",
  insuranceProvider: "Test Insurance",
  phoneNumber: "555-0100",
  emailAddress: "test@example.com",
  preferredContactMethod: "Email",
  submittedAt: new Date().toISOString(),
  confirmationId: `TEST-${Date.now()}`,
  source: "start-aba-therapy",
};

const appendResult = await appendIntakeSubmissionToGoogleSheet(testSummary);

if (!appendResult.ok) {
  console.log("\nResult: NOT WORKING");
  console.log(`  Append error: ${appendResult.error}`);
  process.exit(1);
}

console.log("\nResult: WORKING — test row appended.");
console.log(`  Auth method: ${authMethod}`);
console.log(`  Updated range: ${appendResult.updatedRange || "(unknown)"}`);
console.log(`  Rows added: ${appendResult.updatedRows ?? 1}`);
console.log(`  Sheet: https://docs.google.com/spreadsheets/d/${appendResult.spreadsheetId}/edit`);
console.log(`  Log file: storage/intake/_sheets_delivery.jsonl`);
