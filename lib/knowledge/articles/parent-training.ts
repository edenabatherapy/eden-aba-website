import type { KnowledgeArticle } from "@/lib/knowledge/types";

export const parentTrainingArticles: KnowledgeArticle[] = [
  {
    id: "parent-training-why-it-matters",
    category: "parent-training",
    title: "Why Parent and Caregiver Training Matters",
    summary: "When caregivers learn strategies used in therapy, children often practice skills more often and in real-life settings.",
    content:
      "Parent training (also called caregiver coaching) helps families use effective strategies during meals, bedtime, community outings, and play — not only during formal therapy sessions.\n\nResearch shows that involving caregivers in intervention can improve child outcomes and family confidence. Training may cover communication prompts, reinforcement strategies, visual supports, and consistent routines.\n\nGood parent training is collaborative: clinicians respect family values, culture, and daily realities. Goals should feel practical and achievable at home.\n\nABA providers, including Eden ABA Therapy, often include caregiver coaching in treatment plans when clinically appropriate. Specific training content should be individualized by the child's clinical team.",
    keywords: [
      "parent training",
      "caregiver coaching",
      "parent involvement",
      "home strategies",
    ],
    sources: [
      {
        name: "Autism Speaks — Parent Training in ABA",
        url: "https://www.autismspeaks.org/applied-behavior-analysis",
        accessed: "2026-06-02",
      },
      {
        name: "CDC — Autism Treatment Services",
        url: "https://www.cdc.gov/autism/treatment/",
        accessed: "2026-06-02",
      },
    ],
  },
  {
    id: "parent-training-daily-routines",
    category: "parent-training",
    title: "Using Visual Supports and Routines at Home",
    summary: "Predictable routines and simple visual cues can reduce stress and support independence.",
    content:
      "Many families benefit from:\n\n• Visual schedules showing the order of daily activities.\n• First-then boards (\"First shoes, then park\") for transitions.\n• Timers or countdown warnings before changes in activity.\n• Consistent language for expectations across caregivers.\n• Celebrating small successes to build motivation.\n\nVisual supports do not replace therapy when a child has significant support needs, but they are low-cost tools that help many children understand what comes next.\n\nWork with your child's clinicians to choose supports that match the child's developmental level and family routine. What works for one child may not work for another.",
    keywords: [
      "visual schedule",
      "routines",
      "transitions",
      "first then",
      "home strategies",
    ],
    sources: [
      {
        name: "Autism Speaks — Visual Supports",
        url: "https://www.autismspeaks.org/tool-kit/atnair-p-visual-supports",
        accessed: "2026-06-02",
      },
    ],
  },
];
