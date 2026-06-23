import { redirect } from "next/navigation";
import { getJobById, getJobDetailsPath } from "@/lib/careers-routes";

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function LegacyJobDetailsPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    redirect("/careers/open-roles");
  }

  redirect(getJobDetailsPath(job.id));
}
