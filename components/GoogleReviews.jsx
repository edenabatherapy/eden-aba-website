"use client";

import { ExternalLink } from "lucide-react";
import {
  formatGoogleReviewCountInline,
  formatGoogleReviewsBasedOn,
  formatGoogleReviewsRating,
  getGoogleReviewsAriaLabel,
  getGoogleReviewsData,
} from "@/lib/google-reviews";

function GoogleReviewStars({ rating, reviewCount, className = "text-yellow-300" }) {
  const ariaLabel = getGoogleReviewsAriaLabel(rating, reviewCount);

  return (
    <span role="img" aria-label={ariaLabel} className={className}>
      <span aria-hidden="true">★★★★★</span>
    </span>
  );
}

/**
 * @param {{
 *   variant?: "footer" | "compact" | "location",
 *   labels?: { title?: string, leaveReview?: string, basedOn?: string, reviewCountInline?: string },
 *   showButton?: boolean,
 *   className?: string,
 * }} props
 */
export default function GoogleReviews({
  variant = "compact",
  labels = {},
  showButton,
  className = "",
}) {
  const { rating, reviewCount, reviewUrl } = getGoogleReviewsData();
  const ratingText = formatGoogleReviewsRating(rating);
  const shouldShowButton = showButton ?? (variant === "footer" || variant === "location");

  if (variant === "footer") {
    return (
      <div className={className}>
        {labels.title ? (
          <h4 className="text-sm font-black uppercase tracking-[0.2em] text-emerald-100">
            {labels.title}
          </h4>
        ) : null}

        <p className="mt-4 flex flex-wrap items-center gap-2 text-base font-black text-white">
          <span>{ratingText}</span>
          <GoogleReviewStars rating={rating} reviewCount={reviewCount} />
        </p>

        {labels.basedOn ? (
          <p className="mt-2 text-sm leading-7 text-emerald-50">
            {formatGoogleReviewsBasedOn(reviewCount, labels.basedOn)}
          </p>
        ) : null}

        {shouldShowButton && labels.leaveReview ? (
          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-6 py-3 text-sm font-black text-emerald-950 transition hover:bg-yellow-300"
          >
            {labels.leaveReview} <ExternalLink size={16} />
          </a>
        ) : null}
      </div>
    );
  }

  if (variant === "location") {
    return (
      <div className={`rounded-2xl border border-slate-200 bg-slate-50 p-5 ${className}`.trim()}>
        {labels.title ? (
          <h3 className="text-lg font-black text-[#0b4f4f]">{labels.title}</h3>
        ) : null}

        <p className="mt-4 flex flex-wrap items-center gap-2 text-base font-black text-slate-900">
          <span>{ratingText}</span>
          <GoogleReviewStars rating={rating} reviewCount={reviewCount} className="text-[#f7c72f]" />
        </p>

        {labels.basedOn ? (
          <p className="mt-2 text-sm font-semibold text-slate-700">
            {formatGoogleReviewsBasedOn(reviewCount, labels.basedOn)}
          </p>
        ) : null}

        {shouldShowButton && labels.leaveReview ? (
          <a
            href={reviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#f7c72f] px-6 py-3 text-sm font-black text-[#0b4f4f] transition hover:bg-[#ff8a1f] hover:text-white"
          >
            {labels.leaveReview} <ExternalLink size={16} />
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <p className={`flex flex-wrap items-center justify-center gap-2 text-lg font-black text-[#0b4f4f] ${className}`.trim()}>
      <span>{ratingText}</span>
      <GoogleReviewStars rating={rating} reviewCount={reviewCount} className="text-[#f7c72f]" />
      {labels.reviewCountInline ? (
        <span className="font-semibold text-slate-700">
          {formatGoogleReviewCountInline(reviewCount, labels.reviewCountInline)}
        </span>
      ) : null}
    </p>
  );
}
