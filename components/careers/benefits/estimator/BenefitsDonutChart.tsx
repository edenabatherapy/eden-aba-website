"use client";

import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import type { TotalRewardsBreakdown } from "@/lib/careers/salary-estimator-data";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";
import { formatCurrencyValue } from "@/components/careers/benefits/estimator/useCountUp";

type BenefitsDonutChartProps = {
  breakdown: TotalRewardsBreakdown;
  recalcKey: string;
};

const SLICES: { key: keyof Omit<TotalRewardsBreakdown, "total">; label: string; color: string }[] = [
  { key: "baseEarnings", label: "Salary", color: "#0f766e" },
  { key: "benefitsValue", label: "Benefits", color: "#10b981" },
  { key: "ptoEstimate", label: "PTO", color: "#2dd4bf" },
  { key: "trainingSupport", label: "Training", color: "#0891b2" },
];

const SIZE = 180;
const STROKE = 22;
const RADIUS = (SIZE - STROKE) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export default function BenefitsDonutChart({ breakdown, recalcKey }: BenefitsDonutChartProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();

  let offset = 0;
  const slices = SLICES.map((slice) => {
    const value = breakdown[slice.key];
    const fraction = breakdown.total > 0 ? value / breakdown.total : 0;
    const length = fraction * CIRCUMFERENCE;
    const item = { ...slice, value, length, offset };
    offset += length;
    return item;
  });

  return (
    <div key={recalcKey} ref={ref} className="flex flex-col items-center gap-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative">
        <svg width={SIZE} height={SIZE} viewBox={`0 0 ${SIZE} ${SIZE}`} className="-rotate-90" aria-hidden>
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={RADIUS}
            fill="none"
            stroke="#e6fffa"
            strokeWidth={STROKE}
          />
          {slices.map((slice) => (
            <motion.circle
              key={slice.key}
              cx={SIZE / 2}
              cy={SIZE / 2}
              r={RADIUS}
              fill="none"
              stroke={slice.color}
              strokeWidth={STROKE}
              strokeDasharray={`${slice.length} ${CIRCUMFERENCE - slice.length}`}
              strokeDashoffset={-slice.offset}
              strokeLinecap="butt"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: EASE_OUT }}
            />
          ))}
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-xs font-bold uppercase tracking-wide text-slate-500">Total</p>
          <p className="text-lg font-extrabold text-teal-900">{formatCurrencyValue(breakdown.total)}</p>
        </div>
      </div>

      <ul className="grid w-full max-w-xs gap-2 sm:gap-3">
        {slices.map((slice, index) => (
          <motion.li
            key={slice.key}
            initial={reduceMotion ? false : { opacity: 0, x: 12 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.15 + index * 0.08, ease: EASE_OUT }}
            className="flex items-center justify-between rounded-xl border border-teal-100 bg-white px-3 py-2 text-sm shadow-sm"
          >
            <span className="flex items-center gap-2 font-bold text-slate-800">
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: slice.color }} aria-hidden />
              {slice.label}
            </span>
            <span className="font-extrabold text-teal-800">{formatCurrencyValue(slice.value)}</span>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
