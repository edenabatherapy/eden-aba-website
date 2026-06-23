import type { Metadata } from "next";
import CareerPathsPage from "@/components/careers/career-paths/CareerPathsPage";
import { CAREER_PATHS_META } from "@/lib/careers/career-paths-careers-data";

export const metadata: Metadata = {
  title: CAREER_PATHS_META.title,
  description: CAREER_PATHS_META.description,
  alternates: { canonical: "/careers/career-paths" },
};

export default function CareerPathsRoutePage() {
  return <CareerPathsPage />;
}
