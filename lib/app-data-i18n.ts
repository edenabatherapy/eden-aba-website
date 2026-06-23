import viAppData from "@/locales/vi-app-data.json";
import { deepMerge } from "@/lib/i18n";
import { localizeValue } from "@/lib/localize";

export function localizeAppData<T>(key: string, english: T, language: string): T {
  if (language !== "vi") return english;

  const overlay = viAppData[key as keyof typeof viAppData];
  if (!overlay) return english;

  return localizeValue(english, overlay as T, language);
}

export function mergeAppData<T extends Record<string, unknown>>(english: T, language: string): T {
  if (language !== "vi") return english;
  const overlay = viAppData as Record<string, unknown>;
  return deepMerge(english, overlay) as T;
}
