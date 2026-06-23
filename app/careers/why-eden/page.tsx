import type { Metadata } from "next";
import WhyEdenCareersPage from "@/components/careers/why-eden/WhyEdenCareersPage";
import { WHY_EDEN_META } from "@/lib/careers/why-eden-careers-data";

export const metadata: Metadata = {
  title: WHY_EDEN_META.title,
  description: WHY_EDEN_META.description,
  alternates: { canonical: "/careers/why-eden" },
};

export default function WhyEdenCareersRoutePage() {
  return <WhyEdenCareersPage />;
}
