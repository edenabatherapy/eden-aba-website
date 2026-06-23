"use client";

import { useCallback, useEffect, useState } from "react";
import { SAVED_JOBS_STORAGE_KEY } from "@/lib/careers-content";

function readSavedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(SAVED_JOBS_STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((id) => typeof id === "string") : [];
  } catch {
    return [];
  }
}

export function useSavedJobs() {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setSavedIds(readSavedIds());
    setHydrated(true);
  }, []);

  const persist = useCallback((ids: string[]) => {
    setSavedIds(ids);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(SAVED_JOBS_STORAGE_KEY, JSON.stringify(ids));
    }
  }, []);

  const toggleSaved = useCallback(
    (jobId: string) => {
      setSavedIds((current) => {
        const next = current.includes(jobId)
          ? current.filter((id) => id !== jobId)
          : [...current, jobId];
        if (typeof window !== "undefined") {
          window.localStorage.setItem(SAVED_JOBS_STORAGE_KEY, JSON.stringify(next));
        }
        return next;
      });
    },
    [],
  );

  const isSaved = useCallback((jobId: string) => savedIds.includes(jobId), [savedIds]);

  return { savedIds, hydrated, toggleSaved, isSaved };
}
