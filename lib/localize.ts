import { deepMerge } from "@/lib/i18n";

export type LocalizedRecord<T> = {
  en: T;
  vi?: T;
};

export function pickLocalized<T>(record: LocalizedRecord<T>, language: string): T {
  if (language === "vi" && record.vi) {
    if (typeof record.en === "object" && record.en !== null && !Array.isArray(record.en)) {
      return deepMerge(record.en as object, record.vi as object) as T;
    }
    return record.vi;
  }
  return record.en;
}

export function localizeValue<T>(english: T, vietnamese: T | undefined, language: string): T {
  if (language !== "vi" || vietnamese === undefined) return english;
  if (typeof english === "object" && english !== null && !Array.isArray(english)) {
    return deepMerge(english as object, vietnamese as object) as T;
  }
  return vietnamese;
}
