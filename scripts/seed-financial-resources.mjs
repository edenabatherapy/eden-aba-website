/**
 * One-time seed: copies static financial assistance resources into Supabase.
 * Run: node scripts/seed-financial-resources.mjs
 * Requires NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in env.
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const resourcesPath = join(__dirname, "../lib/financial-assistance/resources.ts");

function extractResourcesArray(source) {
  const match = source.match(/export const FINANCIAL_ASSISTANCE_RESOURCES[^=]*=\s*(\[[\s\S]*?\n\]);/);
  if (!match) throw new Error("Could not parse FINANCIAL_ASSISTANCE_RESOURCES");
  return Function(`"use strict"; return (${match[1]});`)();
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
const key = process.env.SUPABASE_SERVICE_ROLE_KEY?.trim();
if (!url || !key) {
  console.error("Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY");
  process.exit(1);
}

const supabase = createClient(url, key, { auth: { persistSession: false } });
const resources = extractResourcesArray(readFileSync(resourcesPath, "utf8"));

const rows = resources.map((r, index) => ({
  slug: r.id,
  title: r.title,
  group_name: r.group,
  program_type: r.programType,
  description: r.description,
  eligibility_summary: r.eligibilitySummary ?? null,
  coverage_notes: r.coverageNotes ?? null,
  official_links: r.officialLinks ?? [],
  documents: r.documents ?? [],
  tips: r.tips ?? [],
  county: r.county ?? null,
  state_code: r.state ?? "VA",
  sort_order: index,
  status: r.status === "Active" ? "active" : "active",
}));

const { error } = await supabase.from("financial_resources").upsert(rows, { onConflict: "slug" });
if (error) {
  console.error("Seed failed:", error.message);
  process.exit(1);
}

console.log(`Seeded ${rows.length} financial_resources rows.`);
