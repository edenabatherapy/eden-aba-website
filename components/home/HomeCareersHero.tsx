"use client";

import Link from "next/link";

const reasons = [
  {
    title: "Flexible Scheduling",
    text: "Full-time, part-time, and flexible options to support your work-life balance.",
    icon: "calendar",
  },
  {
    title: "Clinical Growth & Development",
    text: "BCBA supervision, mentorship, and ongoing CEU support.",
    icon: "growth",
  },
  {
    title: "Supportive Team Culture",
    text: "Collaborative, inclusive, and family-centered environment.",
    icon: "team",
  },
  {
    title: "Competitive Benefits",
    text: "Health insurance, PTO, CEU reimbursement, and retirement options.",
    icon: "shield",
  },
  {
    title: "Make a Meaningful Impact",
    text: "Help children and families achieve life-changing progress.",
    icon: "star",
  },
  {
    title: "Career Advancement",
    text: "Clear growth paths and leadership opportunities within Eden.",
    icon: "steps",
  },
];

function CareerIcon({ name }: { name: string }) {
  if (name === "calendar") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect x="4" y="5" width="16" height="15" rx="2" stroke="currentColor" strokeWidth="2" />
        <path d="M8 3v4M16 3v4M4 10h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "growth") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M4 19V9M10 19V5M16 19v-8M22 19H2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M5 10l5-5 5 6 4-4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }

  if (name === "team") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M16 21a6 6 0 0 0-12 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <circle cx="10" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
        <path d="M21 20a5 5 0 0 0-4-4.8M17 4.4a4 4 0 0 1 0 7.2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "shield") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l7 3v5c0 4.7-2.9 8.9-7 10-4.1-1.1-7-5.3-7-10V6l7-3z" stroke="currentColor" strokeWidth="2" />
        <path d="M8.8 12.2l2.1 2.1 4.4-5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    );
  }

  if (name === "star") {
    return (
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 3l2.8 5.7 6.2.9-4.5 4.4 1.1 6.2L12 17.3l-5.6 2.9 1.1-6.2L3 9.6l6.2-.9L12 3z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      </svg>
    );
  }

  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 19h4v-4H5v4zM10 19h4v-8h-4v8zM15 19h4V7h-4v12z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M5 11l5-5 4 4 5-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 4h3v3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function HomeCareersHero() {
  return (
    <section className="eden-careers-hero" aria-labelledby="eden-careers-title">
      <div className="eden-careers-hero__shell">
        <div>
          <h2 className="eden-careers-hero__title" id="eden-careers-title">
            Join the Eden ABA Therapy Team
          </h2>

          <p className="eden-careers-hero__micro">
            <span>✦</span> Make a difference. Build your future.
          </p>

          <p className="eden-careers-hero__copy">
            Help children grow through compassionate, evidence-based ABA therapy while building a rewarding career with supportive leadership.
          </p>

          <div className="eden-careers-hero__actions">
            <Link
              href="/careers/open-roles"
              className="eden-careers-btn eden-careers-btn--primary"
              onClick={() => {
                window.location.assign("/careers/open-roles");
              }}
            >
              <span>Search Open Roles</span>
              <span aria-hidden="true">›</span>
            </Link>

            <Link
              href="/careers/benefits-compensation"
              className="eden-careers-btn eden-careers-btn--secondary"
              onClick={() => {
                window.location.assign("/careers/benefits-compensation");
              }}
            >
              <span>Benefits & Compensation</span>
              <span aria-hidden="true">›</span>
            </Link>

            <Link
              href="/careers/compensation-estimator"
              className="eden-careers-btn eden-careers-btn--estimator"
              onClick={() => {
                window.location.assign("/careers/compensation-estimator");
              }}
            >
              <span>Compensation Estimator</span>
              <span aria-hidden="true">›</span>
            </Link>
          </div>
        </div>

        <aside className="eden-careers-panel" aria-label="Why candidates choose Eden">
          <div className="eden-careers-panel__light" aria-hidden="true" />

          <div className="eden-careers-panel__header">
            <span>✦</span>
            <h3>Why Work at Eden?</h3>
          </div>

          <div className="eden-careers-reasons">
            {reasons.map((reason) => (
              <article className="eden-careers-reason" key={reason.title}>
                <div className="eden-careers-reason__icon">
                  <CareerIcon name={reason.icon} />
                </div>
                <div>
                  <strong>{reason.title}</strong>
                  <p>{reason.text}</p>
                </div>
                <div className="eden-careers-reason__arrow" aria-hidden="true">
                  ↑
                </div>
              </article>
            ))}
          </div>
        </aside>
      </div>
    </section>
  );
}

export default HomeCareersHero;
