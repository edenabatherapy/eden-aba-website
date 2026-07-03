/**
 * Extract English careers exports for overlay generation/verification.
 * Run: npx tsx scripts/extract-careers-english.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const SKIP_KEYS = new Set([
  "DEPARTMENT_ICONS",
  "SAVED_JOBS_STORAGE_KEY",
  "getStatusBadgeClasses",
  "getBadgeClasses",
  "PUBLIC_CAREER_PATH_STEP_IDS",
  "ADVANCED_LEADERSHIP_PATH_STEPS",
  "CAREER_LADDER",
  "HOMEPAGE_OPEN_JOBS",
  "ANNANDALE_JOBS",
  "getJobById",
  "getJobBySlug",
  "CAREERS_MEGA_MENU_COLUMNS",
  "CAREERS_MEGA_MENU_LINKS",
  "CAREER_PAGE_SLUGS",
  "CAREERS_BRAND_TITLE",
  "CAREERS_HOME_RECRUITING_EMAIL",
  "CL_RECRUITING_EMAIL",
]);

function shouldIncludeKey(name) {
  if (SKIP_KEYS.has(name)) return false;
  if (name.endsWith("_META")) return false;
  if (name.endsWith("_PATH")) return false;
  return true;
}

const FILES = [
  "lib/careers-content.ts",
  "lib/careers/careers-home-data.ts",
  "lib/careers/bcba-careers-data.ts",
  "lib/careers/rbt-careers-data.ts",
  "lib/careers/bt-careers-data.ts",
  "lib/careers/behavior-technician-careers-data.ts",
  "lib/careers/benefits-careers-data.ts",
  "lib/careers/benefits-data.ts",
  "lib/careers/clinical-leadership-careers-data.ts",
  "lib/careers/life-at-eden-careers-data.ts",
  "lib/careers/why-eden-careers-data.ts",
  "lib/careers/career-paths-careers-data.ts",
  "lib/careers/career-paths-interview-data.ts",
  "lib/careers/career-path-data.ts",
  "lib/careers/faq-data.ts",
  "lib/careers/future-locations-data.ts",
  "lib/careers/salary-estimator-data.ts",
  "lib/careers/career-menu-data.ts",
  "lib/careers/jobs-data.ts",
];

async function main() {
  const out = {};
  for (const file of FILES) {
    const mod = await import(join(root, file));
    for (const [key, value] of Object.entries(mod)) {
      if (typeof value === "function" || !shouldIncludeKey(key)) continue;
      if (typeof value === "string" || typeof value === "object") {
        out[key] = value;
      }
    }
  }
  const outPath = join(root, "scripts/.careers-english-extract.json");
  writeFileSync(outPath, JSON.stringify(out, null, 2));
  console.log(`Wrote ${outPath} with ${Object.keys(out).length} keys`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
