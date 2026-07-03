/**
 * Collect all string leaves from careers English extract for translation planning.
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const english = JSON.parse(
  readFileSync(join(root, "scripts/.careers-english-extract.json"), "utf8"),
);

const strings = new Set();

function walk(value, path = "") {
  if (typeof value === "string") {
    strings.add(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((item, i) => walk(item, `${path}[${i}]`));
    return;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      walk(v, path ? `${path}.${k}` : k);
    }
  }
}

for (const [key, value] of Object.entries(english)) {
  walk(value, key);
}

const sorted = [...strings].sort();
writeFileSync(join(root, "scripts/.careers-unique-strings.json"), JSON.stringify(sorted, null, 2));
console.log(`Unique strings: ${sorted.length}`);
