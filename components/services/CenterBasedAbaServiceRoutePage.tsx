"use client";

import { useRouter } from "next/navigation";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import CenterBasedAbaTherapyPage from "@/components/CenterBasedAbaTherapyPage";
import { useSiteLanguage } from "@/hooks/useSiteLanguage";
import { getTranslation } from "@/lib/i18n";

export default function CenterBasedAbaServiceRoutePage() {
  const router = useRouter();
  const { language } = useSiteLanguage();
  const t = getTranslation(language);

  return (
    <AboutPremiumLayout>
      <CenterBasedAbaTherapyPage
        t={t}
        onStart={() => router.push("/intake")}
        onLocations={() => router.push("/about/contact-us")}
        onAba={() => router.push("/aba-therapy/what-is-aba-therapy")}
        onHomeBased={() => router.push("/services/home-based-aba-therapy")}
        onCommunityBased={() => router.push("/services/community-based-aba-therapy")}
        onSchoolBased={() => router.push("/services/school-based-aba-therapy")}
        onVirtual={() => router.push("/services/virtual-aba-therapy")}
      />
    </AboutPremiumLayout>
  );
}
