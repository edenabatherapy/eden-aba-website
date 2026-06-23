import { CONSENT_DOCS } from "@/lib/intake/consent-docs";

export const LEGAL_GLOBAL_FIELDS = ["legalGlobalName", "legalGlobalDate", "legalGlobalSignature"];

export function getTodayLegalDate() {
  return new Date().toISOString().slice(0, 10);
}

function hasConsentAcknowledgement(data) {
  return CONSENT_DOCS.some(
    (doc) => data[`${doc.id}Ack`] === "Yes" || data[`${doc.id}Ack`] === true,
  );
}

/** Apply side effects when legal signature or consent acknowledgement changes. */
export function applyLegalGlobalSideEffects(data, name, value) {
  const next = { ...data, [name]: value };
  const today = getTodayLegalDate();

  if (name === "legalGlobalSignature" && String(value ?? "").trim()) {
    next.legalGlobalDate = today;
  }

  if (name.endsWith("Ack") && (value === "Yes" || value === true)) {
    if (!String(next.legalGlobalDate ?? "").trim()) {
      next.legalGlobalDate = today;
    }
  }

  return next;
}

/** Fill legalGlobalDate before submit/export when signature or consent is present. */
export function ensureLegalGlobalFields(data) {
  const next = { ...data };
  const today = getTodayLegalDate();
  const hasSignature = String(next.legalGlobalSignature ?? "").trim();
  const hasAck = hasConsentAcknowledgement(next);

  if ((hasSignature || hasAck) && !String(next.legalGlobalDate ?? "").trim()) {
    next.legalGlobalDate = today;
  }

  return next;
}

export function prepareIntakePayload(data) {
  return ensureLegalGlobalFields(data);
}

/**
 * @param {Record<string, unknown>} data
 * @param {{ legalGlobalName?: string, legalGlobalDate?: string, legalGlobalSignature?: string }} [labels]
 */
export function getLegalGlobalFieldErrors(data, labels = {}) {
  /** @type {Record<string, string>} */
  const errors = {};
  const messages = {
    legalGlobalName: labels.legalGlobalName || "Parent / guardian full name is required.",
    legalGlobalDate: labels.legalGlobalDate || "Legal signature date is required.",
    legalGlobalSignature: labels.legalGlobalSignature || "Legal signature is required.",
  };

  for (const field of LEGAL_GLOBAL_FIELDS) {
    if (!String(data[field] ?? "").trim()) {
      errors[field] = messages[field];
    }
  }

  return errors;
}
