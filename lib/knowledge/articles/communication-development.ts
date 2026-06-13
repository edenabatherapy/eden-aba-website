import type { KnowledgeArticle } from "@/lib/knowledge/types";

export const communicationDevelopmentArticles: KnowledgeArticle[] = [
  {
    id: "communication-speech-language-basics",
    category: "communication-development",
    title: "Speech and Language Development Basics",
    summary: "Communication includes understanding language, expressing needs, and nonverbal communication — not only spoken words.",
    content:
      "Language development typically includes receptive language (understanding), expressive language (speaking or communicating), and pragmatics (using language socially). Some children speak late; others may have rich understanding but limited speech.\n\nEarly communication milestones include babbling, gesturing (pointing, waving), joint attention (sharing focus on objects), and growing vocabulary. Persistent delays across multiple communication areas may warrant evaluation by a speech-language pathologist.\n\nTherapies such as speech therapy and ABA may address communication goals. Augmentative and Alternative Communication (AAC) — pictures, devices, or sign — can support children who do not speak yet or who speak limited words. AAC does not prevent speech development for most children.\n\nOnly qualified clinicians can assess speech and language disorders. This article provides general education only.",
    keywords: [
      "speech",
      "language",
      "communication",
      "late talker",
      "words",
      "expressive",
      "receptive",
    ],
    sources: [
      {
        name: "CDC — Language and Speech Milestones",
        url: "https://www.cdc.gov/ncbddd/actearly/milestones/index.html",
        accessed: "2026-06-02",
      },
      {
        name: "ASHA — Speech and Language Development",
        url: "https://www.asha.org/public/speech/development/",
        accessed: "2026-06-02",
      },
    ],
  },
  {
    id: "communication-aac-overview",
    category: "communication-development",
    title: "Augmentative and Alternative Communication (AAC) Overview",
    summary: "AAC tools help children communicate while speech is still developing — they support connection, not replace speech therapy.",
    content:
      "AAC includes picture boards, communication apps, sign language, and speech-generating devices. AAC is appropriate for anyone who benefits from additional ways to express needs, choices, and ideas.\n\nResearch indicates that introducing AAC does not stop children from developing speech when they are able to do so. AAC can reduce frustration and increase participation in learning and social activities.\n\nAAC systems should be chosen and customized with a speech-language pathologist who knows the child. Training for caregivers and communication partners is essential.\n\nIf you wonder whether AAC could help your child, ask your pediatrician or therapist for a speech-language evaluation referral.",
    keywords: [
      "aac",
      "augmentative",
      "communication device",
      "picture exchange",
      "pecs",
      "nonverbal",
    ],
    sources: [
      {
        name: "ASHA — Augmentative and Alternative Communication (AAC)",
        url: "https://www.asha.org/public/speech/disorders/aac/",
        accessed: "2026-06-02",
      },
      {
        name: "Autism Speaks — AAC Guide",
        url: "https://www.autismspeaks.org/expert-opinion-augmentative-and-alternative-communication-aac",
        accessed: "2026-06-02",
      },
    ],
  },
];
