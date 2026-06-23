import type { Metadata } from "next";
import CommunityImpactPage from "@/components/about/community-impact/CommunityImpactPage";
import { COMMUNITY_IMPACT_META } from "@/lib/about/community-impact-data";

export const metadata: Metadata = {
  title: COMMUNITY_IMPACT_META.title,
  description: COMMUNITY_IMPACT_META.description,
  keywords: COMMUNITY_IMPACT_META.keywords,
  openGraph: {
    title: COMMUNITY_IMPACT_META.title,
    description: COMMUNITY_IMPACT_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: COMMUNITY_IMPACT_META.title,
    description: COMMUNITY_IMPACT_META.description,
  },
  alternates: {
    canonical: "/about/community-impact",
  },
};

export default function Page() {
  return <CommunityImpactPage />;
}
