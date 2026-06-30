import type { Metadata } from "next";
import en from "@/locales/en.json";

function serviceMeta(index: number, canonical: string): Metadata {
  const [title, description] = en.common.services[index];
  const pageTitle = `${title} | Eden ABA Therapy`;

  return {
    title: pageTitle,
    description,
    openGraph: {
      title: pageTitle,
      description,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
    },
    alternates: {
      canonical,
    },
  };
}

export const SCHOOL_SUPPORT_ABA_META = serviceMeta(0, "/services/school-support-aba-therapy");
export const IN_HOME_ABA_META = serviceMeta(1, "/services/in-home-aba-therapy");
export const CENTER_BASED_ABA_META = serviceMeta(2, "/services/center-based-aba-therapy");
export const PARENT_TRAINING_SUPPORT_META = serviceMeta(7, "/services/parent-training-support");
