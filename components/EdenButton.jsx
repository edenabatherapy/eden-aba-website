"use client";

import { getButtonClasses } from "@/lib/button-styles";

/**
 * @param {{
 *   children: import("react").ReactNode,
 *   variant?: keyof import("@/lib/button-styles").buttonVariants | string,
 *   className?: string,
 *   size?: "md" | "sm" | "form",
 *   type?: "button" | "submit" | "reset",
 * } & import("react").ButtonHTMLAttributes<HTMLButtonElement>} props
 */
export default function EdenButton({
  children,
  variant = "primary",
  className = "",
  size = "md",
  type = "button",
  ...props
}) {
  return (
    <button type={type} {...props} className={getButtonClasses(variant, className, size)}>
      {children}
    </button>
  );
}
