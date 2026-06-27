"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import { FOOTER_COMPLIANCE } from "@/lib/footer/footer-data";

export default function FooterCompliancePanel() {
  const reduceMotion = useReducedMotion();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const compliance = t.pages.footer.compliance ?? FOOTER_COMPLIANCE;

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
      aria-label={t.pages.footer.grid?.complianceAria ?? "Compliance and trust notices"}
    >
      <article className="eden-footer-compliance-card rounded-2xl p-5 sm:p-6">
        <h3 className="text-base font-extrabold text-white sm:text-lg">{compliance.accessibility.title}</h3>
        <p className="mt-2 text-sm leading-6 text-emerald-50/90">{compliance.accessibility.content}</p>
        <Link href={FOOTER_COMPLIANCE.accessibility.linkHref} className="eden-footer-link mt-3 inline-flex">
          {compliance.accessibility.linkLabel}
        </Link>
      </article>

      <article className="eden-footer-compliance-card rounded-2xl p-5 sm:p-6">
        <h3 className="text-base font-extrabold text-white sm:text-lg">{compliance.privacy.title}</h3>
        <p className="mt-2 text-sm leading-6 text-emerald-50/90">{compliance.privacy.content}</p>
        <div className="mt-3 flex flex-wrap gap-4">
          <Link href={FOOTER_COMPLIANCE.privacy.privacyHref} className="eden-footer-link">
            {compliance.privacy.privacyLabel}
          </Link>
          <Link href={FOOTER_COMPLIANCE.privacy.contactHref} className="eden-footer-link">
            {compliance.privacy.contactLabel}
          </Link>
        </div>
      </article>
    </motion.section>
  );
}
