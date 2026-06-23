import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CareersJobDetailsView from "@/components/careers/CareersJobDetailsView";
import CareersSubpageShell from "@/components/careers/CareersSubpageShell";
import { getJobBySlug } from "@/lib/careers-routes";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    return { title: "Job Not Found | Eden ABA Therapy Careers" };
  }

  return {
    title: `${job.title} | Eden ABA Therapy Careers`,
    description: job.summary,
    alternates: {
      canonical: `/careers/open-roles/${job.slug}`,
    },
  };
}

export default async function OpenRoleDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const job = getJobBySlug(slug);

  if (!job) {
    notFound();
  }

  return (
    <CareersSubpageShell>
      <CareersJobDetailsView job={job} />
    </CareersSubpageShell>
  );
}
