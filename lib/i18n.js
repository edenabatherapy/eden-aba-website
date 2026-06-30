import en from "@/locales/en.json";
import vi from "@/locales/vi.json";
import intakeFormEn from "@/locales/partials/intake-form-en.json";
import intakeFormVi from "@/locales/partials/intake-form-vi.json";
import aiIntakeEn from "@/locales/partials/ai-intake-en.json";
import aiIntakeVi from "@/locales/partials/ai-intake-vi.json";
import alliedHealthEn from "@/locales/partials/allied-health-services-en.json";
import alliedHealthVi from "@/locales/partials/allied-health-services-vi.json";
import enterpriseServicesEn from "@/locales/partials/enterprise-services-en.json";
import enterpriseServicesVi from "@/locales/partials/enterprise-services-vi.json";

const catalogs = { en, vi };

const intakeFormCatalogs = {
  en: intakeFormEn,
  vi: intakeFormVi,
};

const aiIntakeCatalogs = {
  en: aiIntakeEn,
  vi: aiIntakeVi,
};

const enterpriseServicesCatalogs = {
  en: enterpriseServicesEn,
  vi: enterpriseServicesVi,
};

const alliedHealthCatalogs = {
  en: alliedHealthEn,
  vi: alliedHealthVi,
};

export const DEFAULT_LANGUAGE = "en";
export const STORAGE_KEY = "eden-language";
export const SUPPORTED_LANGUAGES = ["en", "vi"];

function isPlainObject(value) {
  return value != null && typeof value === "object" && !Array.isArray(value);
}

/** Deep-merge English catalog under the active language so missing keys fall back to English. */
export function deepMerge(base, overlay) {
  if (!isPlainObject(base)) return overlay ?? base;
  if (!isPlainObject(overlay)) return { ...base };

  const merged = { ...base };
  for (const [key, value] of Object.entries(overlay)) {
    if (isPlainObject(value) && isPlainObject(base[key])) {
      merged[key] = deepMerge(base[key], value);
    } else if (value !== undefined) {
      merged[key] = value;
    }
  }
  return merged;
}

export function getTranslation(language) {
  const lang = catalogs[language] ? language : DEFAULT_LANGUAGE;
  const catalog = deepMerge(catalogs.en, catalogs[lang]);
  const intakeForm = deepMerge(intakeFormCatalogs.en, intakeFormCatalogs[lang] || {});
  const aiIntake = deepMerge(aiIntakeCatalogs.en, aiIntakeCatalogs[lang] || {});
  const enterpriseServices = deepMerge(
    enterpriseServicesCatalogs.en,
    enterpriseServicesCatalogs[lang] || {},
  );
  const alliedHealthServices = deepMerge(alliedHealthCatalogs.en, alliedHealthCatalogs[lang] || {});

  return {
    ...catalog.common,
    meta: catalog.meta,
    menu: catalog.menu,
    pages: catalog.pages,
    hero: catalog.hero,
    insuranceForm: catalog.insuranceForm,
    jobs: catalog.jobs,
    serviceData: catalog.serviceData,
    intakeSteps: catalog.intakeSteps,
    edenLocations: catalog.edenLocations,
    edenBusinessInfo: catalog.edenBusinessInfo,
    intakeForm,
    aiIntake,
    enterpriseServices,
    alliedHealthServices,
  };
}

export function getMeta(language) {
  const t = getTranslation(language);
  return t.meta || catalogs.en.meta;
}

export function resolvePath(obj, path) {
  return path.split(".").reduce((acc, key) => (acc == null ? undefined : acc[key]), obj);
}

export function translate(language, path, fallback = "") {
  const value = resolvePath(getTranslation(language), path);
  if (value == null || value === "") return fallback;
  return value;
}

export function getMenu(language) {
  return getTranslation(language).menu || catalogs.en.menu;
}

export function getJobs(language) {
  return getTranslation(language).jobs || catalogs.en.jobs;
}

export function getServiceData(language) {
  return getTranslation(language).serviceData || catalogs.en.serviceData;
}

export function getIntakeSteps(language) {
  return getTranslation(language).intakeSteps || catalogs.en.intakeSteps;
}

export function getEdenLocations(language) {
  return getTranslation(language).edenLocations || catalogs.en.edenLocations;
}

export function getEdenBusinessInfo(language) {
  return getTranslation(language).edenBusinessInfo || catalogs.en.edenBusinessInfo;
}

export function getIntakeForm(language) {
  return getTranslation(language).intakeForm || intakeFormCatalogs.en;
}

export function getAiIntake(language) {
  return getTranslation(language).aiIntake || aiIntakeCatalogs.en;
}
