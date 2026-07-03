/**
 * Generate locales/partials/vi-careers-overlays.json from English careers exports.
 * Run: npx tsx scripts/extract-careers-english.mjs && node scripts/generate-vi-careers-overlays.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { buildOverlay } from "./vi-overlay-engine.mjs";
import { translateCareersString } from "./careers-vi-glossary.mjs";
import { shouldSkipTranslation, autoTranslateCareersString } from "./careers-vi-auto-translate.mjs";
import { CAREERS_CORE_TRANSLATIONS } from "./vi-dicts/careers-core-translations.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const EXCLUDE_OVERLAY_KEYS = new Set([
  "CAREERS_MEGA_MENU_LABEL",
  "CAREERS_MEGA_MENU_ARIA",
  "CAREERS_DEFAULT_PREVIEW",
  "CAREERS_MENU_ITEMS",
  "CAREERS_HOME_SNAPSHOT_STATS",
  "CAREERS_HOME_WHY_JOIN_CARDS",
  "CAREERS_HOME_HERO_JOURNEY",
]);

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

function loadExistingDictionary() {
  const dict = {};
  try {
    Object.assign(dict, JSON.parse(readFileSync(join(root, "scripts/careers-vi-string-map.json"), "utf8")));
  } catch {
    // ignore
  }
  Object.assign(dict, CAREERS_CORE_TRANSLATIONS);
  try {
    Object.assign(dict, JSON.parse(readFileSync(join(root, "scripts/vi-dicts/careers-dictionary-patch.json"), "utf8")));
  } catch {
    // ignore
  }
  return dict;
}

function buildDictionary(englishData) {
  const dict = loadExistingDictionary();
  const unique = flattenStrings(englishData);

  for (const s of unique) {
    if (shouldSkipTranslation(s)) continue;
    if (dict[s] && dict[s] !== s) continue;
    const auto = autoTranslateCareersString(s, dict);
    if (auto !== s) {
      dict[s] = auto;
      continue;
    }
    const translated = translateCareersString(s, dict);
    if (translated !== s) dict[s] = translated;
  }
  return dict;
}

function main() {
  const english = JSON.parse(
    readFileSync(join(root, "scripts/.careers-english-extract.json"), "utf8"),
  );

  const dictionary = buildDictionary(english);

  const overlay = {};
  for (const [key, value] of Object.entries(english)) {
    if (EXCLUDE_OVERLAY_KEYS.has(key)) continue;
    overlay[key] = buildOverlay(value, dictionary);
  }

  const outPath = join(root, "locales/partials/vi-careers-overlays.json");
  writeFileSync(outPath, `${JSON.stringify(overlay, null, 2)}\n`);

  const mapPath = join(root, "scripts/careers-vi-string-map.json");
  writeFileSync(mapPath, `${JSON.stringify(dictionary, null, 2)}\n`);

  console.log(`Wrote ${outPath} with ${Object.keys(overlay).length} overlay keys`);
  console.log(`Dictionary entries: ${Object.keys(dictionary).length}`);
}

main();
