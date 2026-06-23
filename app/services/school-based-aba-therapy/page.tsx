import type { Metadata } from "next";
import SchoolBasedAbaPage from "@/components/services/school-based-aba/SchoolBasedAbaPage";
import { SCHOOL_BASED_ABA_META } from "@/lib/services/school-based-aba-data";

export const metadata: Metadata = {
  title: SCHOOL_BASED_ABA_META.title,
  description: SCHOOL_BASED_ABA_META.description,
  keywords: [...SCHOOL_BASED_ABA_META.keywords],
  openGraph: {
    title: SCHOOL_BASED_ABA_META.title,
    description: SCHOOL_BASED_ABA_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SCHOOL_BASED_ABA_META.title,
    description: SCHOOL_BASED_ABA_META.description,
  },
  alternates: {
    canonical: "/services/school-based-aba-therapy",
  },
};

export default function Page() {
  return <SchoolBasedAbaPage />;
}
