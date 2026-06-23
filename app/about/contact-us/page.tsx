import type { Metadata } from "next";
import ContactUsPage from "@/components/about/contact-us/ContactUsPage";
import { CONTACT_US_META } from "@/lib/about/contact-us-data";

export const metadata: Metadata = {
  title: CONTACT_US_META.title,
  description: CONTACT_US_META.description,
  keywords: CONTACT_US_META.keywords,
  openGraph: {
    title: CONTACT_US_META.title,
    description: CONTACT_US_META.description,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: CONTACT_US_META.title,
    description: CONTACT_US_META.description,
  },
  alternates: {
    canonical: "/about/contact-us",
  },
};

export default function Page() {
  return <ContactUsPage />;
}
