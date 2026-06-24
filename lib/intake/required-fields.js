import { CONSENT_DOCS } from "@/lib/intake/consent-docs";
import {
  ensureLegalGlobalFields,
  getLegalGlobalFieldErrors,
  LEGAL_GLOBAL_FIELDS,
} from "@/lib/intake/legal-global";

export const REQUIRED_MESSAGE = "This field is required";
export const REQUIRED_LABEL = "Required";
export const OPTIONAL_LABEL = "Optional";

const PHONE_EMAIL_MESSAGE = "Enter a phone number or email address so we can reach you.";
const INVALID_EMAIL_MESSAGE = "Enter a valid email address.";

const STEP_0_TEXT_FIELDS = [
  { name: "guardianName", label: "Primary Parent / Guardian Full Name" },
  { name: "childFullName", label: "Child First Name" },
];

const STEP_5_FIELDS = [
  { name: "infoAccurate", label: "Information accuracy certification", type: "radio" },
  { name: "finalName", label: "Parent / Guardian Full Name", type: "text" },
  { name: "finalDate", label: "Signature date", type: "date" },
  { name: "finalSignature", label: "Signature", type: "text" },
];

function str(value) {
  return String(value ?? "").trim();
}

export function getChildFirstName(data) {
  return str(data.childFullName).split(/\s+/)[0] || "";
}

function hasPhoneOrEmail(data) {
  return Boolean(str(data.phone) || str(data.email));
}

function isValidEmail(value) {
  const email = str(value);
  if (!email) return true;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/** Whether a field should show the Required badge in the intake UI. */
export function isIntakeFieldRequired(stepIndex, fieldName) {
  if (stepIndex === 0) {
    if (STEP_0_TEXT_FIELDS.some((field) => field.name === fieldName)) return true;
    if (fieldName === "phone" || fieldName === "email") return true;
    return false;
  }

  if (stepIndex === 2) {
    if (LEGAL_GLOBAL_FIELDS.includes(fieldName)) return true;
    if (fieldName.endsWith("Ack")) return true;
    return false;
  }

  if (stepIndex === 5) {
    return STEP_5_FIELDS.some((field) => field.name === fieldName);
  }

  return false;
}

/** Flat list used for step completion percentages. */
export function getMinimalRequiredFieldsForStep(stepIndex) {
  if (stepIndex === 0) {
    return [
      ...STEP_0_TEXT_FIELDS.map((field) => ({ ...field, type: field.name === "state" ? "select" : "text" })),
      { name: "phoneOrEmail", label: "Phone or Email", type: "contact-group" },
    ];
  }

  if (stepIndex === 2) {
    return [
      ...CONSENT_DOCS.map((doc) => ({
        name: `${doc.id}Ack`,
        label: doc.title,
        type: "consent-ack",
      })),
      ...LEGAL_GLOBAL_FIELDS.map((name) => ({
        name,
        label: name,
        type: name === "legalGlobalDate" ? "date" : "text",
      })),
    ];
  }

  if (stepIndex === 5) {
    return STEP_5_FIELDS.map((field) => ({ ...field, required: true }));
  }

  return [];
}

function validateStep0(data) {
  /** @type {Record<string, string>} */
  const fieldErrors = {};
  /** @type {{ name: string, label: string }[]} */
  const missingFields = [];

  for (const field of STEP_0_TEXT_FIELDS) {
    if (field.name === "childFullName") {
      if (!getChildFirstName(data)) {
        fieldErrors.childFullName = REQUIRED_MESSAGE;
        missingFields.push(field);
      }
      continue;
    }

    if (!str(data[field.name])) {
      fieldErrors[field.name] = REQUIRED_MESSAGE;
      missingFields.push(field);
    }
  }

  if (!hasPhoneOrEmail(data)) {
    fieldErrors.phone = PHONE_EMAIL_MESSAGE;
    fieldErrors.email = PHONE_EMAIL_MESSAGE;
    missingFields.push({ name: "phoneOrEmail", label: "Phone or Email" });
  } else if (!isValidEmail(data.email)) {
    fieldErrors.email = INVALID_EMAIL_MESSAGE;
    missingFields.push({ name: "email", label: "Primary Email Address" });
  }

  return { fieldErrors, missingFields };
}

function validateStep2(data) {
  /** @type {Record<string, string>} */
  const fieldErrors = {};
  /** @type {{ name: string, label: string }[]} */
  const missingFields = [];

  for (const doc of CONSENT_DOCS) {
    const name = `${doc.id}Ack`;
    if (data[name] !== "Yes" && data[name] !== true) {
      fieldErrors[name] = "This acknowledgment is required";
      missingFields.push({ name, label: doc.title });
    }
  }

  const prepared = ensureLegalGlobalFields(data);
  const legalErrors = getLegalGlobalFieldErrors(prepared);
  for (const [name, message] of Object.entries(legalErrors)) {
    fieldErrors[name] = message;
    missingFields.push({
      name,
      label:
        name === "legalGlobalName"
          ? "Legal name"
          : name === "legalGlobalDate"
            ? "Legal signature date"
            : "Legal signature",
    });
  }

  return { fieldErrors, missingFields };
}

function validateStep5(data) {
  /** @type {Record<string, string>} */
  const fieldErrors = {};
  /** @type {{ name: string, label: string }[]} */
  const missingFields = [];

  for (const field of STEP_5_FIELDS) {
    const value = data[field.name];
    if (field.type === "radio") {
      if (value !== "Yes") {
        fieldErrors[field.name] = REQUIRED_MESSAGE;
        missingFields.push(field);
      }
      continue;
    }

    if (!str(value)) {
      fieldErrors[field.name] = REQUIRED_MESSAGE;
      missingFields.push(field);
    }
  }

  return { fieldErrors, missingFields };
}

/** Validate only the minimal required fields for a step. */
export function validateMinimalStepFields(step, data) {
  if (step === 0) return validateStep0(data);
  if (step === 2) return validateStep2(data);
  if (step === 5) return validateStep5(data);
  return { fieldErrors: {}, missingFields: [] };
}

export function isMinimalStepComplete(step, data) {
  const { missingFields } = validateMinimalStepFields(step, data);
  return missingFields.length === 0;
}
