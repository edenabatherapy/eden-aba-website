import type { Metadata } from "next";
import SchoolBasedAbaPage from "@/components/services/school-based-aba/SchoolBasedAbaPage";
import { SCHOOL_SUPPORT_ABA_META } from "@/lib/services/service-page-metadata";

export const metadata: Metadata = SCHOOL_SUPPORT_ABA_META;

export default function Page() {
  return <SchoolBasedAbaPage />;
}
