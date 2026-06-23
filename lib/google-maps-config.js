/** Shared Google Maps configuration for client-side map components. */

export const EDEN_MAP_MARKER_URL = "/images/eden-map-marker.svg";

export const GOOGLE_MAPS_SCRIPT_ID = "eden-google-maps-script";

/**
 * Resolves the browser Maps JavaScript API key.
 * NEXT_PUBLIC_* is required in the browser; next.config also mirrors GOOGLE_MAPS_API_KEY when set.
 *
 * @returns {string}
 */
export function getGoogleMapsApiKey() {
  return (
    process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim() ||
    process.env.GOOGLE_MAPS_API_KEY?.trim() ||
    ""
  );
}

/** @returns {boolean} */
export function hasGoogleMapsApiKey() {
  return Boolean(getGoogleMapsApiKey());
}

export const GOOGLE_MAPS_DEV_WARNING =
  "Google Maps API key missing or invalid. Add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local, enable Maps JavaScript API (required for Map and Satellite views — Maps Embed API alone does not support satellite), enable Geocoding API, turn on billing, and allow HTTP referrers: http://localhost:3000/*, http://127.0.0.1:3000/*, http://192.168.*.*:3000/*, and https://edenabatherapy.com/*. Restart npm run dev after changing .env.local.";
