import type { Metadata } from "next";
import AlliedHealthServicePage from "@/components/services/allied-health/AlliedHealthServicePage";
import { getAlliedHealthMetadata } from "@/lib/services/allied-health-metadata";

export const metadata: Metadata = getAlliedHealthMetadata("speech-language-therapy");

export default function Page() {
  return <AlliedHealthServicePage slug="speech-language-therapy" />;
}
