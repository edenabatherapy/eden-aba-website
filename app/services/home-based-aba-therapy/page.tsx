import type { Metadata } from "next";
import HomeBasedAbaServiceRoutePage from "@/components/services/HomeBasedAbaServiceRoutePage";
import { IN_HOME_ABA_META } from "@/lib/services/service-page-metadata";

export const metadata: Metadata = {
  ...IN_HOME_ABA_META,
  title: "Home-Based ABA Therapy | Eden ABA Therapy",
  alternates: {
    canonical: "/services/home-based-aba-therapy",
  },
};

export default function Page() {
  return <HomeBasedAbaServiceRoutePage />;
}
