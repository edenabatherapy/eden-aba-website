"use client";

import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  BarChart3,
  ClipboardCheck,
  Network,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { CL_COMPETENCY_DASHBOARDS } from "@/lib/careers/clinical-leadership-careers-data";
import RbtScrollReveal from "@/components/careers/rbt/RbtScrollReveal";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const ICONS = {
  "clinical-excellence": Sparkles,
  supervision: Network,
  operations: BarChart3,
  "quality-governance": ShieldCheck,
  strategic: ClipboardCheck,
} as const;

export default function ClinicalLeadershipCompetencyDashboard() {
  const [activeId, setActiveId] = useState(CL_COMPETENCY_DASHBOARDS[0].id);
  const reduceMotion = useReducedMotion();
  const active = CL_COMPETENCY_DASHBOARDS.find((d) => d.id === activeId) ?? CL_COMPETENCY_DASHBOARDS[0];
  const ActiveIcon = ICONS[active.id as keyof typeof ICONS] ?? Sparkles;

  return (
    <RbtScrollReveal>
      <section aria-labelledby="cl-competency-heading">
        <h2 id="cl-competency-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
          Leadership competencies dashboard
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
          Executive clinical leaders at Eden are expected to demonstrate excellence across clinical, operational, and
          strategic domains.
        </p>

        <div className="mt-8 grid gap-6 lg:grid-cols-[minmax(0,280px)_1fr]">
          <div
            role="tablist"
            aria-label="Leadership competency domains"
            className="flex flex-row gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible"
          >
            {CL_COMPETENCY_DASHBOARDS.map((domain) => {
              const Icon = ICONS[domain.id as keyof typeof ICONS] ?? Sparkles;
              const selected = activeId === domain.id;
              return (
                <button
                  key={domain.id}
                  type="button"
                  role="tab"
                  id={`cl-comp-tab-${domain.id}`}
                  aria-selected={selected}
                  aria-controls={`cl-comp-panel-${domain.id}`}
                  onClick={() => setActiveId(domain.id)}
                  className={`flex shrink-0 items-center gap-2 rounded-xl px-4 py-3 text-left text-sm font-bold transition ${
                    selected
                      ? "bg-teal-700 text-white shadow-sm"
                      : "border border-teal-100 bg-white text-slate-700 hover:bg-teal-50"
                  }`}
                >
                  <Icon size={16} aria-hidden="true" />
                  {domain.title}
                </button>
              );
            })}
          </div>

          <div
            role="tabpanel"
            id={`cl-comp-panel-${active.id}`}
            aria-labelledby={`cl-comp-tab-${active.id}`}
            className="min-h-[240px] rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm sm:p-8"
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
                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {active.items.map((item, index) => (
                    <motion.li
                      key={item}
                      initial={reduceMotion ? false : { opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05, duration: 0.3 }}
                      className="flex items-center gap-3 rounded-xl border border-teal-100 bg-white px-4 py-3 text-sm font-semibold text-slate-700 shadow-sm"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-teal-100 text-xs font-black text-teal-800">
                        {index + 1}
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
