"use client";

import { FOOTER_BUILT_BY } from "@/lib/footer/footer-data";

type FooterCopyrightBarProps = {
  brandName: string;
};

export default function FooterCopyrightBar({ brandName }: FooterCopyrightBarProps) {
  const year = new Date().getFullYear();

  return (
    <div className="flex flex-col gap-2 py-4 text-sm text-emerald-100/80 md:flex-row md:items-center md:justify-between">
      <p>
        © {year} {brandName.toUpperCase()}. All Rights Reserved.
      </p>

      {FOOTER_BUILT_BY.href ? (
        <a
          href={FOOTER_BUILT_BY.href}
          className="eden-footer-link font-semibold text-emerald-100/75"
          target="_blank"
          rel="noopener noreferrer"
        >
          {FOOTER_BUILT_BY.label}
        </a>
      ) : (
        <p className="font-semibold text-emerald-100/75">{FOOTER_BUILT_BY.label}</p>
      )}
    </div>
  );
}
