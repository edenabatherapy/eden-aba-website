/**
 * Wire useLocalizedContent into monolithic page components.
 * Run: node scripts/wire-all-localized-pages.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const configs = [
  {
    file: "components/services/school-based-aba/SchoolBasedAbaPage.tsx",
    hookImportAfter: 'import SchoolBasedAbaPageSchema from "@/components/services/school-based-aba/SchoolBasedAbaPageSchema";',
    constants: [
      "DATA_TRACKING", "FAMILY_PARTNERSHIP", "IEP_TABS", "MTSS_TIERS", "SCHOOL_ABA_FAQ",
      "SCHOOL_ABA_TIMELINE", "SCHOOL_CTA", "SCHOOL_HERO", "SCHOOL_RESOURCE_CATEGORIES",
      "SCHOOL_RESOURCES", "SCHOOL_TEAM", "SERVICES_IN_SCHOOL", "SUCCESS_METRICS",
      "WHAT_IS_SCHOOL_ABA", "WHO_BENEFITS",
    ],
  },
  {
    file: "components/evaluations/ScreeningEvaluationPage.tsx",
    hookImportAfter: 'import ScreeningEvaluationPageSchema from "@/components/evaluations/ScreeningEvaluationPageSchema";',
    constants: [
      "ADOS2_SECTION", "AFTER_EVALUATION", "AUTISM_SCREENING_TOOLS", "DOCUMENTS_CHECKLIST",
      "EARLY_SIGNS", "EVALUATION_PROCESS", "MCHAT_SECTION", "SCREENING_CTA",
      "SCREENING_EVALUATION_FAQ", "SCREENING_HERO", "SCREENING_RELATED_LINKS",
      "SCREENING_VS_EVALUATION", "WHAT_IS_SCREENING",
    ],
  },
  {
    file: "components/about/clinical-quality/ClinicalQualityPage.tsx",
    hookImportAfter: 'import FAQAccordion from "@/components/careers/hub/FAQAccordion";',
    constants: [
      "CLINICAL_PROCESS_TIMELINE", "CLINICAL_QUALITY_FAQ", "CLINICAL_QUALITY_METRICS",
      "CLINICAL_QUALITY_SECTION_NAV", "CLINICAL_STANDARDS_POINTS", "DATA_DRIVEN_VISUALS",
      "ETHICAL_CARE_POINTS", "EVIDENCE_BASED_POINTS", "EXCELLENCE_FRAMEWORK_PILLARS",
      "FAMILY_CENTERED_PRINCIPLES", "SUPERVISION_STRUCTURE",
    ],
  },
];

function toLocalName(constName) {
  return constName
    .toLowerCase()
    .split("_")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

function wireConfig({ file, hookImportAfter, constants }) {
  const fullPath = join(root, file);
  let content = readFileSync(fullPath, "utf8");

  if (content.includes("useLocalizedContent")) {
    console.log("Skip (already has hook):", file);
    return;
  }

  content = content.replace(
    hookImportAfter,
    `${hookImportAfter}\nimport { useLocalizedContent } from "@/hooks/useLocalizedContent";`
  );

  const mappings = constants.map((c) => ({ constName: c, local: toLocalName(c) }));
  const hookBlock = mappings
    .map(({ constName, local }) => `  const ${local} = useLocalizedContent("${constName}", ${constName});`)
    .join("\n");

  // Insert after function opening - find first const in function body
  const fnMatch = content.match(/export default function \w+\(\) \{\n/);
  if (!fnMatch) {
    console.warn("No function found:", file);
    return;
  }
  const insertAt = fnMatch.index + fnMatch[0].length;
  content = content.slice(0, insertAt) + hookBlock + "\n" + content.slice(insertAt);

  // Replace usages outside import statements
  const importEnd = content.lastIndexOf("} from ");
  const importEndLine = content.indexOf("\n", importEnd) + 1;
  let head = content.slice(0, importEndLine);
  let body = content.slice(importEndLine);

  const sorted = [...mappings].sort((a, b) => b.constName.length - a.constName.length);
  for (const { constName, local } of sorted) {
    body = body.split(constName).join(local);
  }
  content = head + body;

  writeFileSync(fullPath, content);
  console.log("Wired:", file);
}

for (const config of configs) {
  wireConfig(config);
}

console.log("Done.");
