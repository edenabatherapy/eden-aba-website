import {
  LEGACY_STORAGE_KEY,
  STORAGE_DATA_KEY,
  STORAGE_META_KEY,
  STORAGE_STEP_KEY,
  STORAGE_TAB_KEY,
} from "./constants";

/** @returns {Record<string, unknown>} */
export function loadFormData() {
  if (typeof window === "undefined") return {};
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_DATA_KEY) || "{}");
    if (saved && typeof saved === "object" && Object.keys(saved).length > 0) {
      return saved;
    }
    const legacy = JSON.parse(localStorage.getItem(LEGACY_STORAGE_KEY) || "{}");
    if (legacy && typeof legacy === "object") {
      return migrateLegacyData(legacy);
    }
  } catch {
    // Ignore invalid local draft data.
  }
  return {};
}

/** Migrate label-keyed legacy preview data to name-keyed fields where possible. */
function migrateLegacyData(legacy) {
  const map = {
    "Child Legal Full Name": "childFullName",
    "Preferred Name": "preferredName",
    "Date of Birth": "dob",
    Gender: "gender",
    "Child Primary Language": "primaryLanguageChild",
    "Street Address": "street",
    City: "city",
    State: "state",
    "ZIP Code": "zip",
    "Parent / Guardian Full Name": "guardianName",
    "Relationship to Child": "relationship",
    "Primary Phone Number": "phone",
    "Primary Email Address": "email",
    "Emergency Contact Name": "emergencyContactName",
    "Emergency Contact Phone": "emergencyContactPhone",
    "Preferred Service Location": "preferredServiceLocation",
  };
  const next = {};
  for (const [key, value] of Object.entries(legacy)) {
    next[map[key] || key] = value;
  }
  return next;
}

export function saveFormData(data) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
}

export function loadCurrentStep() {
  if (typeof window === "undefined") return 0;
  const raw = Number(localStorage.getItem(STORAGE_STEP_KEY) || 0);
  return Number.isFinite(raw) && raw >= 0 && raw <= 5 ? raw : 0;
}

export function saveCurrentStep(step) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_STEP_KEY, String(step));
}

export function loadActiveTab() {
  if (typeof window === "undefined") return "intake";
  return localStorage.getItem(STORAGE_TAB_KEY) || "intake";
}

export function saveActiveTab(tab) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_TAB_KEY, tab);
}

/** @returns {{ documents: Record<string, unknown>, messages: unknown[], audit: unknown[] }} */
export function loadMeta() {
  const defaults = { documents: {}, messages: [], audit: [] };
  if (typeof window === "undefined") return defaults;
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_META_KEY) || "{}") };
  } catch {
    return defaults;
  }
}

export function saveMeta(meta) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_META_KEY, JSON.stringify(meta));
}

export function clearAllDrafts() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(STORAGE_DATA_KEY);
  localStorage.removeItem(STORAGE_STEP_KEY);
  localStorage.removeItem(STORAGE_TAB_KEY);
  localStorage.removeItem(STORAGE_META_KEY);
  localStorage.removeItem(LEGACY_STORAGE_KEY);
}

/** Clear all intake-related local and session storage (e.g. after submit or Start New Intake). */
export function clearIntakeBrowserStorage() {
  if (typeof window === "undefined") return;

  clearAllDrafts();

  const localKeys = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i);
    if (key && /eden|intake/i.test(key)) {
      localKeys.push(key);
    }
  }
  localKeys.forEach((key) => localStorage.removeItem(key));

  const sessionKeys = [];
  for (let i = 0; i < sessionStorage.length; i += 1) {
    const key = sessionStorage.key(i);
    if (key && /eden|intake/i.test(key)) {
      sessionKeys.push(key);
    }
  }
  sessionKeys.forEach((key) => sessionStorage.removeItem(key));
}

export function appendAudit(meta, action, step) {
  const audit = meta.audit || [];
  audit.unshift({ action, time: new Date().toISOString(), step });
  return { ...meta, audit: audit.slice(0, 50) };
}
