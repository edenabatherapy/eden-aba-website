"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion } from "framer-motion";
import { useOurApproachPage } from "@/contexts/OurApproachContent";
import { fadeUp, SectionEyebrow } from "./shared";

export default function ApproachFAQ() {
  const content = useOurApproachPage().faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 px-4 py-20 dark:bg-slate-900/50 lg:px-8" aria-labelledby="approach-faq-heading">
      <div className="mx-auto max-w-3xl">
        <motion.div {...fadeUp} className="text-center">
          <SectionEyebrow>Frequently Asked Questions</SectionEyebrow>
          <h2 id="approach-faq-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            Common Questions About Our Approach
          </h2>
        </motion.div>

        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }} className="mt-10 space-y-3">
          {content.items.map((item, index) => {
            const isOpen = openIndex === index;
            const panelId = `approach-faq-panel-${index}`;

            return (
              <div
                key={item.question}
                className="overflow-hidden rounded-2xl border border-emerald-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
              >
                <button
                  type="button"
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  aria-expanded={isOpen}
                  aria-controls={panelId}
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                >
                  <span className="text-base font-bold text-slate-900 dark:text-white">{item.question}</span>
                  <ChevronDown
                    size={18}
                    className={`shrink-0 text-emerald-700 transition dark:text-emerald-300 ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden="true"
                  />
                </button>
                <div
                  id={panelId}
                  role="region"
                  aria-labelledby={`approach-faq-question-${index}`}
                  className={`px-5 transition-all duration-300 ${isOpen ? "pb-5 opacity-100" : "max-h-0 overflow-hidden opacity-0"}`}
                >
                  <p className="text-base leading-7 text-slate-600 dark:text-slate-300">{item.answer}</p>
                </div>
              </div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
