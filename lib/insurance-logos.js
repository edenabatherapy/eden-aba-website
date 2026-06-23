import { UNIQUE_INSURANCE_PROVIDER_LOGOS } from "./insurance-provider-logos";

/** @deprecated Use UNIQUE_INSURANCE_PROVIDER_LOGOS from insurance-provider-logos.ts */
export const insuranceProviders = UNIQUE_INSURANCE_PROVIDER_LOGOS.map(({ name, src }) => ({
  name,
  logo: src,
}));

/** @deprecated Use insuranceProviders */
export const INSURANCE_PROVIDER_LOGOS = insuranceProviders;
