"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight } from "lucide-react";
import { getButtonClasses } from "@/lib/button-styles";

export default function BcbaStickyApplyBar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById("bcba-hero-section");
    if (!hero) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(!entry.isIntersecting),
      { root: null, threshold: 0, rootMargin: "0px 0px -20% 0px" },
    );

    observer.observe(hero);
    return () => observer.disconnect();
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-x-0 bottom-0 z-40 border-t border-emerald-100 bg-white/95 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-md lg:hidden"
      role="region"
      aria-label="Quick apply actions"
    >
      <div className="mx-auto flex max-w-lg gap-2">
        <Link href="/careers/open-roles" className={getButtonClasses("primary", "flex-1 py-2.5 text-sm")}>
          View BCBA Openings
          <ArrowRight size={14} aria-hidden="true" />
        </Link>
        <Link href="/careers/talent-network" className={getButtonClasses("secondary", "flex-1 py-2.5 text-sm")}>
          Join Talent Network
        </Link>
      </div>
    </div>
  );
}
