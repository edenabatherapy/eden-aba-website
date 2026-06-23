import type { Transition, Variants } from "framer-motion";

export const EASE_OUT: Transition["ease"] = [0.22, 1, 0.36, 1];

export const fadeUpVariants: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
};

export const fadeInVariants: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

export const scaleHover = {
  whileHover: { y: -4, scale: 1.01 },
  transition: { duration: 0.2, ease: EASE_OUT },
};

export function scrollReveal(delay = 0) {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-48px" },
    variants: fadeUpVariants,
    transition: { duration: 0.55, ease: EASE_OUT, delay },
  };
}

export function staggerContainer(stagger = 0.08) {
  return {
    initial: "hidden",
    whileInView: "visible",
    viewport: { once: true, margin: "-48px" },
    variants: {
      hidden: {},
      visible: { transition: { staggerChildren: stagger } },
    },
  };
}
