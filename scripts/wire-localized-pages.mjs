/**
 * Add useLocalizedContent hooks to monolithic page components.
 * Run: node scripts/wire-localized-pages.mjs
 */
import { readFileSync, writeFileSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const pages = [
  {
    file: "components/aba-therapy/ParentTrainingPage.tsx",
    imports: [
      ["DOWNLOADABLE_RESOURCES", "DOWNLOADABLE_RESOURCES"],
      ["FAMILY_TRAINING_SECTION", "FAMILY_TRAINING_SECTION"],
      ["PARENT_GUIDES_SECTION", "PARENT_GUIDES_SECTION"],
      ["PARENT_TRAINING_CTA", "PARENT_TRAINING_CTA"],
      ["PARENT_TRAINING_HERO", "PARENT_TRAINING_HERO"],
      ["PARENT_TRAINING_RELATED_LINKS", "PARENT_TRAINING_RELATED_LINKS"],
      ["PARENT_TRAINING_FAQ", "PARENT_TRAINING_FAQ"],
      ["WHAT_IS_PARENT_TRAINING", "WHAT_IS_PARENT_TRAINING"],
      ["WHY_PARENT_INVOLVEMENT", "WHY_PARENT_INVOLVEMENT"],
    ],
  },
];

function wirePage({ file, imports }) {
  const fullPath = join(root, file);
  let content = readFileSync(fullPath, "utf8");

  if (content.includes("useLocalizedContent")) {
    console.log("Already wired:", file);
    return;
  }

  if (!content.includes('import { useLocalizedContent }')) {
    content = content.replace(
      /import ParentTrainingPageSchema/,
      'import { useLocalizedContent } from "@/hooks/useLocalizedContent";\nimport ParentTrainingPageSchema'
    );
  }

  const hookLines = imports
    .map(([key, constName]) => {
      const varName = constName
        .replace(/_PAGE$/, "")
        .split("_")
        .map((w, i) => (i === 0 ? w.toLowerCase() : w.charAt(0) + w.slice(1).toLowerCase()))
        .join("");
      const alias = varName.replace(/([A-Z])/g, (_, c, o) => (o ? c.toLowerCase() : c)).replace(/^parentTraining/, "pt").replace(/^school/, "school");
      return { key, constName, varName: constName.charAt(0).toLowerCase() + constName.slice(1).replace(/_([a-z])/gi, (_, c) => c.toUpperCase()) };
    });

  // Simpler: use lc prefix
  const hooks = imports.map(([key, constName]) => {
    const local = "lc" + constName.split("_").map(w => w[0] + w.slice(1).toLowerCase()).join("");
    return { key, constName, local: constName.replace(/_([A-Z])/g, (_, c) => c).replace(/^./, (m) => m.toLowerCase()) };
  });

  // Build hook block
  const hookBlock = hooks
    .map(({ key, constName, local }) => `  const ${local} = useLocalizedContent("${key}", ${constName});`)
    .join("\n");

  content = content.replace(
    /export default function (\w+)\(\) \{\n  const reduceMotion/,
    `export default function $1() {\n${hookBlock}\n  const reduceMotion`
  );

  for (const { constName, local } of hooks) {
    content = content.split(constName + ".").join(local + ".");
    content = content.split("{" + constName + "}").join("{" + local + "}");
    content = content.split("(" + constName + ")").join("(" + local + ")");
    content = content.split(" " + constName + " ").join(" " + local + " ");
    content = content.split(" " + constName + ",").join(" " + local + ",");
    content = content.split(" " + constName + ";").join(" " + local + ";");
    content = content.split(">" + constName + "<").join(">" + local + "<");
    content = content.split("={" + constName + "}").join("={" + local + "}");
    content = content.split("typeof " + constName).join("typeof " + local);
  }

  writeFileSync(fullPath, content);
  console.log("Wired:", file);
}

for (const page of pages) {
  wirePage(page);
}

console.log("Done.");
