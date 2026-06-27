"use client";

import Link from "next/link";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import { FOOTER_LEGAL_LINKS } from "@/lib/footer/footer-data";

export default function FooterLegalBar() {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const localizedLabels = t.pages.footer.legalLinks;

  return (
    <nav
      aria-label={t.pages.footer.grid?.legalAria ?? "Legal"}
      className="flex flex-wrap gap-x-5 gap-y-2 border-b border-white/10 py-4 text-sm font-bold"
    >
      {FOOTER_LEGAL_LINKS.map((link, index) => (
        <Link key={link.href} href={link.href} className="eden-footer-link">
          {localizedLabels?.[index]?.label ?? link.label}
        </Link>
      ))}
    </nav>
  );
}
