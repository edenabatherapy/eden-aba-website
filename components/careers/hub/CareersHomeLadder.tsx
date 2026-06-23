"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { PUBLIC_CAREER_PATH_STEPS } from "@/lib/careers/career-path-data";
import RbtScrollReveal from "@/components/careers/rbt/RbtScrollReveal";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export default function CareersHomeLadder() {
  const [expandedId, setExpandedId] = useState<string | null>(PUBLIC_CAREER_PATH_STEPS[0]?.id ?? null);
  const reduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  return (
    <RbtScrollReveal>
      <section
        className="rounded-[2rem] border border-teal-100 bg-gradient-to-br from-white via-teal-50/20 to-emerald-50/30 p-8 shadow-sm sm:p-10"
        aria-labelledby="careers-ladder-heading"
      >
        <h2 id="careers-ladder-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Your career ladder at Eden
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
          From entry-level direct care through BCBA clinical responsibility—expand each step to explore skills, next
          steps, and educational notes. Advanced leadership pathways are described on Eden&apos;s Career Paths page.
        </p>

        <ol className="relative mt-10 space-y-3">
          <div
            className="absolute bottom-6 left-4 top-6 hidden w-0.5 bg-teal-200 sm:block"
            aria-hidden="true"
          >
            <motion.div
              className="h-full w-full bg-teal-600"
              initial={reduceMotion ? { scaleY: 1 } : { scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: reduceMotion ? 0 : 1.5, ease: EASE_OUT }}
              style={{ transformOrigin: "top" }}
            />
          </div>

          {PUBLIC_CAREER_PATH_STEPS.map((step, index) => {
            const isOpen = expandedId === step.id;
            return (
              <motion.li
                key={step.id}
                initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: index * 0.04, ease: EASE_OUT }}
                className="relative sm:pl-10"
              >
                <span
                  className="absolute left-0 top-4 hidden h-8 w-8 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white sm:flex"
                  aria-hidden="true"
                >
                  {index + 1}
                </span>
                <article className="overflow-hidden rounded-xl border border-teal-100 bg-white shadow-sm transition hover:border-teal-200 hover:shadow-md">
                  <button
                    type="button"
                    id={`ladder-trigger-${step.id}`}
                    aria-expanded={isOpen}
                    aria-controls={`ladder-panel-${step.id}`}
                    onClick={() => toggle(step.id)}
                    className="flex w-full items-center gap-3 px-4 py-4 text-left sm:px-5"
                  >
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-black text-teal-800 sm:hidden">
                      {index + 1}
                    </span>
                    <span className="flex-1">
                      <span className="block text-base font-extrabold text-slate-900">{step.title}</span>
                      {!isOpen && (
                        <span className="mt-0.5 block text-sm text-slate-500 line-clamp-1">{step.nextStep}</span>
                      )}
                    </span>
                    <ChevronDown
                      size={18}
                      className={`shrink-0 text-teal-700 transition-transform ${isOpen ? "rotate-180" : ""}`}
                      aria-hidden="true"
                    />
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        id={`ladder-panel-${step.id}`}
                        role="region"
                        aria-labelledby={`ladder-trigger-${step.id}`}
                        initial={reduceMotion ? false : { height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={reduceMotion ? undefined : { height: 0, opacity: 0 }}
                        transition={{ duration: reduceMotion ? 0 : 0.28, ease: EASE_OUT }}
                        className="overflow-hidden"
                      >
                        <div className="border-t border-teal-50 px-4 pb-5 pt-2 sm:px-5">
                          <p className="text-sm leading-7 text-slate-600">{step.roleDescription}</p>
                          <div className="mt-4 grid gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-teal-800">
                                Skills learned
                              </p>
                              <ul className="mt-2 space-y-1">
                                {step.skillsLearned.map((skill) => (
                                  <li key={skill} className="flex gap-2 text-sm text-slate-600">
                                    <span className="text-teal-600" aria-hidden="true">
                                      ✓
                                    </span>
                                    {skill}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-teal-800">
                                Typical next step
                              </p>
                              <p className="mt-2 text-sm font-semibold text-slate-800">{step.nextStep}</p>
                              <p className="mt-3 rounded-lg border border-teal-50 bg-teal-50/50 px-3 py-2 text-xs leading-6 text-slate-600">
                                {step.credentialNote}
                              </p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </article>
              </motion.li>
            );
          })}
        </ol>
      </section>
    </RbtScrollReveal>
  );
}
