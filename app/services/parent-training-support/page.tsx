import type { Metadata } from "next";
import ParentTrainingPage from "@/components/aba-therapy/ParentTrainingPage";
import { PARENT_TRAINING_SUPPORT_META } from "@/lib/services/service-page-metadata";

export const metadata: Metadata = PARENT_TRAINING_SUPPORT_META;

export default function Page() {
  return <ParentTrainingPage />;
}
