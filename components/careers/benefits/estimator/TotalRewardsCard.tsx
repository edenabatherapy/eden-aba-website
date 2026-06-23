"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Sparkles } from "lucide-react";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";
import { formatCurrencyValue, useCountUp } from "@/components/careers/benefits/estimator/useCountUp";

type TotalRewardsCardProps = {
  total: number;
  roleLabel: string;
  recalcKey: string;
};

export default function TotalRewardsCard({ total, roleLabel, recalcKey }: TotalRewardsCardProps) {
  const reduceMotion = useReducedMotion();
  const animatedTotal = useCountUp(total, { duration: 1000 });

  return (
    <motion.div
      key={recalcKey}
      initial={reduceMotion ? false : { scale: 0.98, opacity: 0.85 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.35, ease: EASE_OUT }}
      className="relative overflow-hidden rounded-[1.5rem] border border-teal-200 bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 p-6 text-white shadow-lg sm:p-8"
    >
      {!reduceMotion ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-emerald-300/20"
          animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          style={{ backgroundSize: "200% 200%" }}
        />
      ) : null}

      <motion.div
        aria-hidden
        className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl"
        animate={reduceMotion ? undefined : { opacity: [0.2, 0.45, 0.2], scale: [1, 1.08, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative">
        <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.14em] text-teal-100">
          <Sparkles size={14} aria-hidden />
          Total Rewards Estimate
        </p>
        <p className="mt-2 text-sm font-semibold text-teal-50">{roleLabel}</p>
        <motion.p
          key={animatedTotal}
          className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl"
          animate={reduceMotion ? undefined : { textShadow: ["0 0 0px rgba(255,255,255,0)", "0 0 18px rgba(255,255,255,0.35)", "0 0 0px rgba(255,255,255,0)"] }}
          transition={{ duration: 0.8 }}
        >
          {formatCurrencyValue(animatedTotal)}
          <span className="ml-2 text-lg font-bold text-teal-100">/ yr</span>
        </motion.p>
        <p className="mt-3 text-sm leading-7 text-teal-100">
          Illustrative annual total including base pay, benefits value, training support, and PTO estimate.
        </p>
      </div>
    </motion.div>
  );
}
