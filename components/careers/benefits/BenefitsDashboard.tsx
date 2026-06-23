"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  Briefcase,
  Calendar,
  GraduationCap,
  Heart,
  Sparkles,
  TrendingUp,
} from "lucide-react";
import { BENEFITS_CATEGORIES } from "@/lib/careers/benefits-careers-data";
import RbtScrollReveal from "@/components/careers/rbt/RbtScrollReveal";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const ICONS = {
  financial: Briefcase,
  scheduling: Calendar,
  clinical: Sparkles,
  training: GraduationCap,
  wellbeing: Heart,
  advancement: TrendingUp,
} as const;

export default function BenefitsDashboard() {
  const [activeId, setActiveId] = useState(BENEFITS_CATEGORIES[0].id);
  const reduceMotion = useReducedMotion();
  const active = BENEFITS_CATEGORIES.find((c) => c.id === activeId) ?? BENEFITS_CATEGORIES[0];
  const ActiveIcon = ICONS[active.id as keyof typeof ICONS] ?? Sparkles;

  return (
    <RbtScrollReveal>
      <section aria-labelledby="benefits-dashboard-heading">
        <h2 id="benefits-dashboard-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Benefits categories dashboard
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
          Explore support areas that may be available depending on your role, schedule, and employment status.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,260px)_1fr]">
          <div
            role="tablist"
            aria-label="Benefits categories"
            className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
          >
            {BENEFITS_CATEGORIES.map((category) => {
              const Icon = ICONS[category.id as keyof typeof ICONS] ?? Sparkles;
              const selected = activeId === category.id;
              return (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  id={`benefits-tab-${category.id}`}
                  aria-selected={selected}
                  aria-controls={`benefits-panel-${category.id}`}
                  onClick={() => setActiveId(category.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                    selected
                      ? "bg-teal-700 text-white shadow-sm"
                      : "border border-teal-100 bg-white text-slate-700 hover:bg-teal-50"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {category.title}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`benefits-panel-${active.id}`}
            aria-labelledby={`benefits-tab-${active.id}`}
            className="min-h-[220px] rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm sm:p-8"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={reduceMotion ? undefined : { opacity: 0, y: -6 }}
                transition={{ duration: reduceMotion ? 0 : 0.25, ease: EASE_OUT }}
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
                    <ActiveIcon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="text-xl font-extrabold text-slate-900">{active.title}</h3>
                </div>
                <ul className="mt-6 space-y-3">
                  {active.items.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.04, duration: 0.3 }}
                      className="flex gap-3 rounded-xl border border-teal-100 bg-white px-4 py-3 text-sm text-slate-700 shadow-sm"
                    >
                      <span className="font-black text-teal-700" aria-hidden="true">
                        •
                      </span>
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </section>
    </RbtScrollReveal>
  );
}
