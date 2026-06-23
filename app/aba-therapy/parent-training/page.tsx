import type { Metadata } from "next";
import ParentTrainingPage from "@/components/aba-therapy/ParentTrainingPage";
import { PARENT_TRAINING_META } from "@/lib/aba-therapy/parent-training-data";

export const metadata: Metadata = {
  title: PARENT_TRAINING_META.title,
  description: PARENT_TRAINING_META.description,
  keywords: [...PARENT_TRAINING_META.keywords],
  openGraph: {
    title: PARENT_TRAINING_META.title,
    description: PARENT_TRAINING_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: PARENT_TRAINING_META.title,
    description: PARENT_TRAINING_META.description,
  },
  alternates: {
    canonical: "/aba-therapy/parent-training",
  },
};

export default function Page() {
  return <ParentTrainingPage />;
}
