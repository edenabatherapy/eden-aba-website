"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Link from "next/link";
import { Bookmark, Search, X } from "lucide-react";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ALL_JOBS } from "@/lib/careers/jobs-data";
import {
  CAREERS_PAGE,
  CAREERS_TABS,
  SORT_OPTIONS,
  type CareersJob,
  type CareersSortOption,
  type CareersTab,
  type JobFilters,
} from "@/lib/careers-content";
import {
  EMPTY_FILTERS,
  filterJobs,
  getActiveFilterChips,
  removeFilterChip,
  sortJobs,
} from "@/lib/careers-filter";
import { shareJob } from "@/lib/careers-share";
import { getJobById, getJobDetailsPath } from "@/lib/careers-routes";
import CareersFiltersPanel from "@/components/careers/CareersFiltersPanel";
import CareersJobCard from "@/components/careers/CareersJobCard";
import { useSavedJobs } from "@/components/careers/useSavedJobs";
import { getButtonClasses } from "@/lib/button-styles";

export default function CareersPortal() {
  const allJobs = useLocalizedContent("ALL_JOBS", ALL_JOBS);
  const careersPage = useLocalizedContent("CAREERS_PAGE", CAREERS_PAGE);
  const careersTabs = useLocalizedContent("CAREERS_TABS", CAREERS_TABS);
  const sortOptions = useLocalizedContent("SORT_OPTIONS", SORT_OPTIONS);

  const router = useRouter();
  const searchParams = useSearchParams();
  const [filters, setFilters] = useState<JobFilters>(EMPTY_FILTERS);
  const [activeTab, setActiveTab] = useState<CareersTab>("all");
  const [sort, setSort] = useState<CareersSortOption>("relevant");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);
  const [shareFeedbackId, setShareFeedbackId] = useState<string | null>(null);
  const { toggleSaved, isSaved, hydrated, savedIds } = useSavedJobs();

  const filteredJobs = useMemo(() => {
    const filtered = filterJobs(allJobs, filters, activeTab);
    return sortJobs(filtered, sort);
  }, [filters, activeTab, sort]);

  const activeChips = useMemo(() => getActiveFilterChips(filters), [filters]);
  const totalActiveJobs = allJobs.filter((job) => job.status !== "Future Opening").length;

  useEffect(() => {
    const jobId = searchParams.get("job");
    if (!jobId) return;
    if (getJobById(jobId)) {
      router.replace(getJobDetailsPath(jobId));
    }
  }, [searchParams, router]);

  const handleShare = useCallback(async (job: CareersJob) => {
    const result = await shareJob(job);
    if (result === "copied") {
      setShareFeedbackId(job.id);
      window.setTimeout(() => setShareFeedbackId(null), 2500);
    }
  }, []);

  const clearAllFilters = () => {
    setFilters(EMPTY_FILTERS);
    setActiveTab("all");
  };

  const scrollToTalentNetwork = () => {
    document.getElementById("talent-network")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <div className="mt-10 rounded-[2rem] border border-emerald-100 bg-emerald-50/50 p-5 dark:border-slate-700 dark:bg-slate-900/50 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative block flex-1">
            <label className="relative block">
              <span className="sr-only">{careersPage.search.placeholder}</span>
              <Search className="absolute left-4 top-3.5 text-slate-400" size={18} aria-hidden="true" />
              <input
                value={filters.search}
                onChange={(event) => setFilters({ ...filters, search: event.target.value })}
                placeholder={careersPage.search.placeholder}
                className="h-12 w-full rounded-2xl border border-emerald-100 bg-white pl-11 pr-24 text-sm font-semibold outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900"
                aria-label={careersPage.search.placeholder}
              />
              {filters.search && (
                <button
                  type="button"
                  onClick={() => setFilters({ ...filters, search: "" })}
                  className="absolute right-3 top-2 inline-flex h-8 items-center gap-1 rounded-xl px-2 text-xs font-bold text-emerald-800 hover:bg-emerald-50 dark:text-emerald-200 dark:hover:bg-slate-800"
                  aria-label={careersPage.search.clearLabel}
                >
                  <X size={14} aria-hidden="true" />
                  Clear
                </button>
              )}
            </label>
          </div>
          <Link
            href="/careers/saved-jobs"
            className={getButtonClasses("secondary", "inline-flex shrink-0 w-full sm:w-auto")}
            aria-label={`View saved jobs${hydrated && savedIds.length > 0 ? `, ${savedIds.length} saved` : ""}`}
          >
            <Bookmark size={16} aria-hidden="true" />
            Saved Jobs
            {hydrated && savedIds.length > 0 && (
              <span className="rounded-full bg-emerald-700 px-2 py-0.5 text-xs text-white">{savedIds.length}</span>
            )}
          </Link>
        </div>

        <div
          className="mt-5 flex gap-2 overflow-x-auto pb-1"
          role="tablist"
          aria-label="Job category tabs"
        >
          {careersTabs.map((tab) => {
            const selected = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActiveTab(tab.id)}
                className={`shrink-0 rounded-full px-4 py-2 text-sm font-bold transition ${
                  selected
                    ? "bg-emerald-700 text-white shadow-sm"
                    : "border border-emerald-200 bg-white text-emerald-900 hover:bg-emerald-50 dark:border-slate-600 dark:bg-slate-900 dark:text-emerald-200 dark:hover:bg-slate-800"
                }`}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm font-semibold text-slate-700 dark:text-slate-300" aria-live="polite">
            {careersPage.results.showing} {filteredJobs.length} {careersPage.results.of}{" "}
            {activeTab === "future-locations"
              ? allJobs.filter((job) => job.isFutureOpening).length
              : totalActiveJobs}{" "}
            {careersPage.results.roles}
          </p>
          <label className="inline-flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-300">
              Sort by
            </span>
            <select
              value={sort}
              onChange={(event) => setSort(event.target.value as CareersSortOption)}
              className="h-10 rounded-xl border border-emerald-100 bg-white px-3 text-sm font-semibold outline-none focus:border-emerald-400 dark:border-slate-700 dark:bg-slate-900"
              aria-label="Sort jobs"
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {activeChips.length > 0 && (
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {activeChips.map((chip) => (
              <button
                key={`${chip.key}-${chip.value}`}
                type="button"
                onClick={() => setFilters(removeFilterChip(filters, chip.key, chip.value))}
                className="inline-flex items-center gap-1 rounded-full border border-emerald-200 bg-white px-3 py-1.5 text-xs font-bold text-emerald-900 dark:border-slate-600 dark:bg-slate-900 dark:text-emerald-200"
                aria-label={`Remove filter ${chip.label}: ${chip.value}`}
              >
                <span>
                  {chip.label}: {chip.value}
                </span>
                <X size={12} aria-hidden="true" />
              </button>
            ))}
            <button
              type="button"
              onClick={clearAllFilters}
              className="text-xs font-bold text-emerald-700 underline-offset-2 hover:underline dark:text-emerald-300"
            >
              {careersPage.results.clearAll}
            </button>
          </div>
        )}
      </div>

      <div className="mt-8 grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
        <CareersFiltersPanel
          filters={filters}
          onChange={setFilters}
          onClearAll={clearAllFilters}
          mobileOpen={mobileFiltersOpen}
          onMobileToggle={() => setMobileFiltersOpen((open) => !open)}
        />

        <div className="grid gap-5">
          {filteredJobs.length > 0 ? (
            filteredJobs.map((job) => (
              <CareersJobCard
                key={job.id}
                job={job}
                isSaved={hydrated && isSaved(job.id)}
                onToggleSave={toggleSaved}
                onShare={handleShare}
                shareFeedbackId={shareFeedbackId}
              />
            ))
          ) : (
            <div className="rounded-[1.75rem] border border-emerald-100 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900">
              <h3 className="text-xl font-extrabold text-slate-900 dark:text-white">
                {careersPage.results.emptyTitle}
              </h3>
              <p className="mt-3 text-base font-semibold text-slate-700 dark:text-slate-300">
                {careersPage.results.emptyBody}
              </p>
              <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                <button type="button" onClick={clearAllFilters} className={getButtonClasses("secondary", "w-full sm:w-auto")}>
                  {careersPage.results.clearFilters}
                </button>
                <button type="button" onClick={scrollToTalentNetwork} className={getButtonClasses("primary", "w-full sm:w-auto")}>
                  {careersPage.results.submitResume}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
