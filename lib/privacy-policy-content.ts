export type PrivacyPolicySubsection = {
  title?: string;
  paragraphs?: string[];
  listItems?: string[];
};

export type PrivacyPolicySection = {
  id: string;
  title: string;
  paragraphs?: string[];
  listTitle?: string;
  listItems?: string[];
  subsections?: PrivacyPolicySubsection[];
};

export const PRIVACY_POLICY_HERO = {
  badge: "HIPAA-Aware • Secure • Family-Centered",
  title: "Privacy Policy",
  subtitle:
    "Your privacy matters to us. Eden ABA Therapy is committed to protecting the personal and health-related information shared by families, caregivers, and website visitors.",
  effectiveDate: "Effective Date: June 14, 2026",
};

export const PRIVACY_POLICY_INTRO = {
  effectiveDate: "Effective Date: June 14, 2026",
  paragraphs: [
    "At Eden ABA Therapy, we respect your privacy and are committed to protecting the personal information entrusted to us. This Privacy Policy explains how we collect, use, disclose, and safeguard information when you visit our website, communicate with us, request services, or receive care through our organization.",
    "By accessing or using our website, you agree to the terms outlined in this Privacy Policy.",
  ],
};

export const PRIVACY_POLICY_SECTIONS: PrivacyPolicySection[] = [
  {
    id: "who-we-are",
    title: "Who We Are",
    paragraphs: [
      "Eden ABA Therapy provides Applied Behavior Analysis (ABA) services for children and families. We understand the importance of protecting personal and health-related information and strive to maintain strong privacy and security practices.",
    ],
  },
  {
    id: "information-we-collect",
    title: "Information We Collect",
    subsections: [
      {
        title: "Information You Provide",
        paragraphs: ["We may collect information that you voluntarily provide, including:"],
        listItems: [
          "Parent or guardian name",
          "Child's name",
          "Child's date of birth",
          "Phone number",
          "Email address",
          "Mailing address",
          "Insurance information",
          "Referral information",
          "Appointment requests",
          "Service inquiries",
          "Communications submitted through forms, email, phone, or text message",
        ],
      },
      {
        title: "Information Automatically Collected",
        paragraphs: [
          "When you visit our website, certain information may be collected automatically, including:",
        ],
        listItems: [
          "IP address",
          "Browser type and version",
          "Device information",
          "Operating system",
          "Pages viewed",
          "Website navigation activity",
          "Date and time of visits",
          "Referring website information",
        ],
      },
      {
        paragraphs: [
          "This information helps us improve website performance, functionality, and user experience.",
        ],
      },
    ],
  },
  {
    id: "how-we-use-information",
    title: "How We Use Information",
    paragraphs: ["We may use information we collect to:"],
    listItems: [
      "Respond to inquiries",
      "Schedule consultations and appointments",
      "Verify insurance eligibility and benefits",
      "Coordinate ABA therapy services",
      "Process intake requests",
      "Communicate with families regarding services",
      "Improve website functionality and performance",
      "Provide customer support",
      "Meet legal, regulatory, and healthcare obligations",
      "Protect the safety and security of our systems and services",
    ],
  },
  {
    id: "hipaa",
    title: "HIPAA and Health Information",
    paragraphs: [
      "Eden ABA Therapy complies with applicable federal and state privacy laws, including the Health Insurance Portability and Accountability Act (HIPAA).",
      "Protected Health Information (PHI) is used and disclosed only as permitted by law and is protected through administrative, technical, and physical safeguards designed to maintain confidentiality and security.",
      "Clients receiving services may receive additional HIPAA-related privacy notices as required by law.",
    ],
  },
  {
    id: "cookies",
    title: "Cookies and Analytics",
    paragraphs: [
      "Our website may use cookies, analytics tools, and similar technologies to improve your browsing experience.",
      "Cookies may help us:",
    ],
    listItems: [
      "Remember preferences",
      "Understand website usage",
      "Improve functionality",
      "Enhance security",
      "Measure website performance",
    ],
    subsections: [
      {
        paragraphs: [
          "You may disable cookies through your browser settings. Some website features may not function properly if cookies are disabled.",
        ],
      },
    ],
  },
  {
    id: "sms",
    title: "SMS Messaging",
    paragraphs: [
      "If you provide your mobile phone number and consent to receive text messages, Eden ABA Therapy may contact you regarding:",
    ],
    listItems: [
      "Appointment scheduling",
      "Appointment reminders",
      "Intake coordination",
      "Insurance verification",
      "Service updates",
      "Care-related communications",
    ],
    subsections: [
      {
        title: "SMS Opt-Out",
        paragraphs: [
          "You may stop receiving text messages at any time by replying STOP.",
          "After opting out, you will no longer receive SMS communications unless you provide new consent.",
          "For assistance, reply HELP or contact our office directly.",
        ],
      },
      {
        title: "Message and Data Rates",
        paragraphs: ["Message and data rates may apply according to your wireless carrier's plan."],
      },
      {
        title: "SMS Privacy Commitment",
        paragraphs: [
          "No mobile information, text messaging consent information, or SMS opt-in data will be sold, shared, rented, or disclosed to third parties or affiliates for marketing or promotional purposes.",
          "Information may only be shared with service providers necessary to support communication services and business operations.",
        ],
      },
    ],
  },
  {
    id: "information-sharing",
    title: "Information Sharing",
    paragraphs: [
      "Eden ABA Therapy does not sell personal information.",
      "Information may be shared only when necessary:",
    ],
    listItems: [
      "With healthcare providers involved in your child's care",
      "With insurance companies for eligibility verification, authorizations, claims, and billing",
      "With vendors performing services on our behalf under confidentiality obligations",
      "When required by law, court order, subpoena, or government request",
      "To protect the rights, safety, and security of our clients, employees, and organization",
    ],
  },
  {
    id: "data-security",
    title: "Data Security",
    paragraphs: [
      "We implement reasonable administrative, technical, and physical safeguards to protect personal information against unauthorized access, disclosure, alteration, or destruction.",
      "While no method of electronic transmission or storage can guarantee absolute security, we strive to use industry-standard protections and best practices.",
    ],
  },
  {
    id: "childrens-privacy",
    title: "Children's Privacy",
    paragraphs: [
      "Our website is intended for parents, guardians, caregivers, and referral sources.",
      "We do not knowingly collect personal information directly from children through our website. If we learn that information has been submitted by a child without appropriate consent, we will take reasonable steps to remove such information.",
    ],
  },
  {
    id: "third-party-links",
    title: "Third-Party Links",
    paragraphs: [
      "Our website may contain links to external websites. Eden ABA Therapy is not responsible for the content, security, or privacy practices of third-party websites. We encourage users to review the privacy policies of any external sites they visit.",
    ],
  },
  {
    id: "your-rights",
    title: "Your Rights",
    paragraphs: [
      "Subject to applicable laws, you may have the right to:",
    ],
    listItems: [
      "Request access to certain personal information",
      "Request correction of inaccurate information",
      "Request deletion of information where legally permitted",
      "Request information about how your information is used",
    ],
    subsections: [
      {
        paragraphs: ["To make a request, please contact us using the information below."],
      },
    ],
  },
  {
    id: "changes",
    title: "Changes to This Policy",
    paragraphs: [
      "We may update this Privacy Policy periodically. Any changes will be posted on this page with a revised effective date.",
      "Your continued use of our website after updates are posted constitutes acceptance of the revised Privacy Policy.",
    ],
  },
  {
    id: "contact",
    title: "Contact Us",
    paragraphs: [
      "If you have questions regarding this Privacy Policy or our privacy practices, please contact us using the information below.",
    ],
  },
];

export const PRIVACY_POLICY_CTA = {
  title: "Your Child's Privacy and Care Matter",
  text: "At Eden ABA Therapy, we provide compassionate, family-centered ABA services while protecting the information families share with us.",
  primaryCta: "Learn More About ABA Therapy",
  secondaryCta: "Request a Free Consultation",
};
