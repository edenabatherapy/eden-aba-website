"use client";

import { useMemo } from "react";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { TRUSTED_HEALTHCARE_TECH_IDS } from "./ai-intake-config";
import { getAiIntakeSection } from "./ai-intake-i18n";

export default function TrustedHealthcareTech() {
  const { language } = useSiteLanguage();
  const copy = useMemo(() => getAiIntakeSection(language).tech, [language]);

  return (
    <div className="eden-ai-tech">
      <header className="eden-ai-tech__head">
        <p className="eden-ai-tech__eyebrow">{copy.eyebrow}</p>
        <h3 className="eden-ai-tech__title">{copy.title}</h3>
        <p className="eden-ai-tech__disclaimer">{copy.disclaimer}</p>
      </header>

      <div className="eden-ai-tech__grid">
        {TRUSTED_HEALTHCARE_TECH_IDS.map((id) => {
          const item = copy.cards[id];
          return (
            <article key={id} className="eden-ai-tech__card" data-integration={id}>
              <div className="eden-ai-tech__card-top">
                <span className="eden-ai-tech__card-name">{item.name}</span>
                <span className="eden-ai-tech__card-role">{item.role}</span>
              </div>
              <p className="eden-ai-tech__card-text">{item.description}</p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
