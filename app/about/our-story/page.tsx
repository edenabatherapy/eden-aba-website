import type { Metadata } from "next";
import AboutStoryPage from "@/components/about/AboutStoryPage";
import { OUR_STORY_META } from "@/lib/our-story-content";

export const metadata: Metadata = {
  title: OUR_STORY_META.title,
  description: OUR_STORY_META.description,
  keywords: OUR_STORY_META.keywords,
  openGraph: {
    title: OUR_STORY_META.title,
    description: OUR_STORY_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: OUR_STORY_META.title,
    description: OUR_STORY_META.description,
  },
  alternates: {
    canonical: "/about/our-story",
  },
};

export default function OurStoryPage() {
  return <AboutStoryPage />;
}
