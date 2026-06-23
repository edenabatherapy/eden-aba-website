import type { Metadata } from "next";
import ClinicalQualityPage from "@/components/about/clinical-quality/ClinicalQualityPage";
import { CLINICAL_QUALITY_META } from "@/lib/about/clinical-quality-data";

export const metadata: Metadata = {
  title: CLINICAL_QUALITY_META.title,
  description: CLINICAL_QUALITY_META.description,
  keywords: CLINICAL_QUALITY_META.keywords,
  openGraph: {
    title: CLINICAL_QUALITY_META.title,
    description: CLINICAL_QUALITY_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: CLINICAL_QUALITY_META.title,
    description: CLINICAL_QUALITY_META.description,
  },
  alternates: {
    canonical: "/about/clinical-quality",
  },
};

export default function Page() {
  return <ClinicalQualityPage />;
}
