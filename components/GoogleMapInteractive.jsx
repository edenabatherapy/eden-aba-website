"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { AlertTriangle, ExternalLink, MapPin, Navigation } from "lucide-react";
import {
  EDEN_ANNANDALE_CENTER,
  EDEN_CLINIC_NAME,
  getDirectionsUrl,
  getEdenMapLocation,
  getGoogleMapsPlaceUrl,
} from "@/lib/eden-location";
import {
  EDEN_MAP_MARKER_URL,
  GOOGLE_MAPS_DEV_WARNING,
  getGoogleMapsApiKey,
  hasGoogleMapsApiKey,
} from "@/lib/google-maps-config";
import { loadGoogleMaps } from "@/lib/load-google-maps";
import "./GoogleMapInteractive.css";

const MAP_CONTAINER_CLASS = "eden-map-canvas";

const MAP_TYPE_OPTIONS = [
  { id: "roadmap", labelKey: "mapViewLabel", fallback: "Map" },
  { id: "satellite", labelKey: "satelliteViewLabel", fallback: "Satellite" },
  { id: "hybrid", labelKey: "hybridViewLabel", fallback: "Hybrid" },
];

function MapUnavailablePanel({
  t,
  location,
  className = MAP_CONTAINER_CLASS,
  reason = "missing-key",
  errorMessage = "",
}) {
  const mapT = t?.googleMap;
  const directionsUrl = getDirectionsUrl(location.address);
  const placeUrl = getGoogleMapsPlaceUrl(location.address);
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className={`eden-map-fallback ${className}`}>
      {isDev ? (
        <div className="eden-map-fallback-warning">
          <div className="flex items-start gap-3">
            <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={18} aria-hidden />
            <div>
              <strong>
                {reason === "load-failed"
                  ? "Google Maps failed to load"
                  : "Google Maps API key not configured"}
              </strong>
              <p>{mapT?.apiKeyNotice || GOOGLE_MAPS_DEV_WARNING}</p>
              {errorMessage ? (
                <p className="mt-2 font-mono text-[11px] leading-5 text-amber-900/90">{errorMessage}</p>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}

      <div className="eden-map-fallback-body">
        <div className="eden-map-fallback-icon">
          <MapPin size={28} aria-hidden />
        </div>
        <h3 className="eden-map-fallback-title">{location.name}</h3>
        <p className="eden-map-fallback-address">{location.shortAddress}</p>
        <p className="eden-map-fallback-phone">
          {t?.pages?.locationsDetail?.officePhone || "Office Phone:"}{" "}
          <a href={`tel:${location.phoneTel}`}>{location.phone}</a>
        </p>
      </div>

      <div className="eden-map-fallback-actions">
        <a
          href={placeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="eden-map-actions-open"
        >
          <ExternalLink size={16} aria-hidden />
          {mapT?.openInGoogleMaps || "Open in Google Maps"}
        </a>
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="eden-map-actions-directions"
        >
          <Navigation size={16} aria-hidden />
          {t?.getDirections || "Get Directions"}
        </a>
      </div>
    </div>
  );
}

function buildInfoWindowContent({ location, directionsLabel }) {
  const container = document.createElement("div");
  container.style.maxWidth = "260px";
  container.style.fontFamily = "system-ui, sans-serif";
  container.style.lineHeight = "1.55";
  container.style.padding = "4px 2px";

  const heading = document.createElement("strong");
  heading.textContent = location.name;
  heading.style.display = "block";
  heading.style.marginBottom = "6px";
  heading.style.fontSize = "14px";
  container.appendChild(heading);

  const addressLine = document.createElement("span");
  addressLine.textContent = location.shortAddress;
  addressLine.style.display = "block";
  addressLine.style.marginBottom = "6px";
  addressLine.style.fontSize = "13px";
  addressLine.style.color = "#334155";
  container.appendChild(addressLine);

  const phoneLine = document.createElement("span");
  phoneLine.textContent = `Office Phone: ${location.phone}`;
  phoneLine.style.display = "block";
  phoneLine.style.marginBottom = "10px";
  phoneLine.style.fontSize = "13px";
  phoneLine.style.color = "#334155";
  container.appendChild(phoneLine);

  const link = document.createElement("a");
  link.href = getDirectionsUrl(location.address);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = directionsLabel;
  link.style.color = "#128c8c";
  link.style.fontWeight = "700";
  link.style.fontSize = "13px";
  container.appendChild(link);

  return container;
}

function createEdenMarkerIcon(maps) {
  return {
    url: EDEN_MAP_MARKER_URL,
    scaledSize: new maps.Size(52, 64),
    anchor: new maps.Point(26, 64),
  };
}

function waitForTilesWithTimeout(map, mapsEvent, timeoutMs = 8000) {
  return new Promise((resolve) => {
    let settled = false;
    const finish = (success) => {
      if (settled) return;
      settled = true;
      resolve(success);
    };

    const listener = mapsEvent.addListenerOnce(map, "tilesloaded", () => finish(true));
    window.setTimeout(() => {
      mapsEvent.removeListener(listener);
      finish(false);
    }, timeoutMs);
  });
}

function waitForTiles(map, mapsEvent, timeoutMs = 8000) {
  return waitForTilesWithTimeout(map, mapsEvent, timeoutMs);
}

/** @param {import("@/lib/google-maps-types").GoogleMapsRuntime | google.maps} maps */
function resolveMapTypeId(maps, typeId) {
  const mapTypeId = maps.MapTypeId;
  if (!mapTypeId) return typeId;
  if (typeId === "satellite") return mapTypeId.SATELLITE ?? "satellite";
  if (typeId === "hybrid") return mapTypeId.HYBRID ?? "hybrid";
  return mapTypeId.ROADMAP ?? "roadmap";
}

/**
 * @param {{
 *   t?: object,
 *   address?: string,
 *   title?: string,
 *   className?: string,
 *   businessName?: string,
 * }} props
 */
export default function GoogleMapInteractive({
  t,
  address,
  title,
  className = MAP_CONTAINER_CLASS,
  businessName = EDEN_CLINIC_NAME,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);

  const apiKey = getGoogleMapsApiKey();
  const hasApiKey = hasGoogleMapsApiKey();
  const mapTitle = title || t?.googleMap?.defaultTitle || "Eden ABA Therapy Google Map";
  const location = useMemo(() => getEdenMapLocation(address), [address]);
  const directionsLabel = t?.getDirections || "Get Directions";
  const directionsUrl = getDirectionsUrl(location.address);
  const placeUrl = getGoogleMapsPlaceUrl(location.address);

  const [mapStatus, setMapStatus] = useState(hasApiKey ? "loading" : "unavailable");
  const [unavailableReason, setUnavailableReason] = useState("missing-key");
  const [errorMessage, setErrorMessage] = useState("");
  const [mapTypeId, setMapTypeId] = useState("roadmap");
  const [satelliteUnavailable, setSatelliteUnavailable] = useState(false);
  const mapsRuntimeRef = useRef(null);

  const handleMapTypeChange = useCallback(async (typeId) => {
    const map = mapRef.current;
    const maps = mapsRuntimeRef.current ?? window.google?.maps;
    if (!map || !maps) return;

    const resolvedType = resolveMapTypeId(maps, typeId);
    map.setMapTypeId(resolvedType);
    setMapTypeId(typeId);
    maps.event?.trigger(map, "resize");

    if (typeId === "satellite" || typeId === "hybrid") {
      const tilesLoaded = await waitForTilesWithTimeout(map, maps.event, 7000);
      if (!tilesLoaded) {
        setSatelliteUnavailable(true);
        map.setMapTypeId(resolveMapTypeId(maps, "roadmap"));
        setMapTypeId("roadmap");
        return;
      }
      setSatelliteUnavailable(false);
    }
  }, []);

  useEffect(() => {
    if (!hasApiKey) {
      setMapStatus("unavailable");
      setUnavailableReason("missing-key");
      return undefined;
    }

    let cancelled = false;
    let resizeObserver;
    let idleListener;
    let retryFrame = 0;

    const handleAuthFailure = () => {
      if (cancelled) return;
      const message =
        "Google Maps authentication failed (RefererNotAllowedMapError, InvalidKeyMapError, or ApiNotActivatedMapError).";
      setErrorMessage(message);
      setUnavailableReason("load-failed");
      setMapStatus("unavailable");
      if (process.env.NODE_ENV === "development") {
        console.error("[GoogleMapInteractive]", message, GOOGLE_MAPS_DEV_WARNING);
      }
    };

    const previousAuthFailure = window.gm_authFailure;
    const authFailureWrapper = () => {
      previousAuthFailure?.();
      handleAuthFailure();
    };
    window.gm_authFailure = authFailureWrapper;

    async function initMap() {
      try {
        const maps = await loadGoogleMaps(apiKey);
        if (cancelled || !containerRef.current) return;

        if (!maps.Map || !maps.Marker) {
          throw new Error("Google Maps Map or Marker constructors are unavailable.");
        }

        const center = { ...EDEN_ANNANDALE_CENTER };

        const map = new maps.Map(containerRef.current, {
          center,
          zoom: 16,
          mapTypeId: resolveMapTypeId(maps, "roadmap"),
          mapTypeControl: false,
          zoomControl: true,
          zoomControlOptions: {
            position: maps.ControlPosition.RIGHT_CENTER,
          },
          streetViewControl: true,
          streetViewControlOptions: {
            position: maps.ControlPosition.RIGHT_TOP,
          },
          fullscreenControl: true,
          fullscreenControlOptions: {
            position: maps.ControlPosition.RIGHT_TOP,
          },
          clickableIcons: true,
          gestureHandling: "cooperative",
        });

        const marker = new maps.Marker({
          position: center,
          map,
          title: businessName,
          icon: createEdenMarkerIcon(maps),
          animation: maps.Animation?.DROP,
        });

        const infoWindow = new maps.InfoWindow({
          content: buildInfoWindowContent({ location, directionsLabel }),
        });

        marker.addListener("click", () => {
          infoWindow.open({ anchor: marker, map });
        });

        mapRef.current = map;
        markerRef.current = marker;
        infoWindowRef.current = infoWindow;
        mapsRuntimeRef.current = maps;

        map.addListener("maptypeid_changed", () => {
          const typeId = map.getMapTypeId();
          if (typeof typeId === "string") {
            setMapTypeId(typeId);
          }
        });

        resizeObserver = new ResizeObserver(() => {
          maps.event.trigger(map, "resize");
        });
        resizeObserver.observe(containerRef.current);

        idleListener = maps.event.addListenerOnce(map, "idle", () => {
          maps.event.trigger(map, "resize");
        });

        await waitForTiles(map, maps.event);

        if (maps.Geocoder) {
          const geocoder = new maps.Geocoder();
          geocoder.geocode({ address: location.address }, (results, status) => {
            if (cancelled || status !== "OK" || !results?.[0]) {
              if (process.env.NODE_ENV === "development" && status !== "OK") {
                console.warn(
                  "[GoogleMapInteractive] Geocoder status:",
                  status,
                  "— using default Annandale coordinates.",
                );
              }
              return;
            }

            const position = results[0].geometry.location;
            map.setCenter(position);
            marker.setPosition(position);
            maps.event.trigger(map, "resize");
          });
        }

        if (!cancelled) {
          setMapStatus("ready");
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Google Maps error";
        if (process.env.NODE_ENV === "development") {
          console.error("[GoogleMapInteractive] Map initialization failed:", error);
        }
        if (!cancelled) {
          setErrorMessage(message);
          setUnavailableReason("load-failed");
          setMapStatus("unavailable");
        }
      }
    }

    function scheduleInit() {
      if (cancelled) return;

      if (!containerRef.current) {
        retryFrame = window.requestAnimationFrame(scheduleInit);
        return;
      }

      void initMap();
    }

    scheduleInit();

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(retryFrame);

      if (window.gm_authFailure === authFailureWrapper) {
        window.gm_authFailure = previousAuthFailure;
      }

      resizeObserver?.disconnect();
      if (idleListener && window.google?.maps?.event) {
        window.google.maps.event.removeListener(idleListener);
      }
      infoWindowRef.current?.close();
      markerRef.current?.setMap(null);
      mapRef.current = null;
      markerRef.current = null;
      infoWindowRef.current = null;
      mapsRuntimeRef.current = null;

      if (containerRef.current) {
        containerRef.current.replaceChildren();
      }
    };
  }, [apiKey, hasApiKey, address, businessName, directionsLabel, location]);

  if (mapStatus === "unavailable" || !hasApiKey) {
    return (
      <MapUnavailablePanel
        t={t}
        location={location}
        className={className}
        reason={unavailableReason}
        errorMessage={errorMessage}
      />
    );
  }

  return (
    <div className="eden-map-shell">
      {mapStatus === "loading" ? (
        <div className="eden-map-loading" aria-live="polite">
          <div className="eden-map-loading-inner">
            <div className="eden-map-loading-spinner" aria-hidden />
            <p className="eden-map-loading-text">{t?.googleMap?.loadingLabel || "Loading map…"}</p>
          </div>
        </div>
      ) : null}

      {mapStatus === "ready" ? (
        <div
          className="eden-map-type-bar"
          role="group"
          aria-label={t?.googleMap?.mapTypeGroupLabel || "Map type"}
        >
          {MAP_TYPE_OPTIONS.map((option) => {
            const isSatelliteOption = option.id === "satellite" || option.id === "hybrid";
            const disabled = isSatelliteOption && satelliteUnavailable;

            return (
              <button
                key={option.id}
                type="button"
                onClick={() => handleMapTypeChange(option.id)}
                className={mapTypeId === option.id ? "is-active" : undefined}
                aria-pressed={mapTypeId === option.id}
                disabled={disabled}
                title={
                  disabled
                    ? t?.googleMap?.satelliteUnavailableNotice || "Satellite imagery unavailable"
                    : undefined
                }
              >
                {t?.googleMap?.[option.labelKey] || option.fallback}
              </button>
            );
          })}
        </div>
      ) : null}

      {satelliteUnavailable && mapStatus === "ready" ? (
        <p className="eden-map-satellite-notice" role="status">
          {t?.googleMap?.satelliteUnavailableNotice ||
            "Satellite imagery is temporarily unavailable. Showing standard map view."}
        </p>
      ) : null}

      <div
        ref={containerRef}
        className={`${className} w-full bg-[#eef4f2]`}
        role="application"
        aria-label={mapTitle}
      />

      {mapStatus === "ready" ? (
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
          <a href={directionsUrl} target="_blank" rel="noopener noreferrer" className="eden-map-actions-directions">
            <Navigation size={16} aria-hidden />
            {directionsLabel}
          </a>
        </div>
      ) : null}
    </div>
  );
}
