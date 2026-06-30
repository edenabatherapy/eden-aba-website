"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";

type EdenRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "scale";
};

export default function EdenReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
}: EdenRevealProps) {
  const reduceMotion = useReducedMotion();

  if (reduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const initial =
    direction === "left"
      ? { opacity: 0, x: -24 }
      : direction === "right"
        ? { opacity: 0, x: 24 }
        : direction === "scale"
          ? { opacity: 0, scale: 0.96 }
          : { opacity: 0, y: 24 };

  const animate =
    direction === "scale"
      ? { opacity: 1, scale: 1 }
      : direction === "left" || direction === "right"
        ? { opacity: 1, x: 0 }
        : { opacity: 1, y: 0 };

  return (
    <motion.div
      initial={initial}
      whileInView={animate}
      viewport={{ once: true, margin: "-48px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
