/**
 * Generate locales/partials/vi-services-overlays.json from English services exports.
 * Run: npx tsx scripts/extract-services-english.mjs && node scripts/generate-vi-services-overlays.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildOverlay } from "./vi-overlay-engine.mjs";
import { translateCareersString } from "./careers-vi-glossary.mjs";
import { shouldSkipTranslation } from "./careers-vi-auto-translate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function flattenStrings(obj, out = new Set()) {
  if (typeof obj === "string") {
    out.add(obj);
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

function loadDictionary() {
  const dict = {};
  const sources = [
    "scripts/careers-vi-string-map.json",
    "scripts/services-about-vi-string-map.json",
    "scripts/vi-dicts/careers-dictionary-patch.json",
    "scripts/vi-dicts/services-vi-patch.json",
  ];
  for (const rel of sources) {
    try {
      Object.assign(dict, JSON.parse(readFileSync(join(root, rel), "utf8")));
    } catch {
      // optional
    }
  }
  return dict;
}

function buildDictionary(englishData) {
  const dict = loadDictionary();
  const unique = flattenStrings(englishData);

  for (const s of unique) {
    if (shouldSkipTranslation(s)) continue;
    if (dict[s] && dict[s] !== s) continue;
    const translated = translateCareersString(s, dict);
    if (translated !== s) dict[s] = translated;
  }
  return dict;
}

function main() {
  const english = JSON.parse(
    readFileSync(join(root, "scripts/.services-english-extract.json"), "utf8"),
  );

  const dictionary = buildDictionary(english);

  const overlay = {};
  for (const [key, value] of Object.entries(english)) {
    overlay[key] = buildOverlay(value, dictionary);
  }

  const outPath = join(root, "locales/partials/vi-services-overlays.json");
  writeFileSync(outPath, `${JSON.stringify(overlay, null, 2)}\n`);

  console.log(`Wrote ${outPath} with ${Object.keys(overlay).length} keys`);
  console.log(`Dictionary entries: ${Object.keys(dictionary).length}`);
}

main();
