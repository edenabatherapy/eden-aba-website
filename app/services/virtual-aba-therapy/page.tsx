import type { Metadata } from "next";
import VirtualAbaTherapyServicePage from "@/components/services/VirtualAbaTherapyServicePage";
import { VIRTUAL_ABA_META } from "@/lib/services/virtual-aba-therapy-data";

export const metadata: Metadata = {
  title: VIRTUAL_ABA_META.title,
  description: VIRTUAL_ABA_META.description,
  keywords: [...VIRTUAL_ABA_META.keywords],
  alternates: {
    canonical: "/services/virtual-aba-therapy",
  },
};

export default function Page() {
  return <VirtualAbaTherapyServicePage />;
}
