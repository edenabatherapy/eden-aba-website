import type { ReactNode } from "react";

type ProviderSectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  variant?: "default" | "soft" | "muted";
  children: ReactNode;
};

export default function ProviderSection({
  id,
  eyebrow,
  title,
  description,
  variant = "default",
  children,
}: ProviderSectionProps) {
  const variantClass =
    variant === "soft"
      ? "eden-providers-section--soft"
      : variant === "muted"
        ? "eden-providers-section--muted"
        : "";

  return (
    <section
      id={id}
      className={`eden-providers-section ${variantClass}`}
      aria-labelledby={id ? `${id}-title` : undefined}
    >
      <div className="eden-providers-section__inner">
        <header className="eden-providers-section__head">
          {eyebrow ? <p className="eden-providers-section__eyebrow">{eyebrow}</p> : null}
          <h2 id={id ? `${id}-title` : undefined} className="eden-providers-section__title">
            {title}
          </h2>
          {description ? <p className="eden-providers-section__text">{description}</p> : null}
        </header>
        {children}
      </div>
    </section>
  );
}
