import type { Metadata } from "next";
import ApproachPage from "@/components/about/ApproachPage";
import { OUR_APPROACH_META } from "@/lib/our-approach-content";

export const metadata: Metadata = {
  title: OUR_APPROACH_META.title,
  description: OUR_APPROACH_META.description,
  keywords: OUR_APPROACH_META.keywords,
  openGraph: {
    title: OUR_APPROACH_META.title,
    description: OUR_APPROACH_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: OUR_APPROACH_META.title,
    description: OUR_APPROACH_META.description,
  },
  alternates: {
    canonical: "/about/our-approach",
  },
};

export default function OurApproachRoutePage() {
  return <ApproachPage />;
}
