import type { Metadata } from "next";
import GettingStartedPage from "@/components/getting-started/GettingStartedPage";
import { GETTING_STARTED_META } from "@/lib/getting-started/getting-started-data";

export const metadata: Metadata = {
  title: GETTING_STARTED_META.title,
  description: GETTING_STARTED_META.description,
  keywords: GETTING_STARTED_META.keywords,
  openGraph: {
    title: GETTING_STARTED_META.title,
    description: GETTING_STARTED_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: GETTING_STARTED_META.title,
    description: GETTING_STARTED_META.description,
  },
  alternates: {
    canonical: "/getting-started",
  },
};

export default function Page() {
  return <GettingStartedPage />;
}
