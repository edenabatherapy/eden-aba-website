export type LegalPageSection = {
  title: string;
  paragraphs: string[];
  listItems?: string[];
};

export type LegalPageContent = {
  badge: string;
  title: string;
  subtitle: string;
  effectiveDate: string;
  sections: LegalPageSection[];
};

export const TERMS_OF_SERVICE_CONTENT: LegalPageContent = {
  badge: "Legal • Terms",
  title: "Terms of Service",
  subtitle:
    "These Terms of Service govern your use of the Eden ABA Therapy website and related digital communication channels.",
  effectiveDate: "Effective Date: June 2, 2026",
  sections: [
    {
      title: "Acceptance of Terms",
      paragraphs: [
        "By accessing or using the Eden ABA Therapy website, you agree to these Terms of Service. If you do not agree, please discontinue use of the website.",
        "These terms apply to website visitors, prospective families, referral partners, and job applicants using Eden digital properties.",
      ],
    },
    {
      title: "Website Use",
      paragraphs: ["You agree to use this website only for lawful purposes and in a manner that does not:"],
      listItems: [
        "Interfere with website security, availability, or performance",
        "Attempt unauthorized access to systems or data",
        "Submit false, misleading, or harmful information",
        "Use website content for commercial redistribution without written permission",
      ],
    },
    {
      title: "No Medical or Emergency Advice",
      paragraphs: [
        "Website content is provided for general informational purposes only and does not create a provider-patient relationship.",
        "If you believe a child or individual is in immediate danger, call 911 or local emergency services. Do not use this website for emergency communication.",
      ],
    },
    {
      title: "Intellectual Property",
      paragraphs: [
        "All website content, branding, design elements, and materials are owned by or licensed to Eden ABA Therapy unless otherwise noted.",
        "You may view and print pages for personal, non-commercial use. Any other use requires prior written consent.",
      ],
    },
    {
      title: "Third-Party Links",
      paragraphs: [
        "This website may include links to third-party websites or resources. Eden ABA Therapy is not responsible for the content, privacy practices, or availability of external sites.",
      ],
    },
    {
      title: "Disclaimer of Warranties",
      paragraphs: [
        "The website is provided on an “as is” and “as available” basis. Eden ABA Therapy makes no warranties, express or implied, regarding uninterrupted access, accuracy, or fitness for a particular purpose.",
      ],
    },
    {
      title: "Limitation of Liability",
      paragraphs: [
        "To the fullest extent permitted by law, Eden ABA Therapy shall not be liable for indirect, incidental, special, consequential, or punitive damages arising from website use.",
      ],
    },
    {
      title: "Changes to These Terms",
      paragraphs: [
        "We may update these Terms of Service periodically. Continued use of the website after updates constitutes acceptance of the revised terms.",
      ],
    },
    {
      title: "Contact",
      paragraphs: [
        "Questions about these Terms of Service may be directed to Eden ABA Therapy through our contact page or by email at info@edenabatherapy.com.",
      ],
    },
  ],
};

export const ACCESSIBILITY_CONTENT: LegalPageContent = {
  badge: "Accessibility • WCAG 2.0 AA",
  title: "Accessibility Statement",
  subtitle:
    "Eden ABA Therapy is committed to providing a website experience that is accessible to the widest possible audience.",
  effectiveDate: "Last Updated: June 2, 2026",
  sections: [
    {
      title: "Our Commitment",
      paragraphs: [
        "We strive to design and maintain this website in alignment with WCAG 2.0 Level AA accessibility standards.",
        "Accessibility is an ongoing effort. We review navigation, color contrast, keyboard access, form labels, and content structure as part of continuous improvement.",
      ],
    },
    {
      title: "Measures We Support",
      paragraphs: ["Our accessibility efforts include:"],
      listItems: [
        "Keyboard navigable menus, links, and forms",
        "Visible focus indicators for interactive elements",
        "Semantic headings and descriptive link text where possible",
        "Responsive layouts for mobile, tablet, and desktop users",
        "Alternative text for meaningful images",
      ],
    },
    {
      title: "Known Limitations",
      paragraphs: [
        "Some third-party integrations, embedded media, or legacy content may not yet meet all accessibility expectations.",
        "If you encounter a barrier, please contact us with the page URL and a description of the issue so we can prioritize remediation.",
      ],
    },
    {
      title: "Request Assistance",
      paragraphs: [
        "If you need help accessing website content, completing a form, or receiving information in an alternative format, contact Eden ABA Therapy and our team will work with you in good faith to provide reasonable assistance.",
      ],
    },
    {
      title: "Feedback",
      paragraphs: [
        "We welcome accessibility feedback from families, clinicians, educators, and community partners. Your input helps us improve digital access for everyone.",
      ],
    },
  ],
};

export const NOTICE_OF_PRIVACY_PRACTICES_CONTENT: LegalPageContent = {
  badge: "HIPAA-Aware • Privacy Practices",
  title: "Notice of Privacy Practices",
  subtitle:
    "This notice describes how medical information about you or your child may be used and disclosed and how you can get access to this information.",
  effectiveDate: "Effective Date: June 2, 2026",
  sections: [
    {
      title: "Our Pledge Regarding Protected Health Information",
      paragraphs: [
        "Eden ABA Therapy understands that health information about you and your child is personal. We are committed to protecting protected health information (PHI) in accordance with applicable privacy laws, including HIPAA where applicable.",
      ],
    },
    {
      title: "How We May Use and Disclose PHI",
      paragraphs: ["We may use or disclose PHI for purposes such as:"],
      listItems: [
        "Treatment, care coordination, and clinical supervision",
        "Payment, billing, and insurance verification activities",
        "Healthcare operations, quality improvement, and training",
        "Required public health, safety, or legal disclosures when mandated by law",
      ],
    },
    {
      title: "Your Privacy Rights",
      paragraphs: ["Subject to applicable law, you may have the right to:"],
      listItems: [
        "Request restrictions on certain uses or disclosures",
        "Request confidential communications by alternative means",
        "Inspect and obtain a copy of certain health records",
        "Request amendment of records in specific circumstances",
        "Receive an accounting of certain disclosures",
        "Obtain a paper copy of this notice upon request",
      ],
    },
    {
      title: "Our Responsibilities",
      paragraphs: [
        "We are required by law to maintain the privacy of PHI and to provide individuals with notice of our legal duties and privacy practices.",
        "We reserve the right to change this notice. Revised notices will apply to all PHI we maintain and will be available upon request and on our website.",
      ],
    },
    {
      title: "Questions and Complaints",
      paragraphs: [
        "If you have questions about this Notice of Privacy Practices or believe your privacy rights have been violated, contact Eden ABA Therapy using the information on our contact page.",
        "You may also file a complaint with the U.S. Department of Health and Human Services. Eden ABA Therapy will not retaliate against you for filing a complaint.",
      ],
    },
  ],
};
