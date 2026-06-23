import type { Metadata } from "next";
import TeamPage from "@/components/about/TeamPage";
import { OUR_TEAM_META } from "@/lib/our-team-content";

export const metadata: Metadata = {
  title: OUR_TEAM_META.title,
  description: OUR_TEAM_META.description,
  keywords: OUR_TEAM_META.keywords,
  openGraph: {
    title: OUR_TEAM_META.title,
    description: OUR_TEAM_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: OUR_TEAM_META.title,
    description: OUR_TEAM_META.description,
  },
  alternates: {
    canonical: "/about/our-team",
  },
};

export default function OurTeamRoutePage() {
  return <TeamPage />;
}
