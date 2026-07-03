/**
 * Bulk-generate vi-translation-dictionary.json from English overlay strings.
 * Embeds comprehensive Vietnamese translations for careers, services, and providers.
 * Run: npx tsx scripts/seed-vi-dictionary.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { ABOUT_OVERLAYS_VI } from "./vi-dicts/about-pages.mjs";
import { OUR_TEAM_PAGE_VI } from "./vi-dicts/about-core.mjs";
import { OUR_APPROACH_PAGE_VI, MISSION_VALUES_PAGE_VI } from "./vi-dicts/about-approach-mission.mjs";
import { SERVICES_OVERLAYS_VI } from "./vi-dicts/services-pages.mjs";
import { buildOverlay } from "./vi-overlay-engine.mjs";
import { CAREERS_STRING_DICT } from "./vi-dicts/careers-string-dict.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function collectStringPairs(en, vi, pairs) {
  if (typeof en === "string" && typeof vi === "string" && en !== vi) {
    pairs.push([en, vi]);
    return;
  }
  if (Array.isArray(en) && Array.isArray(vi)) {
    en.forEach((item, i) => collectStringPairs(item, vi[i], pairs));
    return;
  }
  if (en && typeof en === "object" && vi && typeof vi === "object") {
    for (const [k, v] of Object.entries(en)) {
      if (vi[k] !== undefined) collectStringPairs(v, vi[k], pairs);
    }
  }
}

async function main() {
  const strings = JSON.parse(readFileSync(join(root, "scripts/.overlay-strings-all.json"), "utf8"));
  const dict = { ...CAREERS_STRING_DICT };

  // Seed from handcrafted overlays
  const pairs = [];
  const existingCore = JSON.parse(readFileSync(join(root, "locales/partials/vi-about-core-overlays.json"), "utf8"));
  const storyMod = await import(join(root, "lib/our-story-content.ts"));
  collectStringPairs(storyMod.OUR_STORY_PAGE, existingCore.OUR_STORY_PAGE, pairs);
  collectStringPairs(storyMod.OUR_TEAM_PAGE, OUR_TEAM_PAGE_VI, pairs);
  collectStringPairs((await import(join(root, "lib/our-approach-content.ts"))).OUR_APPROACH_PAGE, OUR_APPROACH_PAGE_VI, pairs);
  collectStringPairs((await import(join(root, "lib/mission-values-content.ts"))).MISSION_VALUES_PAGE, MISSION_VALUES_PAGE_VI, pairs);

  const contactMod = await import(join(root, "lib/about/contact-us-data.ts"));
  for (const key of ["CONTACT_PATHWAY_CARDS", "CONTACT_US_FAQ", "INQUIRY_TYPES", "DIAGNOSIS_STATUS_OPTIONS", "CLIENT_SUPPORT_TOPICS"]) {
    if (ABOUT_OVERLAYS_VI[key]) collectStringPairs(contactMod[key], ABOUT_OVERLAYS_VI[key], pairs);
  }

  const clinicalMod = await import(join(root, "lib/about/clinical-quality-data.ts"));
  for (const key of Object.keys(ABOUT_OVERLAYS_VI)) {
    if (clinicalMod[key]) collectStringPairs(clinicalMod[key], ABOUT_OVERLAYS_VI[key], pairs);
  }

  const communityMod = await import(join(root, "lib/about/community-impact-data.ts"));
  for (const key of Object.keys(ABOUT_OVERLAYS_VI)) {
    if (communityMod[key]) collectStringPairs(communityMod[key], ABOUT_OVERLAYS_VI[key], pairs);
  }

  for (const [key, vi] of Object.entries(SERVICES_OVERLAYS_VI)) {
    const svcFiles = [
      "lib/services/school-based-aba-data.ts",
      "lib/evaluations/screening-evaluation-data.ts",
      "lib/aba-therapy/parent-training-data.ts",
      "lib/getting-started/getting-started-data.ts",
    ];
    for (const file of svcFiles) {
      const mod = await import(join(root, file));
      if (mod[key]) {
        collectStringPairs(mod[key], vi, pairs);
        break;
      }
    }
  }

  const providersVi = JSON.parse(readFileSync(join(root, "locales/partials/vi-providers-overlays.json"), "utf8"));
  const providerMod = await import(join(root, "lib/providers/provider-content.ts"));
  const menuMod = await import(join(root, "lib/providers/provider-menu-data.ts"));
  for (const [key, vi] of Object.entries(providersVi)) {
    const en = providerMod[key] ?? menuMod[key];
    if (en) collectStringPairs(en, vi, pairs);
  }

  for (const [en, vi] of pairs) {
    if (en && vi && en !== vi) dict[en] = vi;
  }

  // Apply careers string dict to any remaining strings
  for (const en of strings) {
    if (!dict[en] && CAREERS_STRING_DICT[en]) {
      dict[en] = CAREERS_STRING_DICT[en];
    }
  }

  const outPath = join(root, "scripts/vi-translation-dictionary.json");
  writeFileSync(outPath, JSON.stringify(dict, null, 2) + "\n");

  const chunksDir = join(root, "scripts/vi-dicts/chunks");
  if (!existsSync(chunksDir)) mkdirSync(chunksDir, { recursive: true });

  const untranslated = strings.filter((en) => !dict[en] || dict[en] === en);
  console.log(`Dictionary: ${Object.keys(dict).length} entries`);
  console.log(`Still identical to English: ${untranslated.length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
