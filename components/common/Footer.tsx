"use client";

import FooterCompliancePanel from "@/components/footer/FooterCompliancePanel";
import FooterCopyrightBar from "@/components/footer/FooterCopyrightBar";
import FooterLegalBar from "@/components/footer/FooterLegalBar";
import FooterMainGrid from "@/components/footer/FooterMainGrid";
import FooterSchema from "@/components/footer/FooterSchema";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";
import "@/components/footer/Footer.css";

export default function Footer() {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  return (
    <footer className="eden-footer bg-gradient-to-br from-[#021f1c] via-[#032f2b] to-[#0b4f4f] px-4 pt-8 md:pt-9 lg:px-8 lg:pt-10">
      <FooterSchema />
      <div aria-hidden="true" className="eden-footer__glow eden-footer__glow--left" />
      <div aria-hidden="true" className="eden-footer__glow eden-footer__glow--right" />
      <div aria-hidden="true" className="eden-footer__shape eden-footer__shape--one" />
      <div aria-hidden="true" className="eden-footer__shape eden-footer__shape--two" />

      <div className="relative mx-auto max-w-7xl">
        <FooterMainGrid
          brandName={t.brandName}
          phone={t.edenBusinessInfo.phone}
          email={t.pages.footer.contact.email}
        />
        <FooterCompliancePanel />
        <FooterLegalBar />
        <FooterCopyrightBar brandName={t.brandName} />
      </div>
    </footer>
  );
}
