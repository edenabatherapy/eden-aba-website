"use client";

import Link from "next/link";
import { FOOTER_LEGAL_LINKS } from "@/lib/footer/footer-data";

export default function FooterLegalBar() {
  return (
    <nav
      aria-label="Legal"
      className="flex flex-wrap gap-x-6 gap-y-3 border-b border-white/10 py-6 text-sm font-bold"
    >
      {FOOTER_LEGAL_LINKS.map((link) => (
        <Link key={link.label} href={link.href} className="eden-footer-link">
          {link.label}
        </Link>
      ))}
    </nav>
  );
}
