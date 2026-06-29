import type { Metadata } from "next";
import AiKnowledgePage from "@/components/ai-knowledge/AiKnowledgePage";
import { AI_KNOWLEDGE_META } from "@/lib/ai-knowledge/eden-ai-knowledge-content";
import "@/components/ai-knowledge/ai-knowledge.css";

export const metadata: Metadata = {
  title: AI_KNOWLEDGE_META.title,
  description: AI_KNOWLEDGE_META.description,
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function Page() {
  return <AiKnowledgePage />;
}
