import {
  AI_KNOWLEDGE_META,
  EDEN_AI_KNOWLEDGE_SECTIONS,
} from "@/lib/ai-knowledge/eden-ai-knowledge-content";

export default function AiKnowledgePage() {
  return (
    <main className="ai-knowledge" id="eden-ai-knowledge">
      <article>
        <header className="ai-knowledge__header">
          <p className="ai-knowledge__notice">
            Internal knowledge reference for Eden ABA Therapy AI systems. This page is not part of
            the public website navigation.
          </p>
          <h1>{AI_KNOWLEDGE_META.title}</h1>
          <p>{AI_KNOWLEDGE_META.description}</p>
          <p>
            <strong>Organization:</strong> Eden ABA Therapy
            <br />
            <strong>Website:</strong> https://www.edenabatherapy.com
            <br />
            <strong>Last updated:</strong> June 2026
          </p>
        </header>

        <nav className="ai-knowledge__toc" aria-label="Knowledge base sections">
          <h2>Contents</h2>
          <ol>
            {EDEN_AI_KNOWLEDGE_SECTIONS.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ol>
        </nav>

        {EDEN_AI_KNOWLEDGE_SECTIONS.map((section) => (
          <section key={section.id} id={section.id} className="ai-knowledge__section">
            <h2>{section.title}</h2>

            {section.paragraphs?.map((paragraph) => (
              <p key={paragraph.slice(0, 48)}>{paragraph}</p>
            ))}

            {section.listItems ? (
              <ul>
                {section.listItems.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : null}

            {section.subsections?.map((subsection) => (
              <div key={subsection.title} className="ai-knowledge__subsection">
                <h3>{subsection.title}</h3>
                {subsection.paragraphs?.map((paragraph) => (
                  <p key={paragraph.slice(0, 48)}>{paragraph}</p>
                ))}
                {subsection.listItems ? (
                  <ul>
                    {subsection.listItems.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                ) : null}
              </div>
            ))}

            {section.faq ? (
              <dl className="ai-knowledge__faq">
                {section.faq.map((item) => (
                  <div key={item.question}>
                    <dt>{item.question}</dt>
                    <dd>{item.answer}</dd>
                  </div>
                ))}
              </dl>
            ) : null}
          </section>
        ))}
      </article>
    </main>
  );
}
