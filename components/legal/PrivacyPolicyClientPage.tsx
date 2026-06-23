"use client";

import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import PrivacyPolicyPage from "@/components/PrivacyPolicyPage";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export default function PrivacyPolicyClientPage() {
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  return (
    <AboutPremiumLayout>
      <PrivacyPolicyPage
        businessInfo={t.edenBusinessInfo}
        newsletter={{
          title: t.newsletterTitle,
          fullName: t.fullName,
          email: t.email,
          joinNewsletter: t.joinNewsletter,
          newsletterThanks: t.newsletterThanks,
          newsletterThanksEnd: t.newsletterThanksEnd,
        }}
      />
    </AboutPremiumLayout>
  );
}
