import viAppData from "@/locales/vi-app-data.json";
import viPageOverlays from "@/locales/partials/vi-page-overlays.json";
import viAboutCoreOverlays from "@/locales/partials/vi-about-core-overlays.json";
import viAboutOverlays from "@/locales/partials/vi-about-overlays.json";
import viCareersOverlays from "@/locales/partials/vi-careers-overlays.json";
import viProvidersOverlays from "@/locales/partials/vi-providers-overlays.json";
import viServicesOverlays from "@/locales/partials/vi-services-overlays.json";
import { deepMerge } from "@/lib/i18n";
import { localizeValue } from "@/lib/localize";

const mergedViAppData = {
  ...viAppData,
  ...viPageOverlays,
  ...viAboutCoreOverlays,
  ...viAboutOverlays,
  ...viCareersOverlays,
  ...viProvidersOverlays,
  ...viServicesOverlays,
};

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
