import type { Metadata } from "next";
import CareersHubHome from "@/components/careers/hub/CareersHubHome";
import { CAREERS_META } from "@/lib/careers-content";

export const metadata: Metadata = {
  title: CAREERS_META.title,
  description: CAREERS_META.description,
  keywords: CAREERS_META.keywords,
  alternates: { canonical: "/careers" },
};

export default function CareersHomePage() {
  return <CareersHubHome />;
}
