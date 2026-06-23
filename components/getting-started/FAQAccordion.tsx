"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";

export type GettingStartedFaqItem = {
  question: string;
  answer: string;
};

type FAQAccordionProps = {
  items: readonly GettingStartedFaqItem[];
};

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="space-y-3">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        const panelId = `getting-started-faq-panel-${index}`;
        const buttonId = `getting-started-faq-button-${index}`;

        return (
          <div
            key={item.question}
            className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm"
          >
            <button
              id={buttonId}
              type="button"
              className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenIndex(isOpen ? null : index)}
            >
              <span className="text-base font-extrabold text-slate-900">{item.question}</span>
              <ChevronDown
                size={18}
                className={`shrink-0 text-emerald-700 transition ${isOpen ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            <div
              id={panelId}
              role="region"
              aria-labelledby={buttonId}
              className={`px-5 pb-4 text-sm leading-7 text-slate-600 ${isOpen ? "block" : "hidden"}`}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
