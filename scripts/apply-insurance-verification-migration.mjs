/**
 * Apply supabase/insurance_verification_requests.sql to the linked Supabase project.
 *
 * Usage:
 *   DATABASE_URL="postgresql://..." node scripts/apply-insurance-verification-migration.mjs
 *
 * Get DATABASE_URL from Supabase → Project Settings → Database → Connection string (URI).
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
loadEnvFile(resolve(root, ".env.vercel.production"));
loadEnvFile(resolve(root, ".env.vercel.prod"));

const passwordArg = process.argv[2]?.trim();
const databaseUrl =
  process.env.DATABASE_URL?.trim() ||
  buildDatabaseUrlFromPassword(process.env.SUPABASE_DB_PASSWORD?.trim() || passwordArg);

function buildDatabaseUrlFromPassword(password) {
  if (!password) return "";
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  if (!supabaseUrl) return "";
  const ref = supabaseUrl.replace(/^https:\/\//, "").replace(/\.supabase\.co\/?$/, "");
  if (!ref) return "";
  return `postgresql://postgres:${encodeURIComponent(password)}@db.${ref}.supabase.co:5432/postgres`;
}

if (!databaseUrl) {
  console.error(
    "Missing DATABASE_URL or SUPABASE_DB_PASSWORD. Add one to .env.local or pass it when running this script.",
  );
  console.error(
    "Supabase → Project Settings → Database → Connection string (URI, session pooler or direct).",
  );
  console.error(
    "Or paste supabase/insurance_verification_requests.sql into the Supabase SQL Editor.",
  );
  process.exit(1);
}

const migrationPath = resolve(root, "supabase/insurance_verification_requests.sql");
const migrationSql = readFileSync(migrationPath, "utf8");

const postgres = (await import("postgres")).default;
const sql = postgres(databaseUrl, {
  ssl: databaseUrl.includes("localhost") ? false : "require",
  max: 1,
});

try {
  await sql.unsafe(migrationSql);
  console.log("Applied insurance_verification_requests migration successfully.");

  const documentsMigrationPath = resolve(root, "supabase/insurance_verification_documents.sql");
  if (existsSync(documentsMigrationPath)) {
    const documentsSql = readFileSync(documentsMigrationPath, "utf8");
    await sql.unsafe(documentsSql);
    console.log("Applied insurance_verification_documents migration successfully.");
  }
} finally {
  await sql.end({ timeout: 5 });
}
