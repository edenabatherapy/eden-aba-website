"use client";

import { useMemo } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { localizeAppData } from "@/lib/app-data-i18n";

export function useLocalizedContent<T>(key: string, english: T): T {
  const { language } = useSiteLanguage();
  return useMemo(() => localizeAppData(key, english, language), [key, english, language]);
}
