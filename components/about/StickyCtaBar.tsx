"use client";

import CtaLink from "@/components/about/CtaLink";

export default function StickyCtaBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-emerald-100 bg-white/90 px-4 py-3 shadow-[0_-8px_30px_rgba(15,23,42,0.08)] backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/90 sm:hidden">
      <div className="mx-auto flex max-w-lg items-center gap-3">
        <CtaLink href="/intake" size="sm" className="flex-1 py-3">
          Get Started
        </CtaLink>
        <CtaLink href="/schedule-appointment" variant="secondary" size="sm" className="flex-1 py-3">
          Consult
        </CtaLink>
      </div>
    </div>
  );
}
