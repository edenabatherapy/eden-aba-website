"use client";

import "./ServiceMeaningAnimation.css";

export type ServiceMeaningAnimationType =
  | "home"
  | "center"
  | "community"
  | "school"
  | "virtual"
  | "occupational"
  | "speech"
  | "feeding";

type ServiceMeaningAnimationProps = {
  type: ServiceMeaningAnimationType;
  compact?: boolean;
};

export default function ServiceMeaningAnimation({ type, compact = false }: ServiceMeaningAnimationProps) {
  return (
    <div
      className={`service-meaning-animation${compact ? " service-meaning-animation--compact" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="service-meaning-animation__svg">
        {type === "home" && (
          <g className="sma-home">
            <circle className="sma-home__pulse" cx="24" cy="26" r="10" fill="var(--eden-soft-green)" opacity="0.5" />
            <path
              className="service-meaning-animation__stroke"
              d="M10 24 L24 12 L38 24 V36 H10 Z"
            />
            <path className="service-meaning-animation__stroke" d="M20 36 V28 H28 V36" />
            <path
              className="sma-home__leaf"
              d="M24 22 C24 22 21 24 21 27 C21 29 24 30 24 30 C24 30 27 29 27 27 C27 24 24 22 24 22 Z"
              fill="var(--eden-teal)"
              stroke="none"
              opacity="0.85"
            />
            <line className="sma-home__dot-trail" x1="18" y1="30" x2="26" y2="30" />
            <circle className="sma-home__dot-parent" cx="17" cy="30" r="2" />
            <circle className="sma-home__dot-child" cx="27" cy="30" r="2" />
          </g>
        )}

        {type === "center" && (
          <g className="sma-center">
            <path
              className="service-meaning-animation__stroke"
              d="M12 36 H36 V22 L24 14 L12 22 Z"
              fill="var(--eden-cream)"
            />
            <rect className="sma-center__block sma-center__block--1" x="16" y="28" width="16" height="6" rx="1.5" />
            <rect className="sma-center__block sma-center__block--2" x="18" y="21" width="12" height="6" rx="1.5" />
            <rect className="sma-center__block sma-center__block--3" x="20" y="15" width="8" height="5" rx="1.5" />
            <path
              className="sma-center__check"
              d="M30 12 L33 15 L38 9"
              stroke-dasharray="14"
              stroke-dashoffset="14"
            />
          </g>
        )}

        {type === "community" && (
          <g className="sma-community">
            <path className="sma-community__path" d="M10 34 C16 34 18 24 26 20 C34 16 36 12 38 12" />
            <rect className="sma-community__home" x="8" y="28" width="10" height="8" rx="1.5" />
            <path className="service-meaning-animation__stroke" d="M10 28 L13 24 H17 L20 28" fill="var(--eden-soft-green)" />
            <circle className="sma-community__traveler" cx="12" cy="32" r="2.2" />
            <g className="sma-community__pin">
              <path
                className="service-meaning-animation__stroke"
                d="M36 12 C38.5 12 40 13.8 40 16 C40 19.5 36 24 36 24 C36 24 32 19.5 32 16 C32 13.8 33.5 12 36 12 Z"
                fill="var(--eden-soft-green)"
              />
              <circle className="sma-community__pin-dot" cx="36" cy="16" r="1.8" />
            </g>
          </g>
        )}

        {type === "school" && (
          <g className="sma-school">
            <rect className="sma-school__board" x="10" y="12" width="28" height="22" rx="3" />
            <path className="service-meaning-animation__stroke" d="M14 18 H34" opacity="0.25" />
            <line className="sma-school__line" x1="14" y1="24" x2="34" y2="24" />
            <path className="service-meaning-animation__stroke" d="M14 28 H26" opacity="0.25" />
            <polygon
              className="sma-school__star"
              points="34,28 35.2,31 38.5,31 35.8,33 36.8,36.5 34,34.5 31.2,36.5 32.2,33 29.5,31 32.8,31"
            />
          </g>
        )}

        {type === "virtual" && (
          <g className="sma-virtual">
            <rect className="sma-virtual__device" x="10" y="14" width="28" height="20" rx="3" />
            <rect className="sma-virtual__screen" x="13" y="17" width="22" height="14" rx="2" />
            <circle className="sma-virtual__video" cx="24" cy="24" r="4.5" />
            <circle cx="24" cy="24" r="1.5" fill="var(--eden-teal)" />
            <path className="sma-virtual__wave sma-virtual__wave--1" d="M30 20 C32 20 33 22 33 24" />
            <path className="sma-virtual__wave sma-virtual__wave--2" d="M31 18 C34 18 36 21 36 24" />
            <circle className="sma-virtual__secure" cx="34" cy="28" r="2.5" />
            <path
              d="M33 28 L34.2 29.2 L36 27.2"
              stroke="#fff"
              strokeWidth="1.2"
              fill="none"
              strokeLinecap="round"
            />
          </g>
        )}

        {type === "occupational" && (
          <g className="sma-ot">
            <circle className="sma-ot__ring" cx="24" cy="26" r="14" />
            <path
              className="sma-ot__hand"
              d="M18 32 V22 C18 20 19.5 19 21 19 C22.5 19 23.5 20 23.5 21.5 V29 M23.5 29 V20 C23.5 18.5 25 17 26.5 17 C28 17 29 18 29 19.5 V30 M29 30 V23 C29 21.5 30.5 20.5 32 20.5 C33.5 20.5 34.5 21.5 34.5 23 V32 C34.5 35 31.5 37 27 37 H21 C17 37 14 34 14 30 V27"
            />
            <circle className="sma-ot__spark sma-ot__spark--1" cx="14" cy="14" r="1.4" />
            <circle className="sma-ot__spark sma-ot__spark--2" cx="20" cy="10" r="1.2" />
            <circle className="sma-ot__spark sma-ot__spark--3" cx="36" cy="12" r="1.3" />
            <line className="sma-ot__motor-line" x1="16" y1="16" x2="24" y2="20" />
          </g>
        )}

        {type === "speech" && (
          <g className="sma-speech">
            <path
              className="sma-speech__bubble"
              d="M8 14 H22 C25 14 27 16 27 19 V24 C27 27 25 29 22 29 H16 L12 33 V29 H8 C5 29 3 27 3 24 V19 C3 16 5 14 8 14 Z"
            />
            <path
              className="sma-speech__bubble sma-speech__bubble--2"
              d="M20 18 H34 C36 18 38 20 38 23 V27 C38 29 36 31 34 31 H30 L27 34 V31 H20 C18 31 16 29 16 27 V23 C16 20 18 18 20 18 Z"
            />
            <circle className="sma-speech__dot sma-speech__dot--1" cx="12" cy="21" r="1.3" />
            <circle className="sma-speech__dot sma-speech__dot--2" cx="16" cy="21" r="1.3" />
            <circle className="sma-speech__dot sma-speech__dot--3" cx="20" cy="21" r="1.3" />
            <path className="sma-speech__wave" d="M22 24 C26 22 30 24 34 24" />
          </g>
        )}

        {type === "feeding" && (
          <g className="sma-feed">
            <circle className="sma-feed__plate" cx="28" cy="28" r="11" />
            <circle className="sma-feed__inner" cx="28" cy="28" r="6" />
            <path className="sma-feed__spoon" d="M12 10 C12 8 13.5 7 15 7 C16.5 7 17.5 8.2 17.5 10 C17.5 12.5 15 14 15 20" />
            <ellipse className="sma-feed__spoon" cx="15" cy="22" rx="2.5" ry="3" fill="none" />
            <circle className="sma-feed__bite" cx="14" cy="12" r="2" />
            <path className="sma-feed__path" d="M28 22 V26" />
            <path className="sma-feed__check" d="M32 32 L34 34 L38 30" />
          </g>
        )}
      </svg>
    </div>
  );
}
