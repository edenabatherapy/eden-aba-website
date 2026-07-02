import type { Metadata } from "next";
import HomeBasedAbaServiceRoutePage from "@/components/services/HomeBasedAbaServiceRoutePage";
import homeBasedAbaEn from "@/locales/partials/home-based-aba-en.json";

const { title, description } = homeBasedAbaEn.meta;

export const metadata: Metadata = {
  title,
  description,
  openGraph: {
    title,
    description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
  alternates: {
    canonical: "/services/home-based-aba-therapy",
  },
};

export default function Page() {
  return <HomeBasedAbaServiceRoutePage />;
}
