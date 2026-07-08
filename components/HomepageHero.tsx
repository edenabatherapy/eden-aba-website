"use client";

import { useCallback, useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import EdenLogo from "@/components/EdenLogo";
import { getTranslation } from "@/lib/i18n";
import "./HomepageHero.css";

const HOMEPAGE_HERO_VIDEO = "/videos/hero-video.mp4";

const HERO_ROTATION_ITEMS = [
  { word: "thrive", symbol: "🌱", label: "thrive" },
  { word: "connect", symbol: "💬", label: "connect" },
  { word: "shine", symbol: "✨", label: "shine" },
  { word: "succeed", symbol: "⭐", label: "succeed" },
  { word: "blossom", symbol: "🌸", label: "blossom" },
] as const;

const WORD_ROTATE_MS = 2500;
const WORD_TRANSITION_MS = 350;

type HomepageHeroProps = {
  onStart: () => void;
  onFindCare?: (query: string) => void;
  language: string;
};

function LocationSearchBox({
  onStart,
  onFindCare,
  t,
}: {
  onStart: () => void;
  onFindCare?: (query: string) => void;
  t: ReturnType<typeof getTranslation>;
}) {
  const [query, setQuery] = useState("");

  const openLocationsPage = useCallback(() => {
    onFindCare?.(query);
  }, [onFindCare, query]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openLocationsPage();
  };

  return (
    <div className="homepage-hero__finder">
      <div className="homepage-hero__finder-pin" aria-hidden="true">
        <MapPin size={22} />
      </div>

      <form onSubmit={handleSubmit}>
        <label className="homepage-hero__finder-title" htmlFor="hero-location-search">
          {t.finderTitle}
        </label>

        <div className="homepage-hero__finder-form">
          <div className="homepage-hero__finder-input-wrap">
            <MapPin className="homepage-hero__finder-input-icon" size={20} />
            <input
              id="hero-location-search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="homepage-hero__finder-input"
              placeholder={t.finderPlaceholder}
            />
          </div>
          <button type="submit" className="homepage-hero__finder-submit">
            {t.findCare}
            <ArrowRight size={18} aria-hidden="true" />
          </button>
        </div>
      </form>

      <div className="homepage-hero__finder-links">
        <button type="button" onClick={onStart} className="homepage-hero__finder-link">
          <CheckCircle2 size={16} className="text-emerald-600" aria-hidden="true" />
          {t.abaRightForMe}
        </button>
        <span className="homepage-hero__finder-divider" aria-hidden="true" />
        <button type="button" onClick={onStart} className="homepage-hero__finder-link">
          <CheckCircle2 size={16} className="text-emerald-600" aria-hidden="true" />
          {t.asdSupport}
        </button>
      </div>
    </div>
  );
}

type EdenHeroVisualProps = {
  imageAlt: string;
  brandName: string;
  brandTagline: string;
  videoFallbackMessage?: string;
};

function EdenHeroVisual({
  imageAlt,
  brandName,
  brandTagline,
  videoFallbackMessage = "Compassionate autism care for every child",
}: EdenHeroVisualProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  const handleVideoPlaying = useCallback(() => {
    setVideoPlaying(true);
  }, []);

  const handleVideoError = useCallback(() => {
    setVideoFailed(true);
    setVideoPlaying(false);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || videoFailed) return undefined;

    video.addEventListener("playing", handleVideoPlaying);
    video.addEventListener("error", handleVideoError);

    const attemptPlay = () => {
      void video.play().catch(() => {
        // Autoplay blocked or deferred — keep gradient frame until playback starts.
      });
    };

    if (video.readyState >= HTMLMediaElement.HAVE_CURRENT_DATA) {
      attemptPlay();
    } else {
      video.addEventListener("loadeddata", attemptPlay, { once: true });
    }

    return () => {
      video.removeEventListener("playing", handleVideoPlaying);
      video.removeEventListener("error", handleVideoError);
    };
  }, [handleVideoError, handleVideoPlaying, videoFailed]);

  return (
    <div className="eden-hero-visual">
      <div className="eden-hero-media-frame">
        {!videoFailed ? (
          <video
            ref={videoRef}
            className={`eden-hero-video${videoPlaying ? " eden-hero-video--active" : ""}`}
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-label={imageAlt}
          >
            <source src={HOMEPAGE_HERO_VIDEO} type="video/mp4" />
          </video>
        ) : null}

        {videoFailed ? (
          <div className="eden-hero-fallback" role="img" aria-label={imageAlt}>
            <div className="eden-hero-fallback__brand">
              <EdenLogo size="compact" className="eden-hero-fallback__logo" />
            </div>
            <p className="eden-hero-fallback__title">{brandName}</p>
            <p className="eden-hero-fallback__tagline">{brandTagline}</p>
            <p className="eden-hero-fallback__message">{videoFallbackMessage}</p>
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default function HomepageHero({ onStart, onFindCare, language }: HomepageHeroProps) {
  const t = getTranslation(language);
  const rotationItems = useMemo(() => {
    const localeItems = t.hero?.rotatingItems;
    if (Array.isArray(localeItems) && localeItems.length > 0) {
      return localeItems.map((item, index) => ({
        word: item.word ?? HERO_ROTATION_ITEMS[index]?.word ?? "thrive",
        symbol: item.symbol ?? HERO_ROTATION_ITEMS[index]?.symbol ?? "🌱",
        label: item.label ?? item.word ?? HERO_ROTATION_ITEMS[index]?.label ?? "thrive",
      }));
    }
    return [...HERO_ROTATION_ITEMS];
  }, [t.hero?.rotatingItems]);

  const [itemIndex, setItemIndex] = useState(0);
  const [isChanging, setIsChanging] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const activeItem = prefersReducedMotion
    ? rotationItems[0] ?? HERO_ROTATION_ITEMS[0]
    : rotationItems[itemIndex] ?? rotationItems[0];

  const staticHeadlineItem = rotationItems[0] ?? HERO_ROTATION_ITEMS[0];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    let changeTimeout: number | undefined;

    const interval = window.setInterval(() => {
      setIsChanging(true);
      changeTimeout = window.setTimeout(() => {
        setItemIndex((current) => (current + 1) % rotationItems.length);
        setIsChanging(false);
      }, WORD_TRANSITION_MS);
    }, WORD_ROTATE_MS);

    return () => {
      window.clearInterval(interval);
      if (changeTimeout) window.clearTimeout(changeTimeout);
    };
  }, [rotationItems.length, prefersReducedMotion]);

  return (
    <section id="top" className="homepage-hero">
      <div className="homepage-hero__decor" aria-hidden="true">
        <span className="homepage-hero__circle homepage-hero__circle--one" />
        <span className="homepage-hero__circle homepage-hero__circle--two" />
        <span className="homepage-hero__circle homepage-hero__circle--three" />
      </div>

      <div className="homepage-hero__inner">
        <div className="hero-container">
          <div className="eden-hero-copy">
            <h1 className="eden-hero-title hero-heading homepage-hero__title">
              <span>{t.hero.line1}</span>
              <span>{t.hero.line2}</span>
              <span>{t.hero.line3}</span>
              <span className="hero-line-four">
                {t.hero.line4Prefix ?? "and"}{" "}
                <span
                  id="heroRotatingWord"
                  className={
                    isChanging
                      ? "hero-word eden-hero-rotating-word eden-hero-rotating-word--changing"
                      : "hero-word eden-hero-rotating-word"
                  }
                  aria-live="polite"
                  aria-atomic="true"
                >
                  {activeItem.word}
                </span>
                <span
                  className={
                    isChanging ? "hero-symbol hero-symbol--changing" : "hero-symbol"
                  }
                  aria-hidden="true"
                >
                  {activeItem.symbol}
                </span>
              </span>
              <span className="sr-only">
                {t.hero.line1} {t.hero.line2} {t.hero.line3} {t.hero.line4Prefix ?? "and"}{" "}
                {staticHeadlineItem.word}
              </span>
            </h1>

            <p className="homepage-hero__subtitle">{t.hero.subtitle}</p>

            <div className="homepage-hero__finder-wrap">
              <LocationSearchBox onStart={onStart} onFindCare={onFindCare} t={t} />
            </div>
          </div>

          <EdenHeroVisual
            imageAlt={t.hero.imageAlt}
            brandName={t.brandName}
            brandTagline={t.brandTagline}
            videoFallbackMessage={t.hero.videoFallbackMessage}
          />
        </div>
      </div>
    </section>
  );
}
