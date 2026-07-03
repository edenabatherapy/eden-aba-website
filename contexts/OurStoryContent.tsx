"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { OUR_STORY_PAGE } from "@/lib/our-story-content";

type OurStoryPage = typeof OUR_STORY_PAGE;

const OurStoryContext = createContext<OurStoryPage>(OUR_STORY_PAGE);

export function OurStoryContentProvider({ children }: { children: ReactNode }) {
  const content = useLocalizedContent("OUR_STORY_PAGE", OUR_STORY_PAGE);
  return <OurStoryContext.Provider value={content}>{children}</OurStoryContext.Provider>;
}

export function useOurStoryPage(): OurStoryPage {
  return useContext(OurStoryContext);
}
