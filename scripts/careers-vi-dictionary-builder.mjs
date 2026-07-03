/**
 * Build scripts/careers-vi-string-map.json from careers English strings.
 * Run: node scripts/collect-careers-strings.mjs && node scripts/careers-vi-dictionary-builder.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { CAREERS_DICTIONARY } from "./vi-dicts/careers-dictionary.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

function main() {
  const unique = JSON.parse(
    readFileSync(join(root, "scripts/.careers-unique-strings.json"), "utf8"),
  );

  const map = { ...CAREERS_DICTIONARY };
  const missing = [];

  for (const s of unique) {
    if (!map[s] && /[a-zA-Z]{3,}/.test(s) && !s.startsWith("/") && !/^\d{4}-\d{2}-\d{2}$/.test(s)) {
      missing.push(s);
    }
  }

  writeFileSync(join(root, "scripts/careers-vi-string-map.json"), JSON.stringify(map, null, 2));
  writeFileSync(join(root, "scripts/.careers-dict-missing.json"), JSON.stringify(missing, null, 2));
  console.log(`Dictionary entries: ${Object.keys(map).length}`);
  console.log(`Missing from dictionary: ${missing.length}`);
}

main();
