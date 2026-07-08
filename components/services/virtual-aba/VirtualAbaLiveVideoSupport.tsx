"use client";

import { Phone, Video } from "lucide-react";
import { motion } from "framer-motion";
import { getButtonClasses } from "@/lib/button-styles";
import { EDEN_CARD } from "@/lib/eden-design-system";

type VirtualAbaLiveVideoSupportProps = {
  title: string;
  text: string;
  availability: string;
  disclaimer: string;
  startLiveVideoCta: string;
  callCta: string;
  phoneHref: string;
  onStartLiveVideo: () => void;
  reveal: (delay?: number) => Record<string, unknown>;
};

export default function VirtualAbaLiveVideoSupport({
  title,
  text,
  availability,
  disclaimer,
  startLiveVideoCta,
  callCta,
  phoneHref,
  onStartLiveVideo,
  reveal,
}: VirtualAbaLiveVideoSupportProps) {
  return (
    <section className="relative overflow-hidden px-4 py-16 lg:px-8 lg:py-20">
      <div className="virtual-aba-glow virtual-aba-glow--2 pointer-events-none opacity-30" aria-hidden />
      <div className="relative mx-auto max-w-4xl">
        <motion.article
          {...reveal()}
          className={`${EDEN_CARD} eden-clinical-card overflow-hidden border-sky-200/80 bg-gradient-to-br from-white via-sky-50/40 to-emerald-50/50 p-8 shadow-lg md:p-10`}
        >
          <div className="flex items-start gap-4">
            <div className="hidden rounded-2xl bg-gradient-to-br from-sky-100 to-emerald-50 p-4 text-[#1e5a8a] sm:block" aria-hidden>
              <Video size={28} />
            </div>
            <div className="flex-1">
              <h2 className="text-2xl font-black text-[#0F172A] md:text-3xl">{title}</h2>
              <p className="mt-4 text-base font-semibold leading-8 text-slate-700">{text}</p>
              <p className="mt-4 rounded-xl border border-sky-200/80 bg-sky-50/60 p-4 text-sm font-semibold leading-7 text-slate-700">
                {availability}
              </p>
              <p className="mt-4 text-xs font-semibold leading-6 text-slate-500">{disclaimer}</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <button type="button" className={getButtonClasses("primarySite")} onClick={onStartLiveVideo}>
                  <Video size={18} aria-hidden />
                  {startLiveVideoCta}
                </button>
                <a href={phoneHref} className={getButtonClasses("secondary")}>
                  <Phone size={18} aria-hidden />
                  {callCta}
                </a>
              </div>
            </div>
          </div>
        </motion.article>
      </div>
    </section>
  );
}
