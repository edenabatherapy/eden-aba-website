"use client";

import type { LucideIcon } from "lucide-react";
import {
  ArrowRight,
  BadgeCheck,
  Heart,
  Home,
  MapPin,
  ShieldCheck,
  Star,
  TrendingUp,
  Users,
} from "lucide-react";
import { getButtonClasses } from "@/lib/button-styles";
import { SITE_IMAGES } from "@/lib/site-images";

type ClientReviewsCopy = {
  parentRole: string;
  startABA: string;
  verifyInsurance: string;
};

type ClientReviewsSectionProps = {
  copy: ClientReviewsCopy;
  onStart: () => void;
  onVerifyInsurance: () => void;
};

type FeaturedReview = {
  Icon: LucideIcon;
  title: string;
  quote: string;
  name: string;
  delay: string;
};

type TrustMetric = {
  Icon: LucideIcon;
  value: string;
  label: string;
};

const FEATURED_REVIEWS: FeaturedReview[] = [
  {
    Icon: Users,
    title: "Compassionate & Patient Team",
    quote:
      "The therapists are patient, kind, and truly child-centered. We've seen incredible growth in our child's communication and confidence.",
    name: "Daniel Nguyen",
    delay: "0.05s",
  },
  {
    Icon: TrendingUp,
    title: "Clear Progress Every Step",
    quote:
      "Eden helped us understand ABA in a way that felt clear. The team communicates with us every step of the way.",
    name: "Linh Tran",
    delay: "0.12s",
  },
  {
    Icon: Heart,
    title: "Personalized Care That Works",
    quote:
      "The treatment approach feels personalized for our child. We feel listened to and supported throughout the entire process.",
    name: "Sarah Johnson",
    delay: "0.19s",
  },
  {
    Icon: Home,
    title: "Confidence at Home",
    quote:
      "Parent training gave us the tools we needed. We now feel more confident supporting our child every day.",
    name: "Michael Thompson",
    delay: "0.26s",
  },
];

const TRUST_METRICS: TrustMetric[] = [
  { Icon: Star, value: "5.0 / 5.0", label: "Average rating" },
  { Icon: Users, value: "120+", label: "Google reviews" },
  { Icon: ShieldCheck, value: "100%", label: "Family focused" },
  { Icon: MapPin, value: "Northern Virginia", label: "Serving NOVA families" },
];

export default function ClientReviewsSection({
  copy,
  onStart,
  onVerifyInsurance,
}: ClientReviewsSectionProps) {
  return (
    <section className="eden-reviews-section relative overflow-hidden px-4 py-16 lg:px-8 lg:py-20">
      <div className="mx-auto max-w-7xl">
        <div className="grid items-center gap-12 lg:grid-cols-[0.88fr_1.12fr]">
          <div>
            <div className="mb-5 flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-emerald-800">
              <span className="h-px w-10 bg-emerald-700" aria-hidden="true" />
              Families first, always
              <Heart size={14} className="text-emerald-700" aria-hidden="true" />
            </div>
            <h2 className="eden-reviews-serif text-4xl font-black leading-[0.95] tracking-tight text-slate-950 sm:text-5xl md:text-6xl lg:text-7xl">
              Families Trust
              <br />
              <span className="text-emerald-900">Eden ABA Therapy</span>
            </h2>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600 sm:text-xl">
              Real stories from Northern Virginia families who trust our compassionate, personalized ABA care and see real progress.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-3 shadow-xl shadow-emerald-900/10">
                <span className="text-xl text-amber-400 sm:text-2xl" aria-hidden="true">
                  ★★★★★
                </span>
                <strong className="text-xl text-emerald-900 sm:text-2xl">5.0</strong>
              </div>
              <span className="font-semibold text-slate-600">Based on 120+ Google reviews</span>
              <span
                className="grid h-9 w-9 place-items-center rounded-full bg-white text-lg font-black text-[#4285F4] shadow-md ring-1 ring-slate-100"
                aria-hidden="true"
              >
                G
              </span>
            </div>
          </div>

          <div className="relative mx-auto min-h-[320px] w-full max-w-xl lg:max-w-none lg:min-h-[390px]">
            <div className="eden-reviews-moving-ribbon" aria-hidden="true" />
            <img
              src={SITE_IMAGES.aboutEden.familyCentered}
              alt="Family smiling together during compassionate ABA therapy support"
              loading="lazy"
              className="eden-reviews-photo-curve h-[320px] w-full object-cover shadow-2xl shadow-emerald-900/20 sm:h-[385px]"
            />
            <div className="absolute -bottom-5 left-4 rounded-[2rem] border border-white/70 bg-white/85 p-4 shadow-2xl shadow-emerald-950/15 backdrop-blur-xl sm:left-8 sm:p-5">
              <div className="flex items-center gap-3">
                <div className="eden-reviews-glow-dot grid h-11 w-11 place-items-center rounded-full bg-emerald-800 text-white sm:h-12 sm:w-12">
                  <BadgeCheck size={22} aria-hidden="true" />
                </div>
                <div>
                  <div className="font-black text-emerald-900">Verified family feedback</div>
                  <div className="text-sm text-slate-500">Real care. Clear progress. Trusted support.</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {FEATURED_REVIEWS.map(({ Icon, title, quote, name, delay }) => (
            <article
              key={title}
              className="eden-reviews-card rounded-[1.7rem] bg-white p-6 sm:p-7"
              style={{ animationDelay: delay }}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-full bg-emerald-50 text-emerald-800 sm:h-14 sm:w-14">
                  <Icon size={24} aria-hidden="true" />
                </div>
                <span className="text-lg text-amber-400 sm:text-xl" aria-hidden="true">
                  ★★★★★
                </span>
              </div>
              <h3 className="text-lg font-black text-slate-950 sm:text-xl">{title}</h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">&ldquo;{quote}&rdquo;</p>
              <div className="mt-6 flex items-center justify-between gap-3 border-t border-slate-100 pt-5">
                <div className="flex min-w-0 items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-emerald-800 text-sm font-black text-white">
                    {name.charAt(0)}
                  </span>
                  <div className="min-w-0">
                    <b className="block truncate text-sm text-slate-950 sm:text-base">{name}</b>
                    <p className="text-sm text-slate-500">{copy.parentRole}</p>
                  </div>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full border border-emerald-100 bg-emerald-50 px-2.5 py-1 text-[11px] font-bold text-emerald-800 sm:text-xs">
                  <BadgeCheck size={12} aria-hidden="true" />
                  Google review
                </span>
              </div>
            </article>
          ))}
        </div>

        <div className="eden-reviews-metric-card mt-9 grid gap-4 rounded-[2rem] p-5 sm:p-6 md:grid-cols-2 xl:grid-cols-4">
          {TRUST_METRICS.map(({ Icon, value, label }, index) => (
            <div
              key={label}
              className={`flex items-center gap-4 ${index < TRUST_METRICS.length - 1 ? "xl:border-r xl:border-emerald-900/10" : ""} ${index % 2 === 0 && index < TRUST_METRICS.length - 2 ? "md:border-r md:border-emerald-900/10" : ""}`}
            >
              <span className="grid h-14 w-14 shrink-0 place-items-center rounded-full bg-emerald-50 text-emerald-800 sm:h-16 sm:w-16">
                <Icon size={26} aria-hidden="true" />
              </span>
              <div>
                <b className="block text-lg text-emerald-900 sm:text-2xl">{value}</b>
                <p className="text-sm text-slate-600 sm:text-base">{label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-4 sm:gap-5">
          <button type="button" onClick={onStart} className={getButtonClasses("primarySite", "", "sm")}>
            {copy.startABA} <ArrowRight size={18} />
          </button>
          <button
            type="button"
            onClick={onVerifyInsurance}
            className={getButtonClasses("secondarySite", "", "sm")}
          >
            {copy.verifyInsurance}
          </button>
        </div>
      </div>
    </section>
  );
}
