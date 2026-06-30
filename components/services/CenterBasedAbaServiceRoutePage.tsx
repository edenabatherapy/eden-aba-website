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
        onHomeBased={() => router.push("/services/in-home-aba-therapy")}
        onCommunityBased={() => router.push("/?page=community-based-aba-therapy")}
        onSchoolBased={() => router.push("/services/school-support-aba-therapy")}
        onVirtual={() => router.push("/?page=virtual-aba-therapy")}
      />
    </AboutPremiumLayout>
  );
}
