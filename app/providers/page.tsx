import type { Metadata } from "next";
import ProvidersHubPage from "@/components/providers/ProvidersHubPage";
import { PROVIDERS_META } from "@/lib/providers/provider-content";

export const metadata: Metadata = {
  title: PROVIDERS_META.title,
  description: PROVIDERS_META.description,
  alternates: { canonical: "/providers" },
};

export default function ProvidersRoutePage() {
  return <ProvidersHubPage />;
}
