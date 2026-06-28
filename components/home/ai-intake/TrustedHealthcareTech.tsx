"use client";

import { TRUSTED_HEALTHCARE_TECH } from "./ai-intake-config";

export default function TrustedHealthcareTech() {
  return (
    <div className="eden-ai-tech">
      <header className="eden-ai-tech__head">
        <p className="eden-ai-tech__eyebrow">Technology stack</p>
        <h3 className="eden-ai-tech__title">Powered by Trusted Healthcare Technology</h3>
        <p className="eden-ai-tech__disclaimer">
          Informational reference only. Eden ABA Therapy does not imply official partnership,
          endorsement, or certification by these providers unless separately stated.
        </p>
      </header>

      <div className="eden-ai-tech__grid">
        {TRUSTED_HEALTHCARE_TECH.map((item) => (
          <article key={item.id} className="eden-ai-tech__card" data-integration={item.id}>
            <div className="eden-ai-tech__card-top">
              <span className="eden-ai-tech__card-name">{item.name}</span>
              <span className="eden-ai-tech__card-role">{item.role}</span>
            </div>
            <p className="eden-ai-tech__card-text">{item.description}</p>
          </article>
        ))}
      </div>
    </div>
  );
}
