/**
 * Generate full careers Vietnamese string map by translating all unique strings.
 * Run: node scripts/collect-careers-strings.mjs && node scripts/careers-vi-translate-all.mjs
 */
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { shouldSkipTranslation } from "./careers-vi-auto-translate.mjs";
import { translateCareersString } from "./careers-vi-glossary.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function main() {
  const unique = JSON.parse(
    readFileSync(join(root, "scripts/.careers-unique-strings.json"), "utf8"),
  );

  const manual = {};
  try {
    const batchDir = join(root, "scripts/careers-vi-batches");
    mkdirSync(batchDir, { recursive: true });
    for (const file of readdirSync(batchDir)) {
      if (file.endsWith(".json")) {
        Object.assign(manual, JSON.parse(readFileSync(join(batchDir, file), "utf8")));
      }
    }
  } catch {
    mkdirSync(join(root, "scripts/careers-vi-batches"), { recursive: true });
  }

  const map = { ...manual };
  const stillEnglish = [];

  for (const s of unique) {
    if (shouldSkipTranslation(s)) continue;
    if (map[s]) continue;
    const translated = translateCareersString(s, map);
    if (translated !== s) {
      map[s] = translated;
    } else {
      stillEnglish.push(s);
    }
  }

  writeFileSync(join(root, "scripts/careers-vi-string-map.json"), JSON.stringify(map, null, 2));
  writeFileSync(
    join(root, "scripts/.careers-still-english.json"),
    JSON.stringify(stillEnglish, null, 2),
  );
  console.log(`Map size: ${Object.keys(map).length}`);
  console.log(`Still English: ${stillEnglish.length}`);
}

main();
