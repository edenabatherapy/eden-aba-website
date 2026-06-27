"use client";

import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import { FOOTER_BUILT_BY } from "@/lib/footer/footer-data";

type FooterCopyrightBarProps = {
  brandName: string;
};

export default function FooterCopyrightBar({ brandName }: FooterCopyrightBarProps) {
  const year = new Date().getFullYear();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);
  const grid = t.pages.footer.grid;
  const builtByLabel = grid?.builtBy ?? FOOTER_BUILT_BY.label;

  return (
    <div className="flex flex-col gap-2 py-4 text-sm text-emerald-100/80 md:flex-row md:items-center md:justify-between">
      <p>
        © {year} {brandName.toUpperCase()}. {grid?.allRightsReserved ?? "All Rights Reserved."}
      </p>

      {FOOTER_BUILT_BY.href ? (
        <a
          href={FOOTER_BUILT_BY.href}
          className="eden-footer-link font-semibold text-emerald-100/75"
          target="_blank"
          rel="noopener noreferrer"
        >
          {builtByLabel}
        </a>
      ) : (
        <p className="font-semibold text-emerald-100/75">{builtByLabel}</p>
      )}
    </div>
  );
}
