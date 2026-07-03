/**
 * Extract English provider exports for verification.
 * Run: npx tsx scripts/extract-providers-english.mjs
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const provider = await import(join(root, "lib/providers/provider-content.ts"));
const menu = await import(join(root, "lib/providers/provider-menu-data.ts"));

const english = {};
for (const [key, value] of Object.entries(provider)) {
  if (key.endsWith("_META") || key.endsWith("_PATH") || key === "PROVIDER_HUB_SECTION_IDS") continue;
  if (typeof value === "string" || typeof value === "object") english[key] = value;
}
for (const key of [
  "PROVIDERS_MEGA_MENU_LABEL",
  "PROVIDERS_MEGA_MENU_TAGLINE",
  "PROVIDERS_DEFAULT_PREVIEW",
  "PROVIDERS_MENU_ITEMS",
]) {
  english[key] = menu[key];
}

writeFileSync(join(root, "scripts/.providers-english-extract.json"), JSON.stringify(english, null, 2));
console.log(`Wrote providers english extract (${Object.keys(english).length} keys)`);
