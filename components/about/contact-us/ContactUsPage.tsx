"use client";

import { Suspense } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import {
  ArrowRight,
  Briefcase,
  Clock,
  HeartHandshake,
  Mail,
  MapPin,
  Navigation,
  Phone,
  Send,
  Stethoscope,
  Users,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import AboutPremiumLayout from "@/components/about/AboutPremiumLayout";
import ContactUsPageSchema from "@/components/about/contact-us/ContactUsPageSchema";
import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import AboutContactForm from "@/components/about/contact-us/AboutContactForm";
import { fadeUp, SectionEyebrow, staggerContainer, staggerItem } from "@/components/about/shared";
import FAQAccordion from "@/components/careers/hub/FAQAccordion";
import {
  ANNANDALE_OFFICE,
  CONTACT_PATHWAY_CARDS,
  CONTACT_US_FAQ,
  EDEN_CONTACT,
  OFFICE_HOURS_DISPLAY,
  PARKING_INFO,
  REFERRAL_PARTNER_TYPES,
  RESPONSE_TIME,
  SERVICE_AREA_CITIES,
} from "@/lib/about/contact-us-data";
import { getButtonClasses } from "@/lib/button-styles";

const GoogleMapInteractive = dynamic(() => import("@/components/GoogleMapInteractive"), {
  ssr: false,
  loading: () => (
    <div
      className="eden-map-canvas eden-map-canvas--compact w-full animate-pulse rounded-2xl bg-emerald-50 dark:bg-slate-800"
      aria-hidden="true"
    />
  ),
});

const PATHWAY_ICONS = {
  families: HeartHandshake,
  referrals: Stethoscope,
  clients: Users,
  careers: Briefcase,
} as const;

function formHref(inquiry?: string) {
  if (!inquiry) return "#contact-form";
  return `/about/contact-us?inquiry=${encodeURIComponent(inquiry)}#contact-form`;
}

function ContactFormSection() {
  return (
    <section
      id="contact-form"
      className="scroll-mt-24 rounded-[2rem] border border-slate-200/80 bg-white p-6 shadow-lg shadow-emerald-900/5 dark:border-slate-700 dark:bg-slate-900 sm:p-10"
      aria-labelledby="contact-form-heading"
    >
      <SectionEyebrow>Secure Contact Form</SectionEyebrow>
      <h2 id="contact-form-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
        Send an Inquiry
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
        One intelligent form routes your message to the right Eden team. Select your inquiry type and we&apos;ll show
        the fields that matter most.
      </p>
      <div className="mt-8">
        <Suspense
          fallback={
            <div className="h-64 animate-pulse rounded-2xl bg-slate-100 dark:bg-slate-800" aria-hidden="true" />
          }
        >
          <AboutContactForm />
        </Suspense>
      </div>
    </section>
  );
}

export default function ContactUsPage() {
  const pathwayCards = useLocalizedContent("CONTACT_PATHWAY_CARDS", CONTACT_PATHWAY_CARDS);
  const contactFaq = useLocalizedContent("CONTACT_US_FAQ", CONTACT_US_FAQ);
  const referralPartnerTypes = useLocalizedContent("REFERRAL_PARTNER_TYPES", REFERRAL_PARTNER_TYPES);
  const responseTime = useLocalizedContent("RESPONSE_TIME", RESPONSE_TIME);
  const officeHours = useLocalizedContent("OFFICE_HOURS_DISPLAY", OFFICE_HOURS_DISPLAY);
  const parkingInfo = useLocalizedContent("PARKING_INFO", PARKING_INFO);
  const reduceMotion = useReducedMotion();

  const cardMotion = (index: number) =>
    reduceMotion
      ? {}
      : {
          initial: { opacity: 0, y: 20 },
          whileInView: { opacity: 1, y: 0 },
          viewport: { once: true, margin: "-40px" },
          transition: { duration: 0.45, delay: index * 0.06 },
        };

  return (
    <AboutPremiumLayout schema={<ContactUsPageSchema />}>
      <section
        className="relative overflow-hidden border-b border-emerald-100/80 bg-gradient-to-br from-slate-900 via-emerald-950 to-slate-900 px-4 py-20 text-white dark:border-slate-800 lg:px-8 lg:py-28"
        aria-labelledby="contact-us-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(16,185,129,0.18),_transparent_55%)]"
          aria-hidden="true"
        />
        <div className="relative mx-auto max-w-5xl text-center">
          <motion.p {...fadeUp} className="text-xs font-black uppercase tracking-[0.2em] text-emerald-300">
            Contact Eden ABA Therapy
          </motion.p>
          <motion.h1
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.06 }}
            id="contact-us-heading"
            className="mt-4 text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl"
          >
            We&apos;re Here to Help
          </motion.h1>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.12 }}
            className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-emerald-50/90"
          >
            Supporting families, referral partners, schools, and professionals across Northern Virginia.
          </motion.p>
          <motion.div
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.18 }}
            className="mx-auto mt-10 grid max-w-3xl gap-3 sm:grid-cols-2"
          >
            <a href={EDEN_CONTACT.phoneHref} className={getButtonClasses("primary", "w-full justify-center")}>
              <Phone size={18} aria-hidden="true" />
              Call Now
            </a>
            <Link href="/intake" className={getButtonClasses("outlineOnDark", "w-full")}>
              Start Intake
            </Link>
            <Link href={formHref("Referral Inquiry")} className={getButtonClasses("outlineOnDark", "w-full")}>
              Refer a Child
            </Link>
            <Link href="/careers/open-roles" className={getButtonClasses("outlineOnDark", "w-full")}>
              Careers
            </Link>
          </motion.div>
          <motion.p
            {...fadeUp}
            transition={{ ...fadeUp.transition, delay: 0.24 }}
            className="mt-6 text-sm text-emerald-200/80"
          >
            <a href={EDEN_CONTACT.emailHref} className="inline-flex items-center gap-2 font-semibold hover:text-white">
              <Mail size={14} aria-hidden="true" />
              {EDEN_CONTACT.email}
            </a>
          </motion.p>
        </div>
      </section>

      <div className="eden-section eden-section--mint px-4 py-16 lg:px-8 lg:py-20"><div className="mx-auto max-w-6xl">
        <section aria-labelledby="get-in-touch-heading" className="mb-20">
          <div className="max-w-2xl">
            <SectionEyebrow>Get in Touch</SectionEyebrow>
            <h2 id="get-in-touch-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              Choose Your Pathway
            </h2>
            <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
              Whether you&apos;re starting services, referring a child, or supporting a current client—connect with the
              right team in one place.
            </p>
          </div>

          <motion.ul
            variants={staggerContainer}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-40px" }}
            className="mt-10 grid gap-5 sm:grid-cols-2"
          >
            {pathwayCards.map((card, index) => {
              const Icon = PATHWAY_ICONS[card.id];
              const href =
                card.ctaHref === "/intake" || card.ctaHref === "/careers/open-roles"
                  ? card.ctaHref
                  : formHref(card.inquiryPreset);

              return (
                <motion.li
                  key={card.id}
                  variants={staggerItem}
                  {...cardMotion(index)}
                  className="group flex flex-col rounded-[1.5rem] border border-emerald-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:border-emerald-200 hover:shadow-md dark:border-slate-700 dark:bg-slate-900"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-700 text-white shadow-sm">
                    <Icon size={22} aria-hidden="true" />
                  </div>
                  <h3 className="mt-5 text-lg font-extrabold text-slate-900 dark:text-white">{card.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-7 text-slate-600 dark:text-slate-300">{card.description}</p>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
                    {card.contactMethod}
                  </p>
                  <Link
                    href={href}
                    className={`${getButtonClasses("secondary", "mt-5 w-full justify-center sm:w-auto")} group-hover:border-emerald-300`}
                  >
                    {card.ctaLabel}
                    <ArrowRight size={16} aria-hidden="true" />
                  </Link>
                </motion.li>
              );
            })}
          </motion.ul>
        </section>

        <div className="mb-20">
          <ContactFormSection />
        </div>

        {/* Our Annandale Office — map, directions, service areas, office hours (single block) */}
        <section
          id="our-annandale-office"
          aria-labelledby="annandale-office-heading"
          className="mb-20 overflow-hidden rounded-[2rem] border border-emerald-100 bg-white shadow-sm dark:border-slate-700 dark:bg-slate-900"
        >
          <div className="border-b border-emerald-100 px-6 py-8 dark:border-slate-700 sm:px-10 sm:py-10">
            <SectionEyebrow>Visit Our Clinic</SectionEyebrow>
            <h2 id="annandale-office-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
              {ANNANDALE_OFFICE.title}
            </h2>
            <p className="mt-3 max-w-2xl text-base leading-8 text-slate-600 dark:text-slate-300">
              {ANNANDALE_OFFICE.subtitle}
            </p>
            <address className="mt-5 not-italic text-sm font-semibold leading-7 text-slate-700 dark:text-slate-200">
              {EDEN_CONTACT.address.street}
              <br />
              {EDEN_CONTACT.address.suite}
              <br />
              {EDEN_CONTACT.address.city}, {EDEN_CONTACT.address.state} {EDEN_CONTACT.address.zip}
            </address>
          </div>

          <div className="px-4 py-6 sm:px-6 sm:py-8">
            <GoogleMapInteractive
              address={EDEN_CONTACT.address.full}
              title="Eden ABA Therapy Annandale office map"
              className="eden-map-canvas eden-map-canvas--compact w-full"
            />
          </div>

          <div className="grid gap-0 border-t border-emerald-100 dark:border-slate-700 lg:grid-cols-3">
            <div className="border-b border-emerald-100 p-6 dark:border-slate-700 sm:p-8 lg:border-b-0 lg:border-r">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-400">
                <Navigation size={16} aria-hidden="true" />
                Directions
              </h3>
              <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{parkingInfo}</p>
              <a
                href={EDEN_CONTACT.directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={`${getButtonClasses("secondary", "mt-5")} inline-flex`}
              >
                Get Directions
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>

            <div className="border-b border-emerald-100 p-6 dark:border-slate-700 sm:p-8 lg:border-b-0 lg:border-r">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-400">
                <MapPin size={16} aria-hidden="true" />
                Service Areas
              </h3>
              <ul className="mt-4 flex flex-wrap gap-2">
                {SERVICE_AREA_CITIES.map((city) => (
                  <li
                    key={city}
                    className="rounded-full border border-emerald-200 bg-emerald-50/60 px-3 py-1.5 text-xs font-bold text-emerald-900 dark:border-slate-600 dark:bg-slate-800 dark:text-emerald-200"
                  >
                    {city}
                  </li>
                ))}
              </ul>
            </div>

            <div className="p-6 sm:p-8">
              <h3 className="flex items-center gap-2 text-sm font-black uppercase tracking-[0.14em] text-emerald-800 dark:text-emerald-400">
                <Clock size={16} aria-hidden="true" />
                Office Hours
              </h3>
              <ul className="mt-4 space-y-3">
                {[officeHours.weekdays, officeHours.saturday, officeHours.sunday].map(
                  (row) => (
                    <li key={row.label} className="flex justify-between gap-4 text-sm">
                      <span className="font-bold text-slate-900 dark:text-white">{row.label}</span>
                      <span className="font-semibold text-slate-600 dark:text-slate-300">{row.hours}</span>
                    </li>
                  ),
                )}
              </ul>
              <div className="mt-6 rounded-xl bg-emerald-50 p-4 dark:bg-emerald-950/30">
                <p className="text-xs font-black uppercase tracking-wide text-emerald-800 dark:text-emerald-400">
                  Response Time
                </p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex items-start justify-between gap-3">
                    <dt className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                      <Phone size={14} aria-hidden="true" />
                      Phone
                    </dt>
                    <dd className="font-bold text-slate-900 dark:text-white">{responseTime.phone}</dd>
                  </div>
                  <div className="flex items-start justify-between gap-3">
                    <dt className="flex items-center gap-1.5 font-semibold text-slate-700 dark:text-slate-200">
                      <Send size={14} aria-hidden="true" />
                      Online
                    </dt>
                    <dd className="font-bold text-slate-900 dark:text-white">{responseTime.online}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </section>

        <section
          aria-labelledby="referrals-heading"
          className="mb-20 rounded-[2rem] border border-slate-200 bg-slate-50 p-8 dark:border-slate-700 dark:bg-slate-900/50 sm:p-10"
        >
          <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-xl">
              <SectionEyebrow>Referral Partners</SectionEyebrow>
              <h2 id="referrals-heading" className="mt-3 text-2xl font-extrabold text-slate-900 dark:text-white sm:text-3xl">
                Professional Referrals
              </h2>
              <p className="mt-3 text-base leading-8 text-slate-600 dark:text-slate-300">
                We collaborate with medical, educational, and therapeutic partners to support coordinated autism care
                across Northern Virginia.
              </p>
            </div>
            <Link href={formHref("Referral Inquiry")} className={`${getButtonClasses("primary")} shrink-0`}>
              Submit Referral
              <ArrowRight size={16} aria-hidden="true" />
            </Link>
          </div>

          <ul className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {referralPartnerTypes.map((partner, index) => (
              <motion.li
                key={partner}
                initial={reduceMotion ? false : { opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.04 }}
                className="flex items-center gap-3 rounded-xl border border-white bg-white px-4 py-3.5 text-sm font-semibold text-slate-700 shadow-sm dark:border-slate-700 dark:bg-slate-800 dark:text-slate-200"
              >
                <Stethoscope size={16} className="shrink-0 text-emerald-700" aria-hidden="true" />
                {partner}
              </motion.li>
            ))}
          </ul>
        </section>

        <section className="rounded-[2rem] border border-emerald-100 bg-white p-8 dark:border-slate-700 dark:bg-slate-900 sm:p-10">
          <FAQAccordion title="Frequently Asked Questions" items={contactFaq} />
        </section>
      </div>
      </div>
    </AboutPremiumLayout>
  );
}
