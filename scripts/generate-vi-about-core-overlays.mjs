/**
 * Generate vi-about-core-overlays for OUR_TEAM, OUR_APPROACH, MISSION_VALUES pages.
 * Run: npx tsx scripts/extract-about-core-english.mjs && node scripts/generate-vi-about-core-overlays.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { setStringMap, translateOverlay } from "./careers-vi-translator.mjs";
import { autoTranslateCareersString, shouldSkipTranslation } from "./careers-vi-auto-translate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function flattenStrings(obj, out = {}) {
  if (typeof obj === "string") {
    out[obj] = obj;
    return out;
  }
  if (Array.isArray(obj)) {
    for (const item of obj) flattenStrings(item, out);
    return out;
  }
  if (obj && typeof obj === "object") {
    for (const v of Object.values(obj)) flattenStrings(v, out);
  }
  return out;
}

function buildStringMap(englishData) {
  const map = {};
  const existing = JSON.parse(readFileSync(join(root, "locales/partials/vi-about-core-overlays.json"), "utf8"));
  flattenStrings(existing, map);
  const unique = new Set();
  flattenStrings(englishData, unique);
  for (const s of Object.keys(unique)) {
    if (map[s] || shouldSkipTranslation(s)) continue;
    const auto = autoTranslateCareersString(s, map);
    if (auto !== s) map[s] = auto;
  }
  return map;
}

function main() {
  const english = JSON.parse(readFileSync(join(root, "scripts/.about-core-english-extract.json"), "utf8"));
  const existing = JSON.parse(readFileSync(join(root, "locales/partials/vi-about-core-overlays.json"), "utf8"));
  const stringMap = buildStringMap(english);
  setStringMap(stringMap);
  const translated = translateOverlay(english);
  const merged = { ...existing, ...translated };
  writeFileSync(join(root, "locales/partials/vi-about-core-overlays.json"), JSON.stringify(merged, null, 2) + "\n");
  console.log(`Wrote vi-about-core-overlays.json with ${Object.keys(merged).length} keys`);
}

main();
