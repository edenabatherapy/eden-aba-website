import type { Metadata } from "next";
import ClinicalCollaborationPage from "@/components/providers/ClinicalCollaborationPage";

export const metadata: Metadata = {
  title: "Clinical Collaboration | For Providers | Eden ABA Therapy",
  description:
    "Learn how Eden ABA Therapy may coordinate care with referring providers when appropriate and with proper consent.",
  alternates: { canonical: "/providers/clinical-collaboration" },
};

export default function ClinicalCollaborationRoutePage() {
  return <ClinicalCollaborationPage />;
}
