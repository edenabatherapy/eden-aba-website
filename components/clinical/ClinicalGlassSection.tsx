"use client";

import { motion, useReducedMotion } from "framer-motion";
import CrystalLightAmbient from "@/components/crystal-light/CrystalLightAmbient";
import { EDEN_CARD_GLASS, EDEN_CONTAINER, EDEN_SECTION_INTRO, EDEN_SECTION_TITLE } from "@/lib/eden-design-system";

type ClinicalGlassSectionProps = {
  id?: string;
  title: string;
  intro?: string;
  tone?: "white" | "mint" | "warm";
  children: React.ReactNode;
};

const toneClass = {
  white: "eden-section eden-section--white",
  mint: "eden-section eden-section--mint",
  warm: "eden-section eden-section--warm",
} as const;

export default function ClinicalGlassSection({
  id,
  title,
  intro,
  tone = "white",
  children,
}: ClinicalGlassSectionProps) {
  const reduceMotion = useReducedMotion();
  const reveal = reduceMotion
    ? {}
    : {
        initial: { opacity: 0, y: 24 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true, margin: "-48px" },
        transition: { duration: 0.55 },
      };

  return (
    <section id={id} className={`relative overflow-hidden px-4 py-16 lg:px-8 lg:py-20 ${toneClass[tone]}`}>
      <CrystalLightAmbient preset="light-mint" />
      <div className={`${EDEN_CONTAINER} relative`}>
        <motion.div {...reveal} className="mx-auto max-w-3xl text-center">
          <h2 className={EDEN_SECTION_TITLE}>{title}</h2>
          {intro ? <p className={EDEN_SECTION_INTRO}>{intro}</p> : null}
        </motion.div>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

type ClinicalCardGridProps = {
  items: ReadonlyArray<{ title: string; text: string }>;
  columns?: 2 | 3;
};

export function ClinicalCardGrid({ items, columns = 3 }: ClinicalCardGridProps) {
  const reduceMotion = useReducedMotion();
  const gridClass = columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3";

  return (
    <div className={`grid gap-6 ${gridClass}`}>
      {items.map((item, i) => (
        <motion.article
          key={item.title}
          {...(reduceMotion
            ? {}
            : {
                initial: { opacity: 0, y: 20 },
                whileInView: { opacity: 1, y: 0 },
                viewport: { once: true, margin: "-40px" },
                transition: { duration: 0.45, delay: i * 0.04 },
              })}
          className={`${EDEN_CARD_GLASS} eden-clinical-card border-emerald-100/60 shadow-emerald-900/5 transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-emerald-900/10`}
        >
          <h3 className="text-lg font-black text-[#0F172A]">{item.title}</h3>
          <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{item.text}</p>
        </motion.article>
      ))}
    </div>
  );
}

type ClinicalBulletPanelProps = {
  title: string;
  intro?: string;
  bullets: ReadonlyArray<string>;
  note?: string;
};

export function ClinicalBulletPanel({ title, intro, bullets, note }: ClinicalBulletPanelProps) {
  return (
    <div className={`${EDEN_CARD_GLASS} eden-clinical-panel mx-auto max-w-4xl border-emerald-200/50 p-8`}>
      <h3 className="text-xl font-black text-[#0b4f4f]">{title}</h3>
      {intro ? <p className="mt-3 text-sm font-semibold leading-7 text-slate-700">{intro}</p> : null}
      <ul className="mt-5 space-y-3">
        {bullets.map((bullet) => (
          <li key={bullet} className="flex gap-3 text-sm font-semibold leading-7 text-slate-700">
            <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" aria-hidden />
            {bullet}
          </li>
        ))}
      </ul>
      {note ? (
        <p className="mt-5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-4 text-sm font-semibold leading-7 text-slate-700">
          {note}
        </p>
      ) : null}
    </div>
  );
}
