"use client";

import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import HomepageInterestForm from "@/components/HomepageInterestForm";
import StartAbaSmsConsentDisclosure from "@/components/start-aba-therapy/StartAbaSmsConsentDisclosure";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export default function StartAbaTherapyPage() {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  return (
    <AboutPremiumLayout>
      <section className="bg-gradient-to-br from-[#fff8df] via-white to-[#49b8c8]/10 px-4 py-16 lg:px-8 lg:py-20">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-black uppercase tracking-[0.2em] text-[#128c8c]">
            {language === "vi" ? "Bắt đầu với Eden" : "Get Started with Eden"}
          </p>
          <h1 className="mt-4 text-4xl font-black text-[#0b4f4f] md:text-5xl">
            {language === "vi" ? "Bắt đầu liệu pháp ABA" : "Start ABA Therapy"}
          </h1>
          <p className="mt-5 text-lg font-semibold leading-8 text-slate-700">
            {language === "vi"
              ? "Gửi thông tin liên hệ để đội ngũ Eden ABA Therapy hỗ trợ bước tiếp theo cho gia đình bạn."
              : "Share your contact information so the Eden ABA Therapy team can help with your family's next steps."}
          </p>
        </div>
        <div className="mx-auto mt-10 max-w-3xl">
          <HomepageInterestForm t={t} smsConsentLabel={<StartAbaSmsConsentDisclosure />} />
        </div>
      </section>
    </AboutPremiumLayout>
  );
}
