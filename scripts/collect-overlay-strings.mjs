/**
 * Collect all user-facing English strings from overlay source modules.
 * Run: npx tsx scripts/collect-overlay-strings.mjs
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
  "CENTRALREACH_LOGIN_URL",
  "PROVIDER_HUB_SECTION_IDS",
  "FEATURED_RESOURCE_IDS",
  "RESOURCE_CATEGORIES",
]);

const PRESERVE_EXACT = new Set([
  "Eden ABA Therapy",
  "BCBA",
  "RBT",
  "BT",
  "BCaBA",
  "ADOS-2",
  "M-CHAT-R",
  "HIPAA",
  "BACB",
  "IEP",
  "EPSDT",
  "CMS",
  "Medicaid.gov",
  "Autism Speaks",
  "CentralReach",
  "CentralReach Essentials",
  "CentralReach Staff Login",
  "NO",
  "SD",
  "Naveen Omari",
  "Steve Dang",
]);

function shouldIncludeKey(name) {
  if (SKIP_KEYS.has(name)) return false;
  if (name.endsWith("_META")) return false;
  if (name.endsWith("_PATH")) return false;
  return true;
}

function isSkippableString(s) {
  if (!s || typeof s !== "string") return true;
  if (PRESERVE_EXACT.has(s)) return true;
  if (/^https?:\/\//.test(s)) return true;
  if (/^\/[\w/-]+$/.test(s)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(s)) return true;
  if (/^\+?\d[\d\s().-]{7,}$/.test(s)) return true;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return true;
  if (/^[A-Z]{2}$/.test(s)) return true;
  if (/^\d{4}$/.test(s)) return true;
  if (/^Phase \d$/.test(s)) return true;
  if (/^Step \d+$/.test(s)) return true;
  if (/^\d{2}$/.test(s)) return true;
  if (/^[A-Z][a-z]+, VA$/.test(s)) return true;
  if (/^[A-Z][a-z]+(\s[A-Z][a-z]+)*, VA$/.test(s)) return true;
  if (/^\/images\//.test(s)) return true;
  if (s === "wide" || s === "tall" || s === "normal") return true;
  if (["home", "clinic", "school", "family", "evaluation", "screening", "aba", "insurance", "intake", "documentation"].includes(s)) return true;
  if (["clinical", "leadership", "training", "client", "operations", "administration"].includes(s)) return true;
  if (["user-plus", "layout-grid", "log-in", "route", "handshake", "screening", "insurance"].includes(s)) return true;
  return false;
}

function collectStrings(value, out) {
  if (typeof value === "string") {
    if (!isSkippableString(value)) out.add(value);
    return;
  }
  if (Array.isArray(value)) {
    for (const item of value) collectStrings(item, out);
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (k === "href" || k === "url" || k === "slug" || k === "applyUrl" || k === "id" || k === "mapsQuery" || k === "phoneHref" || k === "emailHref" || k === "faxHref" || k === "resourceHref" || k === "ctaHref" || k === "postedAt" || k === "initials" || k === "name" || k === "src" || k === "span" || k === "icon" || k === "duration" || k === "category" || k === "tags" || k === "source" || k === "year" || k === "metric" || k === "value" || k === "suffix" || k === "step" && typeof v === "string" && /^\d+$/.test(v)) continue;
      collectStrings(v, out);
    }
  }
}

const MODULES = [
  { file: "lib/our-team-content.ts", keys: ["OUR_TEAM_PAGE"] },
  { file: "lib/our-approach-content.ts", keys: ["OUR_APPROACH_PAGE"] },
  { file: "lib/mission-values-content.ts", keys: ["MISSION_VALUES_PAGE"] },
  { file: "lib/about/contact-us-data.ts", keys: ["CONTACT_PATHWAY_CARDS", "CONTACT_US_FAQ", "INQUIRY_TYPES", "DIAGNOSIS_STATUS_OPTIONS", "CLIENT_SUPPORT_TOPICS"] },
  { file: "lib/about/clinical-quality-data.ts", keys: null },
  { file: "lib/about/community-impact-data.ts", keys: null },
  { file: "lib/careers-content.ts", keys: null },
  { file: "lib/careers/careers-home-data.ts", keys: null },
  { file: "lib/careers/bcba-careers-data.ts", keys: null },
  { file: "lib/careers/rbt-careers-data.ts", keys: null },
  { file: "lib/careers/bt-careers-data.ts", keys: null },
  { file: "lib/careers/behavior-technician-careers-data.ts", keys: null },
  { file: "lib/careers/benefits-careers-data.ts", keys: null },
  { file: "lib/careers/benefits-data.ts", keys: null },
  { file: "lib/careers/clinical-leadership-careers-data.ts", keys: null },
  { file: "lib/careers/life-at-eden-careers-data.ts", keys: null },
  { file: "lib/careers/why-eden-careers-data.ts", keys: null },
  { file: "lib/careers/career-paths-careers-data.ts", keys: null },
  { file: "lib/careers/career-paths-interview-data.ts", keys: null },
  { file: "lib/careers/career-path-data.ts", keys: ["PUBLIC_CAREER_PROGRESSION_LABELS"] },
  { file: "lib/careers/faq-data.ts", keys: null },
  { file: "lib/careers/future-locations-data.ts", keys: null },
  { file: "lib/careers/salary-estimator-data.ts", keys: null },
  { file: "lib/careers/career-menu-data.ts", keys: ["CAREERS_MEGA_MENU_LABEL", "CAREERS_DEFAULT_PREVIEW", "CAREERS_MENU_ITEMS"] },
  { file: "lib/careers/jobs-data.ts", keys: ["ALL_JOBS"] },
  { file: "lib/providers/provider-content.ts", keys: null },
  { file: "lib/providers/provider-menu-data.ts", keys: ["PROVIDERS_MEGA_MENU_LABEL", "PROVIDERS_MEGA_MENU_TAGLINE", "PROVIDERS_DEFAULT_PREVIEW", "PROVIDERS_MENU_ITEMS"] },
  { file: "lib/services/school-based-aba-data.ts", keys: null },
  { file: "lib/evaluations/screening-evaluation-data.ts", keys: null },
  { file: "lib/aba-therapy/parent-training-data.ts", keys: null },
  { file: "lib/getting-started/getting-started-data.ts", keys: ["GETTING_STARTED_RESOURCES", "CORE_TOPIC_CARDS", "ONBOARDING_TIMELINE", "DOCUMENTS_CHECKLIST", "GETTING_STARTED_FAQ", "GETTING_STARTED_DISCLAIMER"] },
];

async function main() {
  const allStrings = new Set();
  const byModule = {};

  for (const mod of MODULES) {
    const imported = await import(join(root, mod.file));
    const keys = mod.keys ?? Object.keys(imported).filter(shouldIncludeKey);
    for (const key of keys) {
      if (imported[key] === undefined) continue;
      const strings = new Set();
      collectStrings(imported[key], strings);
      byModule[`${mod.file}::${key}`] = [...strings].sort();
      for (const s of strings) allStrings.add(s);
    }
  }

  const sorted = [...allStrings].sort();
  writeFileSync(join(root, "scripts/.overlay-strings-all.json"), JSON.stringify(sorted, null, 2));
  writeFileSync(join(root, "scripts/.overlay-strings-by-module.json"), JSON.stringify(byModule, null, 2));
  console.log(`Collected ${sorted.length} unique user-facing strings`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
