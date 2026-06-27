import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { TERMS_OF_SERVICE_CONTENT } from "@/lib/legal/legal-pages-content";

export const metadata: Metadata = {
  title: "Terms of Service | Eden ABA Therapy",
  description: "Terms of Service for using the Eden ABA Therapy website and digital communication channels.",
  alternates: {
    canonical: "/terms-of-service",
  },
};

export default function Page() {
  return <LegalDocumentPage contentKey="TERMS_OF_SERVICE_CONTENT" content={TERMS_OF_SERVICE_CONTENT} />;
}
