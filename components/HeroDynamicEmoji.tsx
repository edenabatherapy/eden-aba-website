"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import {
  getHeroWordEmojiConfig,
  type HeroEmojiAnimation,
} from "@/lib/hero-word-emoji";

type HeroDynamicEmojiProps = {
  word: string;
  prefersReducedMotion: boolean;
  /** When true, parent handles enter/exit animation for word+emoji pair. */
  animateWithParent?: boolean;
  iconClassName?: string;
};

const TRANSITION_MS = 0.5;

function scheduleSpecialDelay() {
  return 5000 + Math.random() * 3000;
}

export default function HeroDynamicEmoji({
  word,
  prefersReducedMotion,
  animateWithParent = false,
  iconClassName = "homepage-hero__emoji-glyph",
}: HeroDynamicEmojiProps) {
  const systemReducedMotion = useReducedMotion();
  const reduceMotion = prefersReducedMotion || systemReducedMotion;
  const config = getHeroWordEmojiConfig(word);
  const [isHovered, setIsHovered] = useState(false);
  const [specialActive, setSpecialActive] = useState(false);

  const triggerSpecial = useCallback(() => {
    if (reduceMotion) return;
    setSpecialActive(true);
    window.setTimeout(() => setSpecialActive(false), 900);
  }, [reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return undefined;

    let timeoutId = window.setTimeout(function tick() {
      triggerSpecial();
      timeoutId = window.setTimeout(tick, scheduleSpecialDelay());
    }, scheduleSpecialDelay());

    return () => window.clearTimeout(timeoutId);
  }, [config.animation, reduceMotion, triggerSpecial]);

  const animationClass = `homepage-hero__emoji--${config.animation}`;
  const specialClass = specialActive ? " homepage-hero__emoji--special" : "";
  const hoverClass = isHovered && !reduceMotion ? " homepage-hero__emoji--hovered" : "";

  const emojiContent = (
    <span
      className={`homepage-hero__emoji ${animationClass}${specialClass}${hoverClass}`}
    >
      <span className={iconClassName} aria-hidden="true">
        {config.emoji}
      </span>
      <EmojiExtras animation={config.animation} specialActive={specialActive} />
    </span>
  );

  if (reduceMotion) {
    return (
      <span className={iconClassName} aria-hidden="true" title={config.label}>
        {config.emoji}
      </span>
    );
  }

  if (animateWithParent) {
    return (
      <span
        className="homepage-hero__emoji-wrap homepage-hero__emoji-wrap--paired"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onFocus={() => setIsHovered(true)}
        onBlur={() => setIsHovered(false)}
        tabIndex={0}
        role="img"
        aria-label={`${config.label} symbol`}
      >
        {emojiContent}
      </span>
    );
  }

  return (
    <span
      className="homepage-hero__emoji-wrap"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      role="img"
      aria-label={`${config.label} symbol`}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={word}
          className={`homepage-hero__emoji ${animationClass}${specialClass}${hoverClass}`}
          initial={{ opacity: 0, scale: 0.72, y: 8 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: -6 }}
          transition={{ duration: TRANSITION_MS, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="homepage-hero__emoji-glyph" aria-hidden="true">
            {config.emoji}
          </span>
          <EmojiExtras animation={config.animation} specialActive={specialActive} />
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

function EmojiExtras({
  animation,
  specialActive,
}: {
  animation: HeroEmojiAnimation;
  specialActive: boolean;
}) {
  if (!specialActive) {
    if (animation === "imagine") {
      return (
        <>
          <span className="homepage-hero__emoji-particle homepage-hero__emoji-particle--1" />
          <span className="homepage-hero__emoji-particle homepage-hero__emoji-particle--2" />
        </>
      );
    }
    if (animation === "thrive" || animation === "shine" || animation === "flourish") {
      return <span className="homepage-hero__emoji-spark homepage-hero__emoji-spark--ambient" />;
    }
    return null;
  }

  switch (animation) {
    case "smile":
      return <span className="homepage-hero__emoji-wink" aria-hidden="true" />;
    case "grow":
    case "blossom":
    case "flourish":
      return <span className="homepage-hero__emoji-sprout" aria-hidden="true" />;
    case "learn":
      return <span className="homepage-hero__emoji-page-flip" aria-hidden="true" />;
    case "play":
      return <span className="homepage-hero__emoji-hop-shadow" aria-hidden="true" />;
    case "explore":
      return <span className="homepage-hero__emoji-trail" aria-hidden="true" />;
    case "thrive":
    case "shine":
    case "flourish":
      return (
        <>
          <span className="homepage-hero__emoji-spark homepage-hero__emoji-spark--burst" />
          <span className="homepage-hero__emoji-spark homepage-hero__emoji-spark--burst-2" />
        </>
      );
    case "achieve":
      return <span className="homepage-hero__emoji-gold-glow" aria-hidden="true" />;
    case "build":
      return <span className="homepage-hero__emoji-snap" aria-hidden="true" />;
    default:
      return null;
  }
}
