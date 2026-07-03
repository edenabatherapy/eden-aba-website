/**
 * Compare Vietnamese overlay strings to English sources for identical untranslated strings.
 *
 * Run:
 *   npx tsx scripts/extract-careers-english.mjs
 *   npx tsx scripts/extract-services-english.mjs
 *   npx tsx scripts/extract-about-overlays-english.mjs
 *   npx tsx scripts/extract-providers-english.mjs
 *   npx tsx scripts/verify-vi-overlays.mjs
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { collectUntranslated } from "./vi-overlay-engine.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const CAREERS_EXCLUDE = new Set([
  "CAREERS_MEGA_MENU_LABEL",
  "CAREERS_MEGA_MENU_ARIA",
  "CAREERS_DEFAULT_PREVIEW",
  "CAREERS_MENU_ITEMS",
  "CAREERS_HOME_SNAPSHOT_STATS",
  "CAREERS_HOME_WHY_JOIN_CARDS",
  "CAREERS_HOME_HERO_JOURNEY",
]);

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

function verifyPair(label, english, overlay, excludeKeys = new Set()) {
  const englishSubset = {};
  for (const [key, value] of Object.entries(english)) {
    if (!excludeKeys.has(key)) englishSubset[key] = value;
  }

  const overlaySubset = {};
  for (const key of Object.keys(englishSubset)) {
    if (overlay[key] !== undefined) overlaySubset[key] = overlay[key];
  }

  const untranslated = collectUntranslated(englishSubset, overlaySubset);
  return { label, untranslated, overlayKeyCount: Object.keys(overlaySubset).length };
}

function summarizeByKey(untranslated) {
  const byKey = {};
  for (const item of untranslated) {
    const topKey = item.path.split(/[.[]/)[0];
    if (!byKey[topKey]) byKey[topKey] = [];
    byKey[topKey].push(item);
  }
  return byKey;
}

function printReport({ label, untranslated, overlayKeyCount }) {
  console.log(`\n=== ${label} ===`);
  console.log(`Overlay keys checked: ${overlayKeyCount}`);
  console.log(`Identical user-facing strings: ${untranslated.length}`);

  if (untranslated.length === 0) {
    console.log("✓ No untranslated strings detected.");
    return 0;
  }

  const preview = untranslated.slice(0, 15);
  console.log("\nSample untranslated strings:");
  for (const item of preview) {
    const text =
      item.english.length > 90 ? `${item.english.slice(0, 90)}…` : item.english;
    console.log(`  [${item.path}] ${text}`);
  }
  if (untranslated.length > preview.length) {
    console.log(`  … and ${untranslated.length - preview.length} more`);
  }

  console.log("\nBy top-level key:");
  for (const [key, items] of Object.entries(summarizeByKey(untranslated)).sort(
    (a, b) => b[1].length - a[1].length,
  )) {
    console.log(`  ${key}: ${items.length}`);
  }
  return untranslated.length;
}

function main() {
  let totalIssues = 0;
  const reports = [];

  reports.push(
    verifyPair(
      "vi-careers-overlays",
      readJson(join(root, "scripts/.careers-english-extract.json")),
      readJson(join(root, "locales/partials/vi-careers-overlays.json")),
      CAREERS_EXCLUDE,
    ),
  );

  if (existsSync(join(root, "scripts/.services-english-extract.json"))) {
    reports.push(
      verifyPair(
        "vi-services-overlays",
        readJson(join(root, "scripts/.services-english-extract.json")),
        readJson(join(root, "locales/partials/vi-services-overlays.json")),
      ),
    );
  }

  reports.push(
    verifyPair(
      "vi-about-overlays",
      readJson(join(root, "scripts/.about-overlays-english-extract.json")),
      readJson(join(root, "locales/partials/vi-about-overlays.json")),
    ),
  );

  const coreEnglish = readJson(join(root, "scripts/.about-core-english-extract.json"));
  const coreOverlay = readJson(join(root, "locales/partials/vi-about-core-overlays.json"));
  reports.push(verifyPair("vi-about-core-overlays", coreEnglish, coreOverlay));

  reports.push(
    verifyPair(
      "vi-providers-overlays",
      readJson(join(root, "scripts/.providers-english-extract.json")),
      readJson(join(root, "locales/partials/vi-providers-overlays.json")),
    ),
  );

  console.log("\n========== VI OVERLAY VERIFICATION SUMMARY ==========");
  for (const report of reports) {
    totalIssues += printReport(report);
  }

  console.log(`\nTotal identical strings across all overlays: ${totalIssues}`);
  process.exit(totalIssues > 0 ? 1 : 0);
}

main();
