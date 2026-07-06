/**
 * Validate insurance verification with only required front/back documents.
 * Usage: DEBUG_API_BASE=http://localhost:3000 node scripts/test-insurance-required-docs-only.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
const envPath = resolve(root, ".env.local");
const apiBase = process.env.DEBUG_API_BASE?.trim() || "http://localhost:3000";

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

const OPTIONAL_COLUMNS = [
  "parent_id_url",
  "diagnosis_report_url",
  "referral_url",
  "iep_document_url",
];

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

async function main() {
  console.log("Test: required insurance card uploads only (no optional documents)\n");

  const tmpDir = resolve(root, ".tmp-debug-upload");
  if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });

  const frontPath = resolve(tmpDir, "front.png");
  const backPath = resolve(tmpDir, "back.png");
  createTinyPng(frontPath);
  createTinyPng(backPath);

  const payload = {
    verificationType: "child",
    parentFirstName: "Test",
    parentLastName: "Parent",
    fullName: "Test Child",
    dateOfBirth: "02/04/2019",
    email: `required-docs-${Date.now()}@example.com`,
    phone: "(571) 478-0089",
    zipCode: "22041",
    insuranceProvider: "Virginia Medicaid / Cardinal Care",
    medicaidId: "TEST123456",
    consent: true,
    recaptchaToken: "debug-bypass",
  };

  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));
  formData.append(
    "insurance_front",
    new Blob([readFileSync(frontPath)], { type: "image/png" }),
    "front.png",
  );
  formData.append(
    "insurance_back",
    new Blob([readFileSync(backPath)], { type: "image/png" }),
    "back.png",
  );

  const fileKeys = Array.from(formData.keys()).filter(
    (key) => key.includes("Document") || key.includes("insurance") || key.includes("file"),
  );
  console.log("Insurance upload debug:", {
    hasFormData: true,
    fileKeys,
    fileCount: fileKeys.length,
  });

  const response = await fetch(`${apiBase}/api/insurance/verify`, {
    method: "POST",
    body: formData,
  });
  const body = await response.json();

  console.log("\nAPI response status:", response.status);
  console.log("API response body:", JSON.stringify(body, null, 2));

  assert(response.ok, `API failed with status ${response.status}`);
  assert(body.success === true, "API did not return success:true");
  assert(typeof body.requestId === "string" && body.requestId.length > 0, "Missing requestId");

  const requestId = body.requestId;
  const submittedAt = encodeURIComponent(new Date().toISOString());
  const receivedUrl = `${apiBase}/insurance/verification-received?ref=${encodeURIComponent(requestId)}&submitted=${submittedAt}`;
  const receivedResponse = await fetch(receivedUrl);
  const receivedHtml = await receivedResponse.text();

  console.log("\nVerification received page status:", receivedResponse.status);
  assert(receivedResponse.ok, "Verification received page did not return 200");
  assert(
    receivedHtml.includes("Insurance Verification Request Received"),
    "Success page missing headline",
  );
  assert(
    receivedHtml.includes("submitted successfully"),
    "Success page missing confirmation message",
  );
  assert(receivedHtml.includes(requestId), "Success page missing request ID");

  const { data: row, error: rowError } = await supabase
    .from("insurance_verification_requests")
    .select(
      "id, insurance_front_url, insurance_back_url, parent_id_url, diagnosis_report_url, referral_url, iep_document_url",
    )
    .eq("id", requestId)
    .maybeSingle();

  assert(!rowError, `DB read failed: ${rowError?.message}`);
  assert(row, "Row not found in insurance_verification_requests");

  console.log("\nDatabase row:");
  console.log(JSON.stringify(row, null, 2));

  assert(row.insurance_front_url, "insurance_front_url is NULL");
  assert(row.insurance_back_url, "insurance_back_url is NULL");
  assert(
    row.insurance_front_url.startsWith(`${requestId}/insurance_front`),
    "insurance_front_url has unexpected path",
  );
  assert(
    row.insurance_back_url.startsWith(`${requestId}/insurance_back`),
    "insurance_back_url has unexpected path",
  );

  for (const column of OPTIONAL_COLUMNS) {
    assert(row[column] === null, `${column} should be NULL but was ${row[column]}`);
  }

  const { data: storageObjects, error: storageError } = await supabase.storage
    .from("insurance-documents")
    .list(requestId);

  assert(!storageError, `Storage list failed: ${storageError?.message}`);
  assert(storageObjects?.length === 2, `Expected 2 storage objects, found ${storageObjects?.length ?? 0}`);

  console.log("\nStorage objects:");
  for (const object of storageObjects || []) {
    console.log(`- ${requestId}/${object.name}`);
  }

  console.log("\nALL CHECKS PASSED");
  console.log("- Row inserted");
  console.log("- Front/back uploaded to insurance-documents/{requestId}/");
  console.log("- insurance_front_url and insurance_back_url set");
  console.log("- Optional URL columns remain NULL");
  console.log("- Verification received page returns success confirmation");
  console.log("- No API errors returned to client");
}

main().catch((error) => {
  console.error("\nTEST FAILED:", error instanceof Error ? error.message : String(error));
  process.exit(1);
});
