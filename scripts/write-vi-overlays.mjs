/**
 * Write vi-services-overlays.json and expand vi-about-core-overlays.json.
 * Run: npx tsx scripts/write-vi-overlays.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

async function main() {
  const school = await import("../lib/services/school-based-aba-data.ts");
  const screening = await import("../lib/evaluations/screening-evaluation-data.ts");
  const parent = await import("../lib/aba-therapy/parent-training-data.ts");
  const gettingStarted = await import("../lib/getting-started/getting-started-data.ts");
  const englishCore = JSON.parse(
    readFileSync(join(root, "scripts/.en-about-core.json"), "utf8"),
  );
  const existingCore = JSON.parse(
    readFileSync(join(root, "locales/partials/vi-about-core-overlays.json"), "utf8"),
  );

  const map = JSON.parse(
    readFileSync(join(root, "scripts/services-about-vi-string-map.json"), "utf8"),
  );

  const { buildOverlay } = await import("./vi-overlay-engine.mjs");

  const englishServices = {
    SCHOOL_HERO: school.SCHOOL_HERO,
    WHAT_IS_SCHOOL_ABA: school.WHAT_IS_SCHOOL_ABA,
    WHO_BENEFITS: school.WHO_BENEFITS,
    SCHOOL_ABA_TIMELINE: school.SCHOOL_ABA_TIMELINE,
    SERVICES_IN_SCHOOL: school.SERVICES_IN_SCHOOL,
    IEP_TABS: school.IEP_TABS,
    MTSS_TIERS: school.MTSS_TIERS,
    SCHOOL_TEAM: school.SCHOOL_TEAM,
    DATA_TRACKING: school.DATA_TRACKING,
    FAMILY_PARTNERSHIP: school.FAMILY_PARTNERSHIP,
    SCHOOL_ABA_FAQ: school.SCHOOL_ABA_FAQ,
    SCHOOL_RESOURCE_CATEGORIES: school.SCHOOL_RESOURCE_CATEGORIES,
    SCHOOL_RESOURCES: school.SCHOOL_RESOURCES,
    SUCCESS_METRICS: school.SUCCESS_METRICS,
    SCHOOL_CTA: school.SCHOOL_CTA,
    SCREENING_HERO: screening.SCREENING_HERO,
    WHAT_IS_SCREENING: screening.WHAT_IS_SCREENING,
    EARLY_SIGNS: screening.EARLY_SIGNS,
    MCHAT_SECTION: screening.MCHAT_SECTION,
    AUTISM_SCREENING_TOOLS: screening.AUTISM_SCREENING_TOOLS,
    EVALUATION_PROCESS: screening.EVALUATION_PROCESS,
    ADOS2_SECTION: screening.ADOS2_SECTION,
    AFTER_EVALUATION: screening.AFTER_EVALUATION,
    DOCUMENTS_CHECKLIST: screening.DOCUMENTS_CHECKLIST,
    SCREENING_VS_EVALUATION: screening.SCREENING_VS_EVALUATION,
    SCREENING_EVALUATION_FAQ: screening.SCREENING_EVALUATION_FAQ,
    SCREENING_CTA: screening.SCREENING_CTA,
    SCREENING_RELATED_LINKS: screening.SCREENING_RELATED_LINKS,
    PARENT_TRAINING_HERO: parent.PARENT_TRAINING_HERO,
    WHAT_IS_PARENT_TRAINING: parent.WHAT_IS_PARENT_TRAINING,
    WHY_PARENT_INVOLVEMENT: parent.WHY_PARENT_INVOLVEMENT,
    PARENT_GUIDES_SECTION: parent.PARENT_GUIDES_SECTION,
    FAMILY_TRAINING_SECTION: parent.FAMILY_TRAINING_SECTION,
    DOWNLOADABLE_RESOURCES: parent.DOWNLOADABLE_RESOURCES,
    PARENT_TRAINING_FAQ: parent.PARENT_TRAINING_FAQ,
    PARENT_TRAINING_CTA: parent.PARENT_TRAINING_CTA,
    PARENT_TRAINING_RELATED_LINKS: parent.PARENT_TRAINING_RELATED_LINKS,
    GETTING_STARTED_RESOURCES: gettingStarted.GETTING_STARTED_RESOURCES,
  };

  const servicesOverlay = {};
  for (const [key, value] of Object.entries(englishServices)) {
    servicesOverlay[key] = buildOverlay(value, map);
  }

  const servicesPath = join(root, "locales/partials/vi-services-overlays.json");
  writeFileSync(servicesPath, `${JSON.stringify(servicesOverlay, null, 2)}\n`);

  const expandedCore = { ...existingCore };
  for (const key of ["OUR_TEAM_PAGE", "OUR_APPROACH_PAGE", "MISSION_VALUES_PAGE"]) {
    expandedCore[key] = buildOverlay(englishCore[key], map);
  }

  const corePath = join(root, "locales/partials/vi-about-core-overlays.json");
  writeFileSync(corePath, `${JSON.stringify(expandedCore, null, 2)}\n`);

  const { collectUntranslated } = await import("./vi-overlay-engine.mjs");
  let issues = 0;
  for (const [key, value] of Object.entries(englishServices)) {
    issues += collectUntranslated(value, servicesOverlay[key]).length;
  }
  for (const key of ["OUR_TEAM_PAGE", "OUR_APPROACH_PAGE", "MISSION_VALUES_PAGE"]) {
    issues += collectUntranslated(englishCore[key], expandedCore[key]).length;
  }

  const svcSize = readFileSync(servicesPath).length;
  const coreSize = readFileSync(corePath).length;
  console.log(`Wrote ${servicesPath} (${svcSize} bytes)`);
  console.log(`Wrote ${corePath} (${coreSize} bytes)`);
  console.log(`Untranslated strings remaining: ${issues}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
