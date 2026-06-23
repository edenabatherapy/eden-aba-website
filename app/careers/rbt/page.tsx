import type { Metadata } from "next";
import RbtCareersPage from "@/components/careers/rbt/RbtCareersPage";
import { RBT_CAREERS_META } from "@/lib/careers/rbt-careers-data";

export const metadata: Metadata = {
  title: RBT_CAREERS_META.title,
  description: RBT_CAREERS_META.description,
  alternates: { canonical: "/careers/rbt" },
};

export default function RbtCareersRoutePage() {
  return <RbtCareersPage />;
}
