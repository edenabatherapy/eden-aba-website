/**
 * Build all Vietnamese overlay JSON files from English sources and translation dictionaries.
 * Run: npx tsx scripts/build-vi-overlays.mjs
 */
import { readFileSync, writeFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildOverlay } from "./vi-overlay-engine.mjs";
import { OUR_TEAM_PAGE_VI } from "./vi-dicts/about-core.mjs";
import { OUR_APPROACH_PAGE_VI, MISSION_VALUES_PAGE_VI } from "./vi-dicts/about-approach-mission.mjs";
import { ABOUT_OVERLAYS_VI } from "./vi-dicts/about-pages.mjs";

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

function shouldIncludeKey(name) {
  if (SKIP_KEYS.has(name)) return false;
  if (name.endsWith("_META")) return false;
  if (name.endsWith("_PATH")) return false;
  return true;
}

function loadDictionary() {
  const dictPath = join(root, "scripts/vi-translation-dictionary.json");
  return JSON.parse(readFileSync(dictPath, "utf8"));
}

function countKeys(obj) {
  return Object.keys(obj).length;
}

function fileSize(path) {
  return readFileSync(path).length;
}

async function importModule(relPath) {
  return import(join(root, relPath));
}

async function buildCareersOverlays(dict) {
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

  const out = {};
  for (const file of FILES) {
    const mod = await importModule(file);
    for (const [key, value] of Object.entries(mod)) {
      if (typeof value === "function" || !shouldIncludeKey(key)) continue;
      if (typeof value === "string" || typeof value === "object") {
        out[key] = buildOverlay(value, dict);
      }
    }
  }
  return out;
}

async function buildProvidersOverlays(dict) {
  const existingPath = join(root, "locales/partials/vi-providers-overlays.json");
  const existing = JSON.parse(readFileSync(existingPath, "utf8"));

  const providerMod = await importModule("lib/providers/provider-content.ts");
  const menuMod = await importModule("lib/providers/provider-menu-data.ts");

  const keys = [
    ...Object.keys(providerMod).filter(shouldIncludeKey),
    "PROVIDERS_MEGA_MENU_LABEL",
    "PROVIDERS_MEGA_MENU_TAGLINE",
    "PROVIDERS_DEFAULT_PREVIEW",
    "PROVIDERS_MENU_ITEMS",
  ];

  const out = { ...existing };
  for (const key of keys) {
    const value = providerMod[key] ?? menuMod[key];
    if (value === undefined) continue;
    out[key] = buildOverlay(value, dict);
  }
  return out;
}

async function main() {
  const dict = loadDictionary();

  const existingCore = JSON.parse(
    readFileSync(join(root, "locales/partials/vi-about-core-overlays.json"), "utf8"),
  );

  const aboutCore = {
    ...existingCore,
    OUR_TEAM_PAGE: OUR_TEAM_PAGE_VI,
    OUR_APPROACH_PAGE: OUR_APPROACH_PAGE_VI,
    MISSION_VALUES_PAGE: MISSION_VALUES_PAGE_VI,
  };

  const aboutPath = join(root, "locales/partials/vi-about-overlays.json");
  writeFileSync(aboutPath, JSON.stringify(ABOUT_OVERLAYS_VI, null, 2) + "\n");

  const corePath = join(root, "locales/partials/vi-about-core-overlays.json");
  writeFileSync(corePath, JSON.stringify(aboutCore, null, 2) + "\n");

  const careers = await buildCareersOverlays(dict);
  const careersPath = join(root, "locales/partials/vi-careers-overlays.json");
  writeFileSync(careersPath, JSON.stringify(careers, null, 2) + "\n");

  const providers = await buildProvidersOverlays(dict);
  const providersPath = join(root, "locales/partials/vi-providers-overlays.json");
  writeFileSync(providersPath, JSON.stringify(providers, null, 2) + "\n");

  const servicesPath = join(root, "locales/partials/vi-services-overlays.json");
  const servicesOverlay = existsSync(servicesPath)
    ? JSON.parse(readFileSync(servicesPath, "utf8"))
    : {};

  console.log("Wrote overlay files (regenerate services via: node scripts/generate-vi-services-overlays.mjs):");
  for (const [label, path, data] of [
    ["vi-about-core-overlays.json", corePath, aboutCore],
    ["vi-about-overlays.json", aboutPath, ABOUT_OVERLAYS_VI],
    ["vi-careers-overlays.json", careersPath, careers],
    ["vi-providers-overlays.json", providersPath, providers],
  ]) {
    console.log(`  ${label}: ${countKeys(data)} keys, ${fileSize(path)} bytes`);
  }
  if (existsSync(servicesPath)) {
    console.log(
      `  vi-services-overlays.json: ${countKeys(servicesOverlay)} keys, ${fileSize(servicesPath)} bytes (unchanged)`,
    );
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
