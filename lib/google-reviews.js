/**
 * Shared Google Reviews data for Eden ABA Therapy.
 *
 * TODO: Connect Google Places API for live rating and review count.
 * - Google Place ID: (add Eden ABA Therapy Place ID here)
 * - Google Maps API key: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY
 * - Places API fields: rating, user_ratings_total
 */
export const GOOGLE_PLACE_ID = "";

export const GOOGLE_REVIEWS_FALLBACK = {
  rating: 5.0,
  reviewCount: 4,
  reviewUrl: "https://g.page/r/Cc8VjakVrKCeEBM/review",
};

/** @returns {{ rating: number, reviewCount: number, reviewUrl: string }} */
export function getGoogleReviewsData() {
  // TODO: When Places API is connected, fetch live `rating` and `user_ratings_total`
  // using GOOGLE_PLACE_ID and NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, then fall back on error.
  return GOOGLE_REVIEWS_FALLBACK;
}

export function formatGoogleReviewsRating(rating) {
  return rating.toFixed(1);
}

export function getGoogleReviewsAriaLabel(rating, reviewCount) {
  return `Rated ${formatGoogleReviewsRating(rating)} out of 5 based on ${reviewCount} Google reviews.`;
}

export function formatGoogleReviewCountInline(reviewCount, template) {
  return template.replace("{count}", String(reviewCount));
}

export function formatGoogleReviewsBasedOn(reviewCount, template) {
  return template.replace("{count}", String(reviewCount));
}
