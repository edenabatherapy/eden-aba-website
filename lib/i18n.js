import en from "@/locales/en.json";
import vi from "@/locales/vi.json";

const catalogs = { en, vi };

export const DEFAULT_LANGUAGE = "en";
export const STORAGE_KEY = "eden-language";

export function getTranslation(language) {
  const catalog = catalogs[language] || catalogs.en;
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
  if (value == null) return fallback;
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
