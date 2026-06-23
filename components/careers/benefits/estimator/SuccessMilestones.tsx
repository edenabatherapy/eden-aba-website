"use client";

import { motion, useReducedMotion } from "framer-motion";
import { SUCCESS_MILESTONES } from "@/lib/careers/salary-estimator-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export default function SuccessMilestones() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-[1.5rem] border border-teal-100 bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-lg font-extrabold text-slate-900">Success milestones</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        Examples of growth checkpoints clinicians may encounter on an Eden career journey.
      </p>

      <ol className="relative mt-8 space-y-0">
        <div className="absolute bottom-4 left-[15px] top-4 w-0.5 bg-teal-200" aria-hidden />
        {SUCCESS_MILESTONES.map((milestone, index) => (
          <motion.li
            key={milestone.id}
            initial={reduceMotion ? false : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: index * 0.1, ease: EASE_OUT }}
            className="relative flex items-start gap-4 pb-6 last:pb-0"
          >
            <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white">
              {index + 1}
            </span>
            <div>
              <h4 className="text-sm font-extrabold text-slate-900">{milestone.title}</h4>
              <p className="mt-1 text-sm leading-6 text-slate-600">{milestone.description}</p>
            </div>
          </motion.li>
        ))}
      </ol>
    </div>
  );
}
