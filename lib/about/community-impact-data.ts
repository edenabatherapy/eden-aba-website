import type { LifeAtEdenVideo } from "@/lib/careers/life-at-eden-careers-data";

export const COMMUNITY_IMPACT_META = {
  title: "Community Impact | Eden ABA Therapy",
  description:
    "Discover how Eden ABA Therapy supports Northern Virginia families through autism awareness, school partnerships, community events, advocacy, and volunteer programs.",
  keywords: [
    "autism community Virginia",
    "ABA community outreach",
    "autism awareness events",
    "school autism partnerships",
    "Eden ABA community impact",
  ],
};

export const COMMUNITY_IMPACT_SECTION_NAV = [
  { id: "overview", label: "Overview" },
  { id: "family-events", label: "Events" },
  { id: "awareness", label: "Awareness" },
  { id: "school-partnerships", label: "Schools" },
  { id: "community-partnerships", label: "Partners" },
  { id: "volunteer", label: "Volunteer" },
  { id: "advocacy", label: "Advocacy" },
  { id: "stories", label: "Stories" },
  { id: "impact-highlights", label: "Highlights" },
  { id: "future", label: "Future" },
] as const;

export const COMMUNITY_STATS = [
  { label: "Community Events Hosted", value: 24, suffix: "+", detail: "Family-friendly gatherings and awareness activities annually" },
  { label: "School Partners", value: 18, suffix: "+", detail: "Educators and teams collaborating on student support" },
  { label: "Families Reached", value: 1200, suffix: "+", detail: "Families connected through outreach and education" },
  { label: "Volunteer Hours", value: 450, suffix: "+", detail: "Team and community volunteer contributions each year" },
];

export const COMMUNITY_TIMELINE = [
  { year: "2022", title: "Community Outreach Launch", description: "Eden began hosting local autism awareness events and parent education workshops." },
  { year: "2023", title: "School Partnership Expansion", description: "Collaborative training with educators to support students in classroom settings." },
  { year: "2024", title: "Family Resource Fairs", description: "Multi-location events connecting families with autism resources and support networks." },
  { year: "2025", title: "Advocacy & Education Series", description: "Expanded webinars, community panels, and referral partner education programs." },
  { year: "2026", title: "Growing Together", description: "New volunteer initiatives and partnerships strengthening Northern Virginia inclusion." },
];

export const FAMILY_EVENTS = [
  { title: "Spring Sensory-Friendly Family Day", description: "A welcoming space for families with quiet zones, activities, and resource tables." },
  { title: "Autism Acceptance Walk & Resource Fair", description: "Community walk supporting awareness with local partners and family activities." },
  { title: "Parent Coffee & Connect", description: "Informal gatherings for caregivers to share experiences and learn from Eden clinicians." },
  { title: "Holiday Inclusive Celebration", description: "Seasonal event designed for sensory-friendly participation and family joy." },
];

export const AWARENESS_INITIATIVES = [
  "World Autism Month education campaigns for families and referral partners",
  "Social media series highlighting neurodiversity-affirming language and inclusion",
  "Physician and pediatric office resource materials for early identification",
  "Community bulletin and newsletter features on autism support pathways",
];

export const SCHOOL_PARTNERSHIPS = [
  { title: "IEP Collaboration Support", description: "Guidance for teams aligning school and clinical goals with family priorities." },
  { title: "Educator Training Sessions", description: "Workshops on ABA principles, classroom strategies, and positive behavior support." },
  { title: "Transition Planning", description: "Support for students moving between grade levels or service settings." },
];

export const COMMUNITY_PARTNERS = [
  "Local autism advocacy organizations and family support networks",
  "Pediatric practices and developmental health referral partners",
  "Community centers and inclusive recreation programs",
  "Northern Virginia schools and early intervention providers",
];

export const VOLUNTEER_PROGRAMS = [
  { title: "Event Support Team", description: "Help setup, greet families, and facilitate sensory-friendly community events." },
  { title: "Resource Distribution", description: "Share educational materials at health fairs and community gatherings." },
  { title: "Professional Mentorship", description: "BCBAs and clinical staff mentor aspiring behavior analysts and students." },
];

export const ADVOCACY_EDUCATION = [
  "Parent education webinars on navigating diagnosis and ABA services",
  "Referral partner lunch-and-learn sessions on evidence-based autism care",
  "Community panels featuring families, clinicians, and educators",
  "Accessible guides on insurance, intake, and getting started with therapy",
];

export const SUCCESS_STORIES = [
  {
    quote:
      "Eden's community event helped us feel less alone. We connected with other families and finally understood our next steps.",
    attribution: "Parent, Fairfax County",
  },
  {
    quote:
      "The school partnership training gave our staff practical strategies we use every day with students who need extra support.",
    attribution: "Special Education Coordinator, Northern Virginia",
  },
  {
    quote:
      "Eden's team showed up for our awareness walk and brought resources that families actually needed—not just brochures.",
    attribution: "Community Partner, Annandale",
  },
];

export const ANNUAL_HIGHLIGHTS = [
  { metric: "18", label: "School training sessions delivered" },
  { metric: "6", label: "Major community events hosted" },
  { metric: "900+", label: "Educational resources distributed" },
  { metric: "12", label: "Referral partner education sessions" },
];

export const FUTURE_INITIATIVES = [
  "Expanded multilingual family resource library",
  "Mobile sensory-friendly pop-up events in underserved areas",
  "Youth peer inclusion workshops with local schools",
  "Annual community impact report with transparent outcomes",
];

export const COMMUNITY_GALLERY = [
  { src: "/images/about-eden-family-centered-care.jpg", alt: "Families at a community event", caption: "Family resource fair", span: "wide" as const },
  { src: "/images/about-eden-hero-team.jpg", alt: "Eden team at community outreach", caption: "Team outreach", span: "tall" as const },
  { src: "/images/aba-day-step-social-play.jpg", alt: "Inclusive play activity", caption: "Inclusive activities", span: "normal" as const },
  { src: "/images/home-service-parent-training.jpg", alt: "Parent education workshop", caption: "Parent workshop", span: "normal" as const },
  { src: "/images/aba-section-assessment.jpg", alt: "School collaboration meeting", caption: "School collaboration", span: "wide" as const },
  { src: "/images/aba-day-step-skills.jpg", alt: "Community awareness event", caption: "Awareness event", span: "normal" as const },
];

export const COMMUNITY_VIDEOS: LifeAtEdenVideo[] = [
  {
    title: "Community Impact in Northern Virginia",
    description: "See how Eden teams partner with families, schools, and local organizations.",
    duration: "2:45",
    category: "Community",
  },
  {
    title: "Autism Acceptance Family Day Highlights",
    description: "A look at sensory-friendly activities and resources from our annual community gathering.",
    duration: "3:10",
    category: "Community",
  },
];

export const PHOTO_SECTIONS = [
  {
    title: "Events & Gatherings",
    description: "Sensory-friendly events where families connect, learn, and celebrate together.",
    image: "/images/about-eden-hero-team.jpg",
  },
  {
    title: "Education & Advocacy",
    description: "Workshops and panels that raise awareness and empower caregivers.",
    image: "/images/home-service-parent-training.jpg",
  },
];
