"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { OUR_TEAM_PAGE } from "@/lib/our-team-content";

type OurTeamPage = typeof OUR_TEAM_PAGE;

const OurTeamContext = createContext<OurTeamPage>(OUR_TEAM_PAGE);

export function OurTeamContentProvider({ children }: { children: ReactNode }) {
  const content = useLocalizedContent("OUR_TEAM_PAGE", OUR_TEAM_PAGE);
  return <OurTeamContext.Provider value={content}>{children}</OurTeamContext.Provider>;
}

export function useOurTeamPage(): OurTeamPage {
  return useContext(OurTeamContext);
}
