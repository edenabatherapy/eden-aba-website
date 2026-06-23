"use client";

import { useCallback, useRef, type KeyboardEvent } from "react";
import { usePersistLanguage, type SiteLanguage } from "@/hooks/useSiteLanguage";
import "./LanguageSwitcher.css";

export const LANGUAGE_EN_LABEL = "English";
export const LANGUAGE_VI_LABEL = "Tiếng Việt";

type LanguageSwitcherProps = {
  className?: string;
  /** Slightly larger touch targets for header/footer placement */
  comfortable?: boolean;
  /** Dark background variant (footer) */
  tone?: "light" | "dark";
  /** Stacked list for dropdown-style menus */
  variant?: "inline" | "dropdown";
};

export default function LanguageSwitcher({
  className = "",
  comfortable = false,
  tone = "light",
  variant = "inline",
}: LanguageSwitcherProps) {
  const { language, chooseLanguage } = usePersistLanguage();
  const englishRef = useRef<HTMLButtonElement>(null);
  const vietnameseRef = useRef<HTMLButtonElement>(null);

  const setLanguage = useCallback(
    (nextLanguage: SiteLanguage) => {
      chooseLanguage(nextLanguage);
    },
    [chooseLanguage],
  );

  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLButtonElement>, current: SiteLanguage) => {
      if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
      event.preventDefault();
      if (current === "en") {
        setLanguage("vi");
        vietnameseRef.current?.focus();
      } else {
        setLanguage("en");
        englishRef.current?.focus();
      }
    },
    [setLanguage],
  );

  const optionClass = (isActive: boolean) =>
    `language-switcher__option${isActive ? " language-switcher__option--active" : ""}`;

  const rootClass = [
    "language-switcher",
    tone === "dark" ? "language-switcher--dark" : "",
    comfortable ? "language-switcher--comfortable" : "",
    variant === "dropdown" ? "language-switcher--dropdown" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={rootClass} role="group" aria-label="Select Language">
      <button
        ref={englishRef}
        type="button"
        lang="en"
        aria-pressed={language === "en"}
        className={optionClass(language === "en")}
        onClick={() => setLanguage("en")}
        onKeyDown={(event) => handleKeyDown(event, "en")}
      >
        {LANGUAGE_EN_LABEL}
      </button>

      {variant === "inline" ? (
        <span className="language-switcher__divider" aria-hidden="true">
          |
        </span>
      ) : null}

      <button
        ref={vietnameseRef}
        type="button"
        lang="vi"
        aria-pressed={language === "vi"}
        className={optionClass(language === "vi")}
        onClick={() => setLanguage("vi")}
        onKeyDown={(event) => handleKeyDown(event, "vi")}
      >
        {LANGUAGE_VI_LABEL}
      </button>
    </div>
  );
}
