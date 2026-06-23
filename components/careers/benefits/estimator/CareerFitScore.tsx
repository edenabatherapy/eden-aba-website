"use client";

import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";
import { useCountUp } from "@/components/careers/benefits/estimator/useCountUp";

type CareerFitScoreProps = {
  score: number;
};

const RADIUS = 54;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function CareerFitScore({ score }: CareerFitScoreProps) {
  const reduceMotion = useReducedMotion();
  const animatedScore = useCountUp(score, { duration: 1100 });
  const offset = CIRCUMFERENCE - (animatedScore / 100) * CIRCUMFERENCE;
  const glow = score > 90;

  return (
    <div
      className={`rounded-[1.25rem] border bg-gradient-to-br from-white to-teal-50/40 p-5 shadow-sm ${
        glow ? "border-teal-300 shadow-teal-200/50" : "border-teal-100"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.14em] text-teal-800">Career Fit Score</p>
          <p className="mt-1 text-sm text-slate-600">Based on role, experience, schedule, and region</p>
        </div>
        <div className="relative flex h-[124px] w-[124px] items-center justify-center">
          {glow && !reduceMotion ? (
            <motion.span
              aria-hidden
              className="absolute inset-2 rounded-full bg-teal-400/20 blur-md"
              animate={{ opacity: [0.35, 0.7, 0.35], scale: [0.95, 1.05, 0.95] }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
            />
          ) : null}
          <svg width="124" height="124" viewBox="0 0 124 124" className="-rotate-90" aria-hidden>
            <circle cx="62" cy="62" r={RADIUS} fill="none" stroke="#ccfbf1" strokeWidth="10" />
            <motion.circle
              cx="62"
              cy="62"
              r={RADIUS}
              fill="none"
              stroke="#0f766e"
              strokeWidth="10"
              strokeLinecap="round"
              strokeDasharray={CIRCUMFERENCE}
              initial={reduceMotion ? false : { strokeDashoffset: CIRCUMFERENCE }}
              animate={{ strokeDashoffset: offset }}
              transition={{ duration: reduceMotion ? 0 : 1.1, ease: EASE_OUT }}
            />
          </svg>
          <p className="absolute text-3xl font-extrabold text-teal-900" aria-live="polite">
            {animatedScore}
          </p>
        </div>
      </div>
    </div>
  );
}
