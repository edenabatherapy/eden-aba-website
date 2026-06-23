import {
  FILTER_OPTIONS,
  type CareersJob,
  type CareersSortOption,
  type CareersTab,
  type JobFilters,
} from "@/lib/careers-content";
import { ALL_JOBS } from "@/lib/careers/jobs-data";

const STATUS_PRIORITY: Record<string, number> = {
  "Urgent Hiring": 0,
  "Now Hiring": 1,
  "Leadership Position": 2,
  "Future Opening": 3,
};

function jobSearchText(job: CareersJob): string {
  return [
    job.title,
    job.department,
    job.employment,
    job.location,
    job.summary,
    job.credential,
    job.experienceLevel,
    job.status,
    ...job.highlights,
    ...job.keywords,
    job.details.overview,
    ...job.details.responsibilities,
    ...job.details.qualifications,
  ]
    .join(" ")
    .toLowerCase();
}

function matchesEmployment(job: CareersJob, types: string[]): boolean {
  if (types.length === 0) return true;
  return types.some((type) => {
    if (job.employment === type) return true;
    if (type === "Full-Time" && job.employment.includes("Full-Time")) return true;
    if (type === "Part-Time" && job.employment.includes("Part-Time")) return true;
    return false;
  });
}

function matchesSchedule(job: CareersJob, schedules: string[]): boolean {
  if (schedules.length === 0) return true;
  return schedules.some((s) => job.schedule.includes(s as CareersJob["schedule"][number]));
}

function matchesWorkSetting(job: CareersJob, settings: string[]): boolean {
  if (settings.length === 0) return true;
  return settings.some((s) => job.workSetting.includes(s as CareersJob["workSetting"][number]));
}

export function matchesTab(job: CareersJob, tab: CareersTab): boolean {
  switch (tab) {
    case "all":
      return job.status !== "Future Opening";
    case "clinical":
      return (
        job.status !== "Future Opening" &&
        (job.department === "Clinical Services" || job.department === "Clinical Leadership")
      );
    case "leadership":
      return (
        job.experienceLevel === "Leadership" || job.status === "Leadership Position"
      );
    case "operations":
      return (
        job.status !== "Future Opening" &&
        (job.department === "Operations" ||
          job.department === "Administration" ||
          job.department === "Client Experience")
      );
    case "entry-level":
      return job.experienceLevel === "Entry Level" && job.status !== "Future Opening";
    case "future-locations":
      return job.status === "Future Opening" || job.isFutureOpening === true;
    default:
      return true;
  }
}

export function filterJobs(
  jobs: CareersJob[],
  filters: JobFilters,
  tab: CareersTab,
): CareersJob[] {
  const query = filters.search.trim().toLowerCase();

  return jobs.filter((job) => {
    if (!matchesTab(job, tab)) return false;

    if (query && !jobSearchText(job).includes(query)) return false;

    if (filters.locations.length > 0 && !filters.locations.includes(job.location)) return false;
    if (filters.departments.length > 0 && !filters.departments.includes(job.department)) return false;
    if (!matchesEmployment(job, filters.employmentTypes)) return false;
    if (
      filters.experienceLevels.length > 0 &&
      !filters.experienceLevels.includes(job.experienceLevel)
    ) {
      return false;
    }
    if (filters.credentials.length > 0 && !filters.credentials.includes(job.credential)) return false;
    if (!matchesWorkSetting(job, filters.workSettings)) return false;
    if (!matchesSchedule(job, filters.schedules)) return false;
    if (filters.statuses.length > 0 && !filters.statuses.includes(job.status)) return false;

    return true;
  });
}

export function sortJobs(jobs: CareersJob[], sort: CareersSortOption): CareersJob[] {
  const sorted = [...jobs];

  switch (sort) {
    case "newest":
      return sorted.sort(
        (a, b) => new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime(),
      );
    case "title-az":
      return sorted.sort((a, b) => a.title.localeCompare(b.title));
    case "department-az":
      return sorted.sort((a, b) => a.department.localeCompare(b.department));
    case "leadership-first":
      return sorted.sort((a, b) => {
        const aLead = a.experienceLevel === "Leadership" || a.status === "Leadership Position" ? 0 : 1;
        const bLead = b.experienceLevel === "Leadership" || b.status === "Leadership Position" ? 0 : 1;
        if (aLead !== bLead) return aLead - bLead;
        return a.title.localeCompare(b.title);
      });
    case "entry-first":
      return sorted.sort((a, b) => {
        const aEntry = a.experienceLevel === "Entry Level" ? 0 : 1;
        const bEntry = b.experienceLevel === "Entry Level" ? 0 : 1;
        if (aEntry !== bEntry) return aEntry - bEntry;
        return a.title.localeCompare(b.title);
      });
    case "relevant":
    default:
      return sorted.sort((a, b) => {
        const statusDiff =
          (STATUS_PRIORITY[a.status] ?? 99) - (STATUS_PRIORITY[b.status] ?? 99);
        if (statusDiff !== 0) return statusDiff;
        return new Date(b.postedAt).getTime() - new Date(a.postedAt).getTime();
      });
  }
}

export function getActiveFilterChips(filters: JobFilters): { key: keyof JobFilters; label: string; value: string }[] {
  const chips: { key: keyof JobFilters; label: string; value: string }[] = [];

  if (filters.search.trim()) {
    chips.push({ key: "search", label: "Search", value: filters.search.trim() });
  }

  const arrayKeys: (keyof JobFilters)[] = [
    "locations",
    "departments",
    "employmentTypes",
    "experienceLevels",
    "credentials",
    "workSettings",
    "schedules",
    "statuses",
  ];

  for (const key of arrayKeys) {
    const values = filters[key] as string[];
    for (const value of values) {
      chips.push({ key, label: FILTER_OPTIONS.labels[key] ?? key, value });
    }
  }

  return chips;
}

export function removeFilterChip(filters: JobFilters, key: keyof JobFilters, value: string): JobFilters {
  if (key === "search") {
    return { ...filters, search: "" };
  }

  const current = filters[key] as string[];
  return {
    ...filters,
    [key]: current.filter((item) => item !== value),
  };
}

export const EMPTY_FILTERS: JobFilters = {
  search: "",
  locations: [],
  departments: [],
  employmentTypes: [],
  experienceLevels: [],
  credentials: [],
  workSettings: [],
  schedules: [],
  statuses: [],
};

export function countActiveFilters(filters: JobFilters): number {
  return getActiveFilterChips(filters).length;
}

export { ALL_JOBS };
