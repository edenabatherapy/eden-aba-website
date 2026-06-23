import type { Metadata } from "next";
import WhatIsAbaTherapyPage from "@/components/aba-therapy/WhatIsAbaTherapyPage";
import { WHAT_IS_ABA_META } from "@/lib/aba-therapy/what-is-aba-data";

export const metadata: Metadata = {
  title: WHAT_IS_ABA_META.title,
  description: WHAT_IS_ABA_META.description,
  keywords: [...WHAT_IS_ABA_META.keywords],
  openGraph: {
    title: WHAT_IS_ABA_META.title,
    description: WHAT_IS_ABA_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: WHAT_IS_ABA_META.title,
    description: WHAT_IS_ABA_META.description,
  },
  alternates: {
    canonical: "/aba-therapy/what-is-aba-therapy",
  },
};

export default function Page() {
  return <WhatIsAbaTherapyPage />;
}
