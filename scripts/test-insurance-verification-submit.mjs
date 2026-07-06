/**
 * POST a test insurance verification submission to the local API and verify Supabase insert.
 *
 * Usage:
 *   npm run dev   (in another terminal)
 *   node scripts/test-insurance-verification-submit.mjs
 */
import { existsSync, readFileSync } from "fs";
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

const baseUrl = process.env.TEST_BASE_URL?.trim() || "http://127.0.0.1:3000";
const payload = {
  verificationType: "child",
  fullName: "Test Child (Automated)",
  dateOfBirth: "06/01/2018",
  parentFirstName: "Test",
  parentLastName: "Parent",
  email: "insurance-test@example.com",
  phone: "555-0199",
  zipCode: "22003",
  insuranceProvider: "Medicaid",
  medicaidId: "TEST-MED-12345",
  consent: true,
};

const response = await fetch(`${baseUrl}/api/insurance/verify`, {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify(payload),
});

const body = await response.json().catch(() => ({}));
console.log("HTTP", response.status);
console.log(JSON.stringify(body, null, 2));

if (!response.ok) {
  process.exit(1);
}

const requestId = body.requestId;
if (!requestId) {
  console.error("No requestId in response.");
  process.exit(1);
}

const { createClient } = await import("@supabase/supabase-js");
const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();

if (!url || !serviceRoleKey) {
  console.warn("Supabase env missing; cannot verify row in database.");
  process.exit(0);
}

const supabase = createClient(url, serviceRoleKey, {
  auth: { persistSession: false, autoRefreshToken: false },
});

const { data, error } = await supabase
  .from("insurance_verification_requests")
  .select("id, email, child_name, status, created_at")
  .eq("id", requestId)
  .maybeSingle();

if (error) {
  console.error("Supabase read failed:", error);
  process.exit(1);
}

if (!data) {
  console.error("Row not found for requestId:", requestId);
  process.exit(1);
}

console.log("Verified row in insurance_verification_requests:");
console.log(JSON.stringify(data, null, 2));
