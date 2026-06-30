import type { Metadata } from "next";
import EnterpriseServicePage from "@/components/services/EnterpriseServicePage";
import { getEnterpriseServiceMetadata } from "@/lib/services/enterprise-service-metadata";

export const metadata: Metadata = getEnterpriseServiceMetadata("early-intervention-aba-therapy");

export default function Page() {
  return <EnterpriseServicePage slug="early-intervention-aba-therapy" />;
}
