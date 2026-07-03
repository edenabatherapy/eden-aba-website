/**
 * Build services/about Vietnamese string map from hand-maintained batch files only.
 * Run: node scripts/build-services-about-vi-string-map.mjs
 */
import { readFileSync, writeFileSync, readdirSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const batchDir = join(root, "scripts/services-about-vi-batches");

function main() {
  const map = {};
  const files = readdirSync(batchDir)
    .filter((f) => f.endsWith(".json"))
    .sort();
  for (const file of files) {
    Object.assign(map, JSON.parse(readFileSync(join(batchDir, file), "utf8")));
  }
  const unique = JSON.parse(
    readFileSync(join(root, "scripts/.services-about-strings.json"), "utf8"),
  );
  const missing = unique.filter((s) => !map[s]);
  const outPath = join(root, "scripts/services-about-vi-string-map.json");
  writeFileSync(outPath, `${JSON.stringify(map, null, 2)}\n`);
  console.log(`Map entries: ${Object.keys(map).length}`);
  console.log(`Missing: ${missing.length}`);
  if (missing.length) {
    writeFileSync(
      join(root, "scripts/.services-about-missing.json"),
      `${JSON.stringify(missing, null, 2)}\n`,
    );
    process.exit(1);
  }
}

main();
