import type { Metadata } from "next";
import ReferAChildPage from "@/components/providers/ReferAChildPage";

export const metadata: Metadata = {
  title: "Refer a Child | For Providers | Eden ABA Therapy",
  description:
    "Refer a child to Eden ABA Therapy. Professional referral options for pediatricians, schools, psychologists, and community providers in Northern Virginia.",
  alternates: { canonical: "/providers/refer-a-child" },
};

export default function ReferAChildRoutePage() {
  return <ReferAChildPage />;
}
