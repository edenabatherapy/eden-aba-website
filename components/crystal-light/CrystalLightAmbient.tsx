"use client";

import { CRYSTAL_LIGHT_PRESETS, type CrystalLightPreset } from "./presets";
import "./crystal-light-engine.css";

type CrystalLightAmbientProps = {
  preset: CrystalLightPreset;
  className?: string;
};

export { CRYSTAL_LIGHT_PRESETS, getCrystalLightSectionClass } from "./presets";
export type { CrystalLightPreset, CrystalLightPresetConfig, CrystalLightLayers } from "./presets";

export default function CrystalLightAmbient({ preset, className = "" }: CrystalLightAmbientProps) {
  const config = CRYSTAL_LIGHT_PRESETS[preset];
  const { layers } = config;

  return (
    <div
      className={`crystal-light-ambient crystal-light-ambient--${preset} ${className}`.trim()}
      aria-hidden="true"
    >
      {layers.mesh ? <div className="crystal-light-mesh" /> : null}
      {layers.vignette ? <div className="crystal-light-vignette" /> : null}
      {layers.glassOverlay ? <div className="crystal-light-glass-overlay" /> : null}

      {layers.lightRays
        ? Array.from({ length: config.lightRayCount }, (_, index) => (
            <div
              key={`ray-${index}`}
              className={`crystal-light-light-ray crystal-light-light-ray--${index + 1}`}
            />
          ))
        : null}

      {layers.aurora
        ? Array.from({ length: config.auroraCount }, (_, index) => (
            <div
              key={`aurora-${index}`}
              className={`crystal-light-aurora crystal-light-aurora--${index + 1}`}
            />
          ))
        : null}

      {layers.glowLines
        ? Array.from({ length: config.glowLineCount }, (_, index) => (
            <div
              key={`glow-${index}`}
              className={`crystal-light-glow-line crystal-light-glow-line--${index + 1}`}
            />
          ))
        : null}

      {layers.particles
        ? Array.from({ length: config.particleCount }, (_, index) => (
            <div
              key={`particle-${index}`}
              className={`crystal-light-particle crystal-light-particle--${index + 1}`}
            />
          ))
        : null}

      {layers.crystals
        ? Array.from({ length: config.crystalCount }, (_, index) => (
            <div
              key={`crystal-${index}`}
              className={`crystal-light-crystal crystal-light-crystal--${index + 1}`}
            />
          ))
        : null}
    </div>
  );
}
