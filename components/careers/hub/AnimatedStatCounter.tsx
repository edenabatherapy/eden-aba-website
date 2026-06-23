"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export type StatItem = {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description?: string;
};

type AnimatedStatCounterProps = {
  stats: StatItem[];
  className?: string;
  scaleReveal?: boolean;
};

function useAnimatedValue(target: number, active: boolean, reduceMotion: boolean) {
  const [value, setValue] = useState(reduceMotion ? target : 0);

  useEffect(() => {
    if (!active) return;
    if (reduceMotion) {
      setValue(target);
      return;
    }

    let frame = 0;
    const duration = 1200;
    const start = performance.now();

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(target * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, reduceMotion, target]);

  return value;
}

function StatCard({
  stat,
  index,
  scaleReveal = false,
}: {
  stat: StatItem;
  index: number;
  scaleReveal?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduceMotion = useReducedMotion();
  const value = useAnimatedValue(stat.value, inView, Boolean(reduceMotion));

  return (
    <motion.div
      ref={ref}
      initial={reduceMotion ? false : { opacity: 0, y: 20, scale: scaleReveal ? 0.95 : 1 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * (scaleReveal ? 0.1 : 0.08), ease: EASE_OUT }}
      className="rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-5 shadow-sm"
    >
      <p className="text-3xl font-extrabold tracking-tight text-teal-800">
        {stat.prefix}
        {value}
        {stat.suffix}
      </p>
      <p className="mt-2 text-sm font-extrabold text-slate-900">{stat.label}</p>
      {stat.description && <p className="mt-1 text-xs leading-6 text-slate-600">{stat.description}</p>}
    </motion.div>
  );
}

export default function AnimatedStatCounter({
  stats,
  className = "",
  scaleReveal = false,
}: AnimatedStatCounterProps) {
  return (
    <div className={`grid gap-4 sm:grid-cols-2 lg:grid-cols-4 ${className}`}>
      {stats.map((stat, index) => (
        <StatCard key={stat.label} stat={stat} index={index} scaleReveal={scaleReveal} />
      ))}
    </div>
  );
}
