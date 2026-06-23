"use client";

import { useCallback, useContext } from "react";
import { DEFAULT_LANGUAGE, STORAGE_KEY } from "@/lib/i18n";
import { SiteLanguageContext } from "@/components/providers/SiteLanguageProvider";

export type SiteLanguage = "en" | "vi";

export function isSiteLanguage(value: string | null | undefined): value is SiteLanguage {
  return value === "en" || value === "vi";
}

export function useSiteLanguage() {
  const context = useContext(SiteLanguageContext);

  if (!context) {
    return {
      language: DEFAULT_LANGUAGE as SiteLanguage,
      setLanguage: () => {},
    };
  }

  return context;
}

export function usePersistLanguage() {
  const { language, setLanguage } = useSiteLanguage();

  const chooseLanguage = useCallback(
    (nextLanguage: SiteLanguage) => {
      setLanguage(nextLanguage);
      if (typeof window !== "undefined") {
        localStorage.setItem(STORAGE_KEY, nextLanguage);
        document.documentElement.lang = nextLanguage;
      }
    },
    [setLanguage],
  );

  return { language, chooseLanguage, defaultLanguage: DEFAULT_LANGUAGE };
}
