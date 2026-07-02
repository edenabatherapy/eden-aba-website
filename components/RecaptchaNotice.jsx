"use client";

import { isRecaptchaEnabled } from "@/lib/recaptcha/client";

/**
 * Google reCAPTCHA disclosure — rendered with the verification widget before submit.
 * @param {object} props
 * @param {string} [props.className]
 * @param {"left"|"center"|"right"} [props.align]
 * @param {"light"|"dark"} [props.tone] Use "dark" on colored form backgrounds.
 */
export default function RecaptchaNotice({ className = "", align = "left", tone = "light" }) {
  if (!isRecaptchaEnabled()) {
    return null;
  }

  const alignClass =
    align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left";
  const textClass = tone === "dark" ? "text-white/60" : "text-slate-500";
  const linkToneClass =
    tone === "dark"
      ? "text-white/70 decoration-white/30 hover:text-white"
      : "text-slate-500 decoration-slate-300 hover:text-slate-700";

  return (
    <p
      className={`mt-3 text-[12px] leading-relaxed sm:text-[13px] ${textClass} ${alignClass} ${className}`}
    >
      Protected by reCAPTCHA.{" "}
      <a
        href="https://policies.google.com/privacy"
        target="_blank"
        rel="noopener noreferrer"
        className={`underline underline-offset-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${linkToneClass}`}
      >
        Privacy Policy
      </a>
      {" · "}
      <a
        href="https://policies.google.com/terms"
        target="_blank"
        rel="noopener noreferrer"
        className={`underline underline-offset-2 transition focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-emerald-600 ${linkToneClass}`}
      >
        Terms of Service
      </a>
    </p>
  );
}
