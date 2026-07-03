"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Heart, Megaphone, School } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useRef } from "react";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import AboutSectionNav from "@/components/about/AboutSectionNav";
import { AnimatedCounter, fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "@/components/about/shared";
import MasonryGallery from "@/components/careers/life-at-eden/MasonryGallery";
import VideoHighlightCards from "@/components/careers/life-at-eden/VideoHighlightCards";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import {
  ADVOCACY_EDUCATION,
  ANNUAL_HIGHLIGHTS,
  AWARENESS_INITIATIVES,
  COMMUNITY_GALLERY,
  COMMUNITY_IMPACT_SECTION_NAV,
  COMMUNITY_PARTNERS,
  COMMUNITY_STATS,
  COMMUNITY_TIMELINE,
  COMMUNITY_VIDEOS,
  FAMILY_EVENTS,
  FUTURE_INITIATIVES,
  PHOTO_SECTIONS,
  SCHOOL_PARTNERSHIPS,
  SUCCESS_STORIES,
  VOLUNTEER_PROGRAMS,
} from "@/lib/about/community-impact-data";
import { getButtonClasses } from "@/lib/button-styles";

const FRAME =
  "scroll-mt-28 rounded-[2rem] border border-emerald-100 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-10";

function StatCard({ label, value, suffix, detail }: (typeof COMMUNITY_STATS)[number]) {
  const ref = useRef<HTMLLIElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.li
      ref={ref}
      variants={staggerItem}
      className="rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-800"
    >
      <p className="text-3xl font-extrabold text-emerald-800 dark:text-emerald-300">
        <AnimatedCounter value={value} suffix={suffix} isVisible={inView} />
      </p>
      <p className="mt-2 text-sm font-bold text-slate-900 dark:text-white">{label}</p>
      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{detail}</p>
    </motion.li>
  );
}

export default function CommunityImpactPage() {
  const advocacyEducation = useLocalizedContent("ADVOCACY_EDUCATION", ADVOCACY_EDUCATION);
  const annualHighlights = useLocalizedContent("ANNUAL_HIGHLIGHTS", ANNUAL_HIGHLIGHTS);
  const awarenessInitiatives = useLocalizedContent("AWARENESS_INITIATIVES", AWARENESS_INITIATIVES);
  const communityGallery = useLocalizedContent("COMMUNITY_GALLERY", COMMUNITY_GALLERY);
  const communitySectionNav = useLocalizedContent("COMMUNITY_IMPACT_SECTION_NAV", COMMUNITY_IMPACT_SECTION_NAV);
  const communityPartners = useLocalizedContent("COMMUNITY_PARTNERS", COMMUNITY_PARTNERS);
  const communityStats = useLocalizedContent("COMMUNITY_STATS", COMMUNITY_STATS);
  const communityTimeline = useLocalizedContent("COMMUNITY_TIMELINE", COMMUNITY_TIMELINE);
  const communityVideos = useLocalizedContent("COMMUNITY_VIDEOS", COMMUNITY_VIDEOS);
  const familyEvents = useLocalizedContent("FAMILY_EVENTS", FAMILY_EVENTS);
  const futureInitiatives = useLocalizedContent("FUTURE_INITIATIVES", FUTURE_INITIATIVES);
  const photoSections = useLocalizedContent("PHOTO_SECTIONS", PHOTO_SECTIONS);
  const schoolPartnerships = useLocalizedContent("SCHOOL_PARTNERSHIPS", SCHOOL_PARTNERSHIPS);
  const successStories = useLocalizedContent("SUCCESS_STORIES", SUCCESS_STORIES);
  const volunteerPrograms = useLocalizedContent("VOLUNTEER_PROGRAMS", VOLUNTEER_PROGRAMS);
  const reduceMotion = useReducedMotion();

  return (
    <AboutPremiumLayout>
      <section
        className="relative overflow-hidden bg-gradient-to-br from-teal-50 via-white to-emerald-50 px-4 py-16 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 lg:px-8 lg:py-24"
        aria-labelledby="community-impact-heading"
      >
        <div className="relative mx-auto max-w-4xl text-center">
          <motion.p {...fadeUp} className="text-xs font-black uppercase tracking-[0.16em] text-emerald-800 dark:text-emerald-400">
            About Eden
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.06 }}
            id="community-impact-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl"
          >
            Community Impact
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-600 dark:text-slate-300"
          >
            Eden&apos;s commitment extends beyond the therapy room—through family events, school partnerships, advocacy,
            and volunteer programs that strengthen the autism community across Northern Virginia.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.18 }}
            className="mt-8 flex flex-col justify-center gap-3 sm:flex-row"
          >
            <Link href="/about/contact-us" className={getButtonClasses("primary", "w-full sm:w-auto")}>
              Connect With Us
              <ArrowRight size={18} aria-hidden="true" />
            </Link>
            <Link href="/resources/family-stories" className={getButtonClasses("secondary", "w-full sm:w-auto")}>
              Family Stories
            </Link>
          </motion.div>
        </div>
      </section>

      <AboutSectionNav items={[...communitySectionNav]} ariaLabel="Community Impact sections" />

      <div className="mx-auto max-w-6xl space-y-20 px-4 py-16 pb-24 lg:px-8 lg:py-20">
        <section id="overview" className={FRAME} aria-labelledby="overview-heading">
          <SectionEyebrow>Community Impact Overview</SectionEyebrow>
          <h2 id="overview-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Stronger Communities Through Connection
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-8 text-slate-600 dark:text-slate-300">
            We partner with families, schools, physicians, and local organizations to expand access to autism
            resources, reduce stigma, and create inclusive spaces where every child can thrive.
          </p>
          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4"
          >
            {communityStats.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </motion.ul>
        </section>

        <section id="family-events" className={FRAME} aria-labelledby="events-heading">
          <SectionEyebrow>Family Events</SectionEyebrow>
          <h2 id="events-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Event Gallery &amp; Gatherings
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2">
            {familyEvents.map((event) => (
              <li
                key={event.title}
                className="rounded-2xl border border-emerald-100 p-5 transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-700"
              >
                <Heart className="text-emerald-700" size={22} aria-hidden="true" />
                <p className="mt-3 text-base font-extrabold text-slate-900 dark:text-white">{event.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{event.description}</p>
              </li>
            ))}
          </ul>
          <div className="mt-10">
            <MasonryGallery items={communityGallery} />
          </div>
        </section>

        <section id="awareness" className={FRAME} aria-labelledby="awareness-heading">
          <SectionEyebrow>Autism Awareness Initiatives</SectionEyebrow>
          <h2 id="awareness-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Raising Awareness Year-Round
          </h2>
          <ul className="mt-8 space-y-3">
            {awarenessInitiatives.map((item) => (
              <li key={item} className="flex gap-3 text-sm leading-7 text-slate-700 dark:text-slate-200">
                <Megaphone className="mt-0.5 shrink-0 text-emerald-700" size={16} aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="school-partnerships" className={FRAME} aria-labelledby="schools-heading">
          <SectionEyebrow>School Partnerships</SectionEyebrow>
          <h2 id="schools-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Supporting Educators &amp; Students
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {schoolPartnerships.map((item) => (
              <li key={item.title} className="rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 dark:border-slate-700 dark:bg-slate-800/40">
                <School className="text-emerald-700" size={22} aria-hidden="true" />
                <p className="mt-3 text-base font-extrabold text-slate-900 dark:text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="community-partnerships" className={FRAME} aria-labelledby="partners-heading">
          <SectionEyebrow>Community Partnerships</SectionEyebrow>
          <h2 id="partners-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Partners Across Northern Virginia
          </h2>
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {communityPartners.map((partner) => (
              <li key={partner} className="rounded-xl border border-emerald-100 px-4 py-3 text-sm font-semibold text-slate-700 dark:border-slate-700 dark:text-slate-200">
                {partner}
              </li>
            ))}
          </ul>
        </section>

        <section id="volunteer" className={FRAME} aria-labelledby="volunteer-heading">
          <SectionEyebrow>Volunteer Programs</SectionEyebrow>
          <h2 id="volunteer-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Give Back With Eden
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-3">
            {volunteerPrograms.map((program) => (
              <li key={program.title} className="rounded-2xl border border-emerald-100 p-5 dark:border-slate-700">
                <p className="text-base font-extrabold text-slate-900 dark:text-white">{program.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{program.description}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="advocacy" className={FRAME} aria-labelledby="advocacy-heading">
          <SectionEyebrow>Advocacy &amp; Education</SectionEyebrow>
          <h2 id="advocacy-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Empowering Families &amp; Referral Partners
          </h2>
          <ul className="mt-8 space-y-3">
            {advocacyEducation.map((item) => (
              <li key={item} className="rounded-xl bg-emerald-50/60 px-4 py-3 text-sm leading-7 text-slate-700 dark:bg-slate-800/60 dark:text-slate-200">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section id="stories" className={FRAME} aria-labelledby="stories-heading">
          <SectionEyebrow>Community Stories</SectionEyebrow>
          <h2 id="stories-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Success Stories
          </h2>
          <ul className="mt-8 grid gap-4 lg:grid-cols-3">
            {successStories.map((story, index) => (
              <motion.li
                key={story.attribution}
                initial={reduceMotion ? false : { opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className="rounded-2xl border border-emerald-100 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-800"
              >
                <p className="text-sm leading-7 text-slate-700 dark:text-slate-200">&ldquo;{story.quote}&rdquo;</p>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
                  {story.attribution}
                </p>
              </motion.li>
            ))}
          </ul>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {photoSections.map((section) => (
              <article key={section.title} className="overflow-hidden rounded-2xl border border-emerald-100 dark:border-slate-700">
                <div className="relative aspect-[16/10] bg-emerald-50">
                  <Image src={section.image} alt={section.title} fill className="object-cover" sizes="(max-width:768px) 100vw, 50vw" />
                </div>
                <div className="p-5">
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-white">{section.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{section.description}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-10">
            <VideoHighlightCards videos={communityVideos} />
          </div>
        </section>

        <section id="impact-highlights" className={FRAME} aria-labelledby="highlights-heading">
          <SectionEyebrow>Annual Impact Highlights</SectionEyebrow>
          <h2 id="highlights-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            2025 at a Glance
          </h2>
          <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {annualHighlights.map((item) => (
              <li key={item.label} className="rounded-2xl bg-emerald-700 p-6 text-center text-white">
                <p className="text-3xl font-extrabold">{item.metric}</p>
                <p className="mt-2 text-sm font-semibold text-emerald-50">{item.label}</p>
              </li>
            ))}
          </ul>
        </section>

        <section id="future" className={FRAME} aria-labelledby="future-heading">
          <SectionEyebrow>Future Initiatives</SectionEyebrow>
          <h2 id="future-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
            Interactive Timeline &amp; What&apos;s Next
          </h2>
          <motion.ol
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {communityTimeline.map((entry) => (
              <motion.li
                key={entry.year}
                variants={staggerItem}
                className="rounded-2xl border border-emerald-100 p-5 transition hover:border-emerald-300 dark:border-slate-700"
              >
                <p className="text-xs font-black uppercase tracking-widest text-emerald-700 dark:text-emerald-400">{entry.year}</p>
                <p className="mt-2 text-base font-extrabold text-slate-900 dark:text-white">{entry.title}</p>
                <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">{entry.description}</p>
              </motion.li>
            ))}
          </motion.ol>
          <ul className="mt-10 space-y-3 border-t border-emerald-100 pt-8 dark:border-slate-700">
            {futureInitiatives.map((item) => (
              <li key={item} className="text-sm leading-7 text-slate-700 dark:text-slate-200">
                → {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </AboutPremiumLayout>
  );
}
