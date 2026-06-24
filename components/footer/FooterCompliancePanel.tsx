"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { FOOTER_COMPLIANCE } from "@/lib/footer/footer-data";

export default function FooterCompliancePanel() {
  const reduceMotion = useReducedMotion();

  return (
    <motion.section
      {...(reduceMotion
        ? {}
        : {
            initial: { opacity: 0, y: 20 },
            whileInView: { opacity: 1, y: 0 },
            viewport: { once: true, margin: "-40px" },
            transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
          })}
      className="grid gap-4 border-b border-white/10 py-6 sm:py-7 lg:grid-cols-2 lg:gap-5 lg:py-8"
      aria-label="Compliance and trust notices"
    >
      <article className="eden-footer-compliance-card rounded-2xl p-5 sm:p-6">
        <h3 className="text-base font-extrabold text-white sm:text-lg">{FOOTER_COMPLIANCE.accessibility.title}</h3>
        <p className="mt-2 text-sm leading-6 text-emerald-50/90">{FOOTER_COMPLIANCE.accessibility.content}</p>
        <Link href={FOOTER_COMPLIANCE.accessibility.linkHref} className="eden-footer-link mt-3 inline-flex">
          {FOOTER_COMPLIANCE.accessibility.linkLabel}
        </Link>
      </article>

      <article className="eden-footer-compliance-card rounded-2xl p-5 sm:p-6">
        <h3 className="text-base font-extrabold text-white sm:text-lg">{FOOTER_COMPLIANCE.privacy.title}</h3>
        <p className="mt-2 text-sm leading-6 text-emerald-50/90">{FOOTER_COMPLIANCE.privacy.content}</p>
        <div className="mt-3 flex flex-wrap gap-4">
          <Link href={FOOTER_COMPLIANCE.privacy.privacyHref} className="eden-footer-link">
            {FOOTER_COMPLIANCE.privacy.privacyLabel}
          </Link>
          <Link href={FOOTER_COMPLIANCE.privacy.contactHref} className="eden-footer-link">
            {FOOTER_COMPLIANCE.privacy.contactLabel}
          </Link>
        </div>
      </article>
    </motion.section>
  );
}
