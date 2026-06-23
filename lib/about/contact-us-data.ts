import {
  EDEN_SATURDAY_HOURS_DISPLAY,
  EDEN_SUNDAY_HOURS_DISPLAY,
  EDEN_WEEKDAY_HOURS_DISPLAY,
} from "@/lib/eden-business-hours";

export const CONTACT_US_META = {
  title: "Contact Us | Eden ABA Therapy",
  description:
    "Contact Eden ABA Therapy for family intake, professional referrals, client support, and careers. Visit our Annandale clinic or reach us at (703) 587-5238.",
  keywords: [
    "contact Eden ABA Therapy",
    "ABA therapy Annandale VA",
    "autism therapy referral",
    "Eden ABA phone number",
    "ABA career inquiries Virginia",
  ],
};

export const ANNANDALE_OFFICE = {
  title: "Our Annandale Office",
  subtitle: "Serving families throughout Fairfax County and Northern Virginia.",
};

export const EDEN_CONTACT = {
  phone: "(703) 587-5238",
  phoneHref: "tel:+17035875238",
  email: "info@edenabatherapy.com",
  emailHref: "mailto:info@edenabatherapy.com",
  address: {
    street: "7700 Little River Turnpike",
    suite: "Suite 304",
    city: "Annandale",
    state: "VA",
    zip: "22003",
    full: "7700 Little River Turnpike, Suite 304, Annandale, VA 22003",
  },
  directionsUrl:
    "https://www.google.com/maps/dir/?api=1&destination=7700+Little+River+Turnpike+Suite+304+Annandale+VA+22003",
};

export const CONTACT_PATHWAY_CARDS = [
  {
    id: "families",
    title: "Families & Intake",
    description: "Questions about ABA therapy, autism evaluations, insurance, and admissions.",
    contactMethod: "Secure intake form or phone during business hours",
    ctaLabel: "Start Intake",
    ctaHref: "/intake",
    inquiryPreset: "Family Inquiry" as const,
  },
  {
    id: "referrals",
    title: "Referral Partners",
    description: "Physicians, psychologists, schools, and early intervention providers.",
    contactMethod: "Referral form or dedicated partner line",
    ctaLabel: "Submit Referral",
    ctaHref: "#contact-form",
    inquiryPreset: "Referral Inquiry" as const,
  },
  {
    id: "clients",
    title: "Current Clients",
    description: "Scheduling, care coordination, family support, and service questions.",
    contactMethod: "Client support form or care team callback",
    ctaLabel: "Request Support",
    ctaHref: "#contact-form",
    inquiryPreset: "Current Client Support" as const,
  },
  {
    id: "careers",
    title: "Careers",
    description: "Employment opportunities, application support, and recruiting.",
    contactMethod: "Careers inquiry form or talent team email",
    ctaLabel: "View Open Roles",
    ctaHref: "/careers/open-roles",
    inquiryPreset: "Career Inquiry" as const,
  },
] as const;

export const SERVICE_AREA_CITIES = [
  "Fairfax",
  "Annandale",
  "Alexandria",
  "Arlington",
  "Centreville",
  "Chantilly",
  "Herndon",
  "Reston",
  "Manassas",
  "Woodbridge",
] as const;

export const PARKING_INFO =
  "Free surface parking is available in the building lot at 7700 Little River Turnpike. Enter from Little River Turnpike and follow signs to Suite 304 on the third floor. Accessible parking spaces are located near the main entrance.";

export const OFFICE_HOURS_DISPLAY = {
  weekdays: { label: "Monday–Friday", hours: EDEN_WEEKDAY_HOURS_DISPLAY },
  saturday: { label: "Saturday", hours: EDEN_SATURDAY_HOURS_DISPLAY },
  sunday: { label: "Sunday", hours: EDEN_SUNDAY_HOURS_DISPLAY },
};

export const RESPONSE_TIME = {
  phone: "During business hours",
  online: "Within 1 business day",
};

export const REFERRAL_PARTNER_TYPES = [
  "Pediatricians",
  "Developmental Pediatricians",
  "Psychologists",
  "Schools",
  "Speech Therapists",
  "Occupational Therapists",
  "Early Intervention Providers",
] as const;

export const CONTACT_US_FAQ = [
  {
    question: "How do I start ABA therapy?",
    answer:
      "Complete our secure intake form or call (703) 587-5238 during business hours. Our admissions team will review your information, verify insurance when applicable, and guide you through assessment and onboarding steps.",
  },
  {
    question: "How do I refer a child?",
    answer:
      "Professional partners may submit a referral through the contact form (select Referral Inquiry) or call our intake line. Include the child's name, caregiver contact information, and any relevant clinical or educational context with appropriate authorization.",
  },
  {
    question: "What areas do you serve?",
    answer:
      "Our Annandale clinic is located in Annandale, Virginia. We provide center-based, in-home, and community-based ABA services across Northern Virginia—including Fairfax, Alexandria, Arlington, Centreville, Chantilly, Herndon, Reston, Manassas, and Woodbridge.",
  },
  {
    question: "How quickly will someone contact me?",
    answer:
      "Phone inquiries are answered during business hours (Monday–Friday, 8:00 AM – 7:00 PM). Online form submissions receive a response within one business day.",
  },
  {
    question: "How do I apply for a job?",
    answer:
      "Browse open roles at edenabatherapy.com/careers/open-roles or submit a Career Inquiry through this page. Our talent team will follow up with application steps and next actions.",
  },
];

export const INQUIRY_TYPES = [
  "Family Inquiry",
  "Referral Inquiry",
  "Current Client Support",
  "Career Inquiry",
  "General Question",
] as const;

export type InquiryType = (typeof INQUIRY_TYPES)[number];

export const DIAGNOSIS_STATUS_OPTIONS = [
  "Autism diagnosis confirmed",
  "Evaluation in progress",
  "Suspected autism — seeking evaluation",
  "Not sure yet",
] as const;

export const CLIENT_SUPPORT_TOPICS = [
  "Scheduling & appointments",
  "Insurance & authorization",
  "Care coordination",
  "Parent training",
  "Service location change",
  "Other client support",
] as const;
