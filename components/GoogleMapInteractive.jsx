"use client";

import { useEffect, useRef, useState } from "react";
import {
  EDEN_CLINIC_NAME,
  getDirectionsUrl,
  getEdenMapLocation,
} from "@/lib/eden-location";
import { hasGoogleMapsApiKey, loadGoogleMaps } from "@/lib/load-google-maps";

function GoogleMapEmbedFallback({ t, address, title, className = "h-[560px] w-full" }) {
  const mapT = t?.googleMap;
  const mapTitle = title || mapT?.defaultTitle || "Eden ABA Therapy Google Map";
  const encodedAddress = encodeURIComponent(address);
  const directionsUrl = getDirectionsUrl(address);
  const mapSrc = `https://www.google.com/maps?q=${encodedAddress}&z=16&hl=en&output=embed`;

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden bg-slate-100 sm:min-h-[420px]">
      <iframe
        title={mapTitle}
        src={mapSrc}
        className={`${className} min-h-[320px] sm:min-h-[420px]`}
        loading="lazy"
        allowFullScreen
        allow="fullscreen; geolocation"
        referrerPolicy="no-referrer-when-downgrade"
      />
      <div className="border-t border-slate-100 bg-white p-4 text-center text-sm font-bold text-slate-600">
        {mapT?.apiKeyNotice ||
          "For full interactive map controls, add NEXT_PUBLIC_GOOGLE_MAPS_API_KEY to .env.local and enable Maps JavaScript API in Google Cloud with billing enabled. You can still"}{" "}
        <a
          href={directionsUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#128c8c] underline underline-offset-4"
        >
          {mapT?.openInGoogleMaps || "open Eden ABA Therapy in Google Maps"}
        </a>
        .
      </div>
    </div>
  );
}

function buildInfoWindowContent({ businessName, address, directionsLabel }) {
  const container = document.createElement("div");
  container.style.maxWidth = "240px";
  container.style.fontFamily = "system-ui, sans-serif";
  container.style.lineHeight = "1.5";

  const heading = document.createElement("strong");
  heading.textContent = businessName;
  heading.style.display = "block";
  heading.style.marginBottom = "4px";
  container.appendChild(heading);

  const addressLine = document.createElement("span");
  addressLine.textContent = address;
  addressLine.style.display = "block";
  addressLine.style.marginBottom = "8px";
  addressLine.style.fontSize = "13px";
  container.appendChild(addressLine);

  const link = document.createElement("a");
  link.href = getDirectionsUrl(address);
  link.target = "_blank";
  link.rel = "noopener noreferrer";
  link.textContent = directionsLabel;
  link.style.color = "#128c8c";
  link.style.fontWeight = "700";
  link.style.fontSize = "13px";
  container.appendChild(link);

  return container;
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
  className = "h-[560px] w-full",
  businessName = EDEN_CLINIC_NAME,
}) {
  const containerRef = useRef(null);
  const mapRef = useRef(null);
  const markerRef = useRef(null);
  const infoWindowRef = useRef(null);
  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const hasApiKey = hasGoogleMapsApiKey();
  const mapTitle = title || t?.googleMap?.defaultTitle || "Eden ABA Therapy Google Map";
  const location = getEdenMapLocation(address);
  const directionsLabel = t?.getDirections || "Get Directions";
  const [mapStatus, setMapStatus] = useState(hasApiKey ? "loading" : "fallback");

  useEffect(() => {
    if (!hasApiKey || !containerRef.current) {
      setMapStatus("fallback");
      return undefined;
    }

    let cancelled = false;
    let resizeObserver;

    async function initMap() {
      try {
        const maps = await loadGoogleMaps(apiKey);
        if (cancelled || !containerRef.current) return;

        const map = new maps.Map(containerRef.current, {
          center: location.center,
          zoom: 16,
          mapTypeControl: true,
          mapTypeControlOptions: {
            style: maps.MapTypeControlStyle.HORIZONTAL_BAR,
            mapTypeIds: ["roadmap", "satellite"],
          },
          zoomControl: true,
          streetViewControl: true,
          fullscreenControl: true,
          clickableIcons: true,
          gestureHandling: "cooperative",
        });

        const marker = new maps.Marker({
          position: location.center,
          map,
          title: businessName,
        });

        const infoWindow = new maps.InfoWindow({
          content: buildInfoWindowContent({
            businessName,
            address: location.address,
            directionsLabel,
          }),
        });

        marker.addListener("click", () => {
          infoWindow.open({ anchor: marker, map });
        });

        const geocoder = new maps.Geocoder();
        geocoder.geocode({ address: location.address }, (results, status) => {
          if (cancelled || status !== "OK" || !results?.[0]) return;
          const position = results[0].geometry.location;
          map.setCenter(position);
          marker.setPosition(position);
        });

        mapRef.current = map;
        markerRef.current = marker;
        infoWindowRef.current = infoWindow;

        resizeObserver = new ResizeObserver(() => {
          maps.event.trigger(map, "resize");
          const center = marker.getPosition() || location.center;
          map.setCenter(center);
        });
        resizeObserver.observe(containerRef.current);

        if (!cancelled) setMapStatus("ready");
      } catch {
        if (!cancelled) setMapStatus("fallback");
      }
    }

    initMap();

    return () => {
      cancelled = true;
      resizeObserver?.disconnect();
      infoWindowRef.current?.close();
      markerRef.current?.setMap(null);
      mapRef.current = null;
      markerRef.current = null;
      infoWindowRef.current = null;
    };
  }, [apiKey, hasApiKey, address, businessName, directionsLabel, location.address, location.center]);

  if (mapStatus === "fallback" || !hasApiKey) {
    return (
      <GoogleMapEmbedFallback
        t={t}
        address={location.address}
        title={mapTitle}
        className={className}
      />
    );
  }

  return (
    <div className="relative h-full min-h-[320px] w-full overflow-hidden bg-slate-100 sm:min-h-[420px]">
      {mapStatus === "loading" ? (
        <div className="absolute inset-0 z-10 grid place-items-center bg-slate-100 text-sm font-bold text-slate-500">
          Loading map…
        </div>
      ) : null}
      <div
        ref={containerRef}
        className={`${className} min-h-[320px] w-full sm:min-h-[420px]`}
        role="application"
        aria-label={mapTitle}
      />
    </div>
  );
}
