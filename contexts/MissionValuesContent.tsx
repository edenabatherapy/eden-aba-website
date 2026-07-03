"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { MISSION_VALUES_PAGE } from "@/lib/mission-values-content";

type MissionValuesPage = typeof MISSION_VALUES_PAGE;

const MissionValuesContext = createContext<MissionValuesPage>(MISSION_VALUES_PAGE);

export function MissionValuesContentProvider({ children }: { children: ReactNode }) {
  const content = useLocalizedContent("MISSION_VALUES_PAGE", MISSION_VALUES_PAGE);
  return <MissionValuesContext.Provider value={content}>{children}</MissionValuesContext.Provider>;
}

export function useMissionValuesPage(): MissionValuesPage {
  return useContext(MissionValuesContext);
}
