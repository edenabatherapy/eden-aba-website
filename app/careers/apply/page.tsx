import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import CareersJobApplyForm from "@/components/careers/CareersJobApplyForm";
import CareersSubpageShell from "@/components/careers/CareersSubpageShell";
import { getJobBySlug, isJobOpen } from "@/lib/careers-routes";

type PageProps = {
  searchParams: Promise<{ role?: string }>;
};

export const metadata: Metadata = {
  title: "Apply | Eden ABA Therapy Careers",
  description: "Submit your application for an open role at Eden ABA Therapy.",
};

export default async function CareersApplyPage({ searchParams }: PageProps) {
  const { role } = await searchParams;

  if (!role) {
    redirect("/careers/open-roles");
  }

  const job = getJobBySlug(role);

  if (!job) {
    notFound();
  }

  if (!isJobOpen(job)) {
    notFound();
  }

  return (
    <CareersSubpageShell>
      <CareersJobApplyForm job={job} />
    </CareersSubpageShell>
  );
}
