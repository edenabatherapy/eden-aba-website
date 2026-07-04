import type { Metadata } from "next";
import FinancialAssistancePage from "@/components/resources/financial-assistance/FinancialAssistancePage";
import { FINANCIAL_ASSISTANCE_META } from "@/lib/financial-assistance/meta";

export const metadata: Metadata = {
  title: FINANCIAL_ASSISTANCE_META.title,
  description: FINANCIAL_ASSISTANCE_META.description,
  keywords: FINANCIAL_ASSISTANCE_META.keywords,
  openGraph: {
    title: FINANCIAL_ASSISTANCE_META.title,
    description: FINANCIAL_ASSISTANCE_META.description,
    type: "website",
    url: FINANCIAL_ASSISTANCE_META.canonical,
  },
  twitter: {
    card: "summary_large_image",
    title: FINANCIAL_ASSISTANCE_META.title,
    description: FINANCIAL_ASSISTANCE_META.description,
  },
  alternates: {
    canonical: FINANCIAL_ASSISTANCE_META.canonical,
  },
};

export default function Page() {
  return <FinancialAssistancePage />;
}
