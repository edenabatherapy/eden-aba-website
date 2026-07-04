import type {
  AssistanceCategoryGroup,
  AssistanceProgramType,
  FinancialAssistanceResource,
} from "./types";

function normalize(value: string): string {
  return value.toLowerCase().trim();
}

export function searchFinancialAssistanceResources(
  resources: FinancialAssistanceResource[],
  query: string,
  group: AssistanceCategoryGroup | "All",
  programType: AssistanceProgramType | "All",
): FinancialAssistanceResource[] {
  const q = normalize(query);

  return resources.filter((resource) => {
    if (group !== "All" && resource.group !== group) return false;
    if (programType !== "All" && resource.programType !== programType) return false;

    if (!q) return true;

    const haystack = [
      resource.title,
      resource.description,
      resource.eligibilitySummary,
      resource.coverageNotes,
      resource.group,
      resource.programType,
      resource.status,
      ...resource.tags,
      ...resource.officialLinks.map((l) => l.label),
      ...(resource.documents ?? []),
      ...(resource.tips ?? []),
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(q);
  });
}

export function filterVirginiaPrograms<T extends { region: string; name: string; description: string; tags: string[] }>(
  programs: T[],
  region: string,
  query: string,
): T[] {
  const q = normalize(query);

  return programs.filter((program) => {
    if (region !== "All" && program.region !== region && program.region !== "Statewide") {
      if (region === "Northern Virginia" && !program.region.includes("Northern Virginia") && program.region !== "Statewide") {
        const novaCounties = ["Fairfax", "Arlington", "Loudoun", "Prince William", "Alexandria"];
        if (!novaCounties.some((c) => program.region.includes(c))) return false;
      } else if (region !== "Northern Virginia") {
        return false;
      }
    }

    if (!q) return true;

    const haystack = [program.name, program.description, program.region, ...program.tags].join(" ").toLowerCase();
    return haystack.includes(q);
  });
}
