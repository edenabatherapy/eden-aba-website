import {
  INSURANCE_COVERAGE_LOGOS,
  type InsuranceCoverageLogo,
} from "@/lib/insurance-coverage-logos";

export type InsuranceProviderLogo = InsuranceCoverageLogo;

export const INSURANCE_PROVIDER_LOGOS: InsuranceProviderLogo[] = INSURANCE_COVERAGE_LOGOS;

function normalizeProviderName(name: string) {
  return name.trim().toLowerCase().replace(/\s+/g, " ");
}

export function formatProviderDisplayName(name: string) {
  return name.trim();
}

/** Drop duplicate providers by name or image path. */
export function uniqueInsuranceProviderLogos(logos: InsuranceProviderLogo[]) {
  const seenNames = new Set<string>();
  const seenSources = new Set<string>();

  return logos.filter((logo) => {
    const nameKey = normalizeProviderName(formatProviderDisplayName(logo.name));
    const srcKey = logo.src.trim().toLowerCase();

    if (seenNames.has(nameKey) || seenSources.has(srcKey)) {
      return false;
    }

    seenNames.add(nameKey);
    seenSources.add(srcKey);
    return true;
  });
}

export const UNIQUE_INSURANCE_PROVIDER_LOGOS = uniqueInsuranceProviderLogos(INSURANCE_PROVIDER_LOGOS);
