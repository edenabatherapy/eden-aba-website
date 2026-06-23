"use client";

import { motion, useReducedMotion, type HTMLMotionProps } from "framer-motion";
import { EASE_OUT, fadeUpVariants } from "./rbt-motion";

type RbtScrollRevealProps = HTMLMotionProps<"div"> & {
  delay?: number;
};

export default function RbtScrollReveal({ children, delay = 0, className, ...props }: RbtScrollRevealProps) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-48px" }}
      variants={fadeUpVariants}
      transition={{ duration: reduceMotion ? 0 : 0.55, ease: EASE_OUT, delay: reduceMotion ? 0 : delay }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export function RbtStaggerGrid({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduceMotion ? false : "hidden"}
      whileInView={reduceMotion ? undefined : "visible"}
      viewport={{ once: true, margin: "-48px" }}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: reduceMotion ? 0 : 0.07 } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RbtStaggerItem({ children, className }: { children: React.ReactNode; className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduceMotion
          ? undefined
          : {
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0, transition: { duration: 0.45, ease: EASE_OUT } },
            }
      }
    >
      {children}
    </motion.div>
  );
}
