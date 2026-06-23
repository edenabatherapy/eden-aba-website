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
      className="grid gap-5 border-b border-white/10 py-12 lg:grid-cols-2 lg:gap-6"
      aria-label="Compliance and trust notices"
    >
      <article className="eden-footer-compliance-card rounded-[1.75rem] p-6 sm:p-7">
        <h3 className="text-lg font-extrabold text-white">{FOOTER_COMPLIANCE.accessibility.title}</h3>
        <p className="mt-3 text-sm leading-7 text-emerald-50/90">{FOOTER_COMPLIANCE.accessibility.content}</p>
        <Link href={FOOTER_COMPLIANCE.accessibility.linkHref} className="eden-footer-link mt-5 inline-flex">
          {FOOTER_COMPLIANCE.accessibility.linkLabel}
        </Link>
      </article>

      <article className="eden-footer-compliance-card rounded-[1.75rem] p-6 sm:p-7">
        <h3 className="text-lg font-extrabold text-white">{FOOTER_COMPLIANCE.privacy.title}</h3>
        <p className="mt-3 text-sm leading-7 text-emerald-50/90">{FOOTER_COMPLIANCE.privacy.content}</p>
        <div className="mt-5 flex flex-wrap gap-5">
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
