import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { ACCESSIBILITY_CONTENT } from "@/lib/legal/legal-pages-content";

export const metadata: Metadata = {
  title: "Accessibility Statement | Eden ABA Therapy",
  description:
    "Eden ABA Therapy accessibility statement describing our commitment to WCAG 2.0 AA standards and how to request assistance.",
  alternates: {
    canonical: "/accessibility",
  },
};

export default function Page() {
  return <LegalDocumentPage content={ACCESSIBILITY_CONTENT} />;
}
