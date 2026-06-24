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
import { EDEN_MAP_MARKER_URL } from "@/lib/google-maps-config";
import { useGoogleMapsApiKey } from "@/hooks/useGoogleMapsApiKey";
import { loadGoogleMaps } from "@/lib/load-google-maps";
import "./GoogleMapInteractive.css";

const MAP_CONTAINER_CLASS = "eden-map-canvas";
const LOG_PREFIX = "[GoogleMapInteractive]";

const MAP_TYPE_OPTIONS = [
  { id: "roadmap", labelKey: "mapViewLabel", fallback: "Standard Map" },
  { id: "satellite", labelKey: "satelliteViewLabel", fallback: "Satellite View" },
];

function logInfo(message, detail) {
  if (detail !== undefined) {
    console.log(`${LOG_PREFIX} ${message}`, detail);
  } else {
    console.log(`${LOG_PREFIX} ${message}`);
  }
}

function logWarn(message, detail) {
  if (detail !== undefined) {
    console.warn(`${LOG_PREFIX} ${message}`, detail);
  } else {
    console.warn(`${LOG_PREFIX} ${message}`);
  }
}

function logError(message, detail) {
  if (detail !== undefined) {
    console.error(`${LOG_PREFIX} ${message}`, detail);
  } else {
    console.error(`${LOG_PREFIX} ${message}`);
  }
}

function normalizeMapTypeId(typeId) {
  const value = String(typeId ?? "").toLowerCase();
  if (value.includes("satellite")) return "satellite";
  if (value.includes("hybrid")) return "satellite";
  return "roadmap";
}

function getUnavailableUserMessage(reason, mapT) {
  if (reason === "missing-key") {
    return mapT?.mapConfigMissing || "Map configuration is missing.";
  }
  if (reason === "load-failed") {
    return mapT?.mapLoadFailed || "The map could not be loaded.";
  }
  return mapT?.mapUnavailable || "Interactive map is unavailable.";
}

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
  const userMessage = getUnavailableUserMessage(reason, mapT);
  const isDev = process.env.NODE_ENV === "development";

  return (
    <div className={`eden-map-fallback ${className}`}>
      <div className="eden-map-fallback-warning" role="alert">
        <div className="flex items-start gap-3">
          <AlertTriangle className="mt-0.5 shrink-0 text-amber-600" size={18} aria-hidden />
          <div>
            <strong>{userMessage}</strong>
            {isDev && reason === "missing-key" ? (
              <p className="mt-2">{mapT?.apiKeyNotice || mapT?.devSetupNotice}</p>
            ) : null}
            {errorMessage && isDev ? (
              <p className="mt-2 font-mono text-[11px] leading-5 text-amber-900/90">{errorMessage}</p>
            ) : null}
          </div>
        </div>
      </div>

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

function waitForTiles(map, mapsEvent, timeoutMs = 12000) {
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

/** @param {import("@/lib/google-maps-types").GoogleMapsRuntime | google.maps} maps */
function resolveMapTypeId(maps, typeId) {
  const mapTypeId = maps.MapTypeId;
  if (typeId === "satellite") {
    return mapTypeId?.SATELLITE ?? "satellite";
  }
  return mapTypeId?.ROADMAP ?? "roadmap";
}

function triggerMapResize(map, mapsEvent) {
  if (!map || !mapsEvent) return;
  mapsEvent.trigger(map, "resize");
  window.requestAnimationFrame(() => {
    mapsEvent.trigger(map, "resize");
  });
}

/**
 * @param {{
 *   t?: object,
 *   address?: string,
 *   title?: string,
 *   className?: string,
 *   variant?: "default" | "fullpage",
 *   businessName?: string,
 *   apiKey?: string,
 *   userPosition?: { lat: number, lng: number } | null,
 * }} props
 */
export default function GoogleMapInteractive({
  t,
  address,
  title,
  className = MAP_CONTAINER_CLASS,
  variant = "default",
  businessName = EDEN_CLINIC_NAME,
  apiKey: providedApiKey = "",
  userPosition = null,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const userMarkerRef = useRef(null);
  const infoWindowRef = useRef(null);
  const mapsRuntimeRef = useRef(null);

  const { apiKey, loading: keyLoading, configured: hasApiKey } = useGoogleMapsApiKey(providedApiKey);
  const mapTitle = title || t?.googleMap?.defaultTitle || "Eden ABA Therapy Google Map";
  const location = useMemo(() => getEdenMapLocation(address), [address]);
  const directionsLabel = t?.getDirections || "Get Directions";
  const directionsUrl = getDirectionsUrl(location.address);
  const placeUrl = getGoogleMapsPlaceUrl(location.address);

  const [mapStatus, setMapStatus] = useState("loading");
  const [unavailableReason, setUnavailableReason] = useState("missing-key");
  const [errorMessage, setErrorMessage] = useState("");
  const [mapTypeId, setMapTypeId] = useState("roadmap");

  const shellClassName = variant === "fullpage" ? "eden-map-shell eden-map-shell--fullpage" : "eden-map-shell";
  const canvasClassName = [
    className,
    variant === "fullpage" ? "eden-map-canvas--fullpage" : "",
    "w-full",
    "bg-[#eef4f2]",
  ]
    .filter(Boolean)
    .join(" ");

  const handleMapTypeChange = useCallback((typeId) => {
    const map = mapRef.current;
    const maps = mapsRuntimeRef.current ?? window.google?.maps;
    if (!map || !maps) {
      logWarn("Map type change ignored — map instance not ready", { typeId });
      return;
    }

    const resolvedType = resolveMapTypeId(maps, typeId);
    logInfo("Switching map type", { requested: typeId, resolved: resolvedType });

    map.setMapTypeId(resolvedType);
    setMapTypeId(typeId);
    triggerMapResize(map, maps.event);

    maps.event.addListenerOnce(map, "idle", () => {
      logInfo("Map idle after type change", { activeType: normalizeMapTypeId(map.getMapTypeId()) });
      triggerMapResize(map, maps.event);
    });
  }, []);

  useEffect(() => {
    if (keyLoading) {
      logInfo("Waiting for Maps API key resolution");
      return undefined;
    }

    if (!hasApiKey) {
      logWarn("Maps API key is not configured");
      setMapStatus("unavailable");
      setUnavailableReason("missing-key");
      return undefined;
    }

    let cancelled = false;
    let resizeObserver;
    let idleListener;
    let visibilityListener;
    let retryFrame = 0;

    const handleAuthFailure = () => {
      if (cancelled) return;
      const message =
        "Google Maps authentication failed. Check API key, billing, enabled APIs, and HTTP referrer restrictions.";
      logError(message);
      setErrorMessage(message);
      setUnavailableReason("load-failed");
      setMapStatus("unavailable");
    };

    const previousAuthFailure = window.gm_authFailure;
    const authFailureWrapper = () => {
      previousAuthFailure?.();
      handleAuthFailure();
    };
    window.gm_authFailure = authFailureWrapper;

    async function initMap() {
      try {
        setMapStatus("loading");
        logInfo("Loading Google Maps JavaScript API");

        const maps = await loadGoogleMaps(apiKey);
        if (cancelled || !containerRef.current) return;

        if (!maps.Map || !maps.Marker) {
          throw new Error("Google Maps Map or Marker constructors are unavailable.");
        }

        const container = containerRef.current;
        const containerRect = container.getBoundingClientRect();
        logInfo("Initializing map", {
          width: containerRect.width,
          height: containerRect.height,
          variant,
        });

        if (containerRect.width < 1 || containerRect.height < 1) {
          logWarn("Map container has no measurable size yet — resize will be triggered after layout");
        }

        const center = { ...EDEN_ANNANDALE_CENTER };

        const map = new maps.Map(container, {
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
          draggable: true,
          scrollwheel: true,
          disableDoubleClickZoom: false,
          keyboardShortcuts: true,
          gestureHandling: "greedy",
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
          logInfo("Clinic marker clicked");
          infoWindow.open({ anchor: marker, map });
        });

        mapRef.current = map;
        markerRef.current = marker;
        infoWindowRef.current = infoWindow;
        mapsRuntimeRef.current = maps;

        map.addListener("maptypeid_changed", () => {
          const activeType = normalizeMapTypeId(map.getMapTypeId());
          logInfo("Map type changed", { activeType });
          setMapTypeId(activeType);
        });

        map.addListener("click", () => {
          logInfo("Map clicked");
        });

        resizeObserver = new ResizeObserver((entries) => {
          const entry = entries[0];
          if (!entry) return;
          logInfo("Map container resized", {
            width: entry.contentRect.width,
            height: entry.contentRect.height,
          });
          triggerMapResize(map, maps.event);
        });
        resizeObserver.observe(container);

        idleListener = maps.event.addListenerOnce(map, "idle", () => {
          logInfo("Map idle after initial render");
          triggerMapResize(map, maps.event);
        });

        visibilityListener = () => {
          if (document.visibilityState === "visible") {
            triggerMapResize(map, maps.event);
          }
        };
        document.addEventListener("visibilitychange", visibilityListener);

        const tilesLoaded = await waitForTiles(map, maps.event);
        logInfo("Tile load finished", { tilesLoaded });

        if (maps.Geocoder) {
          const geocoder = new maps.Geocoder();
          geocoder.geocode({ address: location.address }, (results, status) => {
            if (cancelled || status !== "OK" || !results?.[0]) {
              if (status !== "OK") {
                logWarn("Geocoder did not return OK", { status });
              }
              return;
            }

            const position = results[0].geometry.location;
            logInfo("Geocoded clinic address", { position: position.toJSON?.() ?? position });
            map.setCenter(position);
            marker.setPosition(position);
            triggerMapResize(map, maps.event);
          });
        }

        if (!cancelled) {
          setMapTypeId("roadmap");
          setMapStatus("ready");
          triggerMapResize(map, maps.event);
          logInfo("Map ready");
        }
      } catch (error) {
        const message = error instanceof Error ? error.message : "Unknown Google Maps error";
        logError("Map initialization failed", error);
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
      if (visibilityListener) {
        document.removeEventListener("visibilitychange", visibilityListener);
      }

      infoWindowRef.current?.close();
      userMarkerRef.current?.setMap(null);
      markerRef.current?.setMap(null);
      mapRef.current = null;
      markerRef.current = null;
      userMarkerRef.current = null;
      infoWindowRef.current = null;
      mapsRuntimeRef.current = null;

      if (containerRef.current) {
        containerRef.current.replaceChildren();
      }

      logInfo("Map instance cleaned up");
    };
  }, [apiKey, hasApiKey, keyLoading, address, businessName, directionsLabel, location.address, variant]);

  useEffect(() => {
    const map = mapRef.current;
    const maps = mapsRuntimeRef.current;
    if (!map || !maps?.Marker || !userPosition || mapStatus !== "ready") {
      userMarkerRef.current?.setMap(null);
      userMarkerRef.current = null;
      return undefined;
    }

    const position = { lat: userPosition.lat, lng: userPosition.lng };

    if (!userMarkerRef.current) {
      userMarkerRef.current = new maps.Marker({
        position,
        map,
        title: t?.googleMap?.yourLocationLabel || "Your location",
      });
      logInfo("User location marker added", position);
    } else {
      userMarkerRef.current.setPosition(position);
      userMarkerRef.current.setMap(map);
      logInfo("User location marker updated", position);
    }

    return undefined;
  }, [userPosition, t, mapStatus]);

  useEffect(() => {
    if (mapStatus !== "ready") return undefined;
    const map = mapRef.current;
    const maps = mapsRuntimeRef.current;
    if (!map || !maps) return undefined;

    const frame = window.requestAnimationFrame(() => {
      triggerMapResize(map, maps.event);
      logInfo("Post-ready resize triggered");
    });

    return () => window.cancelAnimationFrame(frame);
  }, [mapStatus, variant, className]);

  if (keyLoading) {
    return (
      <div className={`eden-map-fallback ${className}`}>
        <div className="eden-map-fallback-body">
          <div className="eden-map-loading-spinner mx-auto" aria-hidden />
          <p className="eden-map-loading-text mt-4">{t?.googleMap?.loadingLabel || "Loading map…"}</p>
        </div>
      </div>
    );
  }

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
    <div className={shellClassName}>
      {mapStatus === "loading" ? (
        <div className="eden-map-loading" aria-live="polite" aria-busy="true">
          <div className="eden-map-loading-inner">
            <div className="eden-map-loading-spinner" aria-hidden />
            <p className="eden-map-loading-text">{t?.googleMap?.loadingLabel || "Loading map…"}</p>
          </div>
        </div>
      ) : null}

      <div
        className="eden-map-type-bar"
        role="group"
        aria-label={t?.googleMap?.mapTypeGroupLabel || "Map type"}
      >
        {MAP_TYPE_OPTIONS.map((option) => (
          <button
            key={option.id}
            type="button"
            onClick={() => handleMapTypeChange(option.id)}
            className={mapTypeId === option.id ? "is-active" : undefined}
            aria-pressed={mapTypeId === option.id}
            disabled={mapStatus !== "ready"}
          >
            {t?.googleMap?.[option.labelKey] || option.fallback}
          </button>
        ))}
      </div>

      <div
        ref={containerRef}
        className={canvasClassName}
        role="application"
        aria-label={mapTitle}
        tabIndex={0}
      />

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
    </div>
  );
}
