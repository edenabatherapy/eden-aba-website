import type { Metadata } from "next";
import ScreeningEvaluationPage from "@/components/evaluations/ScreeningEvaluationPage";
import { SCREENING_EVALUATION_META } from "@/lib/evaluations/screening-evaluation-data";

export const metadata: Metadata = {
  title: SCREENING_EVALUATION_META.title,
  description: SCREENING_EVALUATION_META.description,
  keywords: [...SCREENING_EVALUATION_META.keywords],
  openGraph: {
    title: SCREENING_EVALUATION_META.title,
    description: SCREENING_EVALUATION_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: SCREENING_EVALUATION_META.title,
    description: SCREENING_EVALUATION_META.description,
  },
  alternates: {
    canonical: "/services/evaluations-diagnosis/screening-evaluation",
  },
};

export default function Page() {
  return <ScreeningEvaluationPage />;
}
