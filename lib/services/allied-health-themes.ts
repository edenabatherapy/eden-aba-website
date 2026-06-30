import type { AlliedHealthSlug } from "@/lib/services/allied-health-slugs";

export type AlliedHealthTheme = {
  heroGradient: string;
  heroAccent: string;
  iconBg: string;
  iconText: string;
  timelineBg: string;
  timelineStep: string;
  cardBorder: string;
  cardHover: string;
  ctaGlow: string;
  progressLine: string;
  orb: string;
};

export const ALLIED_HEALTH_THEMES: Record<AlliedHealthSlug, AlliedHealthTheme> = {
  "occupational-therapy": {
    heroGradient: "from-[#0b4f4f] via-[#0E6B4F] to-[#1e3a5f]",
    heroAccent: "text-emerald-200",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-800",
    timelineBg: "bg-gradient-to-br from-[#0b4f4f] via-[#115e59] to-[#1e3a5f]",
    timelineStep: "bg-emerald-300 text-slate-900",
    cardBorder: "border-emerald-100",
    cardHover: "hover:border-emerald-200 hover:shadow-emerald-900/10",
    ctaGlow: "hover:shadow-[0_0_24px_rgba(16,185,129,0.4)]",
    progressLine: "from-emerald-400 to-teal-500",
    orb: "bg-emerald-400/20",
  },
  "speech-language-therapy": {
    heroGradient: "from-[#1e3a5f] via-[#1d4ed8] to-[#0f766e]",
    heroAccent: "text-blue-200",
    iconBg: "bg-blue-50",
    iconText: "text-blue-800",
    timelineBg: "bg-gradient-to-br from-[#1e3a5f] via-[#1e40af] to-[#0f766e]",
    timelineStep: "bg-blue-300 text-slate-900",
    cardBorder: "border-blue-100",
    cardHover: "hover:border-blue-200 hover:shadow-blue-900/10",
    ctaGlow: "hover:shadow-[0_0_24px_rgba(59,130,246,0.45)]",
    progressLine: "from-blue-400 to-teal-500",
    orb: "bg-blue-400/20",
  },
  "feeding-swallowing-therapy": {
    heroGradient: "from-[#9a3412] via-[#ea580c] to-[#0f766e]",
    heroAccent: "text-orange-100",
    iconBg: "bg-orange-50",
    iconText: "text-orange-800",
    timelineBg: "bg-gradient-to-br from-[#9a3412] via-[#c2410c] to-[#115e59]",
    timelineStep: "bg-amber-300 text-slate-900",
    cardBorder: "border-orange-100",
    cardHover: "hover:border-orange-200 hover:shadow-orange-900/10",
    ctaGlow: "hover:shadow-[0_0_24px_rgba(249,115,22,0.45)]",
    progressLine: "from-orange-400 to-teal-500",
    orb: "bg-orange-400/20",
  },
};
