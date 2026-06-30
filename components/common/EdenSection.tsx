"use client";

import type { ReactNode } from "react";
import { EDEN_CONTAINER } from "@/lib/eden-design-system";

export type EdenSectionVariant = "white" | "mint" | "warm" | "tealGradient" | "forestCta";

const VARIANT_CLASS: Record<EdenSectionVariant, string> = {
  white: "eden-section eden-section--white",
  mint: "eden-section eden-section--mint",
  warm: "eden-section eden-section--warm",
  tealGradient: "eden-section eden-section--teal-gradient",
  forestCta: "eden-section eden-section--forest-cta",
};

type EdenSectionProps = {
  children: ReactNode;
  variant?: EdenSectionVariant;
  id?: string;
  className?: string;
  containerClassName?: string;
  contained?: boolean;
};

export default function EdenSection({
  children,
  variant = "white",
  id,
  className = "",
  containerClassName = "",
  contained = true,
}: EdenSectionProps) {
  const inner = contained ? (
    <div className={`${EDEN_CONTAINER} ${containerClassName}`.trim()}>{children}</div>
  ) : (
    children
  );

  return (
    <section id={id} className={`${VARIANT_CLASS[variant]} py-16 lg:py-20 ${className}`.trim()}>
      {inner}
    </section>
  );
}
