import type { Metadata } from "next";
import CareersSavedJobsView from "@/components/careers/CareersSavedJobsView";
import CareersSubpageShell from "@/components/careers/CareersSubpageShell";
import { CAREERS_PAGE } from "@/lib/careers-content";

export const metadata: Metadata = {
  title: `${CAREERS_PAGE.savedJobsTitle} | Eden ABA Therapy Careers`,
  description: "View your saved Eden ABA Therapy job openings.",
  alternates: {
    canonical: "/careers/saved-jobs",
  },
};

export default function SavedJobsPage() {
  return (
    <CareersSubpageShell>
      <CareersSavedJobsView />
    </CareersSubpageShell>
  );
}
