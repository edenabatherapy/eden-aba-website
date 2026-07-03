/**
 * Extract English services exports for vi-services-overlays generation.
 * Run: npx tsx scripts/extract-services-english.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const modules = [
  { mod: await import(join(root, "lib/services/school-based-aba-data.ts")), exclude: ["SCHOOL_BASED_ABA_META"] },
  { mod: await import(join(root, "lib/evaluations/screening-evaluation-data.ts")), exclude: ["SCREENING_EVALUATION_META"] },
  { mod: await import(join(root, "lib/aba-therapy/parent-training-data.ts")), exclude: ["PARENT_TRAINING_META"] },
  { mod: await import(join(root, "lib/getting-started/getting-started-data.ts")), keys: ["GETTING_STARTED_RESOURCES"] },
];

const out = {};
for (const { mod, exclude = [], keys } of modules) {
  for (const [key, value] of Object.entries(mod)) {
    if (key === "default" || exclude.includes(key)) continue;
    if (keys && !keys.includes(key)) continue;
    if (typeof value === "function") continue;
    out[key] = value;
  }
}

writeFileSync(join(root, "scripts/.services-english-extract.json"), JSON.stringify(out, null, 2));
console.log(`Wrote ${Object.keys(out).length} keys to scripts/.services-english-extract.json`);
