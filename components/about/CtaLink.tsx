import type { ReactNode } from "react";
import Link from "next/link";
import { getButtonClasses } from "@/lib/button-styles";

type CtaLinkProps = {
  href: string;
  children: ReactNode;
  variant?: string;
  className?: string;
  size?: "md" | "sm" | "form";
};

export default function CtaLink({
  href,
  children,
  variant = "primary",
  className = "",
  size = "md",
}: CtaLinkProps) {
  return (
    <Link href={href} className={getButtonClasses(variant, className, size)}>
      {children}
    </Link>
  );
}
