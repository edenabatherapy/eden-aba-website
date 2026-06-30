import type { Metadata } from "next";
import VirtualAbaServiceRoutePage from "@/components/services/VirtualAbaServiceRoutePage";

export const metadata: Metadata = {
  title: "Virtual ABA Therapy | Eden ABA Therapy",
  description:
    "Virtual ABA therapy and parent coaching through secure telehealth sessions for Northern Virginia families who need flexible access to Eden ABA Therapy services.",
  alternates: {
    canonical: "/services/virtual-aba-therapy",
  },
};

export default function Page() {
  return <VirtualAbaServiceRoutePage />;
}
