import type { GettingStartedResource, GettingStartedResourceCategory } from "@/lib/getting-started/getting-started-data";

export function searchGettingStartedResources(
  resources: GettingStartedResource[],
  query: string,
  category: GettingStartedResourceCategory | "All",
) {
  const normalizedQuery = query.trim().toLowerCase();

  return resources.filter((resource) => {
    if (category !== "All" && resource.category !== category) {
      return false;
    }

    if (!normalizedQuery) {
      return true;
    }

    const haystack = [
      resource.title,
      resource.category,
      resource.source,
      resource.summary,
      ...resource.tags,
    ]
      .join(" ")
      .toLowerCase();

    return haystack.includes(normalizedQuery);
  });
}
