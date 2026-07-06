/**
 * Test at-least-one document validation for insurance verification uploads.
 * Usage: DEBUG_API_BASE=http://localhost:3000 node scripts/test-insurance-at-least-one-document.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env.local");
const apiBase = process.env.DEBUG_API_BASE?.trim() || "http://localhost:3000";

const EXPECTED_NO_FILE_ERROR =
  "Please upload at least one document to continue. You may upload an insurance card, photo ID, diagnosis report, referral, or school document.";

const FIELD_COLUMN_MAP = {
  insurance_front: "insurance_front_url",
  insurance_back: "insurance_back_url",
  parent_id: "parent_id_url",
  diagnosis_report: "diagnosis_report_url",
  referral: "referral_url",
  iep_document: "iep_document_url",
};

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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing Supabase env vars in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

function assert(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

function createTinyPng(filePath) {
  const base64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  writeFileSync(filePath, Buffer.from(base64, "base64"));
}

function buildPayload(suffix) {
  return {
    verificationType: "child",
    parentFirstName: "Test",
    parentLastName: "Parent",
    fullName: "Test Child",
    dateOfBirth: "02/04/2019",
    email: `at-least-one-${suffix}-${Date.now()}@example.com`,
    phone: "(571) 478-0089",
    zipCode: "22041",
    insuranceProvider: "Virginia Medicaid / Cardinal Care",
    medicaidId: "TEST123456",
    consent: true,
    recaptchaToken: "debug-bypass",
  };
}

async function submitWithFields(fieldNames) {
  const tmpDir = resolve(root, ".tmp-debug-upload");
  if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });

  const formData = new FormData();
  formData.append("payload", JSON.stringify(buildPayload(fieldNames.join("-") || "none")));

  for (const fieldName of fieldNames) {
    const filePath = resolve(tmpDir, `${fieldName}.png`);
    createTinyPng(filePath);
    formData.append(
      fieldName,
      new Blob([readFileSync(filePath)], { type: "image/png" }),
      `${fieldName}.png`,
    );
  }

  const response = await fetch(`${apiBase}/api/insurance/verify`, {
    method: "POST",
    body: formData,
  });
  const body = await response.json().catch(() => ({}));
  return { response, body };
}

async function verifySuccessCase(name, fieldNames) {
  console.log(`\nTEST: ${name}`);
  const { response, body } = await submitWithFields(fieldNames);
  console.log("status:", response.status, "success:", body.success, "error:", body.error ?? null);

  assert(response.ok, `Expected success, got status ${response.status}`);
  assert(body.success === true, "Expected success:true");
  assert(body.requestId, "Missing requestId");

  const { data: row, error } = await supabase
    .from("insurance_verification_requests")
    .select(Object.values(FIELD_COLUMN_MAP).join(", "))
    .eq("id", body.requestId)
    .maybeSingle();

  assert(!error, `DB read failed: ${error?.message}`);
  assert(row, "Row not found");

  for (const fieldName of fieldNames) {
    const column = FIELD_COLUMN_MAP[fieldName];
    assert(row[column], `${column} should be set`);
  }

  for (const [fieldName, column] of Object.entries(FIELD_COLUMN_MAP)) {
    if (!fieldNames.includes(fieldName)) {
      assert(row[column] === null, `${column} should be NULL`);
    }
  }

  const { data: storageObjects } = await supabase.storage
    .from("insurance-documents")
    .list(body.requestId);
  assert(storageObjects?.length === fieldNames.length, "Unexpected storage object count");

  console.log("PASS");
  return body.requestId;
}

async function verifyFailureCase() {
  console.log("\nTEST: No files uploaded");
  const formData = new FormData();
  formData.append("payload", JSON.stringify(buildPayload("none")));

  const response = await fetch(`${apiBase}/api/insurance/verify`, {
    method: "POST",
    body: formData,
  });
  const body = await response.json().catch(() => ({}));
  console.log("status:", response.status, "error:", body.error ?? null);

  assert(response.status === 400 || response.status === 415, `Expected 400/415, got ${response.status}`);
  assert(body.error === EXPECTED_NO_FILE_ERROR, `Unexpected error: ${body.error}`);
  console.log("PASS");
}

async function main() {
  console.log("Insurance at-least-one document validation tests");
  await verifySuccessCase("Only Insurance Card Front", ["insurance_front"]);
  await verifySuccessCase("Only Insurance Card Back", ["insurance_back"]);
  await verifySuccessCase("Only Parent/Guardian Photo ID", ["parent_id"]);
  await verifySuccessCase("Only Diagnosis Report", ["diagnosis_report"]);
  await verifySuccessCase("Multiple files uploaded", [
    "insurance_front",
    "parent_id",
    "referral",
  ]);
  await verifyFailureCase();
  console.log("\nALL TESTS PASSED");
}

main().catch((error) => {
  console.error("\nTEST FAILED:", error instanceof Error ? error.message : String(error));
  process.exit(1);
});
