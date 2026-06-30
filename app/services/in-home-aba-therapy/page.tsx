import type { Metadata } from "next";
import InHomeAbaServiceRoutePage from "@/components/services/InHomeAbaServiceRoutePage";
import { IN_HOME_ABA_META } from "@/lib/services/service-page-metadata";

export const metadata: Metadata = IN_HOME_ABA_META;

export default function Page() {
  return <InHomeAbaServiceRoutePage />;
}
