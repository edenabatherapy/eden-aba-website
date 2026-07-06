"use client";

import EdenLogo from "@/components/EdenLogo";
import "./EdenStage10AnimatedLogo.css";

const PARTICLE_INDICES = [1, 2, 3, 4, 5, 6, 7, 8] as const;

type EdenStage10AnimatedLogoProps = {
  className?: string;
};

/**
 * Logo-only extract from the Eden Stage 10 cinematic engine.
 * No titles, panels, or value labels — medallion + effects only.
 */
export default function EdenStage10AnimatedLogo({ className = "" }: EdenStage10AnimatedLogoProps) {
  return (
    <div
      className={`eden-stage10-logo ${className}`.trim()}
      aria-hidden="true"
    >
      <div className="eden-stage10-logo__stage">
        <div className="eden-stage10-logo__shader" />
        <div className="eden-stage10-logo__volumetric eden-stage10-logo__volumetric--a" />
        <div className="eden-stage10-logo__volumetric eden-stage10-logo__volumetric--b" />

        <div className="eden-stage10-logo__particles">
          {PARTICLE_INDICES.map((index) => (
            <span key={index} className={`eden-stage10-logo__particle eden-stage10-logo__particle--${index}`} />
          ))}
        </div>

        <div className="eden-stage10-logo__ring eden-stage10-logo__ring--outer" />
        <div className="eden-stage10-logo__ring eden-stage10-logo__ring--mid" />
        <div className="eden-stage10-logo__ring eden-stage10-logo__ring--inner" />

        <div className="eden-stage10-logo__glow eden-stage10-logo__glow--emerald" />
        <div className="eden-stage10-logo__glow eden-stage10-logo__glow--teal" />
        <div className="eden-stage10-logo__glow eden-stage10-logo__glow--gold" />

        <div className="eden-stage10-logo__medallion">
          <span className="eden-stage10-logo__reflection" />
          <span className="eden-stage10-logo__shimmer" />
          <EdenLogo
            size="headerBrand"
            alt=""
            className="eden-stage10-logo__image"
            priority={false}
          />
        </div>
      </div>
    </div>
  );
}
