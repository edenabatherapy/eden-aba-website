"use client";

import Image from "next/image";
import {
  HOME_SERVICE_IMAGE_HEIGHT,
  HOME_SERVICE_IMAGE_WIDTH,
} from "@/lib/services/home-service-images";
import "./ServiceFeatureImage.css";

type ServiceFeatureImageProps = {
  src: string;
  alt: string;
  variant?: "card" | "hero" | "heroTall";
  tone?: "default" | "onDark";
  priority?: boolean;
  className?: string;
};

export default function ServiceFeatureImage({
  src,
  alt,
  variant = "hero",
  tone = "default",
  priority = false,
  className = "",
}: ServiceFeatureImageProps) {
  const variantClass = variant === "heroTall" ? "hero-tall" : variant;

  return (
    <div
      className={`service-feature-image service-feature-image--${variantClass}${
        tone === "onDark" ? " service-feature-image--on-dark" : ""
      } ${className}`.trim()}
    >
      <div className="service-feature-image__glow" aria-hidden="true" />
      <div className="service-feature-image__frame">
        <Image
          src={src}
          alt={alt}
          width={HOME_SERVICE_IMAGE_WIDTH}
          height={HOME_SERVICE_IMAGE_HEIGHT}
          sizes={
            variant === "card"
              ? "(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
              : "(max-width: 1023px) 100vw, 48vw"
          }
          className="service-feature-image__img"
          loading={priority ? undefined : "lazy"}
          priority={priority}
          quality={88}
        />
      </div>
    </div>
  );
}
