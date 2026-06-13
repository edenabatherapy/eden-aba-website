import { getIntakeForm } from "@/lib/i18n";
import { STEP_SECTIONS as STEP_SECTIONS_EN } from "./step-config.js";

function translateOption(option, optionMap) {
  return optionMap?.[option] ?? option;
}

function translateField(field, form) {
  const next = { ...field };
  if (field.name && form.fieldLabels?.[field.name]) {
    next.label = form.fieldLabels[field.name];
  }
  if (field.name && form.fieldPlaceholders?.[field.name]) {
    next.placeholder = form.fieldPlaceholders[field.name];
  }
  if (field.type === "file" && field.name?.startsWith("file")) {
    const index = Number.parseInt(field.name.replace("file", ""), 10);
    const uploadLabel = form.uploadLabels?.[index];
    if (uploadLabel) {
      next.label = uploadLabel.replace(/ \*$/, "");
    }
  }
  if (Array.isArray(field.options)) {
    next.options = field.options.map((option) => translateOption(option, form.options));
  }
  return next;
}

function translateSection(section, form) {
  return {
    ...section,
    title: form.sectionTitles?.[section.title] ?? section.title,
    fields: section.fields?.map((field) => translateField(field, form)) ?? [],
  };
}

export function getLocalizedStepSections(language) {
  const form = getIntakeForm(language);
  return STEP_SECTIONS_EN.map((step) => ({
    ...step,
    sections: step.sections.map((section) => translateSection(section, form)),
  }));
}

export function getLocalizedIntakeSteps(language) {
  const form = getIntakeForm(language);
  return form.steps ?? [];
}

export function getLocalizedStepTips(language) {
  const form = getIntakeForm(language);
  return form.stepTips ?? [];
}

export function getLocalizedUploadLabels(language) {
  const form = getIntakeForm(language);
  return form.uploadLabels ?? [];
}

export function getLocalizedRequiredDocLabels(language) {
  const form = getIntakeForm(language);
  return form.requiredDocLabels ?? [];
}

export function getLocalizedIntakeUi(language) {
  return getIntakeForm(language).ui ?? {};
}

export function getLocalizedIntakeSidebar(language) {
  return getIntakeForm(language).sidebar ?? {};
}
