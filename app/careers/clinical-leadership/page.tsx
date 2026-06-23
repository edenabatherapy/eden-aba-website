import type { Metadata } from "next";
import ClinicalLeadershipCareersPage from "@/components/careers/clinical-leadership/ClinicalLeadershipCareersPage";
import { CLINICAL_LEADERSHIP_META } from "@/lib/careers/clinical-leadership-careers-data";

export const metadata: Metadata = {
  title: CLINICAL_LEADERSHIP_META.title,
  description: CLINICAL_LEADERSHIP_META.description,
  alternates: { canonical: "/careers/clinical-leadership" },
};

export default function ClinicalLeadershipCareersRoutePage() {
  return <ClinicalLeadershipCareersPage />;
}
