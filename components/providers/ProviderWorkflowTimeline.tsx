import { REFERRAL_WORKFLOW } from "@/lib/providers/provider-content";

type ProviderWorkflowTimelineProps = {
  showDetail?: boolean;
};

export default function ProviderWorkflowTimeline({ showDetail = false }: ProviderWorkflowTimelineProps) {
  return (
    <ol className="eden-providers-timeline">
      {REFERRAL_WORKFLOW.map((step, index) => (
        <li key={step.step} className="eden-providers-step">
          <div className="eden-providers-step__marker" aria-hidden="true">
            <span className="eden-providers-step__number">{step.step}</span>
            {index < REFERRAL_WORKFLOW.length - 1 ? <span className="eden-providers-step__line" /> : null}
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
