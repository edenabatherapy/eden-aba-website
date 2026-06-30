import type { Metadata } from "next";
import AfterSchoolProgramsPage from "@/components/services/AfterSchoolProgramsPage";

export const metadata: Metadata = {
  title: "After School Programs | Eden ABA Therapy",
  description:
    "Eden ABA Therapy after school programs supporting social skills, homework routines, communication, and meaningful progress after the school day.",
  alternates: {
    canonical: "/services/after-school-programs",
  },
};

export default function Page() {
  return <AfterSchoolProgramsPage />;
}
