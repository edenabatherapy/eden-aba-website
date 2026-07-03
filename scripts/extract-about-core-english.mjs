/**
 * Extract OUR_TEAM_PAGE, OUR_APPROACH_PAGE, MISSION_VALUES_PAGE English.
 */
import { writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { OUR_TEAM_PAGE } from "../lib/our-team-content.ts";
import { OUR_APPROACH_PAGE } from "../lib/our-approach-content.ts";
import { MISSION_VALUES_PAGE } from "../lib/mission-values-content.ts";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
writeFileSync(
  join(root, "scripts/.about-core-english-extract.json"),
  JSON.stringify({ OUR_TEAM_PAGE, OUR_APPROACH_PAGE, MISSION_VALUES_PAGE }, null, 2),
);
console.log("Wrote about-core english extract");
