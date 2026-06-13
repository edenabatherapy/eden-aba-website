"use client";

import { useState } from "react";
import { EDEN_LOGO_ALT, EDEN_LOGO_PATH, EDEN_LOGO_SIZES } from "@/lib/site-brand";

/**
 * @param {{
 *   size?: keyof typeof EDEN_LOGO_SIZES,
 *   alt?: string,
 *   className?: string,
 *   priority?: boolean,
 *   onDark?: boolean,
 * }} props
 */
export default function EdenLogo({
  size = "header",
  alt = EDEN_LOGO_ALT,
  className = "",
  priority = false,
  onDark = false,
}) {
  const [failed, setFailed] = useState(false);
  const sizeClass = EDEN_LOGO_SIZES[size] || EDEN_LOGO_SIZES.header;
  const shellClass = onDark ? "rounded-2xl bg-white p-1.5 shadow-sm" : "";

  if (failed) {
    return (
      <div
        className={`grid place-items-center rounded-2xl bg-white px-3 py-2 text-center font-black leading-tight text-emerald-800 shadow-sm ${sizeClass} ${shellClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        <span className="text-xs">EDEN</span>
        <span className="text-[9px] tracking-wide">ABA THERAPY</span>
      </div>
    );
  }

  return (
    <img
      src={EDEN_LOGO_PATH}
      alt={alt}
      className={`${sizeClass} ${shellClass} ${className}`.trim()}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
