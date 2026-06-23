"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { FOOTER_CTA } from "@/lib/footer/footer-data";
import { getButtonClasses } from "@/lib/button-styles";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-40px" },
  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] as const },
};

export default function FooterCtaBar() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      {...(reduceMotion ? {} : fadeUp)}
      className="eden-footer-cta px-6 py-10 md:px-10 md:py-12 lg:px-12"
      aria-labelledby="footer-cta-heading"
    >
      <div className="relative z-[1] mx-auto max-w-4xl text-center">
        <p className="text-xs font-black uppercase tracking-[0.18em] text-emerald-100/90">Next Steps</p>
        <h2 id="footer-cta-heading" className="mt-3 text-3xl font-extrabold text-white md:text-4xl">
          {FOOTER_CTA.title}
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-emerald-50/90">{FOOTER_CTA.subtitle}</p>

        <div className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:flex-wrap sm:items-center">
          {FOOTER_CTA.buttons.map((button) => (
            <Link
              key={button.label}
              href={button.href}
              className={`eden-footer-cta-button ${getButtonClasses(
                button.variant === "primary" ? "gold" : "secondary",
                "w-full justify-center sm:w-auto",
              )}`}
            >
              {button.label}
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
