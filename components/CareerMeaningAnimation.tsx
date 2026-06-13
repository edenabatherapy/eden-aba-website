"use client";

import "./CareerMeaningAnimation.css";

export type CareerMeaningAnimationType =
  | "careers"
  | "search-roles"
  | "rbt"
  | "bcba"
  | "life-at-eden"
  | "interview-guide"
  | "career-resources";

type CareerMeaningAnimationProps = {
  type: CareerMeaningAnimationType;
  compact?: boolean;
};

export default function CareerMeaningAnimation({ type, compact = false }: CareerMeaningAnimationProps) {
  return (
    <div
      className={`career-meaning-animation${compact ? " career-meaning-animation--compact" : ""}`}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="career-meaning-animation__svg">
        {type === "careers" && (
          <g className="cma-careers">
            <rect className="cma-careers__case" x="14" y="18" width="20" height="16" rx="3" />
            <path className="career-meaning-animation__stroke" d="M18 18 V16 C18 14 19.5 13 21 13 H27 C28.5 13 30 14 30 16 V18" />
            <line className="cma-careers__handle" x1="20" y1="26" x2="28" y2="26" />
            <circle className="cma-careers__spark cma-careers__spark--1" cx="34" cy="14" r="1.5" />
            <circle className="cma-careers__spark cma-careers__spark--2" cx="12" cy="20" r="1.3" />
          </g>
        )}

        {type === "search-roles" && (
          <g className="cma-search">
            <rect className="cma-search__card cma-search__card--1" x="8" y="14" width="14" height="10" rx="2" />
            <rect className="cma-search__card cma-search__card--2" x="26" y="18" width="14" height="10" rx="2" />
            <rect className="cma-search__card cma-search__card--3" x="14" y="30" width="14" height="10" rx="2" />
            <circle className="cma-search__lens" cx="30" cy="28" r="7" />
            <line className="cma-search__handle" x1="35" y1="33" x2="40" y2="38" />
            <line className="cma-search__scan" x1="10" y1="18" x2="20" y2="18" />
          </g>
        )}

        {type === "rbt" && (
          <g className="cma-rbt">
            <circle className="cma-rbt__head" cx="24" cy="16" r="4" />
            <path className="career-meaning-animation__stroke" d="M24 20 V28" />
            <path className="career-meaning-animation__stroke" d="M20 24 H28" />
            <rect className="cma-rbt__block cma-rbt__block--1" x="12" y="32" width="8" height="8" rx="1.5" />
            <rect className="cma-rbt__block cma-rbt__block--2" x="20" y="30" width="8" height="10" rx="1.5" />
            <rect className="cma-rbt__block cma-rbt__block--3" x="28" y="28" width="8" height="12" rx="1.5" />
            <circle className="cma-rbt__dot cma-rbt__dot--1" cx="16" cy="30" r="1.4" />
            <circle className="cma-rbt__dot cma-rbt__dot--2" cx="24" cy="28" r="1.4" />
            <circle className="cma-rbt__dot cma-rbt__dot--3" cx="32" cy="26" r="1.4" />
          </g>
        )}

        {type === "bcba" && (
          <g className="cma-bcba">
            <rect className="cma-bcba__board" x="10" y="10" width="20" height="28" rx="2.5" />
            <line className="cma-bcba__line" x1="14" y1="16" x2="26" y2="16" />
            <path className="cma-bcba__check cma-bcba__check--1" d="M14 22 L16.5 24.5 L20 20" />
            <path className="cma-bcba__check cma-bcba__check--2" d="M14 28 L16.5 30.5 L20 26" />
            <rect className="cma-bcba__bar cma-bcba__bar--1" x="34" y="28" width="4" height="10" rx="1" />
            <rect className="cma-bcba__bar cma-bcba__bar--2" x="30" y="24" width="4" height="14" rx="1" />
            <rect className="cma-bcba__bar cma-bcba__bar--3" x="38" y="20" width="4" height="18" rx="1" />
            <line className="cma-bcba__baseline" x1="28" y1="38" x2="42" y2="38" />
          </g>
        )}

        {type === "life-at-eden" && (
          <g className="cma-life">
            <line className="cma-life__link" x1="24" y1="24" x2="14" y2="14" />
            <line className="cma-life__link" x1="24" y1="24" x2="34" y2="14" />
            <line className="cma-life__link" x1="24" y1="24" x2="24" y2="36" />
            <circle className="cma-life__node cma-life__node--center" cx="24" cy="24" r="4.5" />
            <circle className="cma-life__node" cx="14" cy="14" r="3.5" />
            <circle className="cma-life__node" cx="34" cy="14" r="3.5" />
            <circle className="cma-life__node" cx="24" cy="36" r="3.5" />
            <path
              className="cma-life__heart"
              d="M24 32 C24 32 20 29 20 26.5 C20 24.5 21.5 23.5 23 23.5 C23.8 23.5 24.4 23.9 24 24.5 C23.6 23.9 24.2 23.5 25 23.5 C26.5 23.5 28 24.5 28 26.5 C28 29 24 32 24 32 Z"
            />
            <path className="cma-life__leaf" d="M36 34 C38 32 39 33 38 35 C37 36 36 34 36 34 Z" />
          </g>
        )}

        {type === "interview-guide" && (
          <g className="cma-interview">
            <rect className="cma-interview__calendar" x="10" y="12" width="18" height="18" rx="2.5" />
            <line className="career-meaning-animation__stroke" d="M10 18 H28" opacity="0.35" />
            <circle className="cma-interview__day" cx="16" cy="24" r="2" />
            <circle className="cma-interview__day cma-interview__day--active" cx="22" cy="24" r="2" />
            <path className="cma-interview__check" d="M20 24 L21.5 25.5 L24 22" />
            <path
              className="cma-interview__bubble"
              d="M30 20 H40 C41.5 20 42.5 21 42.5 22.5 V27 C42.5 28.5 41.5 29.5 40 29.5 H36 L33 32 V29.5 H30 C28.5 29.5 27.5 28.5 27.5 27 V22.5 C27.5 21 28.5 20 30 20 Z"
            />
            <circle className="cma-interview__dot" cx="33" cy="25" r="1.2" />
            <circle className="cma-interview__dot" cx="36" cy="25" r="1.2" />
            <circle className="cma-interview__dot" cx="39" cy="25" r="1.2" />
          </g>
        )}

        {type === "career-resources" && (
          <g className="cma-resources">
            <path className="cma-resources__folder" d="M8 16 H20 L22 19 H38 C39.5 19 40.5 20 40.5 21.5 V34 C40.5 35.5 39.5 36.5 38 36.5 H10 C8.5 36.5 7.5 35.5 7.5 34 V17.5 C7.5 16 8.5 15 10 15" />
            <rect className="cma-resources__doc cma-resources__doc--1" x="14" y="22" width="10" height="12" rx="1.5" />
            <rect className="cma-resources__doc cma-resources__doc--2" x="22" y="20" width="10" height="14" rx="1.5" />
            <line className="cma-resources__line" x1="16" y1="26" x2="22" y2="26" />
            <line className="cma-resources__line" x1="16" y1="29" x2="20" y2="29" />
            <path className="cma-resources__path" d="M24 12 C28 12 30 14 30 16" />
            <circle className="cma-resources__node" cx="30" cy="12" r="1.8" />
          </g>
        )}
      </svg>
    </div>
  );
}
