import { readFileSync, writeFileSync } from "fs";
import { collectUntranslated } from "./vi-overlay-engine.mjs";

const EXCLUDE = new Set([
  "CAREERS_MEGA_MENU_LABEL",
  "CAREERS_MEGA_MENU_ARIA",
  "CAREERS_DEFAULT_PREVIEW",
  "CAREERS_MENU_ITEMS",
  "CAREERS_HOME_SNAPSHOT_STATS",
  "CAREERS_HOME_WHY_JOIN_CARDS",
  "CAREERS_HOME_HERO_JOURNEY",
]);

const english = JSON.parse(readFileSync("scripts/.careers-english-extract.json", "utf8"));
const overlay = JSON.parse(readFileSync("locales/partials/vi-careers-overlays.json", "utf8"));
const sub = {};
for (const [k, v] of Object.entries(english)) {
  if (!EXCLUDE.has(k)) sub[k] = v;
}
const issues = collectUntranslated(sub, overlay);
const unique = [...new Set(issues.map((i) => i.english))].sort();
writeFileSync("scripts/.careers-untranslated.json", JSON.stringify(unique, null, 2));
console.log(unique.length);
