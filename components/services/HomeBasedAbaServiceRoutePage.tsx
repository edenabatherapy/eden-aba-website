"use client";

import { useRouter } from "next/navigation";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import HomeBasedAbaTherapyPage from "@/components/HomeBasedAbaTherapyPage";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export default function HomeBasedAbaServiceRoutePage() {
  const router = useRouter();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  return (
    <AboutPremiumLayout>
      <HomeBasedAbaTherapyPage
        t={t}
        onStart={() => router.push("/intake")}
        onLocations={() => router.push("/about/contact-us")}
        onSchedule={() => router.push("/getting-started")}
        onCenterBased={() => router.push("/services/center-based-aba-therapy")}
        onSchoolBased={() => router.push("/services/school-based-aba-therapy")}
        onCommunityBased={() => router.push("/services/community-based-aba-therapy")}
        onVirtual={() => router.push("/services/virtual-aba-therapy")}
      />
    </AboutPremiumLayout>
  );
}
