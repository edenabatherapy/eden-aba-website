import type { Metadata } from "next";
import BtCareersPage from "@/components/careers/bt/BtCareersPage";
import { BT_CAREERS_META } from "@/lib/careers/bt-careers-data";

export const metadata: Metadata = {
  title: BT_CAREERS_META.title,
  description: BT_CAREERS_META.description,
  alternates: { canonical: "/careers/bt" },
};

export default function BtCareersRoutePage() {
  return <BtCareersPage />;
}
