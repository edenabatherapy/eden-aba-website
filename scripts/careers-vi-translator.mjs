/**
 * Field-aware careers string translator for Vietnamese overlays.
 * Preserves proper nouns, URLs, emails, dates, and technical identifiers.
 */

const PRESERVE_TERMS = [
  "Eden ABA Therapy",
  "Northern Virginia",
  "Board Certified Behavior Analyst",
  "Registered Behavior Technician",
  "Behavior Technician",
  "Board Certified Assistant Behavior Analyst",
  "Behavior Analyst Certification Board",
  "Annandale",
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
  "BCBA",
  "RBT",
  "BT",
  "BACB",
  "BCaBA",
  "HIPAA",
  "Medicaid",
  "DBHDS",
  "ABA",
  "info@edenabatherapy.com",
  "M-CHAT-R",
  "ADOS-2",
  "IEP",
  "AAC",
  "CRM",
  "STAR",
  "PTO",
  "CEU",
  "Virginia",
];

const SKIP_KEYS = new Set([
  "id",
  "slug",
  "applyUrl",
  "href",
  "openingsHref",
  "ctaHref",
  "postedAt",
  "keywords",
  "step",
  "isSalary",
  "isFutureOpening",
  "image",
  "imageSrc",
  "imageAlt",
  "videoUrl",
  "thumbnail",
  "icon",
  "departmentIcon",
  "color",
  "bgColor",
  "textColor",
  "borderColor",
  "min",
  "max",
  "defaultValue",
  "rateKey",
  "roleId",
  "tabId",
  "sectionId",
  "anchor",
  "email",
  "phone",
  "url",
  "path",
  "src",
  "alt",
  "ariaLabel",
  "badge",
  "stat",
  "value",
  "count",
  "hours",
  "percent",
  "amount",
  "minHours",
  "maxHours",
  "years",
  "months",
  "days",
  "time",
  "duration",
  "level",
  "order",
  "index",
  "type",
  "variant",
  "size",
  "width",
  "height",
  "x",
  "y",
  "z",
  "id",
]);

const SKIP_STRING_PATTERNS = [
  /^$/,
  /^\/[\w\-./?=&%]+$/,
  /^\/images\//,
  /^https?:\/\//,
  /^[\d]{4}-\d{2}-\d{2}$/,
  /^[\d]+:[\d]+$/,
  /^[\d]+(\.[\d]+)?%?$/,
  /^[A-Z]{1,3}$/,
  /^[a-z]+-[a-z-]+$/,
  /^info@/,
  /^\+$/,
  /^ days$/,
  /^ hrs$/,
  /^%$/,
  /^BCBA since \d{4}$/,
  /^RBT since \d{4}$/,
  /^BT since \d{4}$/,
  /^BT → RBT → Senior RBT → Lead RBT → BCaBA → BCBA$/,
  /^BT → RBT$/,
  /^BT → RBT → BCBA/,
  /^Coordinator → Operations leadership tracks$/,
];

/** Keys whose string values are user-facing and should be translated */
const TRANSLATE_KEYS = new Set([
  "title",
  "label",
  "description",
  "summary",
  "body",
  "headline",
  "subheadline",
  "badge",
  "note",
  "placeholder",
  "clearLabel",
  "showing",
  "of",
  "roles",
  "clearAll",
  "emptyTitle",
  "emptyBody",
  "clearFilters",
  "submitResume",
  "applyLabel",
  "viewDetailsLabel",
  "saveJobLabel",
  "unsaveJobLabel",
  "shareJobLabel",
  "shareSuccess",
  "savedJobsTitle",
  "savedJobsEmpty",
  "browseRoles",
  "backToCareers",
  "applyPageTitle",
  "submitApplication",
  "applicationSuccess",
  "resumeNote",
  "joinTalentNetwork",
  "futureGrowthLabel",
  "primaryCta",
  "secondaryCta",
  "cta",
  "question",
  "answer",
  "text",
  "name",
  "role",
  "city",
  "bestFit",
  "growthPath",
  "highlights",
  "overview",
  "responsibilities",
  "qualifications",
  "preferredExperience",
  "benefits",
  "schedule",
  "locationServiceArea",
  "whyJoin",
  "employment",
  "department",
  "status",
  "experienceLevel",
  "credential",
  "workSetting",
  "location",
  "locationChip",
  "categoryLabel",
  "learnMoreText",
  "intro",
  "paragraph",
  "paragraphs",
  "listItems",
  "items",
  "points",
  "tips",
  "steps",
  "detail",
  "details",
  "subtitle",
  "content",
  "tooltip",
  "disclaimer",
  "notice",
  "caption",
  "quote",
  "author",
  "roleType",
  "supervision",
  "serviceSetting",
  "focusAreas",
  "period",
  "time",
  "activity",
  "milestone",
  "focus",
  "outcome",
  "theme",
  "topic",
  "scenario",
  "example",
  "guidance",
  "expectation",
  "indicator",
  "competency",
  "responsibility",
  "value",
  "stat",
  "feature",
  "benefit",
  "stage",
  "pathway",
  "track",
  "level",
  "phase",
  "category",
  "section",
  "heading",
  "tagline",
  "message",
  "prompt",
  "hint",
  "footer",
  "header",
  "column",
  "row",
  "cell",
  "left",
  "right",
  "bt",
  "rbt",
  "shared",
  "comparison",
  "leftLabel",
  "rightLabel",
  "leftValue",
  "rightValue",
  "baseLabel",
  "bonusLabel",
  "benefitsLabel",
  "totalLabel",
  "tab",
  "nav",
  "preview",
]);

let stringMap = {};

export function setStringMap(map) {
  stringMap = map;
}

export function shouldSkipString(value) {
  if (typeof value !== "string") return true;
  return SKIP_STRING_PATTERNS.some((re) => re.test(value));
}

export function shouldTranslateKey(key, parentKey = "") {
  if (SKIP_KEYS.has(key)) return false;
  if (TRANSLATE_KEYS.has(key)) return true;
  // ALL_JOBS and nested job fields
  if (parentKey === "ALL_JOBS" || parentKey === "details") return TRANSLATE_KEYS.has(key);
  if (["highlights", "keywords"].includes(key) && parentKey !== "ALL_JOBS") return TRANSLATE_KEYS.has(key);
  // Default: translate unknown string keys in careers content
  if (/^[a-z][a-zA-Z]*$/.test(key) && !SKIP_KEYS.has(key)) return true;
  return false;
}

export function translateString(value, keyPath = "") {
  if (shouldSkipString(value)) return value;
  if (stringMap[value]) return stringMap[value];

  // Location strings: translate surrounding text, preserve city names
  if (/,\s*VA$/.test(value) || value.includes("Annandale") || value.includes("Northern Virginia")) {
    return translateLocationString(value);
  }

  return value;
}

function translateLocationString(value) {
  if (stringMap[value]) return stringMap[value];
  let result = value;
  const replacements = [
    ["Primary service area:", "Khu vực phục vụ chính:"],
    ["planned expansion", "mở rộng theo kế hoạch"],
    ["Planned growth", "Mở rộng theo kế hoạch"],
    ["surrounding communities", "các cộng đồng xung quanh"],
    ["and surrounding", "và vùng xung quanh"],
    ["service hub supporting", "trung tâm dịch vụ hỗ trợ"],
    ["clinic supporting", "phòng khám hỗ trợ"],
    ["clinic with travel across", "phòng khám với di chuyển đến"],
    ["with support for regional", "với hỗ trợ cho"],
    ["in-home service areas", "khu vực dịch vụ tại nhà"],
    ["service areas", "khu vực dịch vụ"],
    ["and greater", "và vùng"],
    ["and nearby", "và lân cận"],
    ["and neighboring", "và lân cận"],
  ];
  for (const [en, vi] of replacements) {
    result = result.replaceAll(en, vi);
  }
  return result !== value ? result : value;
}

export function translateValue(value, key = "", parentKey = "") {
  if (typeof value === "string") {
    if (!shouldTranslateKey(key, parentKey) || shouldSkipString(value)) {
      return value;
    }
    return translateString(value, `${parentKey}.${key}`);
  }

  if (Array.isArray(value)) {
    return value.map((item, index) => translateValue(item, String(index), key || parentKey));
  }

  if (value && typeof value === "object") {
    const out = {};
    for (const [childKey, childValue] of Object.entries(value)) {
      out[childKey] = translateValue(childValue, childKey, key || parentKey);
    }
    return out;
  }

  return value;
}

export function translateOverlay(englishData) {
  const out = {};
  for (const [key, value] of Object.entries(englishData)) {
    if (key.endsWith("_META")) continue;
    out[key] = translateValue(value, key);
  }
  return out;
}

export function collectIdenticalStrings(english, vietnamese, path = "", results = []) {
  if (typeof english === "string" && typeof vietnamese === "string") {
    if (english === vietnamese && english.trim() && !shouldSkipString(english)) {
      results.push({ path, english });
    }
    return results;
  }
  if (Array.isArray(english) && Array.isArray(vietnamese)) {
    const len = Math.min(english.length, vietnamese.length);
    for (let i = 0; i < len; i++) {
      collectIdenticalStrings(english[i], vietnamese[i], `${path}[${i}]`, results);
    }
    return results;
  }
  if (english && vietnamese && typeof english === "object" && typeof vietnamese === "object") {
    for (const key of Object.keys(english)) {
      if (vietnamese[key] !== undefined) {
        collectIdenticalStrings(english[key], vietnamese[key], path ? `${path}.${key}` : key, results);
      }
    }
  }
  return results;
}
