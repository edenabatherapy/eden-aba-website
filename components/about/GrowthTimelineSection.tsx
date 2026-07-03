"use client";

import { motion } from "framer-motion";
import { useOurTeamPage } from "@/contexts/OurTeamContent";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

export default function GrowthTimelineSection() {
  const content = useOurTeamPage().growthTimeline;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="growth-timeline-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>Future Team Timeline</SectionEyebrow>
          <h2 id="growth-timeline-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.headline}
          </h2>
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-14 grid gap-6 lg:grid-cols-4"
        >
          <div
            className="pointer-events-none absolute left-0 right-0 top-8 hidden h-px bg-gradient-to-r from-transparent via-emerald-300 to-transparent lg:block"
            aria-hidden="true"
          />

          {content.phases.map((phase, index) => (
            <motion.li
              key={phase.phase}
              variants={staggerItem}
              className="relative rounded-[1.75rem] border border-emerald-100 bg-white p-6 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div
                className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-[#0b4f4f] to-[#128c8c] text-sm font-black text-white"
                aria-hidden="true"
              >
                {index + 1}
              </div>
              <p className="text-xs font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                {phase.phase}
              </p>
              <h3 className="mt-2 text-xl font-extrabold text-slate-900 dark:text-white">{phase.title}</h3>
              <ul className="mt-4 space-y-2">
                {phase.items.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
