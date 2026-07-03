/**
 * Wire About page subcomponents to use context hooks.
 * Run: node scripts/wire-about-i18n.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const mappings = [
  {
    files: [
      "components/about/HeroSection.tsx",
      "components/about/StorySection.tsx",
      "components/about/MissionSection.tsx",
      "components/about/ValuesSection.tsx",
      "components/about/ApproachSection.tsx",
      "components/about/HistoryTimeline.tsx",
      "components/about/TeamSection.tsx",
      "components/about/FutureSection.tsx",
      "components/about/ImpactSection.tsx",
      "components/about/FinalCTA.tsx",
    ],
    oldImport: 'import { OUR_STORY_PAGE } from "@/lib/our-story-content";',
    newImport: 'import { useOurStoryPage } from "@/contexts/OurStoryContent";',
    replacements: [
      ["OUR_STORY_PAGE.", "useOurStoryPage()."],
      ["const values = OUR_STORY_PAGE.values.items;", "const values = useOurStoryPage().values.items;"],
      ["const content = OUR_STORY_PAGE.", "const page = useOurStoryPage();\n  const content = page."],
    ],
  },
  {
    files: [
      "components/about/TeamHero.tsx",
      "components/about/FoundersSection.tsx",
      "components/about/LeadershipVisionSection.tsx",
      "components/about/ClinicalStructureSection.tsx",
      "components/about/RecruitingSection.tsx",
      "components/about/WhyJoinEdenSection.tsx",
      "components/about/TeamValuesSection.tsx",
      "components/about/GrowthTimelineSection.tsx",
      "components/about/TeamFinalCTA.tsx",
    ],
    oldImport: 'import { OUR_TEAM_PAGE } from "@/lib/our-team-content";',
    newImport: 'import { useOurTeamPage } from "@/contexts/OurTeamContent";',
    replacements: [["OUR_TEAM_PAGE.", "useOurTeamPage()."]],
  },
  {
    files: [
      "components/about/ApproachHero.tsx",
      "components/about/ApproachPhilosophy.tsx",
      "components/about/PersonalizedCollaborative.tsx",
      "components/about/ChildFocusedLearning.tsx",
      "components/about/PositiveReinforcement.tsx",
      "components/about/HolisticDevelopment.tsx",
      "components/about/ClinicalProcess.tsx",
      "components/about/TreatmentSettings.tsx",
      "components/about/DataDrivenProgress.tsx",
      "components/about/LifelongGrowth.tsx",
      "components/about/ApproachValuesPreview.tsx",
      "components/about/ApproachFAQ.tsx",
      "components/about/ApproachFinalCTA.tsx",
    ],
    oldImport: 'import { OUR_APPROACH_PAGE } from "@/lib/our-approach-content";',
    newImport: 'import { useOurApproachPage } from "@/contexts/OurApproachContent";',
    replacements: [["OUR_APPROACH_PAGE.", "useOurApproachPage()."]],
  },
  {
    files: [
      "components/about/MissionValuesHero.tsx",
      "components/about/MissionValuesMissionSection.tsx",
      "components/about/MissionValuesVisionSection.tsx",
      "components/about/CoreValuesSection.tsx",
      "components/about/MissionImpactSection.tsx",
      "components/about/MissionValuesOutcomesSection.tsx",
      "components/about/EdenDifferenceSection.tsx",
      "components/about/MissionInActionSection.tsx",
      "components/about/MissionFinalCTA.tsx",
    ],
    oldImport: 'import { MISSION_VALUES_PAGE } from "@/lib/mission-values-content";',
    newImport: 'import { useMissionValuesPage } from "@/contexts/MissionValuesContent";',
    replacements: [["MISSION_VALUES_PAGE.", "useMissionValuesPage()."]],
  },
];

for (const { files, oldImport, newImport, replacements } of mappings) {
  for (const file of files) {
    const fullPath = join(root, file);
    let content = readFileSync(fullPath, "utf8");
    if (!content.includes(oldImport)) {
      console.warn("Skip (no import):", file);
      continue;
    }
    content = content.replace(oldImport, newImport);
    for (const [from, to] of replacements) {
      content = content.split(from).join(to);
    }
    writeFileSync(fullPath, content);
    console.log("Updated:", file);
  }
}

console.log("Done wiring about subcomponents.");
