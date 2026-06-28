"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { PROVIDER_FAQ } from "@/lib/providers/provider-content";

type ProviderFAQProps = {
  limit?: number;
};

export default function ProviderFAQ({ limit }: ProviderFAQProps) {
  const items = limit ? PROVIDER_FAQ.slice(0, limit) : PROVIDER_FAQ;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="eden-providers-faq">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `provider-faq-panel-${index}`;
        const buttonId = `provider-faq-button-${index}`;

        return (
          <div key={item.question} className="eden-providers-faq__item">
            <button
              id={buttonId}
              type="button"
              className="eden-providers-faq__trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span>{item.question}</span>
              <ChevronDown
                size={18}
                className={`eden-providers-faq__chevron${isOpen ? " eden-providers-faq__chevron--open" : ""}`}
                aria-hidden="true"
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`eden-providers-faq__panel${isOpen ? " eden-providers-faq__panel--open" : ""}`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
