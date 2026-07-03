"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { OUR_APPROACH_PAGE } from "@/lib/our-approach-content";

type OurApproachPage = typeof OUR_APPROACH_PAGE;

const OurApproachContext = createContext<OurApproachPage>(OUR_APPROACH_PAGE);

export function OurApproachContentProvider({ children }: { children: ReactNode }) {
  const content = useLocalizedContent("OUR_APPROACH_PAGE", OUR_APPROACH_PAGE);
  return <OurApproachContext.Provider value={content}>{children}</OurApproachContext.Provider>;
}

export function useOurApproachPage(): OurApproachPage {
  return useContext(OurApproachContext);
}
