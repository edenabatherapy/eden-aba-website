import {
  ALL_JOBS,
  HOMEPAGE_OPEN_JOBS,
  isJobOpen,
  type CareersJobWithSlug,
} from "@/lib/careers/jobs-data";
import type { CareersJob } from "@/lib/careers-content";

export { HOMEPAGE_OPEN_JOBS, isJobOpen };

export function getJobSlug(jobOrId: string | CareersJobWithSlug): string {
  if (typeof jobOrId !== "string") {
    return jobOrId.slug;
  }

  const job = getJobById(jobOrId);
  return job?.slug ?? jobOrId;
}

export function getJobDetailsPath(jobId: string): string {
  return `/careers/open-roles/${getJobSlug(jobId)}`;
}

export function getJobApplyPath(jobId: string): string {
  return `/careers/apply?role=${getJobSlug(jobId)}`;
}

export function getJobShareUrl(jobId: string, origin?: string): string {
  const base = origin ?? (typeof window !== "undefined" ? window.location.origin : "");
  return `${base}${getJobDetailsPath(jobId)}`;
}

export function getJobById(jobId: string): CareersJobWithSlug | undefined {
  return ALL_JOBS.find((job) => job.id === jobId || job.slug === jobId);
}

export function getJobBySlug(slug: string): CareersJobWithSlug | undefined {
  return ALL_JOBS.find((job) => job.slug === slug || job.id === slug);
}

export function getJobsByIds(jobIds: string[]): CareersJobWithSlug[] {
  return jobIds
    .map((id) => getJobById(id))
    .filter((job): job is CareersJobWithSlug => Boolean(job));
}

export function getJobListingStatus(job: CareersJob): string {
  if (job.isFutureOpening || job.status === "Future Opening") {
    return "Future Opening";
  }

  return "Open";
}

export function getRequirementsSummary(job: CareersJob, limit = 3): string {
  return job.details.qualifications.slice(0, limit).join(" • ");
}
