"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Check } from "lucide-react";
import { CL_READINESS_INDICATORS } from "@/lib/careers/clinical-leadership-careers-data";
import RbtScrollReveal from "@/components/careers/rbt/RbtScrollReveal";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export default function ClinicalLeadershipReadinessSection() {
  const clReadinessIndicators = useLocalizedContent("CL_READINESS_INDICATORS", CL_READINESS_INDICATORS);

  const [selected, setSelected] = useState<Set<number>>(new Set());
  const reduceMotion = useReducedMotion();

  const toggle = (index: number) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(index)) next.delete(index);
      else next.add(index);
      return next;
    });
  };

  const count = selected.size;
  const total = clReadinessIndicators.length;
  const pct = Math.round((count / total) * 100);

  return (
    <RbtScrollReveal>
      <section
        className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-emerald-50/40 via-white to-teal-50/30 p-8 shadow-sm sm:p-10"
        aria-labelledby="cl-readiness-heading"
      >
        <h2 id="cl-readiness-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Are you ready for leadership?
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
          Select the leadership indicators that reflect your current experience. This self-assessment is for reflection
          only—not a hiring requirement.
        </p>

        <div className="mt-6 rounded-xl border border-teal-100 bg-white p-4">
          <div className="flex items-center justify-between text-sm font-bold text-slate-700">
            <span>Leadership readiness indicators</span>
            <span>
              {count} of {total} selected
            </span>
          </div>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-teal-100">
            <motion.div
              className="h-full rounded-full bg-teal-600"
              initial={false}
              animate={{ width: `${pct}%` }}
              transition={{ duration: reduceMotion ? 0 : 0.4, ease: EASE_OUT }}
              role="progressbar"
              aria-valuenow={pct}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Selected leadership indicators"
            />
          </div>
        </div>

        <ul className="mt-8 grid gap-3 sm:grid-cols-2">
          {clReadinessIndicators.map((indicator, index) => {
            const isSelected = selected.has(index);
            return (
              <li key={indicator}>
                <button
                  type="button"
                  onClick={() => toggle(index)}
                  aria-pressed={isSelected}
                  className={`flex w-full items-center gap-3 rounded-xl border px-4 py-3 text-left text-sm font-semibold transition hover:-translate-y-0.5 hover:shadow-md ${
                    isSelected
                      ? "border-teal-300 bg-teal-50 text-teal-900 shadow-sm"
                      : "border-teal-100 bg-white text-slate-700 shadow-sm"
                  }`}
                >
                  <span
                    className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-full border-2 transition ${
                      isSelected ? "border-teal-600 bg-teal-600 text-white" : "border-teal-200 bg-white text-transparent"
                    }`}
                    aria-hidden="true"
                  >
                    <Check size={14} />
                  </span>
                  {indicator}
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </RbtScrollReveal>
  );
}
