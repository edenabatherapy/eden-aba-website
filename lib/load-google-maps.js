import {
  GOOGLE_MAPS_SCRIPT_ID,
  getGoogleMapsApiKey,
  hasGoogleMapsApiKey,
} from "@/lib/google-maps-config";

/** @type {Promise<import("@/lib/google-maps-types").GoogleMapsRuntime> | null} */
let loadPromise = null;

const SCRIPT_LOAD_TIMEOUT_MS = 15000;

/**
 * @typedef {import("@/lib/google-maps-types").GoogleMapsRuntime} GoogleMapsRuntime
 */

function rejectAuthFailure(reject) {
  const previous = window.gm_authFailure;
  window.gm_authFailure = () => {
    previous?.();
    loadPromise = null;
    reject(
      new Error(
        "Google Maps authentication failed (RefererNotAllowedMapError, InvalidKeyMapError, or ApiNotActivatedMapError). Verify NEXT_PUBLIC_GOOGLE_MAPS_API_KEY, enable Maps JavaScript API + Geocoding API, billing, and HTTP referrer restrictions for localhost and production.",
      ),
    );
  };
}

function waitForMapsNamespace(timeoutMs = SCRIPT_LOAD_TIMEOUT_MS) {
  return new Promise((resolve, reject) => {
    if (window.google?.maps) {
      resolve();
      return;
    }

    const started = Date.now();
    const timer = window.setInterval(() => {
      if (window.google?.maps) {
        window.clearInterval(timer);
        resolve();
        return;
      }

      if (Date.now() - started >= timeoutMs) {
        window.clearInterval(timer);
        reject(new Error("Timed out waiting for google.maps after script load."));
      }
    }, 50);
  });
}

function ensureScript(apiKey) {
  return new Promise((resolve, reject) => {
    if (window.google?.maps?.importLibrary) {
      resolve();
      return;
    }

    rejectAuthFailure(reject);

    const existing = document.getElementById(GOOGLE_MAPS_SCRIPT_ID);
    if (existing) {
      if (window.google?.maps) {
        resolve();
        return;
      }

      existing.addEventListener(
        "load",
        () => {
          waitForMapsNamespace()
            .then(resolve)
            .catch(reject);
        },
        { once: true },
      );
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load Google Maps JavaScript API script.")),
        { once: true },
      );

      window.setTimeout(() => {
        if (!window.google?.maps) {
          reject(new Error("Timed out waiting for an existing Google Maps script to initialize."));
        }
      }, SCRIPT_LOAD_TIMEOUT_MS);
      return;
    }

    const callbackName = "__edenGoogleMapsBoot";

    window[callbackName] = () => {
      delete window[callbackName];
      waitForMapsNamespace()
        .then(resolve)
        .catch(reject);
    };

    const params = new URLSearchParams({
      key: apiKey,
      v: "weekly",
      loading: "async",
      callback: callbackName,
    });

    const script = document.createElement("script");
    script.id = GOOGLE_MAPS_SCRIPT_ID;
    script.src = `https://maps.googleapis.com/maps/api/js?${params.toString()}`;
    script.async = true;
    script.defer = true;
    script.onerror = () => {
      loadPromise = null;
      reject(new Error("Failed to load Google Maps JavaScript API script."));
    };
    document.head.appendChild(script);
  });
}

async function importOptionalLibrary(namespace, libraryName) {
  try {
    return await namespace.importLibrary(libraryName);
  } catch (error) {
    if (process.env.NODE_ENV === "development") {
      console.warn(`[loadGoogleMaps] Optional library "${libraryName}" unavailable:`, error);
    }
    return null;
  }
}

/**
 * Loads Maps, Marker, and Geocoding libraries once per page.
 * Uses google.maps.importLibrary (recommended) with legacy fallback.
 *
 * @param {string} [apiKey]
 * @returns {Promise<GoogleMapsRuntime>}
 */
export async function loadGoogleMaps(apiKey = getGoogleMapsApiKey()) {
  if (typeof window === "undefined") {
    throw new Error("Google Maps can only load in the browser.");
  }

  if (!apiKey) {
    throw new Error("NEXT_PUBLIC_GOOGLE_MAPS_API_KEY is not set.");
  }

  if (loadPromise) {
    return loadPromise;
  }

  loadPromise = (async () => {
    await ensureScript(apiKey);

    const mapsNamespace = window.google.maps;

    if (typeof mapsNamespace.importLibrary === "function") {
      const mapsLib = await mapsNamespace.importLibrary("maps");
      const markerLib = await importOptionalLibrary(mapsNamespace, "marker");
      const geocodingLib = await importOptionalLibrary(mapsNamespace, "geocoding");

      return {
        Map: mapsLib.Map,
        Marker: markerLib?.Marker ?? mapsNamespace.Marker,
        InfoWindow: mapsLib.InfoWindow,
        Geocoder: geocodingLib?.Geocoder ?? mapsNamespace.Geocoder,
        Size: mapsNamespace.Size,
        Point: mapsNamespace.Point,
        Animation: mapsNamespace.Animation,
        MapTypeId: mapsLib.MapTypeId ?? mapsNamespace.MapTypeId,
        MapTypeControlStyle: mapsNamespace.MapTypeControlStyle,
        ControlPosition: mapsNamespace.ControlPosition,
        event: mapsNamespace.event,
      };
    }

    return {
      Map: mapsNamespace.Map,
      Marker: mapsNamespace.Marker,
      InfoWindow: mapsNamespace.InfoWindow,
      Geocoder: mapsNamespace.Geocoder,
      Size: mapsNamespace.Size,
      Point: mapsNamespace.Point,
      Animation: mapsNamespace.Animation,
      MapTypeId: mapsNamespace.MapTypeId,
      MapTypeControlStyle: mapsNamespace.MapTypeControlStyle,
      ControlPosition: mapsNamespace.ControlPosition,
      event: mapsNamespace.event,
    };
  })().catch((error) => {
    loadPromise = null;
    throw error;
  });

  return loadPromise;
}

/** Resets the loader so a retry can occur after auth failure in dev. */
export function resetGoogleMapsLoader() {
  loadPromise = null;
}

export { getGoogleMapsApiKey, hasGoogleMapsApiKey };
