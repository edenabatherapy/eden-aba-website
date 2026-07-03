/**
 * Wire useLocalizedContent into careers and providers components.
 * Run: node scripts/wire-careers-providers-i18n.mjs
 */
import { readFileSync, writeFileSync, readdirSync, statSync } from "fs";
import { join, dirname, relative } from "path";
import { fileURLToPath } from "url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const careersOverlay = JSON.parse(
  readFileSync(join(root, "locales/partials/vi-careers-overlays.json"), "utf8"),
);
const providersOverlay = JSON.parse(
  readFileSync(join(root, "locales/partials/vi-providers-overlays.json"), "utf8"),
);
const overlayKeys = new Set([...Object.keys(careersOverlay), ...Object.keys(providersOverlay)]);

const SKIP_CONSTS = new Set([
  "EMPTY_FILTERS",
  "SAVED_JOBS_STORAGE_KEY",
  "CENTRALREACH_LOGIN_URL",
  "PROVIDER_HUB_SECTION_IDS",
  "CL_RECRUITING_EMAIL",
  "CAREERS_HOME_RECRUITING_EMAIL",
  "HOMEPAGE_OPEN_JOBS",
  "ADVANCED_LEADERSHIP_PATH_STEPS",
]);

const SCAN_DIRS = [
  "components/careers",
  "components/providers",
  "components/CareersMegaMenu.tsx",
];

function toLocalName(constName) {
  return constName
    .toLowerCase()
    .split("_")
    .map((part, i) => (i === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)))
    .join("");
}

function listTsxFiles(target) {
  const full = join(root, target);
  if (target.endsWith(".tsx")) return [full];
  const files = [];
  for (const entry of readdirSync(full)) {
    const p = join(full, entry);
    if (statSync(p).isDirectory()) {
      files.push(...listTsxFiles(relative(root, p)));
    } else if (entry.endsWith(".tsx")) {
      files.push(p);
    }
  }
  return files;
}

function extractImportedConstants(content) {
  const constants = [];
  const importRegex =
    /import\s+(?:type\s+)?\{([^}]+)\}\s+from\s+["']@\/lib\/(?:careers(?:\/[^"']*)?|providers(?:\/[^"']*)?|careers-content|careers-routes)["']/g;
  let match;
  while ((match = importRegex.exec(content)) !== null) {
    if (match[0].startsWith("import type")) continue;
    for (const part of match[1].split(",")) {
      const trimmed = part.trim();
      if (!trimmed || trimmed.startsWith("type ")) continue;
      const name = trimmed.split(/\s+as\s+/)[0].trim();
      if (/^[A-Z][A-Z0-9_]*$/.test(name) && overlayKeys.has(name) && !SKIP_CONSTS.has(name)) {
        constants.push(name);
      }
    }
  }
  return [...new Set(constants)];
}

function findFunctionBodies(content) {
  const bodies = [];
  const fnRegex =
    /export\s+(?:default\s+)?function\s+(\w+)\s*\([^)]*\)\s*\{/g;
  let match;
  while ((match = fnRegex.exec(content)) !== null) {
    bodies.push({ name: match[1], start: match.index + match[0].length });
  }
  return bodies;
}

function wireFile(filePath) {
  let content = readFileSync(filePath, "utf8");
  const constants = extractImportedConstants(content);
  if (constants.length === 0) return false;

  const alreadyWired = constants.every((c) =>
    content.includes(`useLocalizedContent("${c}"`),
  );
  if (alreadyWired) {
    console.log("Skip (wired):", relative(root, filePath));
    return false;
  }

  const needsClient = constants.length > 0 && !content.includes('"use client"');
  if (needsClient) {
    content = `"use client";\n\n${content}`;
  }

  if (!content.includes('import { useLocalizedContent }')) {
    const firstImport = content.search(/^import /m);
    if (firstImport >= 0) {
      content =
        content.slice(0, firstImport) +
        'import { useLocalizedContent } from "@/hooks/useLocalizedContent";\n' +
        content.slice(firstImport);
    }
  }

  const functions = findFunctionBodies(content);
  if (functions.length === 0) {
    console.warn("No functions:", relative(root, filePath));
    return false;
  }

  const mappings = constants.map((c) => ({ constName: c, local: toLocalName(c) }));

  // Insert hooks into each exported function (reverse order to preserve offsets)
  for (let i = functions.length - 1; i >= 0; i--) {
    const fn = functions[i];
    const fnStart = fn.start;
    const fnBody = content.slice(fnStart);
    const fnConstants = mappings.filter(({ constName }) => {
      const re = new RegExp(`\\b${constName}\\b`);
      return re.test(fnBody);
    });
    if (fnConstants.length === 0) continue;

    const hookBlock =
      fnConstants
        .map(
          ({ constName, local }) =>
            `  const ${local} = useLocalizedContent("${constName}", ${constName});`,
        )
        .join("\n") + "\n";

    content = content.slice(0, fnStart) + hookBlock + content.slice(fnStart);
  }

  const importEnd = content.lastIndexOf("} from ");
  const importEndLine = content.indexOf("\n", importEnd) + 1;
  let head = content.slice(0, importEndLine);
  let body = content.slice(importEndLine);

  const sorted = [...mappings].sort((a, b) => b.constName.length - a.constName.length);
  for (const { constName, local } of sorted) {
    body = body.replace(new RegExp(`\\b${constName}\\b`, "g"), (match, offset, str) => {
      const before = str.slice(Math.max(0, offset - 50), offset);
      if (before.includes(`"${constName}"`) || before.includes(`'${constName}'`)) return match;
      if (before.includes(`useLocalizedContent("`)) return match;
      return local;
    });
  }

  content = head + body;
  writeFileSync(filePath, content);
  console.log("Wired:", relative(root, filePath), `(${constants.join(", ")})`);
  return true;
}

let count = 0;
for (const target of SCAN_DIRS) {
  for (const file of listTsxFiles(target)) {
    if (wireFile(file)) count++;
  }
}

console.log(`Done. Wired ${count} files.`);
