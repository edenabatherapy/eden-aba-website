import type { KnowledgeArticle } from "@/lib/knowledge/types";

export const insuranceFaqsArticles: KnowledgeArticle[] = [
  {
    id: "insurance-aba-coverage-basics",
    category: "insurance-faqs",
    title: "How Insurance May Cover ABA Therapy (General)",
    summary: "Many private and public plans cover ABA when medically necessary, but benefits vary widely by plan and state.",
    content:
      "Insurance coverage for ABA depends on the specific plan, state law, and medical necessity criteria. Many employer plans and Medicaid programs cover ABA for autistic children when certain requirements are met — such as a diagnosis and prior authorization.\n\nFamilies should verify:\n\n• Whether ABA is a covered benefit under the plan.\n• Deductible, copay, and coinsurance amounts.\n• In-network vs out-of-network provider rules.\n• Prior authorization and re-authorization requirements.\n• Annual hour limits or visit caps, if any.\n\nInsurance verification does not guarantee payment for every service. Always confirm benefits in writing when possible.\n\nEden ABA Therapy offers insurance verification support — see Eden-specific intake and insurance articles. This article is general information, not a guarantee of coverage for any family.",
    keywords: [
      "insurance",
      "coverage",
      "aba covered",
      "benefits",
      "medical necessity",
      "authorization",
    ],
    sources: [
      {
        name: "Autism Speaks — Insurance Coverage for Autism Services",
        url: "https://www.autismspeaks.org/insurance-coverage-autism-services",
        accessed: "2026-06-02",
      },
      {
        name: "Medicaid.gov — Home & Community-Based Services",
        url: "https://www.medicaid.gov/medicaid/home-community-based-services/index.html",
        accessed: "2026-06-02",
      },
    ],
  },
  {
    id: "insurance-verification-process",
    category: "insurance-faqs",
    title: "What Information Is Needed for Insurance Verification",
    summary: "Verification usually requires plan details, member ID, and sometimes diagnosis documentation — handled securely by intake teams.",
    content:
      "To check ABA benefits, providers typically need:\n\n• Child's full name and date of birth.\n• Insurance company name and member/subscriber ID.\n• Policy holder name and date of birth.\n• Group number (if applicable).\n• Front and back of insurance card images when requested.\n• Diagnosis documentation when required by the payer.\n\nThe verification process may take 24–72 hours depending on the payer. Results often include whether ABA is covered, cost-sharing estimates, and authorization steps.\n\nNever share insurance information over unsecured channels. Use official intake forms or verified provider contacts.\n\nEden ABA Therapy typically completes benefit verification within 24–48 hours after receiving complete information — see Eden intake FAQs for how to submit details securely.",
    keywords: [
      "verify insurance",
      "verification",
      "member id",
      "insurance card",
      "benefits check",
      "copay",
      "deductible",
    ],
    sources: [
      {
        name: "CMS — Health Insurance Basics",
        url: "https://www.cms.gov/marketplace/outreach-and-education/health-insurance-basics",
        accessed: "2026-06-02",
      },
    ],
  },
  {
    id: "insurance-cost-responsibility",
    category: "insurance-faqs",
    title: "Understanding Copays, Deductibles, and Family Responsibility",
    summary: "Even with coverage, families may owe deductibles, copays, or coinsurance depending on the plan.",
    content:
      "Health insurance rarely covers 100% of costs from the first visit. Common terms:\n\n• Deductible: amount the family pays before insurance starts paying for covered services.\n• Copay: fixed amount per visit or service.\n• Coinsurance: percentage of allowed charges the family pays after the deductible.\n• Out-of-pocket maximum: cap on what a family pays in a plan year for covered services.\n\nABA may require ongoing authorization; lapses can affect coverage. Ask providers for good-faith estimates when available.\n\nFinancial questions should be directed to your insurer and provider billing team. This article is educational, not financial or legal advice.",
    keywords: [
      "cost",
      "copay",
      "deductible",
      "coinsurance",
      "out of pocket",
      "how much",
      "price",
    ],
    sources: [
      {
        name: "Healthcare.gov — Glossary of Health Coverage Terms",
        url: "https://www.healthcare.gov/glossary/",
        accessed: "2026-06-02",
      },
    ],
  },
];
