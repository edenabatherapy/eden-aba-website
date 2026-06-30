import type { Metadata } from "next";
import WhatIsAbaTherapyPage from "@/components/aba-therapy/WhatIsAbaTherapyPage";
import { WHAT_IS_ABA_META } from "@/lib/aba-therapy/what-is-aba-data";

export const metadata: Metadata = {
  title: "ABA Therapy | Eden ABA Therapy",
  description: WHAT_IS_ABA_META.description,
  alternates: {
    canonical: "/services/aba-therapy",
  },
};

export default function Page() {
  return <WhatIsAbaTherapyPage />;
}
