import type { Metadata } from "next";
import AfterSchoolProgramsPage from "@/components/services/AfterSchoolProgramsPage";
import { AFTER_SCHOOL_META } from "@/lib/services/after-school-programs-data";

export const metadata: Metadata = {
  title: AFTER_SCHOOL_META.title,
  description: AFTER_SCHOOL_META.description,
  keywords: [...AFTER_SCHOOL_META.keywords],
  alternates: {
    canonical: "/services/after-school-programs",
  },
};

export default function Page() {
  return <AfterSchoolProgramsPage />;
}
