import type { EnterpriseServiceSlug } from "@/lib/services/enterprise-service-slugs";

export type EnterpriseServiceTheme = {
  heroGradient: string;
  heroAccentText: string;
  iconBg: string;
  iconText: string;
  timelineBg: string;
  timelineBorder: string;
  timelineStep: string;
  cardBorder: string;
  cardHover: string;
  ctaGlow: string;
  progressLine: string;
};

export const ENTERPRISE_SERVICE_THEMES: Record<EnterpriseServiceSlug, EnterpriseServiceTheme> = {
  "behavior-assessment": {
    heroGradient: "from-[#0f172a] via-[#1e3a5f] to-[#1d4ed8]",
    heroAccentText: "text-blue-200",
    iconBg: "bg-blue-50",
    iconText: "text-blue-800",
    timelineBg: "bg-gradient-to-br from-[#0f172a] via-[#1e3a5f] to-[#172554]",
    timelineBorder: "border-blue-300/30",
    timelineStep: "bg-blue-300 text-slate-900",
    cardBorder: "border-blue-100",
    cardHover: "hover:border-blue-200 hover:shadow-blue-900/10",
    ctaGlow: "hover:shadow-[0_0_24px_rgba(59,130,246,0.45)]",
    progressLine: "from-blue-400 to-blue-600",
  },
  "individualized-aba-programs": {
    heroGradient: "from-[#0b4f4f] via-[#0E6B4F] to-[#0d9488]",
    heroAccentText: "text-emerald-200",
    iconBg: "bg-emerald-50",
    iconText: "text-emerald-800",
    timelineBg: "bg-gradient-to-br from-[#0b4f4f] via-[#0E6B4F] to-[#115e59]",
    timelineBorder: "border-emerald-300/30",
    timelineStep: "bg-emerald-300 text-slate-900",
    cardBorder: "border-emerald-100",
    cardHover: "hover:border-emerald-200 hover:shadow-emerald-900/10",
    ctaGlow: "hover:shadow-[0_0_24px_rgba(16,185,129,0.4)]",
    progressLine: "from-emerald-400 to-teal-500",
  },
  "early-intervention-aba-therapy": {
    heroGradient: "from-[#7c2d12] via-[#ea580c] to-[#0d9488]",
    heroAccentText: "text-orange-100",
    iconBg: "bg-orange-50",
    iconText: "text-orange-800",
    timelineBg: "bg-gradient-to-br from-[#9a3412] via-[#c2410c] to-[#0f766e]",
    timelineBorder: "border-orange-200/40",
    timelineStep: "bg-amber-300 text-slate-900",
    cardBorder: "border-orange-100",
    cardHover: "hover:border-orange-200 hover:shadow-orange-900/10",
    ctaGlow: "hover:shadow-[0_0_24px_rgba(249,115,22,0.45)]",
    progressLine: "from-orange-400 to-teal-500",
  },
  "social-skills-training": {
    heroGradient: "from-[#0f766e] via-[#0d9488] to-[#1e40af]",
    heroAccentText: "text-teal-100",
    iconBg: "bg-teal-50",
    iconText: "text-teal-800",
    timelineBg: "bg-gradient-to-br from-[#134e4a] via-[#0f766e] to-[#1e3a8a]",
    timelineBorder: "border-teal-200/40",
    timelineStep: "bg-teal-200 text-slate-900",
    cardBorder: "border-teal-100",
    cardHover: "hover:border-teal-200 hover:shadow-teal-900/10",
    ctaGlow: "hover:shadow-[0_0_24px_rgba(20,184,166,0.45)]",
    progressLine: "from-teal-400 to-blue-500",
  },
};
