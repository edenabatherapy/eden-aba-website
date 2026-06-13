import type { KnowledgeArticle } from "@/lib/knowledge/types";

export const socialSkillsArticles: KnowledgeArticle[] = [
  {
    id: "social-skills-learning",
    category: "social-skills",
    title: "How Children Develop Social Skills",
    summary: "Social skills grow through practice with peers, guided play, and supportive coaching — at a pace that fits each child.",
    content:
      "Social development includes skills like sharing attention, taking turns, reading social cues, joining play, and managing conflict. Children learn these skills gradually through interactions with family, peers, and caregivers.\n\nSome autistic children benefit from explicit teaching of social skills rather than assuming they will pick them up through observation alone. Effective approaches often combine structured practice with natural play opportunities.\n\nGoals should be meaningful to the child — quality friendships and comfortable participation matter more than forcing eye contact or superficial \"social scripts.\"\n\nABA and other therapies may include social goals when clinically indicated. Progress depends on the individual child, environment, and consistent opportunities to practice.",
    keywords: [
      "social skills",
      "friends",
      "peer play",
      "turn taking",
      "socialization",
    ],
    sources: [
      {
        name: "CDC — Autism Spectrum Disorder (ASD)",
        url: "https://www.cdc.gov/autism/about/",
        accessed: "2026-06-02",
      },
      {
        name: "Autism Speaks — Social Skills",
        url: "https://www.autismspeaks.org/expert-opinion-social-skills-and-autism",
        accessed: "2026-06-02",
      },
    ],
  },
  {
    id: "social-skills-playdates",
    category: "social-skills",
    title: "Supporting Playdates and Peer Interaction",
    summary: "Short, structured play opportunities with clear activities often work better than long unstructured sessions.",
    content:
      "Tips many families find helpful:\n\n• Start with one peer and a familiar activity.\n• Keep initial playdates shorter and end on a positive note.\n• Prepare visual schedules or role-play greetings beforehand.\n• Choose activities with clear roles (building, crafts, games with rules).\n• Stay nearby to coach turn-taking and problem-solving as needed.\n\nIf a child shows high anxiety or repeated conflict in social settings, discuss strategies with their clinical team. Social goals should prioritize the child's comfort and dignity.\n\nThis guidance is general parent education, not a treatment plan for any specific child.",
    keywords: [
      "playdate",
      "peer interaction",
      "making friends",
      "play skills",
    ],
    sources: [
      {
        name: "Autism Speaks — Social Skills",
        url: "https://www.autismspeaks.org/expert-opinion-social-skills-and-autism",
        accessed: "2026-06-02",
      },
    ],
  },
];
