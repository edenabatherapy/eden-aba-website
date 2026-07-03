"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, Briefcase, MessageCircle, TrendingUp } from "lucide-react";
import {
  ESTIMATOR_TAB_CONTENT,
  ESTIMATOR_TABS,
  type EstimatorTabId,
} from "@/lib/careers/salary-estimator-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";
import { HoverCard, MotionButton } from "@/components/careers/benefits/estimator/EstimatorPrimitives";

const TAB_ICONS = {
  rewards: Briefcase,
  growth: TrendingUp,
  interview: MessageCircle,
} as const;

export default function EstimatorTabs() {
  const estimatorTabContent = useLocalizedContent("ESTIMATOR_TAB_CONTENT", ESTIMATOR_TAB_CONTENT);
  const estimatorTabs = useLocalizedContent("ESTIMATOR_TABS", ESTIMATOR_TABS);

  const [activeTab, setActiveTab] = useState<EstimatorTabId>("rewards");
  const reduceMotion = useReducedMotion();
  const content = estimatorTabContent[activeTab];
  const ActiveIcon = TAB_ICONS[activeTab];

  return (
    <div className="rounded-[1.5rem] border border-teal-100 bg-white p-6 shadow-sm sm:p-8">
      <div role="tablist" aria-label="Estimator insights" className="flex flex-wrap gap-2">
        {estimatorTabs.map((tab) => {
          const selected = tab.id === activeTab;
          return (
            <MotionButton
              key={tab.id}
              role="tab"
              aria-selected={selected}
              aria-controls={`estimator-panel-${tab.id}`}
              id={`estimator-tab-${tab.id}`}
              onClick={() => setActiveTab(tab.id)}
              className={`rounded-full px-4 py-2.5 text-sm font-extrabold transition ${
                selected
                  ? "bg-teal-700 text-white shadow-sm"
                  : "border border-teal-100 bg-teal-50/50 text-teal-900 hover:bg-teal-50"
              }`}
            >
              {tab.label}
            </MotionButton>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`estimator-panel-${activeTab}`}
        aria-labelledby={`estimator-tab-${activeTab}`}
        className="mt-6 min-h-[220px]"
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={reduceMotion ? undefined : { opacity: 0, x: -20 }}
            transition={{ duration: reduceMotion ? 0 : 0.3, ease: EASE_OUT }}
          >
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-teal-700 text-white">
                <ActiveIcon size={20} aria-hidden />
              </span>
              <div>
                <h3 className="text-xl font-extrabold text-slate-900">{content.title}</h3>
                <p className="mt-1 text-sm leading-7 text-slate-600">{content.intro}</p>
              </div>
            </div>

            <ul className="mt-6 grid gap-4 md:grid-cols-3">
              {content.highlights.map((item, index) => (
                <HoverCard
                  key={item.title}
                  className="rounded-xl border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-5 shadow-sm"
                >
                  <motion.div
                    initial={reduceMotion ? false : { opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.35, delay: index * 0.08, ease: EASE_OUT }}
                  >
                    <motion.span
                      whileHover={reduceMotion ? undefined : { scale: 1.08 }}
                      className="inline-flex h-8 w-8 items-center justify-center rounded-lg bg-teal-100 text-teal-800"
                    >
                      <ArrowRight size={16} aria-hidden />
                    </motion.span>
                    <h4 className="mt-3 text-sm font-extrabold text-slate-900">{item.title}</h4>
                    <p className="mt-2 text-sm leading-6 text-slate-600">{item.text}</p>
                  </motion.div>
                </HoverCard>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
