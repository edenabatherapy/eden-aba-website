"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getRouteMetadata } from "@/lib/app-metadata";

export default function SiteLanguageSync() {
  const pathname = usePathname() ?? "/";
  const { language } = useSiteLanguage();

  useEffect(() => {
    document.documentElement.lang = language;

    const meta = getRouteMetadata(pathname, language);
    if (!meta) return;

    document.title = meta.title;

    let descriptionTag = document.querySelector('meta[name="description"]');
    if (!descriptionTag) {
      descriptionTag = document.createElement("meta");
      descriptionTag.setAttribute("name", "description");
      document.head.appendChild(descriptionTag);
    }
    descriptionTag.setAttribute("content", meta.description);

    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute("content", meta.title);

    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute("content", meta.description);

    const ogLocale = document.querySelector('meta[property="og:locale"]');
    if (ogLocale) ogLocale.setAttribute("content", language === "vi" ? "vi_VN" : "en_US");
  }, [language, pathname]);

  return null;
}
