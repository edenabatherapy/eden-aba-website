"use client";

import { useRouter } from "next/navigation";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import CommunityBasedAbaTherapyPage from "@/components/CommunityBasedAbaTherapyPage";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export default function CommunityBasedAbaServiceRoutePage() {
  const router = useRouter();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  return (
    <AboutPremiumLayout>
      <CommunityBasedAbaTherapyPage
        t={t}
        onStart={() => router.push("/intake")}
        onLocations={() => router.push("/about/contact-us")}
        onSchedule={() => router.push("/getting-started")}
        onHomeBased={() => router.push("/services/home-based-aba-therapy")}
        onCenterBased={() => router.push("/services/center-based-aba-therapy")}
        onSchoolBased={() => router.push("/services/school-based-aba-therapy")}
        onVirtual={() => router.push("/services/virtual-aba-therapy")}
        onInsurance={() => router.push("/insurance-coverage")}
      />
    </AboutPremiumLayout>
  );
}
