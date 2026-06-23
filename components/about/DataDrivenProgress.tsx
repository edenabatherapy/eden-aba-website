"use client";

import { BarChart3, CheckCircle2, ClipboardList, LineChart, Users } from "lucide-react";
import { motion } from "framer-motion";
import { OUR_APPROACH_PAGE } from "@/lib/our-approach-content";
import { fadeUp, GlassPanel, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

export default function DataDrivenProgress() {
  const content = OUR_APPROACH_PAGE.dataDriven;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="data-driven-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="data-driven-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.headline}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{content.intro}</p>
        </motion.div>

        <div className="mt-12 grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
            <GlassPanel className="h-full">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                    Progress overview
                  </p>
                  <h3 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">Sample goal tracking view</h3>
                </div>
                <LineChart size={28} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
              </div>

              <p className="mt-4 text-sm leading-6 text-slate-600 dark:text-slate-300">
                Illustrative dashboard layout — actual progress charts are individualized for each child&apos;s treatment plan.
              </p>

              <div className="mt-8 space-y-4" aria-hidden="true">
                {["Communication", "Daily routines", "Social play", "Transitions"].map((label, index) => (
                  <div key={label}>
                    <div className="mb-2 flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-200">
                      <span>{label}</span>
                      <span className="text-emerald-700 dark:text-emerald-300">Tracking active</span>
                    </div>
                    <div className="h-3 overflow-hidden rounded-full bg-emerald-100 dark:bg-slate-800">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-500"
                        style={{ width: `${55 + index * 10}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </GlassPanel>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid gap-4"
          >
            <motion.div variants={staggerItem}>
              <GlassPanel>
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                  <BarChart3 size={20} className="text-emerald-600" aria-hidden="true" />
                  Questions data helps answer
                </h3>
                <ul className="mt-4 space-y-3">
                  {content.questions.map((question) => (
                    <li key={question} className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      {question}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </motion.div>

            <motion.div variants={staggerItem}>
              <GlassPanel>
                <h3 className="flex items-center gap-2 text-lg font-extrabold text-slate-900 dark:text-white">
                  <ClipboardList size={20} className="text-emerald-600" aria-hidden="true" />
                  BCBA review highlights
                </h3>
                <ul className="mt-4 space-y-3">
                  {content.highlights.map((highlight) => (
                    <li key={highlight} className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                      <Users size={16} className="mt-0.5 shrink-0 text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                      {highlight}
                    </li>
                  ))}
                </ul>
              </GlassPanel>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
