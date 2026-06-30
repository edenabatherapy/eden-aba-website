"use client";

import { useCallback, useState } from "react";
import { Check, Link2, Share2 } from "lucide-react";

type AlliedHealthShareBarProps = {
  title: string;
  shareLabel: string;
  copyLabel: string;
  copiedLabel: string;
};

export default function AlliedHealthShareBar({
  title,
  shareLabel,
  copyLabel,
  copiedLabel,
}: AlliedHealthShareBarProps) {
  const [copied, setCopied] = useState(false);

  const handleShare = useCallback(async () => {
    const url = typeof window !== "undefined" ? window.location.href : "";
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        /* user cancelled */
      }
    }
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, [title]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable */
    }
  }, []);

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={handleShare}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        <Share2 size={16} aria-hidden />
        {shareLabel}
      </button>
      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-2 text-sm font-bold text-white backdrop-blur-sm transition hover:bg-white/20"
      >
        {copied ? <Check size={16} aria-hidden /> : <Link2 size={16} aria-hidden />}
        {copied ? copiedLabel : copyLabel}
      </button>
    </div>
  );
}
