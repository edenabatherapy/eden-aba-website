"use client";

import { useRouter } from "next/navigation";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import VirtualAbaTherapyPage from "@/components/VirtualAbaTherapyPage";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export default function VirtualAbaServiceRoutePage() {
  const router = useRouter();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  return (
    <AboutPremiumLayout>
      <VirtualAbaTherapyPage
        t={t}
        onStart={() => router.push("/intake")}
        onLocations={() => router.push("/about/contact-us")}
        onSchedule={() => router.push("/getting-started")}
        onInsurance={() => router.push("/insurance-coverage")}
        onHomeBased={() => router.push("/services/home-based-aba-therapy")}
        onCenterBased={() => router.push("/services/center-based-aba-therapy")}
        onSchoolBased={() => router.push("/services/school-based-aba-therapy")}
        onCommunityBased={() => router.push("/services/community-based-aba-therapy")}
      />
    </AboutPremiumLayout>
  );
}
