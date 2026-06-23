"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? false : { opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export function HoverCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      whileHover={reduceMotion ? undefined : { y: -6 }}
      transition={{ duration: 0.22, ease: EASE_OUT }}
      className={`transition-shadow hover:border-teal-200 hover:shadow-lg ${className}`}
    >
      {children}
    </motion.div>
  );
}

type MotionButtonProps = {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-pressed"?: boolean;
  "aria-selected"?: boolean;
  "aria-controls"?: string;
  id?: string;
  role?: string;
};

export function MotionButton({
  children,
  className = "",
  onClick,
  ...aria
}: MotionButtonProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={reduceMotion ? undefined : { scale: 1.03 }}
      whileTap={reduceMotion ? undefined : { scale: 0.98 }}
      transition={{ duration: 0.18, ease: EASE_OUT }}
      className={className}
      {...aria}
    >
      {children}
    </motion.button>
  );
}

export function PulseBadge({ children, className = "" }: { children: ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      animate={
        reduceMotion
          ? undefined
          : {
              boxShadow: [
                "0 0 0 0 rgba(15, 118, 110, 0)",
                "0 0 0 6px rgba(15, 118, 110, 0.12)",
                "0 0 0 0 rgba(15, 118, 110, 0)",
              ],
            }
      }
      transition={{ duration: 2, repeat: Infinity, repeatDelay: 8, ease: "easeInOut" }}
      className={className}
    >
      {children}
    </motion.span>
  );
}

export function InfoTooltip({ label, text }: { label: string; text: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <span className="group relative inline-flex">
      <button
        type="button"
        aria-label={label}
        className="ml-1 inline-flex h-5 w-5 items-center justify-center rounded-full border border-teal-200 bg-teal-50 text-[10px] font-black text-teal-800"
      >
        ?
      </button>
      <motion.span
        role="tooltip"
        initial={false}
        className="pointer-events-none absolute bottom-full left-1/2 z-20 mb-2 w-56 -translate-x-1/2 rounded-xl border border-teal-100 bg-white p-3 text-left text-xs font-medium leading-5 text-slate-600 opacity-0 shadow-lg transition-opacity group-hover:pointer-events-auto group-hover:opacity-100 group-focus-within:opacity-100"
        animate={reduceMotion ? undefined : undefined}
      >
        {text}
      </motion.span>
    </span>
  );
}
