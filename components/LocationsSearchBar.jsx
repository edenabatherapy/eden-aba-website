"use client";

import { useState } from "react";
import { Crosshair, MapPin, X } from "lucide-react";
import {
  getGeolocationErrorCode,
  getGeolocationErrorMessage,
  isGeolocationSupported,
  requestCurrentPosition,
} from "@/lib/geolocation";

/**
 * Optional location search with GPS. Never blocks page load if permission is denied.
 *
 * @param {{
 *   t: object,
 *   onPositionChange?: (position: { lat: number, lng: number } | null) => void,
 *   onQueryChange?: (query: string) => void,
 * }} props
 */
export default function LocationsSearchBar({ t, onPositionChange, onQueryChange }) {
  const [query, setQuery] = useState("");
  const [geoLoading, setGeoLoading] = useState(false);
  const [geoMessage, setGeoMessage] = useState("");

  const updateQuery = (value) => {
    setQuery(value);
    onQueryChange?.(value);
  };

  const clearQuery = () => {
    updateQuery("");
    setGeoMessage("");
    onPositionChange?.(null);
  };

  const useMyLocation = async () => {
    setGeoMessage("");

    if (!isGeolocationSupported()) {
      setGeoMessage(
        getGeolocationErrorMessage("unsupported", {
          unsupported: t?.googleMap?.locationUnsupported,
        }),
      );
      return;
    }

    setGeoLoading(true);

    try {
      const position = await requestCurrentPosition();
      const lat = position.coords.latitude;
      const lng = position.coords.longitude;
      const label = t?.googleMap?.yourLocationLabel || "Your location";
      updateQuery(`${label} (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
      onPositionChange?.({ lat, lng });
    } catch (error) {
      const code = getGeolocationErrorCode(error);
      onPositionChange?.(null);
      setGeoMessage(
        getGeolocationErrorMessage(code, {
          denied: t?.googleMap?.locationDenied,
          timeout: t?.googleMap?.locationTimeout,
          unavailable: t?.googleMap?.locationUnavailable,
          unsupported: t?.googleMap?.locationUnsupported,
        }),
      );
    } finally {
      setGeoLoading(false);
    }
  };

  return (
    <div>
      <div className="relative">
        <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-[#1f7a2e]" size={22} />
        <input
          className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-4 pl-14 pr-28 text-base font-bold text-slate-800 outline-none transition focus:border-[#128c8c] focus:bg-white focus:ring-4 focus:ring-[#49b8c8]/20"
          placeholder={t.currentlyUsingLocation}
          value={query}
          onChange={(event) => updateQuery(event.target.value)}
          aria-label={t.currentlyUsingLocation}
        />
        <div className="absolute right-3 top-1/2 flex -translate-y-1/2 items-center gap-1">
          <button
            type="button"
            onClick={useMyLocation}
            disabled={geoLoading}
            className="inline-flex items-center gap-1 rounded-xl bg-[#eef9f4] px-3 py-2 text-xs font-black text-[#1f7a2e] transition hover:bg-[#dff3e8] disabled:opacity-60"
            title={t?.googleMap?.useMyLocation || "Use my location"}
          >
            <Crosshair size={16} aria-hidden />
            {geoLoading ? t?.googleMap?.locationLoading || "Locating…" : t?.googleMap?.useMyLocation || "Use my location"}
          </button>
          {query ? (
            <button
              type="button"
              onClick={clearQuery}
              className="rounded-lg p-1 text-slate-400 hover:text-slate-700"
              aria-label={t?.googleMap?.clearSearch || "Clear search"}
            >
              <X size={20} />
            </button>
          ) : null}
        </div>
      </div>

      {geoMessage ? (
        <p className="mt-3 text-sm font-semibold text-red-600" role="alert">
          {geoMessage}
        </p>
      ) : (
        <p className="mt-3 text-xs font-semibold text-slate-500">
          {t?.googleMap?.locationOptionalNotice ||
            "Location is optional. You can browse the map and clinic details without sharing your location."}
        </p>
      )}
    </div>
  );
}
