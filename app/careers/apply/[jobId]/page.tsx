import { redirect } from "next/navigation";
import { getJobApplyPath, getJobById } from "@/lib/careers-routes";

type PageProps = {
  params: Promise<{ jobId: string }>;
};

export default async function LegacyJobApplyPage({ params }: PageProps) {
  const { jobId } = await params;
  const job = getJobById(jobId);

  if (!job) {
    redirect("/careers/open-roles");
  }

  redirect(getJobApplyPath(job.id));
}
