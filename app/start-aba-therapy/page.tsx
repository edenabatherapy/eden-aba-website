import type { Metadata } from "next";
import StartAbaTherapyPage from "@/components/start-aba-therapy/StartAbaTherapyPage";

export const metadata: Metadata = {
  title: "Start ABA Therapy | Eden ABA Therapy",
  description:
    "Begin ABA therapy with Eden ABA Therapy. Submit your information and our intake team will help your family with assessment, authorization, and next steps in Northern Virginia.",
  alternates: {
    canonical: "/start-aba-therapy",
  },
};

export default function Page() {
  return <StartAbaTherapyPage />;
}
