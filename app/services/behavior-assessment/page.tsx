import type { Metadata } from "next";
import BasicServicePage from "@/components/services/BasicServicePage";
import {
  BASIC_SERVICE_PAGE_INDICES,
  getBasicServicePageMetadata,
} from "@/lib/services/basic-service-page-data";

export const metadata: Metadata = getBasicServicePageMetadata("behavior-assessment");

export default function Page() {
  return <BasicServicePage serviceIndex={BASIC_SERVICE_PAGE_INDICES["behavior-assessment"]} />;
}
