"use client";

import { useEffect, useState, type ReactNode } from "react";
import { motion, type Transition, type Variants } from "framer-motion";

export const fadeUp: {
  initial: { opacity: number; y: number };
  whileInView: { opacity: number; y: number };
  viewport: { once: boolean; margin: string };
  transition: Transition;
} = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export const staggerContainer: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08 },
  },
};

export const staggerItem: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const } },
};

export function SectionEyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="text-xs font-bold uppercase tracking-[0.18em] text-emerald-700 sm:text-sm">{children}</p>
  );
}

export function GlassPanel({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-[1.75rem] border border-white/60 bg-white/70 p-6 shadow-xl shadow-emerald-900/5 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/60 ${className}`}
    >
      {children}
    </div>
  );
}

export function AnimatedCounter({
  value,
  suffix = "",
  isVisible,
}: {
  value: number;
  suffix?: string;
  isVisible: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return undefined;

    const prefersReducedMotion =
      typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReducedMotion) {
      setCount(value);
      return undefined;
    }

    let animationFrame = 0;
    let startTime: number | null = null;
    const duration = 2000;

    const animate = (timestamp: number) => {
      if (startTime === null) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setCount(Math.floor(progress * value));
      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    setCount(0);
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [isVisible, value]);

  const formatted =
    suffix === "+" && value >= 1000
      ? `${count.toLocaleString()}${suffix}`
      : suffix === "%"
        ? `${count}${suffix}`
        : `${count.toLocaleString()}${suffix}`;

  return (
    <span aria-live="polite" aria-atomic="true">
      {formatted}
    </span>
  );
}

export const MotionSection = motion.section;
