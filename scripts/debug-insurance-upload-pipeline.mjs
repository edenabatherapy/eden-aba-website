/**
 * End-to-end insurance document upload debug (no PHI logged).
 * Usage: DEBUG_API_BASE=http://localhost:3000 node scripts/debug-insurance-upload-pipeline.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = resolve(__dirname, "..");
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

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
const apiBase = process.env.DEBUG_API_BASE?.trim() || "http://localhost:3000";

if (!supabaseUrl || !serviceRoleKey) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const DOCUMENT_COLUMNS = [
  "insurance_front_url",
  "insurance_back_url",
  "parent_id_url",
  "diagnosis_report_url",
  "referral_url",
  "iep_document_url",
];

function section(title) {
  console.log(`\n${"=".repeat(72)}\n${title}\n${"=".repeat(72)}`);
}

function createTinyPng(filePath) {
  const base64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  writeFileSync(filePath, Buffer.from(base64, "base64"));
}

async function checkBucket() {
  section("STEP 1-3 PRECHECK: bucket + schema");
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("listBuckets error:", error.message);
    return false;
  }
  const bucket = data?.find((item) => item.id === "insurance-documents");
  console.log("Buckets:", data?.map((b) => b.id).join(", ") || "(none)");
  console.log("insurance-documents exists:", Boolean(bucket));

  const { error: schemaError } = await supabase
    .from("insurance_verification_requests")
    .select(DOCUMENT_COLUMNS.join(", "))
    .limit(0);
  console.log("Document columns selectable:", schemaError ? `NO (${schemaError.message})` : "YES");
  return Boolean(bucket) && !schemaError;
}

async function submitMultipart() {
  section("STEP 1-2: POST /api/insurance/verify multipart submission");

  const tmpDir = resolve(root, ".tmp-debug-upload");
  if (!existsSync(tmpDir)) mkdirSync(tmpDir, { recursive: true });

  const frontPath = resolve(tmpDir, "front.png");
  const backPath = resolve(tmpDir, "back.png");
  createTinyPng(frontPath);
  createTinyPng(backPath);

  const payload = {
    verificationType: "child",
    parentFirstName: "Debug",
    parentLastName: "Upload",
    fullName: "Test Child",
    dateOfBirth: "02/04/2019",
    email: `debug-upload-${Date.now()}@example.com`,
    phone: "(571) 478-0089",
    zipCode: "22041",
    insuranceProvider: "Virginia Medicaid / Cardinal Care",
    medicaidId: "DEBUG123456",
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

  console.log("POST", `${apiBase}/api/insurance/verify`);
  console.log("Multipart fields: payload, insurance_front, insurance_back");

  const response = await fetch(`${apiBase}/api/insurance/verify`, {
    method: "POST",
    body: formData,
  });
  const responseText = await response.text();

  console.log("HTTP status:", response.status, response.statusText);
  console.log("Response content-type:", response.headers.get("content-type"));
  console.log("Raw response:", responseText);

  let json;
  try {
    json = JSON.parse(responseText);
  } catch {
    json = null;
  }

  return { response, json, payload };
}

async function verifyDatabaseRow(requestId) {
  section("STEP 5: Database row URL columns after submission");
  console.log("requestId:", requestId);

  const { data, error } = await supabase
    .from("insurance_verification_requests")
    .select(
      [
        "id",
        "created_at",
        "status",
        ...DOCUMENT_COLUMNS,
      ].join(", "),
    )
    .eq("id", requestId)
    .maybeSingle();

  if (error) {
    console.error("SELECT error:", {
      message: error.message,
      code: error.code,
      details: error.details,
      hint: error.hint,
    });
    return;
  }

  if (!data) {
    console.error("No row found for requestId");
    return;
  }

  console.log("Row found:");
  for (const column of DOCUMENT_COLUMNS) {
    console.log(`  ${column}:`, data[column] ?? null);
  }
}

async function verifyStorageObjects(requestId) {
  section("STEP 3-4: Storage objects in insurance-documents bucket");
  console.log("Listing prefix:", `${requestId}/`);

  const { data, error } = await supabase.storage.from("insurance-documents").list(requestId, {
    limit: 100,
    sortBy: { column: "name", order: "asc" },
  });

  if (error) {
    console.error("Storage list error:", {
      message: error.message,
      name: error.name,
    });
    return;
  }

  if (!data?.length) {
    console.log("No objects found under request folder.");
    return;
  }

  for (const item of data) {
    const objectPath = `${requestId}/${item.name}`;
    console.log("Object:", objectPath, "| size:", item.metadata?.size ?? "unknown");
  }
}

async function main() {
  console.log("Insurance upload pipeline — full debug run");
  console.log("API base:", apiBase);
  console.log("Supabase:", supabaseUrl);

  const ready = await checkBucket();
  if (!ready) {
    console.error("\nPrecheck failed. Aborting submission.");
    process.exit(1);
  }

  const { response, json } = await submitMultipart();
  const requestId = json?.requestId;

  if (!requestId) {
    console.error("\nNo requestId in API response. Check dev server terminal for upload logs.");
    process.exit(1);
  }

  await verifyStorageObjects(requestId);
  await verifyDatabaseRow(requestId);

  section("SUMMARY");
  const allNull =
    json?.success === true
      ? "Will verify from DB query above"
      : "API did not return success:true";

  console.log("API success:", json?.success);
  console.log("API error:", json?.error ?? null);
  console.log("requestId:", requestId);
  console.log(allNull);
  console.log(
    "\nCheck the Next.js dev server terminal for lines prefixed with [insurance/verify]",
  );
}

main().catch((error) => {
  console.error("Fatal:", error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
