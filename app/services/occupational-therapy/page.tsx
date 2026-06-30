import type { Metadata } from "next";
import AlliedHealthServicePage from "@/components/services/allied-health/AlliedHealthServicePage";
import { getAlliedHealthMetadata } from "@/lib/services/allied-health-metadata";

export const metadata: Metadata = getAlliedHealthMetadata("occupational-therapy");

export default function Page() {
  return <AlliedHealthServicePage slug="occupational-therapy" />;
}
