export default function AiIntakeAssistantSkeleton() {
  return (
    <section
      id="meet-eden-ai"
      className="eden-ai-intake"
      aria-hidden="true"
    >
      <div className="eden-ai-intake__shell">
        <div className="eden-ai-intake__grid">
          <div className="eden-ai-intake__panel-wrap">
            <div
              className="eden-ai-video__frame"
              style={{ minHeight: "20rem", background: "rgba(238,249,244,0.8)" }}
            />
          </div>
          <div className="eden-ai-intake__content">
            <div style={{ height: "1rem", width: "40%", borderRadius: "999px", background: "#e2e8f0" }} />
            <div style={{ height: "2.5rem", width: "80%", marginTop: "1rem", borderRadius: "0.75rem", background: "#e2e8f0" }} />
          </div>
        </div>
      </div>
    </section>
  );
}
