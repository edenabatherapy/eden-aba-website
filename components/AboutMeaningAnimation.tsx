"use client";

import "./AboutMeaningAnimation.css";

export type AboutMeaningAnimationType =
  | "eden"
  | "story"
  | "team"
  | "quality"
  | "family-centered"
  | "community-impact"
  | "contact";

type AboutMeaningAnimationProps = {
  type: AboutMeaningAnimationType;
  compact?: boolean;
};

export default function AboutMeaningAnimation({ type, compact = false }: AboutMeaningAnimationProps) {
  return (
    <div
      className={`about-meaning-animation${compact ? " about-meaning-animation--compact" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="about-meaning-animation__svg">
        {(type === "eden" || type === "story") && (
          <g className={type === "eden" ? "ama-eden" : "ama-story"}>
            <path className="ama-eden__root ama-story__root" d="M24 38 C20 34 18 30 18 26" />
            <path className="ama-eden__root ama-story__root" d="M24 38 C28 34 30 30 30 26" />
            <line className="ama-eden__trunk ama-story__trunk" x1="24" y1="38" x2="24" y2="24" />
            <circle className="ama-eden__canopy ama-story__canopy" cx="24" cy="20" r="9" />
            {type === "story" ? (
              <>
                <path
                  className="ama-story__leaf"
                  d="M30 18 C32 16 34 17 33 19 C32 20 30 18 30 18 Z"
                />
                <path
                  className="ama-story__leaf ama-story__leaf--2"
                  d="M18 20 C16 18 14 19 15 21 C16 22 18 20 18 20 Z"
                />
              </>
            ) : null}
          </g>
        )}

        {type === "team" && (
          <g className="ama-team">
            <line className="ama-team__link" x1="24" y1="24" x2="14" y2="16" />
            <line className="ama-team__link" x1="24" y1="24" x2="34" y2="16" />
            <line className="ama-team__link" x1="24" y1="24" x2="24" y2="36" />
            <circle className="ama-team__node ama-team__node--center" cx="24" cy="24" r="5" />
            <circle className="ama-team__node ama-team__node--1" cx="14" cy="16" r="4" />
            <circle className="ama-team__node ama-team__node--2" cx="34" cy="16" r="4" />
            <circle className="ama-team__node" cx="24" cy="36" r="4" />
          </g>
        )}

        {type === "quality" && (
          <g className="ama-quality">
            <path
              className="ama-quality__shield"
              d="M24 10 L34 14 V24 C34 30 24 36 24 36 C24 36 14 30 14 24 V14 Z"
            />
            <line className="ama-quality__line" x1="16" y1="22" x2="32" y2="22" />
            <path className="ama-quality__check" d="M19 24 L22.5 27.5 L29 19" />
          </g>
        )}

        {type === "family-centered" && (
          <g className="ama-family">
            <circle className="ama-family__ring" cx="24" cy="26" r="14" />
            <path className="ama-family__home" d="M16 28 L24 18 L32 28 V34 H16 Z" />
            <path
              className="ama-family__heart"
              d="M24 30 C24 30 20 27 20 24.5 C20 22.5 21.5 21.5 23 21.5 C23.8 21.5 24.4 21.9 24 22.5 C23.6 21.9 24.2 21.5 25 21.5 C26.5 21.5 28 22.5 28 24.5 C28 27 24 30 24 30 Z"
            />
          </g>
        )}

        {type === "community-impact" && (
          <g className="ama-community">
            <circle className="ama-community__ring" cx="24" cy="26" r="10" />
            <circle className="ama-community__ring ama-community__ring--2" cx="24" cy="26" r="14" />
            <g className="ama-community__pin">
              <path
                className="about-meaning-animation__stroke"
                d="M24 12 C27 12 29 14.5 29 17.5 C29 21.5 24 28 24 28 C24 28 19 21.5 19 17.5 C19 14.5 21 12 24 12 Z"
                fill="var(--eden-soft-green)"
              />
              <circle fill="var(--eden-teal)" cx="24" cy="17.5" r="2" />
            </g>
            <circle className="ama-community__dot ama-community__dot--1" cx="12" cy="32" r="1.8" />
            <circle className="ama-community__dot ama-community__dot--2" cx="36" cy="30" r="1.8" />
            <circle className="ama-community__dot ama-community__dot--3" cx="24" cy="38" r="1.8" />
          </g>
        )}

        {type === "contact" && (
          <g className="ama-contact">
            <path
              className="ama-contact__bubble"
              d="M10 14 H30 C33 14 35 16 35 19 V26 C35 29 33 31 30 31 H22 L16 36 V31 H10 C7 31 5 29 5 26 V19 C5 16 7 14 10 14 Z"
            />
            <circle className="ama-contact__dot" cx="14" cy="22" r="1.4" />
            <circle className="ama-contact__dot ama-contact__dot--2" cx="20" cy="22" r="1.4" />
            <circle className="ama-contact__dot ama-contact__dot--3" cx="26" cy="22" r="1.4" />
            <path className="ama-contact__arrow" d="M30 24 H38 M35 21 L38 24 L35 27" />
          </g>
        )}
      </svg>
    </div>
  );
}
