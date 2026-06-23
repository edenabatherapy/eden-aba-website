import { getStepRequiredFields } from "./step-config";
import { getLegalGlobalFieldErrors, LEGAL_GLOBAL_FIELDS } from "./legal-global";

/**
 * Validate required fields for the current step.
 * @param {number} step
 * @param {Record<string, unknown>} data
 * @param {HTMLElement | null} container
 * @returns {{ valid: true } | { valid: false, fieldErrors?: Record<string, string>, errorStep?: number }}
 */
export function validateStep(step, data, container = null) {
  const fields = getStepRequiredFields(step, data);
  const checkedNames = new Set();
  const deferredLegalFields = step === 2;

  for (const field of fields) {
    if (checkedNames.has(field.name)) continue;
    checkedNames.add(field.name);

    if (deferredLegalFields && LEGAL_GLOBAL_FIELDS.includes(field.name)) {
      continue;
    }

    if (field.type === "radio" || field.type === "checkbox-group") {
      const values = data[field.name];
      const hasValue = Array.isArray(values)
        ? values.length > 0
        : Boolean(values);
      if (!hasValue) {
        focusField(container, field.name);
        return { valid: false, errorStep: step };
      }
      continue;
    }

    if (field.type === "consent-ack") {
      if (data[field.name] !== "Yes" && data[field.name] !== true) {
        focusField(container, field.name);
        return { valid: false, errorStep: step };
      }
      continue;
    }

    const value = data[field.name];
    if (!String(value ?? "").trim()) {
      focusField(container, field.name);
      return { valid: false, errorStep: step };
    }
  }

  if (step === 2) {
    const legalErrors = getLegalGlobalFieldErrors(data);
    if (Object.keys(legalErrors).length > 0) {
      const firstField = LEGAL_GLOBAL_FIELDS.find((name) => legalErrors[name]);
      if (firstField) {
        focusField(container, firstField);
      }
      return { valid: false, fieldErrors: legalErrors, errorStep: 2 };
    }
  }

  return { valid: true };
}

function focusField(container, name) {
  if (typeof window === "undefined") return;
  const el = container?.querySelector?.(`[name="${name}"]`) || document.querySelector(`[name="${name}"]`);
  if (el) {
    el.scrollIntoView?.({ behavior: "smooth", block: "center" });
    if ("focus" in el) el.focus();
    el.classList?.add("field-invalid");
    setTimeout(() => el.classList?.remove("field-invalid"), 1800);
  }

  if (!LEGAL_GLOBAL_FIELDS.includes(name)) {
    window.alert("Please complete all required fields before continuing.");
  }
}

/**
 * @param {number} step
 * @param {Record<string, unknown>} data
 */
export function getStepCompletion(step, data) {
  const fields = getStepRequiredFields(step, data);
  const names = [...new Set(fields.map((f) => f.name))];
  let complete = 0;

  for (const name of names) {
    const group = fields.filter((f) => f.name === name);
    const first = group[0];
    if (!first) continue;

    if (first.type === "radio" || first.type === "checkbox-group") {
      const values = data[name];
      if (Array.isArray(values) ? values.length > 0 : Boolean(values)) complete++;
    } else if (first.type === "consent-ack") {
      if (data[name] === "Yes" || data[name] === true) complete++;
    } else if (String(data[name] ?? "").trim()) {
      complete++;
    }
  }

  return { total: names.length, complete, pct: names.length ? Math.round((complete / names.length) * 100) : 0 };
}

/**
 * Estimate overall required completion across all steps.
 * @param {Record<string, unknown>} data
 */
export function getOverallCompletion(data) {
  let total = 0;
  let complete = 0;
  for (let i = 0; i < 6; i++) {
    const stats = getStepCompletion(i, data);
    total += stats.total;
    complete += stats.complete;
  }
  return { total, complete, pct: total ? Math.round((complete / total) * 100) : 0 };
}
