/**
 * Extract English app-data exports for overlay verification.
 * Run: npx tsx scripts/extract-app-data-keys.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const modules = [
  { file: "../lib/our-story-content.ts", keys: ["OUR_STORY_PAGE"] },
  { file: "../lib/our-team-content.ts", keys: ["OUR_TEAM_PAGE"] },
  { file: "../lib/our-approach-content.ts", keys: ["OUR_APPROACH_PAGE"] },
  { file: "../lib/mission-values-content.ts", keys: ["MISSION_VALUES_PAGE"] },
  { file: "../lib/our-story-content.ts", keys: ["OUR_STORY_PAGE"] },
];

async function main() {
  const out = {};
  for (const mod of modules) {
    const imported = await import(join(root, mod.file.replace("../", "")));
    for (const key of mod.keys) {
      out[key] = imported[key];
    }
  }
  writeFileSync(join(root, "scripts/.extracted-app-data.json"), JSON.stringify(out, null, 2));
  console.log("Wrote scripts/.extracted-app-data.json");
}

main().catch(console.error);
