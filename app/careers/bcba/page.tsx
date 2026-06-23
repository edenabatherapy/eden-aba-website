import type { Metadata } from "next";
import BcbaCareersPage from "@/components/careers/bcba/BcbaCareersPage";
import { BCBA_CAREERS_META } from "@/lib/careers/bcba-careers-data";

export const metadata: Metadata = {
  title: BCBA_CAREERS_META.title,
  description: BCBA_CAREERS_META.description,
  alternates: { canonical: "/careers/bcba" },
};

export default function BcbaCareersRoutePage() {
  return <BcbaCareersPage />;
}
