import type { Metadata } from "next";
import PrivacyPolicyClientPage from "@/components/legal/PrivacyPolicyClientPage";

export const metadata: Metadata = {
  title: "Privacy Policy | Eden ABA Therapy",
  description:
    "Learn how Eden ABA Therapy collects, uses, protects, and safeguards personal information, health information, website data, and SMS communications.",
  alternates: {
    canonical: "/privacy-policy",
  },
};

export default function Page() {
  return <PrivacyPolicyClientPage />;
}
