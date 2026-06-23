import type { Metadata } from "next";
import MissionValuesPage from "@/components/about/MissionValuesPage";
import { MISSION_VALUES_META } from "@/lib/mission-values-content";

export const metadata: Metadata = {
  title: MISSION_VALUES_META.title,
  description: MISSION_VALUES_META.description,
  keywords: MISSION_VALUES_META.keywords,
  openGraph: {
    title: MISSION_VALUES_META.title,
    description: MISSION_VALUES_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: MISSION_VALUES_META.title,
    description: MISSION_VALUES_META.description,
  },
  alternates: {
    canonical: "/about/our-mission-values",
  },
};

export default function OurMissionValuesPage() {
  return <MissionValuesPage />;
}
