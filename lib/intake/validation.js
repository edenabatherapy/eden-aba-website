import { CONSENT_DOCS } from "@/lib/intake/consent-docs";
import { getMinimalRequiredFieldsForStep, validateMinimalStepFields } from "./required-fields";
import { LEGAL_GLOBAL_FIELDS } from "./legal-global";

function getRequiredFieldOrder(step) {
  if (step === 0) return ["guardianName", "childFullName", "city", "state", "phone", "email"];
  if (step === 2) {
    return [
      ...CONSENT_DOCS.map((doc) => `${doc.id}Ack`),
      ...LEGAL_GLOBAL_FIELDS,
    ];
  }
  if (step === 5) return ["infoAccurate", "finalName", "finalDate", "finalSignature"];
  return [];
}

/**
 * Validate required fields for the current step.
 * @param {number} step
 * @param {Record<string, unknown>} data
 * @param {HTMLElement | null} container
 * @returns {{
 *   valid: true
 * } | {
 *   valid: false,
 *   fieldErrors: Record<string, string>,
 *   missingFields: { name: string, label: string }[],
 *   firstMissingField?: string,
 *   errorStep: number
 * }}
 */
export function validateStep(step, data, container = null) {
  const { fieldErrors, missingFields } = validateMinimalStepFields(step, data);

  if (missingFields.length === 0) {
    return { valid: true };
  }

  const order = getRequiredFieldOrder(step);
  const firstMissingField =
    order.find((name) => fieldErrors[name]) ||
    (missingFields[0]?.name === "phoneOrEmail" ? "phone" : missingFields[0]?.name);

  if (firstMissingField) {
    focusField(container, firstMissingField, step);
  }

  return {
    valid: false,
    fieldErrors,
    missingFields,
    firstMissingField,
    errorStep: step,
  };
}

function focusField(container, name, step) {
  if (typeof window === "undefined") return;

  const selector =
    step === 2 && name.endsWith("Ack")
      ? `[name="${name}"]`
      : `[name="${name}"]`;

  const el =
    container?.querySelector?.(selector) ||
    document.querySelector(selector) ||
    (step === 2 ? document.getElementById("eden-legal-signature-section") : null);

  if (el && "scrollIntoView" in el) {
    el.scrollIntoView({ behavior: "smooth", block: "center" });
    if ("focus" in el && el.tagName !== "DIV") {
      el.focus();
    }
    el.classList?.add("field-invalid");
    setTimeout(() => el.classList?.remove("field-invalid"), 1800);
  }
}

/**
 * @param {number} step
 * @param {Record<string, unknown>} data
 */
export function getStepCompletion(step, data) {
  const fields = getMinimalRequiredFieldsForStep(step);
  const names = [...new Set(fields.map((field) => field.name))];
  let complete = 0;

  const { missingFields } = validateMinimalStepFields(step, data);
  const missingNames = new Set(missingFields.map((field) => field.name));

  for (const name of names) {
    if (!missingNames.has(name)) complete++;
  }

  return { total: names.length, complete, pct: names.length ? Math.round((complete / names.length) * 100) : 100 };
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
  return { total, complete, pct: total ? Math.round((complete / total) * 100) : 100 };
}
