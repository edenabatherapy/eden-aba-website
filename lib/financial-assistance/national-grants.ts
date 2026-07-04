import type { NationalGrant } from "./types";

export const NATIONAL_GRANTS: NationalGrant[] = [
  {
    id: "autism-cares-grant",
    title: "Autism Cares Family Support Grants",
    organization: "Autism Cares Foundation",
    summary:
      "May provide one-time grants for autism-related family needs when funding cycles are open.",
    eligibility:
      "Families with a child diagnosed with autism. Application requirements published on the foundation website.",
    url: "https://www.autismcaresfoundation.org/",
    deadlineNote: "Application windows open and close periodically—verify current status on the official site.",
    status: "Seasonal",
  },
  {
    id: "naa-helping-hand",
    title: "Helping Hand Program",
    organization: "National Autism Association",
    summary:
      "Financial assistance program for autism-related expenses when funds are available.",
    eligibility:
      "Child under 18 with autism diagnosis; demonstrated financial need; U.S. residency.",
    url: "https://nationalautismassociation.org/family-support/helping-hand/",
    deadlineNote: "Funding is limited. Applications are reviewed when the program is accepting submissions.",
    status: "Limited",
  },
  {
    id: "autism-speaks-grants",
    title: "Autism Speaks Grants Directory",
    organization: "Autism Speaks",
    summary:
      "Directory of research, community, and family grant opportunities—availability changes over time.",
    eligibility: "Varies by listed grant. Review each program's published criteria.",
    url: "https://www.autismspeaks.org/grants",
    deadlineNote: "Deadlines and open funds change frequently. Always confirm on autismspeaks.org.",
    status: "Verify",
  },
  {
    id: "uaa-grants",
    title: "Family Support Grants",
    organization: "United Autism Alliance",
    summary:
      "Small grants for autism-related family expenses when organizational funding permits.",
    eligibility: "U.S. families with a child with autism. Subject to review.",
    url: "https://www.unitedautismalliance.com/",
    deadlineNote: "Check the organization website for current application availability.",
    status: "Verify",
  },
  {
    id: "first-signs-grants",
    title: "Community Grant Listings",
    organization: "Autism Society",
    summary:
      "Autism Society affiliates and partners may list local grant and scholarship opportunities.",
    eligibility: "Varies by local affiliate program.",
    url: "https://autismsociety.org/resource-directory/",
    deadlineNote: "Local programs set their own deadlines. Contact your nearest affiliate.",
    status: "Verify",
  },
];

export const GRANTS_DISCLAIMER =
  "Grant deadlines, funding levels, and eligibility requirements change without notice. Eden ABA Therapy does not administer these programs and cannot guarantee awards. Always apply through official organization channels and verify current information before relying on any deadline or benefit amount.";
