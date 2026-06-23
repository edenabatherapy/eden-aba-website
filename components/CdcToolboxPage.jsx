"use client";

import Script from "next/script";
import "./eden-cdc-clock.css";
import "./CdcToolboxPage.css";

const MILESTONES = [
  { label: "Birth", color: "#38bdf8" },
  { label: "9 month developmental screening", color: "#22d3ee" },
  { label: "18 month developmental + autism screening", color: "#4ade80" },
  { label: "24 month autism screening", color: "#fde047" },
  { label: "Concern / referral", color: "#fb7185" },
  { label: "Diagnosis", color: "#a78bfa" },
  { label: "Care pathway", color: "#f472b6" },
  { label: "30 month developmental screening", color: "#67e8f9" },
];

export default function CdcToolboxPage() {
  const syncCdcData = () => {
    if (typeof window.setCDCData === "function") {
      window.setCDCData({
        prevalence: "1 in 31",
        percent: "3.2%",
        addmYear: "2022",
        ageGroup: "8-year-old children",
        developmentalScreening: ["9m", "18m", "30m"],
        autismScreening: ["18m", "24m"],
      });
    }

    if (typeof window.initChildClock === "function") {
      window.initChildClock();
    }
  };

  return (
    <>
      <section className="eden-cdc-clock-section">
        <div className="eden-cdc-toolbox">
          <p className="cdc-toolbox__eyebrow">Eden ABA Therapy · CDC Reference</p>
          <h1 className="cdc-toolbox__title">CDC Early Screening Toolbox</h1>
          <p className="cdc-toolbox__intro">
            Reference panel for CDC-informed autism prevalence, recommended screening ages, and
            early-care milestones. The Child Clock on the right visualizes the developmental timeline
            in real time.
          </p>

          <section className="cdc-toolbox__panel" aria-labelledby="cdc-prevalence-heading">
            <h2 id="cdc-prevalence-heading">Autism Prevalence (ADDM)</h2>
            <dl className="cdc-toolbox__stat-grid">
              <div className="cdc-toolbox__stat">
                <dt>Prevalence estimate</dt>
                <dd>1 in 31</dd>
              </div>
              <div className="cdc-toolbox__stat">
                <dt>Percentage</dt>
                <dd>3.2%</dd>
              </div>
              <div className="cdc-toolbox__stat">
                <dt>ADDM report year</dt>
                <dd>2022</dd>
              </div>
              <div className="cdc-toolbox__stat">
                <dt>Age group</dt>
                <dd>8-year-old children</dd>
              </div>
            </dl>
          </section>

          <section className="cdc-toolbox__panel" aria-labelledby="cdc-screening-heading">
            <h2 id="cdc-screening-heading">Recommended Screening Ages</h2>
            <p className="cdc-toolbox__intro" style={{ marginBottom: 12 }}>
              Developmental screening
            </p>
            <div className="cdc-toolbox__chips">
              <span className="cdc-toolbox__chip">9 months</span>
              <span className="cdc-toolbox__chip">18 months</span>
              <span className="cdc-toolbox__chip">30 months</span>
            </div>
            <p className="cdc-toolbox__intro" style={{ margin: "16px 0 12px" }}>
              Autism-specific screening
            </p>
            <div className="cdc-toolbox__chips">
              <span className="cdc-toolbox__chip">18 months</span>
              <span className="cdc-toolbox__chip">24 months</span>
            </div>
          </section>

          <section className="cdc-toolbox__panel" aria-labelledby="cdc-milestones-heading">
            <h2 id="cdc-milestones-heading">Child Clock Milestones</h2>
            <ul className="cdc-toolbox__milestones">
              {MILESTONES.map((item) => (
                <li key={item.label} className="cdc-toolbox__milestone">
                  <span
                    className="cdc-toolbox__milestone-dot"
                    style={{ backgroundColor: item.color }}
                    aria-hidden="true"
                  />
                  {item.label}
                </li>
              ))}
            </ul>
          </section>

          <p className="cdc-toolbox__footer">
            Source: Centers for Disease Control and Prevention (CDC) — Learn the Signs. Act Early.
            and ADDM Network prevalence data. For educational reference only; not a substitute for
            clinical evaluation.
          </p>
        </div>

        <div className="eden-child-clock">
          <canvas id="scene" aria-label="Child Clock autism early screening visualization" />
        </div>
      </section>

      <Script src="/assets/js/child-clock.js" strategy="afterInteractive" onLoad={syncCdcData} />
    </>
  );
}
