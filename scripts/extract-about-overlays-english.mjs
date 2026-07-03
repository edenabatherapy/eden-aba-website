/**
 * Extract English about overlay exports for verification.
 * Run: npx tsx scripts/extract-about-overlays-english.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const contact = await import(join(root, "lib/about/contact-us-data.ts"));
const clinical = await import(join(root, "lib/about/clinical-quality-data.ts"));
const community = await import(join(root, "lib/about/community-impact-data.ts"));
const story = await import(join(root, "lib/our-story-content.ts"));
const team = await import(join(root, "lib/our-team-content.ts"));
const approach = await import(join(root, "lib/our-approach-content.ts"));
const mission = await import(join(root, "lib/mission-values-content.ts"));

const aboutKeys = [
  "CONTACT_PATHWAY_CARDS",
  "CONTACT_US_FAQ",
  "INQUIRY_TYPES",
  "DIAGNOSIS_STATUS_OPTIONS",
  "CLIENT_SUPPORT_TOPICS",
  "CLINICAL_QUALITY_SECTION_NAV",
  "CLINICAL_QUALITY_METRICS",
  "CLINICAL_PROCESS_TIMELINE",
  "SUPERVISION_STRUCTURE",
  "DATA_DRIVEN_VISUALS",
  "FAMILY_CENTERED_PRINCIPLES",
  "CLINICAL_QUALITY_FAQ",
  "CLINICAL_STANDARDS_POINTS",
  "EVIDENCE_BASED_POINTS",
  "ETHICAL_CARE_POINTS",
  "EXCELLENCE_FRAMEWORK_PILLARS",
  "COMMUNITY_IMPACT_SECTION_NAV",
  "COMMUNITY_STATS",
  "COMMUNITY_TIMELINE",
  "FAMILY_EVENTS",
  "AWARENESS_INITIATIVES",
  "SCHOOL_PARTNERSHIPS",
  "COMMUNITY_PARTNERS",
  "VOLUNTEER_PROGRAMS",
  "ADVOCACY_EDUCATION",
  "SUCCESS_STORIES",
  "ANNUAL_HIGHLIGHTS",
  "FUTURE_INITIATIVES",
  "COMMUNITY_GALLERY",
  "COMMUNITY_VIDEOS",
  "PHOTO_SECTIONS",
];

const about = {};
for (const key of aboutKeys) {
  about[key] = contact[key] ?? clinical[key] ?? community[key];
}

const core = {
  OUR_STORY_PAGE: story.OUR_STORY_PAGE,
  OUR_TEAM_PAGE: team.OUR_TEAM_PAGE,
  OUR_APPROACH_PAGE: approach.OUR_APPROACH_PAGE,
  MISSION_VALUES_PAGE: mission.MISSION_VALUES_PAGE,
};

writeFileSync(join(root, "scripts/.about-overlays-english-extract.json"), JSON.stringify(about, null, 2));
writeFileSync(join(root, "scripts/.about-core-english-extract.json"), JSON.stringify(core, null, 2));
console.log(`Wrote about overlays (${Object.keys(about).length} keys) and core (${Object.keys(core).length} keys)`);
