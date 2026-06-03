/** Shared Eden ABA Therapy button styles for site-wide CTA consistency. */

export const buttonBase =
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-500 disabled:shadow-none disabled:hover:translate-y-0 disabled:opacity-100";

export const buttonSizes = {
  md: "px-7 py-3.5 font-extrabold hover:-translate-y-0.5",
  sm: "px-6 py-3 font-extrabold hover:-translate-y-0.5",
  form: "px-8 py-4 font-extrabold hover:-translate-y-0.5",
};

/** @type {Record<string, string>} */
export const buttonVariants = {
  primary:
    "bg-[#0E6B4F] text-white shadow-lg shadow-[#0E6B4F]/20 hover:bg-[#0a5640] focus-visible:ring-[#0E6B4F]/40",
  primarySite:
    "bg-[#1f7a2e] text-white shadow-lg shadow-[#128c8c]/20 hover:bg-[#166326] focus-visible:ring-[#1f7a2e]/40",
  secondary:
    "border-2 border-[#0E6B4F] bg-white text-[#064E3B] hover:bg-[#ECFDF5] focus-visible:ring-[#0E6B4F]/30",
  secondarySite:
    "border border-[#49b8c8]/30 bg-white text-[#0b4f4f] hover:bg-[#49b8c8]/10 focus-visible:ring-[#49b8c8]/30",
  accent:
    "bg-[#FACC15] text-[#0B1B3A] font-bold hover:bg-[#eab308] focus-visible:ring-[#FACC15]/50",
  gold:
    "bg-[#f7c72f] text-[#0b4f4f] hover:bg-[#ff8a1f] hover:text-white focus-visible:ring-[#f7c72f]/50",
  dark:
    "bg-[#0b4f4f] text-white hover:bg-[#083d3d] focus-visible:ring-[#0b4f4f]/40",
  navy:
    "bg-[#0F172A] text-white hover:bg-[#1e293b] focus-visible:ring-slate-500/40",
  outline:
    "border-2 border-[#0E6B4F] bg-white text-[#064E3B] hover:bg-[#ECFDF5] focus-visible:ring-[#0E6B4F]/30",
  outlineOnDark:
    "border-2 border-white/60 bg-white/10 text-white hover:bg-white/20 focus-visible:ring-white/40",
  secondaryOnDark:
    "border-2 border-white/60 bg-white text-[#064E3B] hover:bg-[#ECFDF5] focus-visible:ring-white/40",
};

/**
 * @param {string} [variant]
 * @param {string} [className]
 * @param {"md"|"sm"|"form"} [size]
 */
export function getButtonClasses(variant = "primary", className = "", size = "md") {
  const variantClass = buttonVariants[variant] || buttonVariants.primary;
  return `${buttonBase} ${buttonSizes[size]} ${variantClass} ${className}`.trim();
}
