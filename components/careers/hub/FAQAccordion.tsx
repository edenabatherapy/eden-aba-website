"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import type { CareerFaqItem } from "@/lib/careers/faq-data";

type FAQAccordionProps = {
  title: string;
  intro?: string;
  items: CareerFaqItem[];
};

export default function FAQAccordion({ title, intro, items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section aria-labelledby={title ? "career-faq-heading" : undefined}>
      {title ? (
        <h2 id="career-faq-heading" className="text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
          {title}
        </h2>
      ) : null}
      {intro && <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">{intro}</p>}
      <div className="mt-6 space-y-3">
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `career-faq-panel-${index}`;
          const buttonId = `career-faq-button-${index}`;
          return (
            <div
              key={item.question}
              className="overflow-hidden rounded-[1.25rem] border border-emerald-100 bg-white dark:border-slate-700 dark:bg-slate-900"
            >
              <button
                id={buttonId}
                type="button"
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className="text-base font-bold text-slate-900 dark:text-white">{item.question}</span>
                <ChevronDown
                  size={18}
                  className={`shrink-0 text-emerald-700 transition ${isOpen ? "rotate-180" : ""}`}
                  aria-hidden="true"
                />
              </button>
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className={`px-5 pb-4 text-base leading-7 text-slate-600 dark:text-slate-300 ${isOpen ? "block" : "hidden"}`}
              >
                {item.answer}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
