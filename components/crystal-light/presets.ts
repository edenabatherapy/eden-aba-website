export type CrystalLightPreset =
  | "dark-emerald"
  | "light-mint"
  | "navy-teal"
  | "warm-ivory"
  | "deep-forest";

export type CrystalLightLayers = {
  mesh: boolean;
  aurora: boolean;
  lightRays: boolean;
  particles: boolean;
  crystals: boolean;
  vignette: boolean;
  glassOverlay: boolean;
  glowLines: boolean;
};

export type CrystalLightPresetConfig = {
  id: CrystalLightPreset;
  label: string;
  layers: CrystalLightLayers;
  particleCount: number;
  crystalCount: number;
  auroraCount: number;
  glowLineCount: number;
  lightRayCount: number;
};

export const CRYSTAL_LIGHT_PRESETS: Record<CrystalLightPreset, CrystalLightPresetConfig> = {
  "dark-emerald": {
    id: "dark-emerald",
    label: "Dark Emerald",
    layers: {
      mesh: true,
      aurora: true,
      lightRays: true,
      particles: true,
      crystals: true,
      vignette: true,
      glassOverlay: true,
      glowLines: true,
    },
    particleCount: 6,
    crystalCount: 2,
    auroraCount: 3,
    glowLineCount: 3,
    lightRayCount: 2,
  },
  "light-mint": {
    id: "light-mint",
    label: "Light Mint",
    layers: {
      mesh: true,
      aurora: true,
      lightRays: true,
      particles: true,
      crystals: true,
      vignette: false,
      glassOverlay: true,
      glowLines: false,
    },
    particleCount: 5,
    crystalCount: 2,
    auroraCount: 2,
    glowLineCount: 0,
    lightRayCount: 1,
  },
  "navy-teal": {
    id: "navy-teal",
    label: "Navy Teal",
    layers: {
      mesh: true,
      aurora: true,
      lightRays: false,
      particles: true,
      crystals: true,
      vignette: true,
      glassOverlay: true,
      glowLines: true,
    },
    particleCount: 4,
    crystalCount: 1,
    auroraCount: 2,
    glowLineCount: 2,
    lightRayCount: 0,
  },
  "warm-ivory": {
    id: "warm-ivory",
    label: "Warm Ivory",
    layers: {
      mesh: true,
      aurora: true,
      lightRays: true,
      particles: false,
      crystals: true,
      vignette: false,
      glassOverlay: false,
      glowLines: false,
    },
    particleCount: 0,
    crystalCount: 2,
    auroraCount: 2,
    glowLineCount: 0,
    lightRayCount: 1,
  },
  "deep-forest": {
    id: "deep-forest",
    label: "Deep Forest",
    layers: {
      mesh: true,
      aurora: true,
      lightRays: true,
      particles: true,
      crystals: false,
      vignette: false,
      glassOverlay: true,
      glowLines: true,
    },
    particleCount: 4,
    crystalCount: 0,
    auroraCount: 3,
    glowLineCount: 2,
    lightRayCount: 1,
  },
};

export function getCrystalLightSectionClass(preset: CrystalLightPreset): string {
  return `crystal-light-section crystal-light-section--${preset}`;
}
