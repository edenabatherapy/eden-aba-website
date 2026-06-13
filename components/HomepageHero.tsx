"use client";

import { useCallback, useEffect, useMemo, useState, type CSSProperties, type FormEvent } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import HeroDynamicEmoji from "@/components/HeroDynamicEmoji";
import { getTranslation } from "@/lib/i18n";
import "./HomepageHero.css";

const ROTATING_WORDS = [
  "grow",
  "learn",
  "thrive",
  "blossom",
  "communicate",
  "connect",
  "smile",
] as const;

const WORD_INTERVAL_MS = 2800;
const LONGEST_WORD_CH = 11.5;
const WORD_TRANSITION_S = 0.5;

type HomepageHeroProps = {
  onStart: () => void;
  onFindCare?: (query: string) => void;
  language: string;
};

function HeroCurve() {
  return (
    <svg
      className="homepage-hero__curve"
      viewBox="0 0 120 48"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M4 30C24 8 48 8 72 24"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="5 7"
      />
      <path
        d="M72 24L84 18"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <circle cx="88" cy="16" r="3" fill="currentColor" />
    </svg>
  );
}

function RotatingWord({
  word,
  prefersReducedMotion,
}: {
  word: string;
  prefersReducedMotion: boolean;
}) {
  const systemReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion || systemReducedMotion;

  if (reduceMotion) {
    return (
      <span className="homepage-hero__word-slot" aria-live="polite" aria-atomic="true">
        <span className="homepage-hero__word">{word}</span>
      </span>
    );
  }

  return (
    <span className="homepage-hero__word-slot" aria-live="polite" aria-atomic="true">
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className="homepage-hero__word"
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: WORD_TRANSITION_S, ease: [0.22, 1, 0.36, 1] }}
        >
          {word}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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

export default function HomepageHero({ onStart, onFindCare, language }: HomepageHeroProps) {
  const t = getTranslation(language);
  const animatedWords = useMemo(() => {
    const localeWords = t.hero?.animatedWords;
    return Array.isArray(localeWords) && localeWords.length > 0
      ? localeWords
      : [...ROTATING_WORDS];
  }, [t.hero?.animatedWords]);

  const defaultWordIndex = useMemo(() => {
    const smileIdx = animatedWords.indexOf("smile");
    if (smileIdx >= 0) return smileIdx;
    const viSmileIdx = animatedWords.indexOf("mỉm cười");
    return viSmileIdx >= 0 ? viSmileIdx : animatedWords.length - 1;
  }, [animatedWords]);

  const wordSlotWidth = useMemo(
    () => Math.max(LONGEST_WORD_CH, ...animatedWords.map((word) => word.length + 0.5)),
    [animatedWords],
  );

  const smileIndex = defaultWordIndex;
  const [wordIndex, setWordIndex] = useState(defaultWordIndex);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const activeWord = prefersReducedMotion
    ? animatedWords[smileIndex] ?? "smile"
    : animatedWords[wordIndex] ?? animatedWords[0];

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(media.matches);
    updatePreference();
    media.addEventListener("change", updatePreference);
    return () => media.removeEventListener("change", updatePreference);
  }, []);

  useEffect(() => {
    if (prefersReducedMotion) return undefined;

    const interval = window.setInterval(() => {
      setWordIndex((current) => (current + 1) % animatedWords.length);
    }, WORD_INTERVAL_MS);

    return () => window.clearInterval(interval);
  }, [animatedWords.length, prefersReducedMotion]);

  const staticHeadlineWord = animatedWords[smileIndex] ?? animatedWords[animatedWords.length - 1];

  return (
    <section id="top" className="homepage-hero">
      <div className="homepage-hero__glow homepage-hero__glow--left" aria-hidden="true" />
      <div className="homepage-hero__glow homepage-hero__glow--right" aria-hidden="true" />

      <div className="homepage-hero__inner">
        <div
          className="homepage-hero__headline-wrap"
          style={{ ["--hero-word-slot-width"]: `${wordSlotWidth}ch` } as CSSProperties}
        >
          <div className="homepage-hero__dots" aria-hidden="true">
            {Array.from({ length: 12 }).map((_, index) => (
              <span key={index} className="homepage-hero__dot" />
            ))}
          </div>

          <div className="homepage-hero__sparkles" aria-hidden="true">
            <span className="homepage-hero__sparkle" />
            <span className="homepage-hero__sparkle" />
            <span className="homepage-hero__sparkle" />
          </div>

          <HeroCurve />

          <h1 className="homepage-hero__title">
            <span className="homepage-hero__line">{t.hero.line1}</span>
            <span className="homepage-hero__line homepage-hero__line--accent">
              <span className="homepage-hero__accent-inner">
                <span className="homepage-hero__accent-text">
                  {t.hero.line2}{" "}
                  <RotatingWord word={activeWord} prefersReducedMotion={prefersReducedMotion} />
                </span>
                <HeroDynamicEmoji word={activeWord} prefersReducedMotion={prefersReducedMotion} />
              </span>
            </span>
            <span className="sr-only">
              {t.hero.line1} {t.hero.line2} {staticHeadlineWord}
            </span>
          </h1>
        </div>

        <p className="homepage-hero__subtitle">{t.hero.subtitle}</p>

        <div className="homepage-hero__finder-wrap">
          <LocationSearchBox onStart={onStart} onFindCare={onFindCare} t={t} />
        </div>
      </div>
    </section>
  );
}
