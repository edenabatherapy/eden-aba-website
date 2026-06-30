"use client";

import { useRouter } from "next/navigation";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import HomeBasedAbaTherapyPage from "@/components/HomeBasedAbaTherapyPage";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export default function InHomeAbaServiceRoutePage() {
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
        onSchoolBased={() => router.push("/services/school-support-aba-therapy")}
        onCommunityBased={() => router.push("/?page=community-based-aba-therapy")}
        onVirtual={() => router.push("/?page=virtual-aba-therapy")}
      />
    </AboutPremiumLayout>
  );
}
