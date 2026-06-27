"use client";

import Link from "next/link";
import type { ComponentProps, MouseEvent } from "react";

type CareersActionLinkProps = ComponentProps<typeof Link>;

function toHrefString(href: CareersActionLinkProps["href"]): string {
  if (typeof href === "string") {
    return href;
  }

  if (href && typeof href === "object") {
    const pathname = "pathname" in href && href.pathname ? href.pathname : "";
    const search =
      "search" in href && href.search
        ? href.search.startsWith("?")
          ? href.search
          : `?${href.search}`
        : "";
    return `${pathname}${search}`;
  }

  return String(href);
}

export default function CareersActionLink({
  href,
  onClick,
  prefetch = false,
  ...props
}: CareersActionLinkProps) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    onClick?.(event);
    if (event.defaultPrevented) {
      return;
    }

    event.preventDefault();
    window.location.assign(toHrefString(href));
  };

  return <Link href={href} prefetch={prefetch} onClick={handleClick} {...props} />;
}
