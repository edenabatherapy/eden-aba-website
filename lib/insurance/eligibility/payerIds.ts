/**
 * Virginia Medicaid / MCO payer IDs for clearinghouse 270/271-style eligibility.
 * Replace placeholder values with IDs from your vendor payer directory after contract signing.
 * Override at runtime with ELIGIBILITY_PAYER_ID_MAP JSON (display name → payer ID).
 */
const DEFAULT_PAYER_ID_BY_PROVIDER: Record<string, string> = {
  "Virginia Medicaid": "VAMCD",
  "Virginia Medicaid / Cardinal Care": "VAMCD",
  Medicaid: "VAMCD",
  "Cardinal Care": "VAMCD",
  "Cardinal Care Virginia Medicaid Program": "VAMCD",
  "Anthem HealthKeepers Plus": "VA_ANTHEM_MCO",
  "Aetna Better Health of Virginia": "VA_AETNA_MCO",
  "Molina Complete Care of Virginia": "VA_MOLINA_MCO",
  "Molina Complete Care": "VA_MOLINA_MCO",
  "Optima / Sentara": "VA_SENTARA_MCO",
  "Sentara / Optima": "VA_SENTARA_MCO",
  "UnitedHealthcare Community Plan": "VA_UHC_MCO",
  "UnitedHealthcare Community Plan of Virginia": "VA_UHC_MCO",
};

let cachedOverrideMap: Record<string, string> | null = null;

function getOverrideMap(): Record<string, string> {
  if (cachedOverrideMap) return cachedOverrideMap;

  const raw = process.env.ELIGIBILITY_PAYER_ID_MAP?.trim();
  if (!raw) {
    cachedOverrideMap = {};
    return cachedOverrideMap;
  }

  try {
    const parsed = JSON.parse(raw) as Record<string, string>;
    cachedOverrideMap = parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    cachedOverrideMap = {};
  }

  return cachedOverrideMap;
}

export function resolvePayerId(insuranceProvider: string): string {
  const trimmed = insuranceProvider.trim();
  if (!trimmed) {
    return process.env.ELIGIBILITY_DEFAULT_PAYER_ID?.trim() || "";
  }

  const overrides = getOverrideMap();
  if (overrides[trimmed]) return overrides[trimmed];

  const exact = DEFAULT_PAYER_ID_BY_PROVIDER[trimmed];
  if (exact) return exact;

  const lower = trimmed.toLowerCase();
  for (const [name, payerId] of Object.entries(DEFAULT_PAYER_ID_BY_PROVIDER)) {
    const nameLower = name.toLowerCase();
    if (lower.includes(nameLower) || nameLower.includes(lower)) {
      return payerId;
    }
  }

  for (const [name, payerId] of Object.entries(overrides)) {
    const nameLower = name.toLowerCase();
    if (lower.includes(nameLower) || nameLower.includes(lower)) {
      return payerId;
    }
  }

  return process.env.ELIGIBILITY_DEFAULT_PAYER_ID?.trim() || trimmed;
}

export function listKnownPayerProviders(): string[] {
  return Object.keys(DEFAULT_PAYER_ID_BY_PROVIDER);
}
