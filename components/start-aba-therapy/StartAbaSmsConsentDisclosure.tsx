"use client";

import { Fragment } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

const linkClassName = "text-emerald-700 underline underline-offset-2 hover:text-emerald-800";
const EDEN_URL_PATTERN =
  /(https:\/\/www\.edenabatherapy\.com\/(?:privacy-policy|terms-of-service))/g;

function renderConsentLinks(text: string) {
  return text.split(EDEN_URL_PATTERN).map((part, index) => {
    if (!part.startsWith("https://www.edenabatherapy.com/")) {
      return <Fragment key={index}>{part}</Fragment>;
    }

    const href = part.replace("https://www.edenabatherapy.com", "");
    return (
      <a
        key={index}
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={linkClassName}
      >
        {part}
      </a>
    );
  });
}

export default function StartAbaSmsConsentDisclosure() {
  const { language } = useSiteLanguage();
  const { consentUpdates } = getTranslation(language);

  return <>{renderConsentLinks(consentUpdates)}</>;
}
