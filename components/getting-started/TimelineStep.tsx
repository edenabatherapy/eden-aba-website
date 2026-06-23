"use client";

import { motion, useReducedMotion } from "framer-motion";

type TimelineStepProps = {
  step: number;
  title: string;
  description: string;
  isLast?: boolean;
  index: number;
};

export default function TimelineStep({ step, title, description, isLast = false, index }: TimelineStepProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.li
      initial={reduceMotion ? false : { opacity: 0, x: 16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.45, delay: index * 0.06 }}
      className="relative flex gap-4 pb-8 last:pb-0"
    >
      {!isLast ? (
        <span
          className="absolute left-4 top-10 h-[calc(100%-1rem)] w-0.5 bg-emerald-200"
          aria-hidden
        />
      ) : null}
      <span className="relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-700 text-xs font-black text-white shadow-sm">
        {step}
      </span>
      <div>
        <h3 className="text-base font-extrabold text-slate-900">{title}</h3>
        <p className="mt-2 text-sm leading-7 text-slate-600">{description}</p>
      </div>
    </motion.li>
  );
}
