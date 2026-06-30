import type { Metadata } from "next";
import CommunityBasedAbaServiceRoutePage from "@/components/services/CommunityBasedAbaServiceRoutePage";

export const metadata: Metadata = {
  title: "Community-Based ABA Therapy | Eden ABA Therapy",
  description:
    "Community-based ABA therapy helping children practice communication, safety, social participation, and independence in real-world Northern Virginia settings.",
  alternates: {
    canonical: "/services/community-based-aba-therapy",
  },
};

export default function Page() {
  return <CommunityBasedAbaServiceRoutePage />;
}
