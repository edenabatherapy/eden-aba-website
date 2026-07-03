"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import Link from "next/link";
import { ArrowRight, Heart, Sparkles, Users } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import CareerBreadcrumbs from "@/components/careers/hub/CareerBreadcrumbs";
import CareerPageShell from "@/components/careers/hub/CareerPageShell";
import CareerSectionNav from "@/components/careers/hub/CareerSectionNav";
import AnimatedStatCounter from "@/components/careers/hub/AnimatedStatCounter";
import RbtScrollReveal, { RbtStaggerGrid, RbtStaggerItem } from "@/components/careers/rbt/RbtScrollReveal";
import MasonryGallery from "@/components/careers/life-at-eden/MasonryGallery";
import TestimonialsCarousel from "@/components/careers/life-at-eden/TestimonialsCarousel";
import VideoHighlightCards from "@/components/careers/life-at-eden/VideoHighlightCards";
import {
  LIFE_AT_EDEN_COMMUNITY,
  LIFE_AT_EDEN_CULTURE_CARDS,
  LIFE_AT_EDEN_DEI_CARDS,
  LIFE_AT_EDEN_DISCLAIMER,
  LIFE_AT_EDEN_EXPERIENCE_ITEMS,
  LIFE_AT_EDEN_GALLERY,
  LIFE_AT_EDEN_HERO_BADGES,
  LIFE_AT_EDEN_RECOGNITION,
  LIFE_AT_EDEN_SECTION_NAV,
  LIFE_AT_EDEN_SPOTLIGHTS,
  LIFE_AT_EDEN_STATS,
  LIFE_AT_EDEN_TEAM_CARDS,
  LIFE_AT_EDEN_TESTIMONIALS,
  LIFE_AT_EDEN_TRAINING,
  LIFE_AT_EDEN_VIDEOS,
  LIFE_AT_EDEN_WORK_LIFE,
} from "@/lib/careers/life-at-eden-careers-data";
import { getButtonClasses } from "@/lib/button-styles";
import { EASE_OUT } from "@/components/careers/rbt/rbt-motion";

const FRAME = "scroll-mt-28 rounded-[2rem] border border-teal-100 bg-white p-8 shadow-sm sm:p-10";

export default function LifeAtEdenCareersPage() {
  const lifeAtEdenCommunity = useLocalizedContent("LIFE_AT_EDEN_COMMUNITY", LIFE_AT_EDEN_COMMUNITY);
  const lifeAtEdenCultureCards = useLocalizedContent("LIFE_AT_EDEN_CULTURE_CARDS", LIFE_AT_EDEN_CULTURE_CARDS);
  const lifeAtEdenDeiCards = useLocalizedContent("LIFE_AT_EDEN_DEI_CARDS", LIFE_AT_EDEN_DEI_CARDS);
  const lifeAtEdenDisclaimer = useLocalizedContent("LIFE_AT_EDEN_DISCLAIMER", LIFE_AT_EDEN_DISCLAIMER);
  const lifeAtEdenExperienceItems = useLocalizedContent("LIFE_AT_EDEN_EXPERIENCE_ITEMS", LIFE_AT_EDEN_EXPERIENCE_ITEMS);
  const lifeAtEdenGallery = useLocalizedContent("LIFE_AT_EDEN_GALLERY", LIFE_AT_EDEN_GALLERY);
  const lifeAtEdenHeroBadges = useLocalizedContent("LIFE_AT_EDEN_HERO_BADGES", LIFE_AT_EDEN_HERO_BADGES);
  const lifeAtEdenRecognition = useLocalizedContent("LIFE_AT_EDEN_RECOGNITION", LIFE_AT_EDEN_RECOGNITION);
  const lifeAtEdenSectionNav = useLocalizedContent("LIFE_AT_EDEN_SECTION_NAV", LIFE_AT_EDEN_SECTION_NAV);
  const lifeAtEdenSpotlights = useLocalizedContent("LIFE_AT_EDEN_SPOTLIGHTS", LIFE_AT_EDEN_SPOTLIGHTS);
  const lifeAtEdenStats = useLocalizedContent("LIFE_AT_EDEN_STATS", LIFE_AT_EDEN_STATS);
  const lifeAtEdenTeamCards = useLocalizedContent("LIFE_AT_EDEN_TEAM_CARDS", LIFE_AT_EDEN_TEAM_CARDS);
  const lifeAtEdenTestimonials = useLocalizedContent("LIFE_AT_EDEN_TESTIMONIALS", LIFE_AT_EDEN_TESTIMONIALS);
  const lifeAtEdenTraining = useLocalizedContent("LIFE_AT_EDEN_TRAINING", LIFE_AT_EDEN_TRAINING);
  const lifeAtEdenVideos = useLocalizedContent("LIFE_AT_EDEN_VIDEOS", LIFE_AT_EDEN_VIDEOS);
  const lifeAtEdenWorkLife = useLocalizedContent("LIFE_AT_EDEN_WORK_LIFE", LIFE_AT_EDEN_WORK_LIFE);

  const reduceMotion = useReducedMotion();

  const fade = (delay: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.55, ease: EASE_OUT, delay },
        };

  return (
    <CareerPageShell>
      <CareerBreadcrumbs items={[{ label: "Careers", href: "/careers" }, { label: "Life at Eden" }]} />

      <section
        className="relative overflow-hidden bg-gradient-to-br from-[#e8f8f2] via-white to-[#dff5f0] px-4 py-14 lg:px-8 lg:py-20"
        aria-labelledby="life-at-eden-heading"
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p {...fade(0)} className="text-xs font-black uppercase tracking-[0.16em] text-teal-800">
            Culture &amp; Community
          </motion.p>
          <motion.h1
            {...fade(0.08)}
            id="life-at-eden-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl"
          >
            Life at Eden
          </motion.h1>
          <motion.p {...fade(0.16)} className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600">
            A place where compassionate professionals grow together—mission-driven care, collaborative teams, and a
            culture built around families across Northern Virginia.
          </motion.p>
          <motion.ul {...fade(0.24)} className="mt-6 flex flex-wrap justify-center gap-2">
            {lifeAtEdenHeroBadges.map((badge) => (
              <li
                key={badge}
                className="rounded-full border border-teal-200 bg-white/90 px-3 py-1.5 text-xs font-bold text-teal-900 shadow-sm"
              >
                {badge}
              </li>
            ))}
          </motion.ul>
          <motion.div {...fade(0.32)} className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/careers/open-roles" className={getButtonClasses("primary", "w-full sm:w-auto")}>
              Search Open Roles
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/careers/why-eden" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              Why Eden?
            </Link>
          </motion.div>
        </div>
      </section>

      <CareerSectionNav items={[...lifeAtEdenSectionNav]} ariaLabel="Life at Eden page sections" />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20 lg:pb-20">
        <RbtScrollReveal>
          <section id="our-culture" className={FRAME} aria-labelledby="culture-heading">
            <h2 id="culture-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Our Culture
            </h2>
            <AnimatedStatCounter stats={lifeAtEdenStats} className="mt-8" />
            <RbtStaggerGrid className="mt-10 grid gap-4 sm:grid-cols-3">
              {lifeAtEdenCultureCards.map((card) => (
                <RbtStaggerItem key={card.title}>
                  <div className="h-full rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-6 shadow-sm">
                    <Heart className="text-teal-700" size={22} aria-hidden="true" />
                    <h3 className="mt-4 text-lg font-extrabold text-slate-900">{card.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                  </div>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="team-environment" className={FRAME} aria-labelledby="team-heading">
            <h2 id="team-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Team Environment
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {lifeAtEdenTeamCards.map((card) => (
                <li key={card.title} className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm">
                  <Users className="text-teal-700" size={20} aria-hidden="true" />
                  <h3 className="mt-3 text-base font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="employee-experience" className={FRAME} aria-labelledby="experience-heading">
            <h2 id="experience-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Employee Experience
            </h2>
            <p className="mt-3 max-w-3xl text-base leading-8 text-slate-600">
              Day-in-the-life rhythms vary by role, but clinical team members often follow a structured flow of prep,
              direct care, documentation, and growth conversations.
            </p>
            <ol className="mt-8 space-y-4">
              {lifeAtEdenExperienceItems.map((item, index) => (
                <motion.li
                  key={item.title}
                  initial={reduceMotion ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.4, delay: index * 0.06, ease: EASE_OUT }}
                  className="flex gap-4 rounded-xl border border-teal-100 bg-gradient-to-r from-white to-teal-50/20 p-5"
                >
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-teal-700 text-xs font-black text-white">
                    {index + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                    <p className="mt-1 text-sm leading-7 text-slate-600">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="employee-stories" className="scroll-mt-28 space-y-10" aria-labelledby="stories-heading">
            <h2 id="stories-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Employee Stories
            </h2>
            <TestimonialsCarousel testimonials={lifeAtEdenTestimonials} />
            <RbtStaggerGrid className="grid gap-4 sm:grid-cols-3">
              {lifeAtEdenSpotlights.map((spotlight) => (
                <RbtStaggerItem key={spotlight.title}>
                  <article className="h-full rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md">
                    <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-bold uppercase text-teal-800">
                      {spotlight.highlight}
                    </span>
                    <h3 className="mt-3 text-base font-extrabold text-slate-900">{spotlight.title}</h3>
                    <p className="mt-2 text-sm leading-7 text-slate-600">{spotlight.description}</p>
                  </article>
                </RbtStaggerItem>
              ))}
            </RbtStaggerGrid>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="recognition-programs" className={FRAME} aria-labelledby="recognition-heading">
            <h2 id="recognition-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Recognition Programs
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {lifeAtEdenRecognition.map((item) => (
                <li key={item.title} className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm">
                  <Sparkles className="text-teal-700" size={20} aria-hidden="true" />
                  <h3 className="mt-3 text-base font-extrabold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="diversity-inclusion" className={FRAME} aria-labelledby="dei-heading">
            <h2 id="dei-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Diversity &amp; Inclusion
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {lifeAtEdenDeiCards.map((card) => (
                <li key={card.title} className="rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-white to-emerald-50/30 p-5">
                  <h3 className="text-base font-extrabold text-slate-900">{card.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{card.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="training-mentorship" className={FRAME} aria-labelledby="training-heading">
            <h2 id="training-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Training &amp; Mentorship
            </h2>
            <ul className="mt-8 space-y-4">
              {lifeAtEdenTraining.map((item, index) => (
                <li key={item.title} className="rounded-xl border border-teal-100 bg-white p-5 shadow-sm">
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-teal-800">Step {index + 1}</span>
                  <h3 className="mt-1 text-base font-extrabold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="work-life-balance" className={FRAME} aria-labelledby="balance-heading">
            <h2 id="balance-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Work-Life Balance
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {lifeAtEdenWorkLife.map((item) => (
                <li key={item.title} className="rounded-[1.25rem] border border-teal-100 bg-white p-5 shadow-sm">
                  <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="community-impact" className={FRAME} aria-labelledby="community-heading">
            <h2 id="community-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Community Impact
            </h2>
            <ul className="mt-8 grid gap-4 sm:grid-cols-3">
              {lifeAtEdenCommunity.map((item) => (
                <li key={item.title} className="rounded-[1.25rem] border border-teal-100 bg-gradient-to-br from-white to-teal-50/30 p-5">
                  <h3 className="text-base font-extrabold text-slate-900">{item.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600">{item.description}</p>
                </li>
              ))}
            </ul>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="photo-gallery" className="scroll-mt-28" aria-labelledby="gallery-heading">
            <h2 id="gallery-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Photo Gallery
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
              Team events, clinical collaboration, and family-centered moments across Eden.
            </p>
            <div className="mt-8">
              <MasonryGallery items={lifeAtEdenGallery} />
            </div>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section id="video-highlights" className="scroll-mt-28" aria-labelledby="video-heading">
            <h2 id="video-heading" className="text-2xl font-extrabold text-slate-900 sm:text-3xl">
              Video Highlights
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600">
              Recruiting stories, employee journeys, and community impact—curated for candidates exploring Eden.
            </p>
            <div className="mt-8">
              <VideoHighlightCards videos={lifeAtEdenVideos} />
            </div>
          </section>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <p className="rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-7 text-slate-600">
            {lifeAtEdenDisclaimer}
          </p>
        </RbtScrollReveal>

        <RbtScrollReveal>
          <section className="rounded-[2rem] border border-teal-200 bg-gradient-to-br from-teal-800 via-teal-700 to-emerald-700 p-8 text-white sm:p-10">
            <h2 className="text-2xl font-extrabold sm:text-3xl">See yourself at Eden?</h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-teal-50">
              Explore benefits, career pathways, and open roles to find your fit on our mission-driven team.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/careers/open-roles"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-teal-900"
              >
                Search Open Roles
              </Link>
              <Link href="/careers/benefits" className="inline-flex items-center justify-center rounded-full border-2 border-white/80 px-6 py-3 text-sm font-bold text-white">
                Benefits &amp; Compensation
              </Link>
            </div>
          </section>
        </RbtScrollReveal>
      </div>
    </CareerPageShell>
  );
}
