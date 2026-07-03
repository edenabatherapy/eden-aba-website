/**
 * Vietnamese translation function for overlay strings.
 * Loads chunk dictionaries and applies preserve-term protection.
 */
import { readFileSync, existsSync } from "fs";
import { join, dirname } from "path";
import { fileURLToPath } from "url";
import { PRESERVE_TERMS } from "./vi-overlay-engine.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

const PRESERVE_EXACT = new Set([
  ...PRESERVE_TERMS,
  "ABA",
  "BT",
  "RBT",
  "BCBA",
  "ADOS-2",
  "M-CHAT-R",
  "M-CHAT-R/F",
  "CAST",
  "CAST (Childhood Autism Spectrum Test)",
  "Phase 1",
  "Phase 2",
  "Phase 3",
  "Phase 4",
  "Step 1",
  "Step 2",
  "Step 3",
  "Step 4",
  "Step 5",
  "Step 6",
  "Step 7",
  "Step 8",
  "01",
  "02",
  "03",
  "04",
  "2022",
  "2023",
  "2024",
  "2025",
  "2026",
  "1913",
  "1938",
  "1998",
  "Hôm nay",
  "Today",
  "wide",
  "tall",
  "normal",
  "clinical",
  "leadership",
  "training",
  "client",
  "operations",
  "administration",
  "home",
  "clinic",
  "school",
  "family",
  "evaluation",
  "screening",
  "aba",
  "insurance",
  "intake",
  "documentation",
  "user-plus",
  "layout-grid",
  "log-in",
  "route",
  "handshake",
  "#our-founders",
  "A",
  "of",
  "Annandale",
  "Fairfax",
  "Alexandria",
  "Arlington",
  "Centreville",
  "Chantilly",
  "Herndon",
  "Reston",
  "Manassas",
  "Woodbridge",
  "Falls Church",
  "Springfield",
  "Tysons",
  "Vienna",
  "McLean",
  "Annandale, VA",
  "Fairfax, VA",
  "Alexandria, VA",
  "Arlington, VA",
  "Falls Church, VA",
  "Springfield, VA",
  "Tysons, VA",
  "Vienna, VA",
  "McLean, VA",
  "Woodbridge, VA",
  "Manassas, VA",
  "(703) 587-5238",
  "7700 Little River Turnpike, Suite 304, Annandale, VA 22003",
  "bg-amber-100 text-amber-900",
  "bg-emerald-100 text-emerald-800",
  "text-emerald-700",
  "text-teal-700",
  "from-amber-50 via-white to-emerald-50",
  "from-emerald-50 via-white to-teal-50",
]);

let _dict = null;

function loadDict() {
  if (_dict) return _dict;
  _dict = {};
  const mainPath = join(root, "scripts/vi-translation-dictionary.json");
  if (existsSync(mainPath)) {
    Object.assign(_dict, JSON.parse(readFileSync(mainPath, "utf8")));
  }
  const chunksDir = join(root, "scripts/vi-dicts/chunks");
  if (existsSync(chunksDir)) {
    const { readdirSync } = await import("fs");
    for (const file of readdirSync(chunksDir).filter((f) => f.endsWith(".json"))) {
      Object.assign(_dict, JSON.parse(readFileSync(join(chunksDir, file), "utf8")));
    }
  }
  return _dict;
}

// Sync loader for chunks at import time
function loadDictSync() {
  if (_dict) return _dict;
  _dict = {};
  const mainPath = join(root, "scripts/vi-translation-dictionary.json");
  if (existsSync(mainPath)) {
    try {
      Object.assign(_dict, JSON.parse(readFileSync(mainPath, "utf8")));
    } catch {
      /* empty */
    }
  }
  try {
    const { readdirSync } = require("fs");
    const chunksDir = join(root, "scripts/vi-dicts/chunks");
    if (existsSync(chunksDir)) {
      for (const file of readdirSync(chunksDir).filter((f) => f.endsWith(".json"))) {
        Object.assign(_dict, JSON.parse(readFileSync(join(chunksDir, file), "utf8")));
      }
    }
  } catch {
    /* fs readdir in ESM - use import below */
  }
  return _dict;
}

// ESM-compatible chunk loading
import { readdirSync } from "fs";
function initDict() {
  if (_dict) return _dict;
  _dict = {};
  const mainPath = join(root, "scripts/vi-translation-dictionary.json");
  if (existsSync(mainPath)) {
    try {
      Object.assign(_dict, JSON.parse(readFileSync(mainPath, "utf8")));
    } catch {
      /* empty */
    }
  }
  const chunksDir = join(root, "scripts/vi-dicts/chunks");
  if (existsSync(chunksDir)) {
    for (const file of readdirSync(chunksDir).filter((f) => f.endsWith(".json"))) {
      Object.assign(_dict, JSON.parse(readFileSync(join(chunksDir, file), "utf8")));
    }
  }
  return _dict;
}

function shouldPreserve(s) {
  if (!s || typeof s !== "string") return true;
  if (PRESERVE_EXACT.has(s)) return true;
  if (/^https?:\/\//.test(s)) return true;
  if (/^\/[\w#?=&/-]+$/.test(s)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(s)) return true;
  if (/^\+?\d[\d\s().-]{7,}$/.test(s)) return true;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return true;
  if (/^\/images\//.test(s)) return true;
  if (/^bg-|^text-|^from-/.test(s)) return true;
  if (/^[A-Z][a-z]+, VA/.test(s)) return true;
  return false;
}

function protectTerms(text) {
  const placeholders = [];
  let result = text;
  const sorted = [...PRESERVE_TERMS].sort((a, b) => b.length - a.length);
  for (const term of sorted) {
    if (!result.includes(term)) continue;
    const token = `__P${placeholders.length}__`;
    placeholders.push({ token, term });
    result = result.split(term).join(token);
  }
  return { text: result, placeholders };
}

function restoreTerms(text, placeholders) {
  let result = text;
  for (const { token, term } of placeholders) {
    result = result.split(token).join(term);
  }
  return result;
}

export function translateToVi(en) {
  if (shouldPreserve(en)) return en;

  const dict = initDict();
  if (dict[en]) return dict[en];

  const protectedEn = protectTerms(en);
  if (dict[protectedEn.text]) {
    return restoreTerms(dict[protectedEn.text], protectedEn.placeholders);
  }

  return en;
}
