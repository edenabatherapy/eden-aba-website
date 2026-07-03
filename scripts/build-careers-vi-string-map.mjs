/**
 * Build comprehensive careers Vietnamese string map from unique English strings.
 * Run: node scripts/collect-careers-strings.mjs && node scripts/build-careers-vi-string-map.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { shouldSkipTranslation } from "./careers-vi-auto-translate.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// Load hand-maintained batch translations
const batchFiles = [
  "scripts/careers-vi-batches/batch-01.json",
  "scripts/careers-vi-batches/batch-02.json",
  "scripts/careers-vi-batches/batch-03.json",
  "scripts/careers-vi-batches/batch-04.json",
  "scripts/careers-vi-batches/batch-05.json",
  "scripts/careers-vi-batches/batch-06.json",
  "scripts/careers-vi-batches/batch-07.json",
  "scripts/careers-vi-batches/batch-08.json",
  "scripts/careers-vi-batches/batch-09.json",
  "scripts/careers-vi-batches/batch-10.json",
  "scripts/careers-vi-batches/batch-11.json",
  "scripts/careers-vi-batches/batch-12.json",
  "scripts/careers-vi-batches/batch-13.json",
];

function loadBatches() {
  const map = {};
  for (const file of batchFiles) {
    try {
      const batch = JSON.parse(readFileSync(join(root, file), "utf8"));
      Object.assign(map, batch);
    } catch {
      // batch not yet created
    }
  }
  return map;
}

function main() {
  const unique = JSON.parse(
    readFileSync(join(root, "scripts/.careers-unique-strings.json"), "utf8"),
  );
  const map = loadBatches();
  const missing = [];

  for (const s of unique) {
    if (shouldSkipTranslation(s)) continue;
    if (!map[s]) missing.push(s);
  }

  const outPath = join(root, "scripts/careers-vi-string-map.json");
  writeFileSync(outPath, JSON.stringify(map, null, 2));
  console.log(`Map entries: ${Object.keys(map).length}`);
  console.log(`Missing translations: ${missing.length}`);
  if (missing.length > 0) {
    writeFileSync(
      join(root, "scripts/.careers-missing-translations.json"),
      JSON.stringify(missing, null, 2),
    );
  }
}

main();
