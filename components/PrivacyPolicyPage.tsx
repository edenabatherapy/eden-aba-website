"use client";

import {
  ArrowRight,
  Baby,
  Cookie,
  Database,
  FileText,
  Leaf,
  Link2,
  Lock,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  RefreshCw,
  Share2,
  Shield,
  UserCheck,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import EdenButton from "@/components/EdenButton";
import PrivacyPolicyNewsletterSection from "@/components/privacy/PrivacyPolicyNewsletterSection";
import {
  PRIVACY_POLICY_CTA,
  PRIVACY_POLICY_HERO,
  PRIVACY_POLICY_INTRO,
  PRIVACY_POLICY_SECTIONS,
  type PrivacyPolicySection,
  type PrivacyPolicySubsection,
} from "@/lib/privacy-policy-content";

type BusinessInfo = {
  address: string;
  phone: string;
  fax: string;
  email: string;
};

type NewsletterLabels = {
  title: string;
  fullName: string;
  email: string;
  joinNewsletter: string;
  newsletterThanks: string;
  newsletterThanksEnd: string;
};

type PrivacyPolicyPageProps = {
  businessInfo: BusinessInfo;
  newsletter: NewsletterLabels;
  onLearnAba?: () => void;
  onConsultation?: () => void;
};

const SECTION_ICONS: Record<string, LucideIcon> = {
  "who-we-are": Shield,
  "information-we-collect": Database,
  "how-we-use-information": FileText,
  hipaa: Lock,
  cookies: Cookie,
  sms: MessageSquare,
  "information-sharing": Share2,
  "data-security": Shield,
  "childrens-privacy": Baby,
  "third-party-links": Link2,
  "your-rights": UserCheck,
  changes: RefreshCw,
  contact: Mail,
};

function PolicyList({ items }: { items: string[] }) {
  return (
    <ul className="mt-4 grid gap-2.5">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-7 text-slate-700">
          <span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-emerald-600" aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PolicyParagraphs({ paragraphs }: { paragraphs: string[] }) {
  return (
    <>
      {paragraphs.map((paragraph) => (
        <p key={paragraph} className="mt-4 text-base leading-8 text-slate-700">
          {paragraph}
        </p>
      ))}
    </>
  );
}

function PolicySubsection({ subsection }: { subsection: PrivacyPolicySubsection }) {
  return (
    <div className="mt-6 rounded-2xl border border-emerald-100/80 bg-emerald-50/35 p-5 sm:p-6">
      {subsection.title ? (
        <h3 className="text-lg font-extrabold tracking-tight text-slate-900">{subsection.title}</h3>
      ) : null}
      {subsection.paragraphs?.length ? <PolicyParagraphs paragraphs={subsection.paragraphs} /> : null}
      {subsection.listItems?.length ? <PolicyList items={subsection.listItems} /> : null}
    </div>
  );
}

function PolicySectionBlock({ section }: { section: PrivacyPolicySection }) {
  const Icon = SECTION_ICONS[section.id] ?? FileText;

  return (
    <section
      id={section.id}
      aria-labelledby={`${section.id}-heading`}
      className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm shadow-slate-900/[0.04] sm:p-8"
    >
      <div className="flex items-start gap-4">
        <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
          <Icon size={20} aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1 border-l-4 border-emerald-600 pl-4 sm:pl-5">
          <h2 id={`${section.id}-heading`} className="text-2xl font-extrabold tracking-tight text-slate-900">
            {section.title}
          </h2>
        </div>
      </div>

      <div className="mt-5 pl-0 sm:pl-[3.75rem]">
        {section.paragraphs?.length ? <PolicyParagraphs paragraphs={section.paragraphs} /> : null}
        {section.listItems?.length ? <PolicyList items={section.listItems} /> : null}
        {section.subsections?.map((subsection) => (
          <PolicySubsection key={subsection.title ?? subsection.paragraphs?.[0]} subsection={subsection} />
        ))}
      </div>
    </section>
  );
}

function ContactDetails({ businessInfo }: { businessInfo: BusinessInfo }) {
  return (
    <div className="mt-6 grid gap-4 rounded-2xl border border-emerald-100 bg-emerald-50/40 p-5 sm:p-6">
      <p className="text-lg font-extrabold text-slate-900">Eden ABA Therapy</p>

      <div className="flex gap-3 text-base leading-7 text-slate-700">
        <MapPin size={18} className="mt-1 shrink-0 text-emerald-700" aria-hidden="true" />
        <div>
          <p className="font-bold text-slate-900">Address</p>
          <p>7700 Little River Turnpike, Suite 304</p>
          <p>Annandale, VA 22003</p>
          <p>United States</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-base text-slate-700">
        <Phone size={18} className="shrink-0 text-emerald-700" aria-hidden="true" />
        <div>
          <p className="font-bold text-slate-900">Office Phone</p>
          <a href={`tel:${businessInfo.phone.replace(/\D/g, "")}`} className="font-semibold text-emerald-800 hover:underline">
            {businessInfo.phone}
          </a>
        </div>
      </div>

      <div className="flex items-center gap-3 text-base text-slate-700">
        <FileText size={18} className="shrink-0 text-emerald-700" aria-hidden="true" />
        <div>
          <p className="font-bold text-slate-900">Fax</p>
          <p>{businessInfo.fax}</p>
        </div>
      </div>

      <div className="flex items-center gap-3 text-base text-slate-700">
        <Mail size={18} className="shrink-0 text-emerald-700" aria-hidden="true" />
        <div>
          <p className="font-bold text-slate-900">Email</p>
          <a href={`mailto:${businessInfo.email}`} className="font-semibold text-emerald-800 hover:underline">
            {businessInfo.email}
          </a>
        </div>
      </div>

      <div className="text-base text-slate-700">
        <p className="font-bold text-slate-900">Website</p>
        <a href="https://www.edenabatherapy.com" className="font-semibold text-emerald-800 hover:underline">
          https://www.edenabatherapy.com
        </a>
      </div>
    </div>
  );
}


export default function PrivacyPolicyPage({
  businessInfo,
  newsletter,
  onLearnAba,
  onConsultation,
}: PrivacyPolicyPageProps) {
  const hero = PRIVACY_POLICY_HERO;
  const intro = PRIVACY_POLICY_INTRO;
  const cta = PRIVACY_POLICY_CTA;
  const sections = PRIVACY_POLICY_SECTIONS.filter((section) => section.id !== "contact");
  const contactSection = PRIVACY_POLICY_SECTIONS.find((section) => section.id === "contact");

  return (
    <div className="bg-white text-slate-900">
      <section className="relative overflow-hidden bg-gradient-to-br from-[#f7fbf8] via-white to-[#eef8f3] px-4 py-16 sm:py-20 lg:px-8">
        <div className="pointer-events-none absolute -right-20 top-8 h-72 w-72 rounded-full bg-emerald-200/30 blur-3xl" />
        <div className="pointer-events-none absolute -left-16 bottom-0 h-64 w-64 rounded-full bg-teal-200/25 blur-3xl" />

        <div className="relative mx-auto max-w-4xl text-center">
          <span className="inline-flex items-center rounded-full border border-emerald-200 bg-white px-4 py-2 text-xs font-black uppercase tracking-[0.18em] text-emerald-800">
            {hero.badge}
          </span>

          <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            {hero.title}
          </h1>

          <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-slate-600 sm:text-xl">
            {hero.subtitle}
          </p>

          <p className="mt-5 text-sm font-bold uppercase tracking-[0.16em] text-emerald-700">
            {hero.effectiveDate}
          </p>
        </div>
      </section>

      <main className="px-4 py-12 sm:py-16 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <div className="rounded-[1.75rem] border border-slate-100 bg-slate-50/70 p-6 sm:p-8">
            <p className="text-sm font-bold uppercase tracking-[0.14em] text-emerald-700">{intro.effectiveDate}</p>
            <PolicyParagraphs paragraphs={intro.paragraphs} />
          </div>

          <div className="mt-10 grid gap-8">
            {sections.map((section) => (
              <PolicySectionBlock key={section.id} section={section} />
            ))}

            {contactSection ? (
              <section
                id="contact"
                aria-labelledby="contact-heading"
                className="rounded-[1.75rem] border border-slate-100 bg-white p-6 shadow-sm shadow-slate-900/[0.04] sm:p-8"
              >
                <div className="flex items-start gap-4">
                  <span className="mt-0.5 inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-700">
                    <Mail size={20} aria-hidden="true" />
                  </span>
                  <div className="min-w-0 flex-1 border-l-4 border-emerald-600 pl-4 sm:pl-5">
                    <h2 id="contact-heading" className="text-2xl font-extrabold tracking-tight text-slate-900">
                      {contactSection.title}
                    </h2>
                  </div>
                </div>

                <div className="mt-5 pl-0 sm:pl-[3.75rem]">
                  {contactSection.paragraphs?.length ? (
                    <PolicyParagraphs paragraphs={contactSection.paragraphs} />
                  ) : null}
                  <ContactDetails businessInfo={businessInfo} />
                </div>
              </section>
            ) : null}
          </div>
        </div>
      </main>

      <section className="w-full bg-white py-12 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative w-full overflow-hidden rounded-[32px] bg-gradient-to-br from-[#032f2b] via-[#0b4f4f] to-[#1f7a2e] px-6 py-12 text-white shadow-2xl shadow-emerald-950/20 sm:px-10 sm:py-14 lg:px-14">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-lime-300/10 blur-2xl" />
            <div className="pointer-events-none absolute -bottom-12 left-8 h-44 w-44 rounded-full bg-emerald-300/10 blur-2xl" />
            <Leaf className="pointer-events-none absolute right-8 top-8 h-16 w-16 text-white/10" aria-hidden="true" />

            <div className="relative mx-auto max-w-4xl text-center">
              <h2 className="text-3xl font-extrabold tracking-tight sm:text-4xl">{cta.title}</h2>
              <p className="mx-auto mt-5 max-w-2xl text-base leading-8 text-emerald-50 sm:text-lg">{cta.text}</p>

              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <EdenButton
                  variant="primarySite"
                  onClick={onLearnAba}
                  className="min-w-[240px] justify-center bg-lime-500 text-emerald-950 hover:bg-lime-400"
                >
                  {cta.primaryCta} <ArrowRight size={18} />
                </EdenButton>
                <EdenButton
                  variant="secondarySite"
                  onClick={onConsultation}
                  className="min-w-[240px] justify-center border-white/30 bg-white/10 text-white hover:bg-white/15"
                >
                  {cta.secondaryCta}
                </EdenButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PrivacyPolicyNewsletterSection labels={newsletter} />
    </div>
  );
}
