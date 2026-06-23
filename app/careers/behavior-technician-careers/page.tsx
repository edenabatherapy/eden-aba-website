import type { Metadata } from "next";
import BehaviorTechnicianCareersPage from "@/components/careers/behavior-technician/BehaviorTechnicianCareersPage";
import { BT_RBT_HUB_META } from "@/lib/careers/behavior-technician-careers-data";

export const metadata: Metadata = {
  title: BT_RBT_HUB_META.title,
  description: BT_RBT_HUB_META.description,
  alternates: { canonical: "/careers/behavior-technician-careers" },
};

export default function BehaviorTechnicianCareersRoutePage() {
  return <BehaviorTechnicianCareersPage />;
}
