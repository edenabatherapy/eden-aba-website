"use client";

import { motion } from "framer-motion";
import { useOurApproachPage } from "@/contexts/OurApproachContent";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "./shared";

export default function ClinicalProcess() {
  const content = useOurApproachPage().clinicalProcess;

  return (
    <section className="px-4 py-20 lg:px-8 dark:bg-slate-950" aria-labelledby="clinical-process-heading">
      <div className="mx-auto max-w-7xl">
        <motion.div {...fadeUp} className="mx-auto max-w-3xl text-center">
          <SectionEyebrow>{content.eyebrow}</SectionEyebrow>
          <h2 id="clinical-process-heading" className="mt-3 text-3xl font-extrabold text-slate-900 dark:text-white sm:text-4xl">
            {content.headline}
          </h2>
          <p className="mt-5 text-base leading-8 text-slate-600 dark:text-slate-300 sm:text-lg">{content.intro}</p>
        </motion.div>

        <motion.ol
          variants={staggerContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="relative mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4"
        >
          {content.steps.map((step, index) => (
            <motion.li
              key={step.title}
              variants={staggerItem}
              className="relative rounded-[1.75rem] border border-emerald-100 bg-white p-5 shadow-lg transition duration-300 hover:-translate-y-1 hover:border-emerald-300 hover:shadow-xl dark:border-slate-700 dark:bg-slate-900"
            >
              <div className="flex items-start gap-3">
                <div
                  className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-[#0b4f4f] to-[#128c8c] text-xs font-black text-white"
                  aria-hidden="true"
                >
                  {index + 1}
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-emerald-700 dark:text-emerald-300">
                    {step.step}
                  </p>
                  <h3 className="mt-1 text-lg font-extrabold text-slate-900 dark:text-white">{step.title}</h3>
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{step.description}</p>
                </div>
              </div>
            </motion.li>
          ))}
        </motion.ol>
      </div>
    </section>
  );
}
