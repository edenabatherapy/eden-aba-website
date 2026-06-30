import type { Metadata } from "next";
import EnterpriseServicePage from "@/components/services/EnterpriseServicePage";
import { getEnterpriseServiceMetadata } from "@/lib/services/enterprise-service-metadata";

export const metadata: Metadata = getEnterpriseServiceMetadata("behavior-assessment");

export default function Page() {
  return <EnterpriseServicePage slug="behavior-assessment" />;
}
