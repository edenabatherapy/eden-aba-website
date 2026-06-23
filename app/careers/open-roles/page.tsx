import type { Metadata } from "next";
import OpenRolesPage from "@/components/careers/hub/OpenRolesPage";

export const metadata: Metadata = {
  title: "Search Open Roles | Eden ABA Therapy Careers",
  description:
    "Search and filter ABA therapy jobs at Eden ABA Therapy in Annandale and Northern Virginia. RBT, BCBA, clinical leadership, and operations roles.",
  alternates: { canonical: "/careers/open-roles" },
};

export default function OpenRolesRoutePage() {
  return <OpenRolesPage />;
}
