import type { Metadata } from "next";
import CenterBasedAbaServiceRoutePage from "@/components/services/CenterBasedAbaServiceRoutePage";
import { CENTER_BASED_ABA_META } from "@/lib/services/service-page-metadata";

export const metadata: Metadata = CENTER_BASED_ABA_META;

export default function Page() {
  return <CenterBasedAbaServiceRoutePage />;
}
