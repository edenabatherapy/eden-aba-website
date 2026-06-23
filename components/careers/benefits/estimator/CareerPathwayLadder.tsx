"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CAREER_LADDER, type SalaryRoleType } from "@/lib/careers/salary-estimator-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

type CareerPathwayLadderProps = {
  activeRole: SalaryRoleType;
};

export default function CareerPathwayLadder({ activeRole }: CareerPathwayLadderProps) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="rounded-[1.5rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm sm:p-8">
      <h3 className="text-lg font-extrabold text-slate-900">Career pathway ladder</h3>
      <p className="mt-2 text-sm leading-7 text-slate-600">
        Illustrative progression from direct care through BCBA leadership. Timelines vary by credential, performance, and
        organizational needs.
      </p>

      <ol className="relative mx-auto mt-8 flex max-w-xs flex-col items-center">
        {CAREER_LADDER.map((step, index) => {
          const active = step.id === activeRole;
          const isLast = index === CAREER_LADDER.length - 1;

          return (
            <li key={step.id} className="flex flex-col items-center">
              <motion.div
                initial={reduceMotion ? false : { opacity: 0, scale: 0.92 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: index * 0.12, ease: EASE_OUT }}
                className={`relative z-10 flex min-w-[168px] flex-col items-center rounded-2xl border px-5 py-3 text-center shadow-sm transition ${
                  active
                    ? "border-teal-500 bg-teal-700 text-white shadow-md shadow-teal-900/20"
                    : "border-teal-100 bg-white text-slate-800"
                }`}
              >
                <motion.span
                  animate={active && !reduceMotion ? { scale: [1, 1.06, 1] } : { scale: 1 }}
                  transition={{ duration: 1.8, repeat: active ? Infinity : 0, repeatDelay: 2 }}
                  className="text-sm font-black"
                >
                  {step.shortLabel}
                </motion.span>
                {active ? (
                  <span className="mt-1 text-[10px] font-bold uppercase tracking-wide text-teal-100">Your selection</span>
                ) : null}
              </motion.div>

              {!isLast ? (
                <motion.div
                  aria-hidden
                  className="flex h-10 flex-col items-center justify-center"
                  initial={reduceMotion ? false : { scaleY: 0 }}
                  whileInView={{ scaleY: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.35, delay: 0.08 + index * 0.12, ease: EASE_OUT }}
                  style={{ originY: 0 }}
                >
                  <div className="h-full w-0.5 bg-teal-200" />
                  <span className="text-xs font-black text-teal-500">↓</span>
                </motion.div>
              ) : null}
            </li>
          );
        })}
      </ol>
    </div>
  );
}
