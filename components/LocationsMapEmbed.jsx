"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Navigation } from "lucide-react";
import {
  getDirectionsUrl,
  getEdenMapLocation,
  getGoogleMapsEmbedUrl,
  getGoogleMapsPlaceUrl,
} from "@/lib/eden-location";
import "./GoogleMapInteractive.css";

const MAP_TYPE_OPTIONS = [
  { id: "roadmap", labelKey: "mapViewLabel", fallback: "Standard Map" },
  { id: "satellite", labelKey: "satelliteViewLabel", fallback: "Satellite View" },
];

/**
 * Locations page map — Google Maps iframe embed only (no JavaScript API key).
 *
 * @param {{
 *   t?: object,
 *   address?: string,
 *   title?: string,
 *   className?: string,
 *   variant?: "default" | "fullpage",
 * }} props
 */
export default function LocationsMapEmbed({
  t,
  address,
  title,
  className = "eden-map-canvas",
  variant = "default",
}) {
  const [mapTypeId, setMapTypeId] = useState("roadmap");
  const location = useMemo(() => getEdenMapLocation(address), [address]);
  const mapTitle = title || t?.googleMap?.defaultTitle || "Eden ABA Therapy - Annandale";
  const directionsLabel = t?.getDirections || "Get Directions";
  const directionsUrl = getDirectionsUrl(location.address);
  const placeUrl = getGoogleMapsPlaceUrl(location.address);
  const embedUrl = useMemo(
    () => getGoogleMapsEmbedUrl(location.address, mapTypeId),
    [location.address, mapTypeId],
  );

  const shellClassName =
    variant === "fullpage" ? "eden-map-shell eden-map-shell--fullpage" : "eden-map-shell";
  const canvasClassName = [
    className,
    variant === "fullpage" ? "eden-map-canvas--fullpage" : "",
    "w-full",
    "bg-[#eef4f2]",
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={shellClassName}>
      <div
        className="eden-map-type-bar"
        role="group"
        aria-label={t?.googleMap?.mapTypeGroupLabel || "Map type"}
      >
        {MAP_TYPE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => setMapTypeId(option.id)}
            className={mapTypeId === option.id ? "is-active" : undefined}
            aria-pressed={mapTypeId === option.id}
          >
            {t?.googleMap?.[option.labelKey] || option.fallback}
          </button>
        ))}
      </div>

      <div className={`eden-map-embed-wrap ${canvasClassName}`}>
        <iframe
          title={mapTitle}
          src={embedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="eden-map-embed"
        />
      </div>

      <div className="eden-map-actions">
        <a
          href={placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="eden-map-actions-open"
        >
          <ExternalLink size={16} aria-hidden />
          {t?.googleMap?.openInGoogleMaps || "Open in Google Maps"}
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="eden-map-actions-directions"
        >
          <Navigation size={16} aria-hidden />
          {directionsLabel}
        </a>
      </div>
    </div>
  );
}
