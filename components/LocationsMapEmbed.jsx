"use client";

import { useMemo, useState } from "react";
import { ExternalLink, Navigation } from "lucide-react";
import "./LocationsMapEmbed.css";

const LOCATION_QUERY = "7700+Little+River+Turnpike+Suite+304+Annandale+VA+22003";

const MAP_EMBED_URL = `https://www.google.com/maps?q=${LOCATION_QUERY}&output=embed`;

const OPEN_IN_GOOGLE_MAPS_URL =
  "https://www.google.com/maps/search/?api=1&query=7700+Little+River+Turnpike+Suite+304+Annandale+VA+22003";

const GET_DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&destination=7700+Little+River+Turnpike+Suite+304+Annandale+VA+22003";

const MAP_TYPE_OPTIONS = [
  { id: "roadmap", labelKey: "mapViewLabel", fallback: "Standard Map" },
  { id: "satellite", labelKey: "satelliteViewLabel", fallback: "Satellite View" },
];

const SIDEBAR_CARD_STYLE = {
  height: "auto",
  minHeight: "unset",
  alignSelf: "flex-start",
};

const SIDEBAR_FRAME_STYLE = {
  height: "auto",
  minHeight: "unset",
};

const SIDEBAR_IFRAME_STYLE = {
  height: "520px",
  width: "100%",
  display: "block",
};

const ACTIONS_STYLE = {
  marginTop: "16px",
  paddingBottom: 0,
};

function buildEmbedUrl(mapType) {
  if (mapType === "satellite") {
    return `https://www.google.com/maps?q=${LOCATION_QUERY}&t=k&output=embed`;
  }
  return MAP_EMBED_URL;
}

/**
 * Locations page map — iframe embed only. No Google Maps JavaScript API or API keys.
 * Rendered from LocationsPage in app/page.js (/locations rewrites to /).
 *
 * @param {{
 *   t?: object,
 *   title?: string,
 *   variant?: "default" | "fullpage",
 * }} props
 */
export default function LocationsMapEmbed({
  t,
  title = "Eden ABA Therapy - Annandale",
  variant = "default",
}) {
  const [mapTypeId, setMapTypeId] = useState("roadmap");
  const embedUrl = useMemo(() => buildEmbedUrl(mapTypeId), [mapTypeId]);
  const directionsLabel = t?.getDirections || "Get Directions";
  const isFullpage = variant === "fullpage";
  const cardClassName = isFullpage
    ? "locations-map-card locations-map-card--fullpage"
    : "locations-map-card locations-map-card--sidebar";

  return (
    <div
      className={cardClassName}
      data-locations-map-panel="true"
      style={isFullpage ? undefined : SIDEBAR_CARD_STYLE}
    >
      <div
        className="locations-map-frame"
        style={isFullpage ? undefined : SIDEBAR_FRAME_STYLE}
      >
        <div
          className="locations-map-type-bar"
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

        <iframe
          title={title}
          src={embedUrl}
          loading="lazy"
          allowFullScreen
          referrerPolicy="no-referrer-when-downgrade"
          className="locations-map-iframe"
          style={isFullpage ? undefined : SIDEBAR_IFRAME_STYLE}
        />
      </div>

      <div className="locations-map-actions" style={ACTIONS_STYLE}>
        <a
          href={OPEN_IN_GOOGLE_MAPS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="locations-map-actions-open"
        >
          <ExternalLink size={16} aria-hidden />
          {t?.googleMap?.openInGoogleMaps || "Open in Google Maps"}
        </a>
        <a
          href={GET_DIRECTIONS_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="locations-map-actions-directions"
        >
          <Navigation size={16} aria-hidden />
          {directionsLabel}
        </a>
      </div>
    </div>
  );
}
