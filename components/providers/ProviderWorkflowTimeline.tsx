"use client";

import { useLocalizedContent } from "@/hooks/useLocalizedContent";
import { REFERRAL_WORKFLOW } from "@/lib/providers/provider-content";

type ProviderWorkflowTimelineProps = {
  showDetail?: boolean;
};

export default function ProviderWorkflowTimeline({ showDetail = false }: ProviderWorkflowTimelineProps) {
  const referralWorkflow = useLocalizedContent("REFERRAL_WORKFLOW", REFERRAL_WORKFLOW);

  return (
    <ol className="eden-providers-timeline">
      {referralWorkflow.map((step, index) => (
        <li key={step.step} className="eden-providers-step">
          <div className="eden-providers-step__marker" aria-hidden="true">
            <span className="eden-providers-step__number">{step.step}</span>
            {index < referralWorkflow.length - 1 ? <span className="eden-providers-step__line" /> : null}
          </div>
          <article className="eden-providers-step__body">
            <h3 className="eden-providers-step__title">{step.title}</h3>
            <p className="eden-providers-step__text">{step.description}</p>
            {showDetail && step.detail ? (
              <p className="eden-providers-step__detail">{step.detail}</p>
            ) : null}
          </article>
        </li>
      ))}
    </ol>
  );
}
