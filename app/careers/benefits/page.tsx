import type { Metadata } from "next";
import BenefitsCareersPage from "@/components/careers/benefits/BenefitsCareersPage";
import { BENEFITS_CAREERS_META } from "@/lib/careers/benefits-careers-data";

export const metadata: Metadata = {
  title: BENEFITS_CAREERS_META.title,
  description: BENEFITS_CAREERS_META.description,
  alternates: { canonical: "/careers/benefits" },
};

export default function BenefitsCareersRoutePage() {
  return <BenefitsCareersPage />;
}
