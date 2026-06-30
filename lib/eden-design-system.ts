/**
 * Eden ABA Therapy — global design tokens (Home page is the reference).
 * Use these class strings for consistent spacing, surfaces, and motion sitewide.
 */

export const EDEN_COLORS = {
  forest: "#0b4f4f",
  teal: "#128c8c",
  emerald: "#0E6B4F",
  mint: "#F6FBF8",
  warmWhite: "#FAF7F0",
  slate: "#64748b",
  ink: "#0F172A",
} as const;

export const EDEN_CONTAINER = "mx-auto w-full max-w-7xl px-4 lg:px-8";

export const EDEN_SECTION_PY = "py-16 lg:py-20";

export const EDEN_SECTION = {
  white: `eden-section eden-section--white ${EDEN_SECTION_PY}`,
  mint: `eden-section eden-section--mint ${EDEN_SECTION_PY}`,
  warm: `eden-section eden-section--warm ${EDEN_SECTION_PY}`,
  tealGradient: `eden-section eden-section--teal-gradient ${EDEN_SECTION_PY}`,
  forestCta: `eden-section eden-section--forest-cta ${EDEN_SECTION_PY}`,
} as const;

export const EDEN_CARD =
  "eden-card rounded-[1.75rem] border border-emerald-100/80 bg-white p-6 shadow-sm shadow-emerald-900/5 transition hover:-translate-y-1 hover:shadow-lg hover:shadow-emerald-900/10";

export const EDEN_CARD_GLASS =
  "eden-card-glass rounded-[1.75rem] border border-white/20 bg-white/80 p-6 shadow-lg backdrop-blur-md";

export const EDEN_SECTION_TITLE = "text-3xl font-black tracking-tight text-[#0F172A] md:text-4xl";

export const EDEN_SECTION_INTRO = "mt-4 text-lg font-semibold leading-8 text-slate-700";

export const EDEN_PAGE_SHELL = "eden-page-shell min-h-screen text-slate-900";

export const EDEN_REVEAL = "eden-reveal";

export const EDEN_HERO_EYEBROW =
  "text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]";

export const EDEN_BTN_GLOW =
  "transition hover:scale-[1.02] hover:shadow-[0_0_24px_rgba(16,185,129,0.35)]";

export const EDEN_SECTION_ALT = {
  /** Use on alternating sections: 0=white, 1=mint, 2=white, 3=teal gradient */
  forIndex: (index: number) => {
    const mod = index % 4;
    if (mod === 1) return EDEN_SECTION.mint;
    if (mod === 3) return EDEN_SECTION.tealGradient;
    return EDEN_SECTION.white;
  },
} as const;
