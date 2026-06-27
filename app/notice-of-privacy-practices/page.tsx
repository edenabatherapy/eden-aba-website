import type { Metadata } from "next";
import LegalDocumentPage from "@/components/legal/LegalDocumentPage";
import { NOTICE_OF_PRIVACY_PRACTICES_CONTENT } from "@/lib/legal/legal-pages-content";

export const metadata: Metadata = {
  title: "Notice of Privacy Practices | Eden ABA Therapy",
  description:
    "Eden ABA Therapy Notice of Privacy Practices describing how protected health information may be used and disclosed.",
  alternates: {
    canonical: "/notice-of-privacy-practices",
  },
};

export default function Page() {
  return (
    <LegalDocumentPage
      contentKey="NOTICE_OF_PRIVACY_PRACTICES_CONTENT"
      content={NOTICE_OF_PRIVACY_PRACTICES_CONTENT}
    />
  );
}
