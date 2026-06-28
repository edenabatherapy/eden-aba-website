import type { Metadata } from "next";
import ReferralProcessPage from "@/components/providers/ReferralProcessPage";

export const metadata: Metadata = {
  title: "Referral Process | For Providers | Eden ABA Therapy",
  description:
    "Learn how Eden ABA Therapy handles provider referrals from receipt through family contact, eligibility review, and care planning.",
  alternates: { canonical: "/providers/referral-process" },
};

export default function ReferralProcessRoutePage() {
  return <ReferralProcessPage />;
}
