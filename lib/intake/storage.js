import {
  INTAKE_DRAFT_STORAGE_KEYS,
  LEGACY_STORAGE_KEY,
  STORAGE_DATA_KEY,
  STORAGE_META_KEY,
  STORAGE_STEP_KEY,
  STORAGE_SUBMISSION_RECEIPT_KEY,
  STORAGE_TAB_KEY,
} from "./constants";

let intakeDraftWritesDisabled = false;

/** Block autosave after successful submit so stale React updates cannot rewrite PHI. */
export function disableIntakeDraftWrites() {
  intakeDraftWritesDisabled = true;
}

export function enableIntakeDraftWrites() {
  intakeDraftWritesDisabled = false;
}

export function areIntakeDraftWritesDisabled() {
  return intakeDraftWritesDisabled;
}

/** @returns {Record<string, unknown>} */
export function loadFormData() {
  if (typeof window === "undefined") return {};
  if (loadSubmissionReceipt()?.ok) return {};
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
  if (typeof window === "undefined" || intakeDraftWritesDisabled) return;
  localStorage.setItem(STORAGE_DATA_KEY, JSON.stringify(data));
}

export function loadCurrentStep() {
  if (typeof window === "undefined") return 0;
  if (loadSubmissionReceipt()?.ok) return 0;
  const raw = Number(localStorage.getItem(STORAGE_STEP_KEY) || 0);
  return Number.isFinite(raw) && raw >= 0 && raw <= 5 ? raw : 0;
}

export function saveCurrentStep(step) {
  if (typeof window === "undefined" || intakeDraftWritesDisabled) return;
  localStorage.setItem(STORAGE_STEP_KEY, String(step));
}

export function loadActiveTab() {
  if (typeof window === "undefined") return "intake";
  if (loadSubmissionReceipt()?.ok) return "intake";
  return localStorage.getItem(STORAGE_TAB_KEY) || "intake";
}

export function saveActiveTab(tab) {
  if (typeof window === "undefined" || intakeDraftWritesDisabled) return;
  localStorage.setItem(STORAGE_TAB_KEY, tab);
}

/** @returns {{ documents: Record<string, unknown>, messages: unknown[], audit: unknown[] }} */
export function loadMeta() {
  const defaults = { documents: {}, messages: [], audit: [] };
  if (typeof window === "undefined") return defaults;
  if (loadSubmissionReceipt()?.ok) return defaults;
  try {
    return { ...defaults, ...JSON.parse(localStorage.getItem(STORAGE_META_KEY) || "{}") };
  } catch {
    return defaults;
  }
}

export function saveMeta(meta) {
  if (typeof window === "undefined" || intakeDraftWritesDisabled) return;
  localStorage.setItem(STORAGE_META_KEY, JSON.stringify(meta));
}

export function clearIntakeDraftStorage() {
  if (typeof window === "undefined") return;

  for (const key of INTAKE_DRAFT_STORAGE_KEYS) {
    localStorage.removeItem(key);
  }

  const sessionDraftKeys = [];
  for (let i = 0; i < sessionStorage.length; i += 1) {
    const key = sessionStorage.key(i);
    if (key && key !== STORAGE_SUBMISSION_RECEIPT_KEY && /intake/i.test(key)) {
      sessionDraftKeys.push(key);
    }
  }
  sessionDraftKeys.forEach((key) => sessionStorage.removeItem(key));
}

export function clearAllDrafts() {
  clearIntakeDraftStorage();
}

/** @param {{ ok: true, confirmationId?: string, submittedAt?: string, message?: string }} receipt */
export function saveSubmissionReceipt(receipt) {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(
    STORAGE_SUBMISSION_RECEIPT_KEY,
    JSON.stringify({
      ok: true,
      confirmationId: receipt.confirmationId ?? "",
      submittedAt: receipt.submittedAt ?? new Date().toISOString(),
      message: receipt.message ?? "",
    }),
  );
}

/** @returns {{ ok: true, confirmationId: string, submittedAt: string, message: string } | null} */
export function loadSubmissionReceipt() {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(STORAGE_SUBMISSION_RECEIPT_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.ok ? parsed : null;
  } catch {
    return null;
  }
}

export function clearSubmissionReceipt() {
  if (typeof window === "undefined") return;
  sessionStorage.removeItem(STORAGE_SUBMISSION_RECEIPT_KEY);
}

/** Remove all intake draft keys from local/session storage (keeps submission receipt). */
export function clearIntakeBrowserStorage() {
  clearIntakeDraftStorage();
}

/** Remove drafts and submission receipt — used when starting a new intake. */
export function clearAllIntakeClientData() {
  clearIntakeDraftStorage();
  clearSubmissionReceipt();
  enableIntakeDraftWrites();
}

export function appendAudit(meta, action, step) {
  const audit = meta.audit || [];
  audit.unshift({ action, time: new Date().toISOString(), step });
  return { ...meta, audit: audit.slice(0, 50) };
}
