/**
 * Debug insurance document upload pipeline (no PHI logged).
 * Usage: node scripts/debug-insurance-upload-pipeline.mjs
 */
import { createReadStream, existsSync, readFileSync, writeFileSync } from "fs";
import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { createClient } from "@supabase/supabase-js";

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

function logSection(title) {
  console.log(`\n=== ${title} ===`);
}

async function checkBucket() {
  logSection("1. Supabase Storage bucket lookup");
  const { data, error } = await supabase.storage.listBuckets();
  if (error) {
    console.error("listBuckets error:", { message: error.message, name: error.name });
    return false;
  }

  const bucket = data?.find((item) => item.id === "insurance-documents");
  console.log("Buckets found:", data?.map((item) => item.id).join(", ") || "(none)");
  console.log("insurance-documents exists:", Boolean(bucket));
  if (bucket) {
    console.log("Bucket metadata:", {
      public: bucket.public,
      file_size_limit: bucket.file_size_limit,
    });
  }
  return Boolean(bucket);
}

async function checkColumns() {
  logSection("6. insurance_verification_requests *_url columns");
  const { data, error } = await supabase
    .from("insurance_verification_requests")
    .select(DOCUMENT_COLUMNS.join(", "))
    .limit(1);

  if (error) {
    console.error("Column check failed:", {
      message: error.message,
      code: error.code,
      hint: error.hint,
    });
    return false;
  }

  console.log("Column select succeeded. Sample row keys:", data?.[0] ? Object.keys(data[0]) : "(no rows)");
  return true;
}

function createTinyPng(path) {
  // 1x1 PNG
  const base64 =
    "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
  writeFileSync(path, Buffer.from(base64, "base64"));
}

async function submitMultipart() {
  logSection("7-8. Local multipart POST /api/insurance/verify");

  const tmpDir = resolve(root, ".tmp-debug-upload");
  if (!existsSync(tmpDir)) {
    const { mkdirSync } = await import("fs");
    mkdirSync(tmpDir, { recursive: true });
  }

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
    email: "debug-upload@example.com",
    phone: "(571) 478-0089",
    zipCode: "22041",
    insuranceProvider: "Virginia Medicaid / Cardinal Care",
    medicaidId: "DEBUG123456",
    consent: true,
    recaptchaToken: "debug-bypass",
  };

  const formData = new FormData();
  formData.append("payload", JSON.stringify(payload));
  formData.append("insurance_front", new Blob([readFileSync(frontPath)], { type: "image/png" }), "front.png");
  formData.append("insurance_back", new Blob([readFileSync(backPath)], { type: "image/png" }), "back.png");

  console.log("POST", `${apiBase}/api/insurance/verify`);
  console.log("Content-Type will include multipart boundary (set by fetch)");

  let response;
  let responseText = "";
  try {
    response = await fetch(`${apiBase}/api/insurance/verify`, {
      method: "POST",
      body: formData,
    });
    responseText = await response.text();
  } catch (error) {
    console.error("Fetch failed:", error instanceof Error ? error.message : String(error));
    return;
  }

  console.log("HTTP status:", response.status, response.statusText);
  console.log("Response content-type:", response.headers.get("content-type"));
  console.log("Raw response (first 2000 chars):", responseText.slice(0, 2000));

  try {
    const json = JSON.parse(responseText);
    console.log("Parsed JSON keys:", Object.keys(json));
    console.log("success:", json.success, "requestId:", json.requestId, "error:", json.error, "details:", json.details);
  } catch (parseError) {
    console.error("Response is not valid JSON:", parseError instanceof Error ? parseError.message : String(parseError));
  }
}

async function main() {
  console.log("Insurance upload pipeline debug");
  console.log("Supabase URL:", supabaseUrl);
  console.log("API base:", apiBase);

  await checkBucket();
  await checkColumns();
  await submitMultipart();
}

main().catch((error) => {
  console.error("Fatal:", error instanceof Error ? error.stack || error.message : String(error));
  process.exit(1);
});
