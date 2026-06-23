/**
 * Optional browser geolocation helpers. GPS is never required for page load.
 */

/**
 * @returns {boolean}
 */
export function isGeolocationSupported() {
  return typeof window !== "undefined" && "geolocation" in navigator;
}

/**
 * @param {PositionOptions} [options]
 * @returns {Promise<GeolocationPosition>}
 */
export function requestCurrentPosition(options = {}) {
  return new Promise((resolve, reject) => {
    if (!isGeolocationSupported()) {
      reject(new Error("unsupported"));
      return;
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, {
      enableHighAccuracy: false,
      timeout: 12000,
      maximumAge: 300000,
      ...options,
    });
  });
}

/**
 * @param {GeolocationPositionError | Error | unknown} error
 * @returns {"denied" | "unavailable" | "timeout" | "unsupported" | "unknown"}
 */
export function getGeolocationErrorCode(error) {
  if (error instanceof GeolocationPositionError) {
    if (error.code === error.PERMISSION_DENIED) return "denied";
    if (error.code === error.POSITION_UNAVAILABLE) return "unavailable";
    if (error.code === error.TIMEOUT) return "timeout";
    return "unknown";
  }

  if (error instanceof Error && error.message === "unsupported") {
    return "unsupported";
  }

  return "unknown";
}

/**
 * @param {"denied" | "unavailable" | "timeout" | "unsupported" | "unknown"} code
 * @param {object} [labels]
 */
export function getGeolocationErrorMessage(code, labels = {}) {
  switch (code) {
    case "denied":
      return labels.denied || "Location permission was denied.";
    case "unsupported":
      return labels.unsupported || "Location is not supported in this browser.";
    case "timeout":
      return labels.timeout || "Location request timed out. Try again or search manually.";
    case "unavailable":
      return labels.unavailable || "Location is temporarily unavailable.";
    default:
      return labels.unknown || "Unable to detect your location.";
  }
}
