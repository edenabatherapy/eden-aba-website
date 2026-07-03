/**
 * Generate vi-translation-dictionary.json from English strings.
 * Run: npx tsx scripts/generate-vi-dictionary.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { translateToVi } from "./vi-translate-fn.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const strings = JSON.parse(readFileSync(join(root, "scripts/.overlay-strings-all.json"), "utf8"));

const dict = {};
for (const en of strings) {
  dict[en] = translateToVi(en);
}

const outPath = join(root, "scripts/vi-translation-dictionary.json");
writeFileSync(outPath, JSON.stringify(dict, null, 2) + "\n");

const untranslated = strings.filter((en) => dict[en] === en);
console.log(`Wrote ${Object.keys(dict).length} entries to vi-translation-dictionary.json`);
console.log(`Untranslated (identical): ${untranslated.length}`);
if (untranslated.length > 0 && untranslated.length <= 20) {
  console.log(untranslated);
}
