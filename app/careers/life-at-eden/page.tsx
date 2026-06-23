import type { Metadata } from "next";
import LifeAtEdenCareersPage from "@/components/careers/life-at-eden/LifeAtEdenCareersPage";
import { LIFE_AT_EDEN_META } from "@/lib/careers/life-at-eden-careers-data";

export const metadata: Metadata = {
  title: LIFE_AT_EDEN_META.title,
  description: LIFE_AT_EDEN_META.description,
  alternates: { canonical: "/careers/life-at-eden" },
};

export default function LifeAtEdenRoutePage() {
  return <LifeAtEdenCareersPage />;
}
