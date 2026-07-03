/**
 * Vietnamese overlay translation engine.
 * Preserves proper nouns, credentials, contact info, URLs, and structural keys.
 */

export const PRESERVE_TERMS = [
  "Eden ABA Therapy",
  "Board Certified Behavior Analyst (BCBA)",
  "Board Certified Behavior Analyst",
  "Registered Behavior Technician (RBT)",
  "Registered Behavior Technician",
  "Behavior Technician (BT)",
  "Behavior Technician",
  "Lead Registered Behavior Technician",
  "Director of RBT Development",
  "BCBA",
  "RBT",
  "BT",
  "BCaBA",
  "ADOS-2",
  "M-CHAT-R",
  "M-CHAT-R/F",
  "HIPAA",
  "BACB",
  "IEP",
  "EPSDT",
  "CMS",
  "Medicaid.gov",
  "Autism Speaks",
  "CentralReach",
  "CentralReach Essentials",
  "CentralReach Staff Login",
  "CentralReach Staff Login →",
  "CAST (Childhood Autism Spectrum Test)",
  "RBT / BT",
  "Fax 571-445-8631",
  "Call (703) 587-5238",
  "Naveen Omari",
  "Steve Dang",
  "NO",
  "SD",
  "Annandale",
  "Northern Virginia",
  "Fairfax County",
  "Virginia",
  "Bắc Virginia",
  "Annandale, VA",
  "Fairfax, VA",
  "Alexandria, VA",
  "Arlington, VA",
  "McLean, VA",
  "Fairfax",
  "Falls Church",
  "Springfield",
  "Alexandria",
  "Arlington",
  "Tysons",
  "Vienna",
  "McLean",
  "Woodbridge",
  "Manassas",
  "Onboarding",
  "BT → RBT",
  "BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  "Board Certified Assistant Behavior Analyst (BCaBA)",
  "Annandale, VA clinic.",
  "Arlington & Alexandria",
  "Fairfax & Loudoun County",
  "Prince William County",
  "BCBA since 2022",
  "(703) 587-5238",
  "571-445-8631",
  "info@edenabatherapy.com",
  "7700 Little River Turnpike",
  "Suite 304",
  "VA 22003",
];

const SKIP_KEYS = new Set([
  "href",
  "url",
  "slug",
  "applyUrl",
  "id",
  "mapsQuery",
  "phoneHref",
  "emailHref",
  "faxHref",
  "resourceHref",
  "ctaHref",
  "postedAt",
  "initials",
  "name",
  "src",
  "span",
  "icon",
  "duration",
  "category",
  "tags",
  "source",
  "year",
  "metric",
  "value",
  "suffix",
  "phone",
  "fax",
  "email",
  "street",
  "suite",
  "city",
  "state",
  "zip",
  "full",
  "directionsUrl",
  "primaryCtaHref",
  "secondaryCtaHref",
  "ctaHref",
  "activePaths",
  "external",
  "isSalary",
  "isFutureOpening",
  "keywords",
  "department",
  "employment",
  "location",
  "experienceLevel",
  "credential",
  "workSetting",
  "schedule",
  "status",
  "gradient",
  "accent",
  "badgeClass",
]);

const PRESERVE_EXACT = new Set([
  ...PRESERVE_TERMS,
  "ABA",
  "BT",
  "RBT",
  "BCBA",
  "ADOS-2",
  "M-CHAT-R",
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
  "Fairfax",
  "Falls Church",
  "Springfield",
  "Alexandria",
  "Arlington",
  "Tysons",
  "Vienna",
  "McLean",
  "Woodbridge",
  "Manassas",
  "Onboarding",
  "BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA",
  "BT → RBT",
  "Board Certified Assistant Behavior Analyst (BCaBA)",
  "Fairfax & Loudoun County",
  "Arlington & Alexandria",
  "Prince William County",
  "Day 1",
  "Week 1–4",
  "Month 2–3",
  "90 Days",
  "Ongoing",
  "A",
  "R",
  "S",
  "T",
  "Situation",
  "Task",
  "Action",
  "Result",
  "handshake",
  "screening",
  "insurance",
]);

function shouldPreserveString(s) {
  if (!s || typeof s !== "string") return true;
  if (PRESERVE_EXACT.has(s)) return true;
  if (/^https?:\/\//.test(s)) return true;
  if (/^\/[\w#?=&/-]+$/.test(s)) return true;
  if (/^[\w.-]+@[\w.-]+\.\w+$/.test(s)) return true;
  if (/^\+?\d[\d\s().-]{7,}$/.test(s)) return true;
  if (/^\d{4}-\d{2}-\d{2}$/.test(s)) return true;
  if (/^\/images\//.test(s)) return true;
  if (/^[A-Z][a-z]+, VA\.?$/.test(s)) return true;
  if (/^[A-Z][a-z]+(\s[A-Z][a-z]+)*, VA$/.test(s)) return true;
  if (/^\d+%$/.test(s)) return true;
  if (/^\d+\+$/.test(s)) return true;
  if (/^\d+\+?$/.test(s) && s.length <= 4) return true;
  if (/^\d+ days$/.test(s)) return true;
  if (/^\+?\/mo$/.test(s)) return true;
  if (/^Fax \d[\d-]+$/.test(s)) return true;
  if (/^Call \(703\) 587-5238$/.test(s)) return true;
  if (/^bg-|^text-|^from-/.test(s)) return true;
  return false;
}

function protectTerms(text) {
  const placeholders = [];
  let result = text;
  const sorted = [...PRESERVE_TERMS].sort((a, b) => b.length - a.length);
  for (const term of sorted) {
    if (!result.includes(term)) continue;
    const token = `__PRESERVE_${placeholders.length}__`;
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

export function createTranslator(dictionary) {
  const dict = dictionary ?? {};

  return function translateString(en) {
    if (shouldPreserveString(en)) return en;
    if (dict[en]) return restoreTerms(dict[en], protectTerms(dict[en]).placeholders);

    const protectedEn = protectTerms(en);
    if (dict[protectedEn.text]) {
      return restoreTerms(dict[protectedEn.text], protectedEn.placeholders);
    }

    return en;
  };
}

export function buildOverlay(english, dictionary) {
  const translate = createTranslator(dictionary);

  function walk(value, key) {
    if (typeof value === "string") {
      if (SKIP_KEYS.has(key)) return value;
      if (shouldPreserveString(value)) return value;
      return translate(value);
    }
    if (Array.isArray(value)) {
      return value.map((item, i) => walk(item, String(i)));
    }
    if (value && typeof value === "object") {
      const out = {};
      for (const [k, v] of Object.entries(value)) {
        if (SKIP_KEYS.has(k)) continue;
        out[k] = walk(v, k);
      }
      return out;
    }
    return value;
  }

  return walk(english, "");
}

export function collectUntranslated(english, overlay) {
  const issues = [];

  function walk(en, vi, path) {
    if (typeof en === "string") {
      if (shouldPreserveString(en)) return;
      if (en === vi) issues.push({ path, english: en });
      return;
    }
    if (Array.isArray(en)) {
      en.forEach((item, i) => {
        if (vi && Array.isArray(vi)) walk(item, vi[i], `${path}[${i}]`);
      });
      return;
    }
    if (en && typeof en === "object") {
      for (const [k, v] of Object.entries(en)) {
        if (SKIP_KEYS.has(k)) continue;
        walk(v, vi?.[k], path ? `${path}.${k}` : k);
      }
    }
  }

  walk(english, overlay, "");
  return issues;
}

export function countLeafStrings(value, key = "") {
  let count = 0;
  if (typeof value === "string") {
    if (!SKIP_KEYS.has(key) && !shouldPreserveString(value)) count++;
    return count;
  }
  if (Array.isArray(value)) {
    for (const item of value) count += countLeafStrings(item, key);
    return count;
  }
  if (value && typeof value === "object") {
    for (const [k, v] of Object.entries(value)) {
      if (SKIP_KEYS.has(k)) continue;
      count += countLeafStrings(v, k);
    }
  }
  return count;
}
