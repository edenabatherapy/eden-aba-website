import viAppData from "@/locales/vi-app-data.json";
import viPageOverlays from "@/locales/partials/vi-page-overlays.json";
import { deepMerge } from "@/lib/i18n";
import { localizeValue } from "@/lib/localize";

const mergedViAppData = { ...viAppData, ...viPageOverlays };

export function localizeAppData<T>(key: string, english: T, language: string): T {
  if (language !== "vi") return english;

  const overlay = mergedViAppData[key as keyof typeof mergedViAppData];
  if (!overlay) return english;

  return localizeValue(english, overlay as T, language);
}

export function mergeAppData<T extends Record<string, unknown>>(english: T, language: string): T {
  if (language !== "vi") return english;
  return deepMerge(english, mergedViAppData as Record<string, unknown>) as T;
}
