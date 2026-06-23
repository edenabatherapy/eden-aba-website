import { CONSENT_DOCS } from "@/lib/intake/consent-docs";

export const LEGAL_GLOBAL_FIELDS = ["legalGlobalName", "legalGlobalDate", "legalGlobalSignature"];

const LEGAL_FIELD_USER_MESSAGES = {
  legalGlobalName: "Please enter your full legal name in the Legal Signature section.",
  legalGlobalDate: "Please confirm the legal signature date in the Legal Signature section.",
  legalGlobalSignature: "Please enter your legal signature in the Legal Signature section.",
};

export function getTodayLegalDate() {
  return new Date().toISOString().slice(0, 10);
}

function str(value) {
  return String(value ?? "").trim();
}

export function hasConsentAcknowledgement(data) {
  return CONSENT_DOCS.some(
    (doc) => data[`${doc.id}Ack`] === "Yes" || data[`${doc.id}Ack`] === true,
  );
}

function hasPerDocConsentSignature(data) {
  return CONSENT_DOCS.some((doc) => str(data[`${doc.id}Signature`]));
}

function hasLegalAcknowledgementPresent(data) {
  return hasConsentAcknowledgement(data) || hasPerDocConsentSignature(data);
}

/** Copy per-consent modal name/date/signature into global legal fields when empty. */
export function syncLegalGlobalFromConsentDocs(data) {
  const next = { ...data };

  if (!str(next.legalGlobalName)) {
    const doc = CONSENT_DOCS.find((item) => str(next[`${item.id}Name`]));
    if (doc) next.legalGlobalName = str(next[`${doc.id}Name`]);
  }

  if (!str(next.legalGlobalSignature)) {
    const doc = CONSENT_DOCS.find((item) => str(next[`${item.id}Signature`]));
    if (doc) next.legalGlobalSignature = str(next[`${doc.id}Signature`]);
  }

  if (!str(next.legalGlobalDate)) {
    const doc = CONSENT_DOCS.find((item) => str(next[`${item.id}Date`]));
    if (doc) next.legalGlobalDate = str(next[`${doc.id}Date`]);
  }

  return next;
}

/** Apply side effects when legal signature or consent acknowledgement changes. */
export function applyLegalGlobalSideEffects(data, name, value) {
  let next = { ...data, [name]: value };
  const today = getTodayLegalDate();

  if (name === "legalGlobalSignature" && str(value)) {
    next.legalGlobalDate = today;
  }

  if (name.endsWith("Ack") && (value === "Yes" || value === true)) {
    if (!str(next.legalGlobalDate)) {
      next.legalGlobalDate = today;
    }
  }

  if (name.endsWith("Signature") && str(value)) {
    if (!str(next.legalGlobalDate)) {
      next.legalGlobalDate = today;
    }
    if (!str(next.legalGlobalSignature)) {
      next.legalGlobalSignature = str(value);
    }
  }

  if (name.endsWith("Date") && str(value) && !str(next.legalGlobalDate)) {
    next.legalGlobalDate = str(value);
  }

  if (name.endsWith("Name") && name !== "legalGlobalName" && str(value) && !str(next.legalGlobalName)) {
    next.legalGlobalName = str(value);
  }

  next = syncLegalGlobalFromConsentDocs(next);

  if (hasLegalAcknowledgementPresent(next) && !str(next.legalGlobalDate)) {
    next.legalGlobalDate = today;
  }

  return next;
}

/** Fill legalGlobalDate before submit/export when signature or consent is present. */
export function ensureLegalGlobalFields(data) {
  let next = syncLegalGlobalFromConsentDocs({ ...data });
  const today = getTodayLegalDate();

  const hasSignature = str(next.legalGlobalSignature);
  const hasAck = hasLegalAcknowledgementPresent(next);

  if (!str(next.legalGlobalDate) && (hasSignature || hasAck)) {
    next.legalGlobalDate = today;
  }

  if (!str(next.legalGlobalDate) && str(next.legalGlobalSignature)) {
    next.legalGlobalDate = today;
  }

  return next;
}

/** Sync final signature block from legal global fields when present. */
export function ensureFinalSignatureFields(data) {
  const next = { ...data };
  const today = getTodayLegalDate();

  if (!str(next.finalName) && str(next.legalGlobalName)) {
    next.finalName = str(next.legalGlobalName);
  }

  if (!str(next.finalSignature) && str(next.legalGlobalSignature)) {
    next.finalSignature = str(next.legalGlobalSignature);
  }

  if (!str(next.finalDate)) {
    if (str(next.finalSignature) || str(next.legalGlobalSignature) || hasLegalAcknowledgementPresent(next)) {
      next.finalDate = str(next.legalGlobalDate) || today;
    }
  }

  if (!str(next.finalDate) && str(next.finalSignature)) {
    next.finalDate = today;
  }

  if (next.infoAccurate !== "Yes" && hasLegalAcknowledgementPresent(next) && str(next.finalSignature)) {
    next.infoAccurate = "Yes";
  }

  return next;
}

export function prepareIntakePayload(data) {
  return ensureFinalSignatureFields(ensureLegalGlobalFields(data));
}

/**
 * @param {Record<string, unknown>} data
 * @param {{ legalGlobalName?: string, legalGlobalDate?: string, legalGlobalSignature?: string }} [labels]
 */
export function getLegalGlobalFieldErrors(data, labels = {}) {
  const prepared = ensureLegalGlobalFields(data);
  /** @type {Record<string, string>} */
  const errors = {};
  const messages = {
    legalGlobalName: labels.legalGlobalName || LEGAL_FIELD_USER_MESSAGES.legalGlobalName,
    legalGlobalDate: labels.legalGlobalDate || LEGAL_FIELD_USER_MESSAGES.legalGlobalDate,
    legalGlobalSignature: labels.legalGlobalSignature || LEGAL_FIELD_USER_MESSAGES.legalGlobalSignature,
  };

  for (const field of LEGAL_GLOBAL_FIELDS) {
    if (!str(prepared[field])) {
      errors[field] = messages[field];
    }
  }

  return errors;
}

/** Map server validation text to inline legal field errors. */
export function parseLegalValidationMessage(message) {
  if (!message || typeof message !== "string") return null;

  for (const field of LEGAL_GLOBAL_FIELDS) {
    if (message.includes(field)) {
      return { field, message: LEGAL_FIELD_USER_MESSAGES[field] };
    }
  }

  if (/legal signature/i.test(message)) {
    return { field: "legalGlobalDate", message: LEGAL_FIELD_USER_MESSAGES.legalGlobalDate };
  }

  return null;
}

export function hasLegalGlobalChanges(before, after) {
  return LEGAL_GLOBAL_FIELDS.some((field) => before[field] !== after[field]);
}
