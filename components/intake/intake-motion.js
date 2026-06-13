/** Shared Framer Motion presets for intake form UI polish. */

export const fadeUp = {
  initial: false,
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -8 },
  transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
};

export const fadeIn = {
  initial: false,
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.35, ease: "easeOut" },
};

export const scaleIn = {
  initial: false,
  animate: { opacity: 1, scale: 1 },
  transition: { duration: 0.4, ease: [0.22, 1, 0.36, 1] },
};

export const staggerContainer = {
  initial: {},
  animate: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
};

export const staggerItem = {
  initial: false,
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.38, ease: [0.22, 1, 0.36, 1] },
  },
};

export const stepTransition = {
  initial: false,
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -12 },
  transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] },
};

/** Fields that render as interactive selectable cards (visual only — same values). */
export const CARD_SELECT_FIELDS = new Set([
  "paymentType",
  "outOfPocket",
  "statements",
  "serviceRequested",
  "preferredServiceLocation",
  "familyPriority",
  "concerns",
  "riskBehaviors",
  "learningBarriers",
  "transitionIndicators",
  "abllsDomains",
  "outcomeMeasures",
  "availableDays",
  "availableTimes",
]);
