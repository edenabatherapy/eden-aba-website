export type JobStatus =
  | "Now Hiring"
  | "Urgent Hiring"
  | "Leadership Position"
  | "Future Opening";

export type ExperienceLevel = "Entry Level" | "Mid Level" | "Senior Level" | "Leadership";

export type JobCredential =
  | "No Credential Required"
  | "RBT Preferred"
  | "RBT Required"
  | "BCBA Required"
  | "BCaBA Preferred";

export type WorkSetting =
  | "In-Home"
  | "Center-Based"
  | "School-Based"
  | "Community-Based"
  | "Hybrid";

export type JobSchedule =
  | "Morning"
  | "Afternoon"
  | "Evening"
  | "Flexible"
  | "Weekend Availability";

export type JobDepartment =
  | "Clinical Services"
  | "Clinical Leadership"
  | "Training & Development"
  | "Client Experience"
  | "Operations"
  | "Administration";

export type JobLocation =
  | "Annandale, VA"
  | "Fairfax, VA"
  | "Falls Church, VA"
  | "Springfield, VA"
  | "Alexandria, VA"
  | "Arlington, VA"
  | "Tysons, VA"
  | "Vienna, VA"
  | "McLean, VA"
  | "Woodbridge, VA"
  | "Manassas, VA";

/** @deprecated Use JobStatus instead */
export type JobBadge = JobStatus;

export type CareersJob = {
  id: string;
  title: string;
  department: JobDepartment;
  employment: string;
  location: JobLocation;
  summary: string;
  highlights: string[];
  status: JobStatus;
  experienceLevel: ExperienceLevel;
  credential: JobCredential;
  workSetting: WorkSetting[];
  schedule: JobSchedule[];
  postedAt: string;
  keywords: string[];
  isFutureOpening?: boolean;
  details: {
    overview: string;
    responsibilities: string[];
    qualifications: string[];
    preferredExperience: string[];
    benefits: string[];
    schedule: string;
    locationServiceArea: string;
    whyJoin: string[];
  };
};

export type CareersTab =
  | "all"
  | "clinical"
  | "leadership"
  | "operations"
  | "entry-level"
  | "future-locations";

export type CareersSortOption =
  | "relevant"
  | "newest"
  | "title-az"
  | "department-az"
  | "leadership-first"
  | "entry-first";

export type JobFilters = {
  search: string;
  locations: string[];
  departments: string[];
  employmentTypes: string[];
  experienceLevels: string[];
  credentials: string[];
  workSettings: string[];
  schedules: string[];
  statuses: string[];
};

export const CAREERS_META = {
  title: "Careers | Eden ABA Therapy — Annandale, Virginia",
  description:
    "Explore ABA therapy careers at Eden ABA Therapy in Annandale, Virginia. Join our team of RBTs, BCBAs, clinical leaders, and support professionals.",
  keywords: [
    "ABA jobs Annandale",
    "RBT jobs Virginia",
    "BCBA careers Annandale",
    "autism therapy jobs",
    "Eden ABA Therapy careers",
  ],
};

export const FILTER_OPTIONS = {
  locations: [
    "Annandale, VA",
    "Fairfax, VA",
    "Falls Church, VA",
    "Springfield, VA",
    "Alexandria, VA",
    "Arlington, VA",
    "Tysons, VA",
    "Vienna, VA",
    "McLean, VA",
    "Woodbridge, VA",
    "Manassas, VA",
  ] as JobLocation[],
  departments: [
    "Clinical Services",
    "Clinical Leadership",
    "Training & Development",
    "Client Experience",
    "Operations",
    "Administration",
  ] as JobDepartment[],
  employmentTypes: [
    "Full-Time",
    "Part-Time",
    "Full-Time / Part-Time",
    "Contract",
    "Internship",
  ],
  experienceLevels: ["Entry Level", "Mid Level", "Senior Level", "Leadership"] as ExperienceLevel[],
  credentials: [
    "No Credential Required",
    "RBT Preferred",
    "RBT Required",
    "BCBA Required",
    "BCaBA Preferred",
  ] as JobCredential[],
  workSettings: [
    "In-Home",
    "Center-Based",
    "School-Based",
    "Community-Based",
    "Hybrid",
  ] as WorkSetting[],
  schedules: [
    "Morning",
    "Afternoon",
    "Evening",
    "Flexible",
    "Weekend Availability",
  ] as JobSchedule[],
  statuses: [
    "Now Hiring",
    "Urgent Hiring",
    "Leadership Position",
    "Future Opening",
  ] as JobStatus[],
  labels: {
    locations: "Location",
    departments: "Department",
    employmentTypes: "Employment",
    experienceLevels: "Experience",
    credentials: "Credential",
    workSettings: "Setting",
    schedules: "Schedule",
    statuses: "Status",
  } as Record<string, string>,
};

export const CAREERS_TABS: { id: CareersTab; label: string }[] = [
  { id: "all", label: "All Roles" },
  { id: "clinical", label: "Clinical Roles" },
  { id: "leadership", label: "Leadership" },
  { id: "operations", label: "Operations" },
  { id: "entry-level", label: "Entry Level" },
  { id: "future-locations", label: "Future Locations" },
];

export const SORT_OPTIONS: { id: CareersSortOption; label: string }[] = [
  { id: "relevant", label: "Most Relevant" },
  { id: "newest", label: "Newest" },
  { id: "title-az", label: "Job Title A-Z" },
  { id: "department-az", label: "Department A-Z" },
  { id: "leadership-first", label: "Leadership First" },
  { id: "entry-first", label: "Entry Level First" },
];

export const FUTURE_GROWTH_AREAS = [
  "Fairfax",
  "Falls Church",
  "Springfield",
  "Alexandria",
  "Arlington",
  "Tysons",
  "Vienna",
  "McLean",
  "Woodbridge",
  "Manassas",
];

export const CAREERS_PAGE = {
  hero: {
    badge: "Now Hiring in Annandale, Virginia",
    locationChip: "Annandale, VA",
    headline: "Build a Meaningful Career in Autism Care",
    subheadline:
      "Join Eden ABA Therapy and help children, families, and communities thrive through compassionate, evidence-based ABA services.",
  },
  openings: {
    title: "Current Opportunities in Annandale",
    description:
      "Eden ABA Therapy is actively building a team of passionate professionals committed to improving the lives of children with autism and their families.",
    note: "Search, filter, and explore roles across our Virginia service areas.",
  },
  futureLocations: {
    title: "Growing Across Virginia",
    description:
      "While Annandale is currently our primary service area, Eden ABA Therapy plans to expand throughout Virginia as we continue building our clinical team and supporting more families.",
  },
  recruitmentCta: {
    headline: "Don't See the Right Position?",
    body:
      "Join our talent network and we'll reach out when a matching role becomes available in your preferred location.",
    primaryCta: "Submit Interest",
    secondaryCta: "Contact Recruiting",
    resumeEmail: "info@edenabatherapy.com",
  },
  search: {
    placeholder: "Search by role, credential, department, or keyword",
    clearLabel: "Clear search",
  },
  results: {
    showing: "Showing",
    of: "of",
    roles: "roles",
    clearAll: "Clear all filters",
    emptyTitle: "No roles match your filters yet.",
    emptyBody:
      "Try adjusting your search or submit your resume for future opportunities.",
    clearFilters: "Clear Filters",
    submitResume: "Submit Resume",
  },
  applyLabel: "Apply Now",
  viewDetailsLabel: "View Details",
  saveJobLabel: "Save Job",
  unsaveJobLabel: "Saved",
  shareJobLabel: "Share Job",
  shareSuccess: "Job link copied.",
  savedJobsTitle: "Saved Jobs",
  savedJobsEmpty: "You have not saved any roles yet.",
  browseRoles: "Browse Open Roles",
  backToCareers: "Back to Careers",
  applyPageTitle: "Job Application",
  submitApplication: "Submit Application",
  applicationSuccess:
    "Thank you for applying. Eden ABA Therapy will review your application and contact you soon.",
  resumeNote: "You may also email your resume to",
  joinTalentNetwork: "Join talent network",
  futureGrowthLabel: "Future growth area",
};

const WHY_JOIN = [
  "Mission-driven culture focused on children and families",
  "Clinical mentorship and ongoing professional development",
  "Supportive team environment with transparent leadership",
  "Competitive compensation and growth opportunities across Virginia",
];

const JOB_BENEFITS = [
  "Competitive compensation based on role and experience",
  "Paid training and continuing education support",
  "Flexible scheduling options for eligible clinical roles",
  "Collaborative team culture with clinical mentorship",
  "Career growth pathways across Eden ABA Therapy",
  "Support serving families across Northern Virginia",
];

export const ALL_JOBS: CareersJob[] = [
  {
    id: "rbt-annandale",
    title: "Registered Behavior Technician (RBT)",
    department: "Clinical Services",
    employment: "Full-Time / Part-Time",
    location: "Annandale, VA",
    summary:
      "Deliver one-on-one ABA therapy under BCBA supervision while building meaningful connections with children and families.",
    highlights: ["RBT credential", "Flexible schedules", "Clinical mentorship", "In-home & community"],
    status: "Urgent Hiring",
    experienceLevel: "Entry Level",
    credential: "RBT Required",
    workSetting: ["In-Home", "Community-Based", "Hybrid"],
    schedule: ["Morning", "Afternoon", "Flexible"],
    postedAt: "2026-05-15",
    keywords: ["RBT", "behavior technician", "ABA", "autism", "direct therapy"],
    details: {
      overview:
        "Provide one-on-one ABA therapy services to children under the supervision of a Board Certified Behavior Analyst (BCBA). Support skill development, behavior goals, communication, social interaction, and daily living skills.",
      responsibilities: [
        "Implement individualized treatment plans written by the supervising BCBA",
        "Collect accurate session data and document client progress",
        "Build rapport with children and collaborate with caregivers",
        "Maintain professional standards and HIPAA compliance",
        "Participate in team meetings and ongoing training",
      ],
      qualifications: [
        "Active RBT certification (or ability to obtain within 90 days)",
        "High school diploma or equivalent; related coursework preferred",
        "Reliable transportation for in-home and community sessions",
        "Passion for working with children with autism and developmental needs",
      ],
      preferredExperience: [
        "Prior experience in ABA, special education, or childcare",
        "Experience working with diverse families and communities",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Morning, afternoon, and flexible weekday sessions; some weekend availability may be available.",
      locationServiceArea: "Primary service area: Annandale and surrounding Northern Virginia communities.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "bcba-annandale",
    title: "Board Certified Behavior Analyst (BCBA)",
    department: "Clinical Leadership",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Lead clinical programming, supervise RBT teams, and partner with families to deliver high-quality, individualized ABA care.",
    highlights: ["BCBA supervision", "Treatment planning", "Family partnership", "Clinical leadership"],
    status: "Now Hiring",
    experienceLevel: "Senior Level",
    credential: "BCBA Required",
    workSetting: ["In-Home", "Hybrid", "Community-Based"],
    schedule: ["Flexible", "Afternoon"],
    postedAt: "2026-05-10",
    keywords: ["BCBA", "behavior analyst", "clinical supervisor", "ABA"],
    details: {
      overview:
        "Develop individualized treatment plans, supervise clinical programming, review client progress, mentor RBTs, and collaborate closely with families.",
      responsibilities: [
        "Conduct assessments and develop individualized treatment plans",
        "Supervise and mentor RBTs and behavior technicians",
        "Analyze data and adjust programming to support client outcomes",
        "Collaborate with families, schools, and interdisciplinary partners",
        "Ensure clinical quality and documentation standards",
      ],
      qualifications: [
        "Current BCBA certification in good standing",
        "Master's degree in ABA, psychology, or related field",
        "Experience supervising direct care staff",
        "Strong communication and family engagement skills",
      ],
      preferredExperience: [
        "Experience with early intervention and school-based ABA",
        "Familiarity with Virginia Medicaid and insurance authorizations",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Flexible weekday schedule with occasional evening family meetings.",
      locationServiceArea: "Annandale, VA and Northern Virginia in-home service areas.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "regional-clinical-director",
    title: "Regional Clinical Director",
    department: "Clinical Leadership",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Drive clinical excellence, quality assurance, and team development while supporting Eden's growth across Virginia.",
    highlights: ["Regional oversight", "Quality assurance", "Staff development", "Strategic growth"],
    status: "Leadership Position",
    experienceLevel: "Leadership",
    credential: "BCBA Required",
    workSetting: ["Hybrid", "In-Home", "Center-Based"],
    schedule: ["Flexible"],
    postedAt: "2026-04-20",
    keywords: ["clinical director", "BCBA", "leadership", "quality assurance"],
    details: {
      overview:
        "Provide clinical leadership, quality assurance, program oversight, staff development, and support organizational growth initiatives.",
      responsibilities: [
        "Oversee clinical standards and quality across service lines",
        "Lead hiring, onboarding, and professional development for clinical teams",
        "Partner with operations on scheduling, caseload balance, and growth planning",
        "Support regulatory compliance and payer requirements",
        "Serve as a clinical resource for complex cases and escalations",
      ],
      qualifications: [
        "BCBA certification with significant supervisory experience",
        "Proven leadership in multi-site or regional ABA programs",
        "Strong operational and strategic planning skills",
        "Excellent stakeholder communication",
      ],
      preferredExperience: [
        "Experience scaling ABA programs in Virginia or Mid-Atlantic region",
        "Background in payer relations and authorization workflows",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Leadership schedule with flexibility for site visits and team support.",
      locationServiceArea: "Annandale clinic with travel across planned Virginia expansion areas.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "director-rbt-development",
    title: "Director of RBT Development",
    department: "Training & Development",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Build world-class RBT training, onboarding, and mentorship programs that elevate clinical quality and staff retention.",
    highlights: ["Training design", "RBT mentorship", "Onboarding", "Continuing education"],
    status: "Leadership Position",
    experienceLevel: "Leadership",
    credential: "BCBA Required",
    workSetting: ["Hybrid", "Center-Based"],
    schedule: ["Flexible", "Morning"],
    postedAt: "2026-04-12",
    keywords: ["RBT training", "director", "professional development", "BCBA"],
    details: {
      overview:
        "Lead training programs, onboarding initiatives, continuing education, mentorship, and professional development for behavior technicians.",
      responsibilities: [
        "Design and deliver RBT onboarding and competency programs",
        "Coordinate continuing education and credential support",
        "Partner with clinical leadership on supervision standards",
        "Track training outcomes and iterate on curriculum",
        "Foster a culture of clinical excellence and career growth",
      ],
      qualifications: [
        "BCBA certification with training or workforce development experience",
        "Experience building onboarding programs for direct care teams",
        "Strong facilitation and coaching skills",
        "Organizational skills for multi-track training calendars",
      ],
      preferredExperience: [
        "Experience with RBT task list alignment and competency assessments",
        "Background in adult learning or instructional design",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Flexible leadership schedule with training sessions across weekday blocks.",
      locationServiceArea: "Annandale, VA with support for regional training expansion.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "client-services-coordinator",
    title: "Client Services Coordinator",
    department: "Client Experience",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Guide families through intake, scheduling, and onboarding with warm, responsive support at every step of the journey.",
    highlights: ["Family communication", "Intake coordination", "Scheduling", "Client onboarding"],
    status: "Now Hiring",
    experienceLevel: "Mid Level",
    credential: "No Credential Required",
    workSetting: ["Hybrid", "Center-Based"],
    schedule: ["Morning", "Afternoon", "Flexible"],
    postedAt: "2026-05-01",
    keywords: ["client services", "intake", "scheduling", "family support"],
    details: {
      overview:
        "Support intake coordination, scheduling, family communication, onboarding, and service support throughout the client journey.",
      responsibilities: [
        "Coordinate intake workflows and documentation",
        "Manage scheduling requests and service updates",
        "Communicate proactively with families and internal teams",
        "Support onboarding and insurance verification handoffs",
        "Maintain accurate records in client management systems",
      ],
      qualifications: [
        "Experience in healthcare, social services, or customer success",
        "Strong written and verbal communication skills",
        "Organized, detail-oriented, and empathetic approach",
        "Comfort with CRM or scheduling platforms",
      ],
      preferredExperience: [
        "Experience in ABA, pediatric, or behavioral health settings",
        "Bilingual communication skills a plus",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Weekday business hours with flexibility for family outreach.",
      locationServiceArea: "Annandale, VA service hub supporting Northern Virginia families.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "operations-manager",
    title: "Operations Manager",
    department: "Operations",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Keep Eden running smoothly by coordinating daily operations, compliance support, and cross-functional team workflows.",
    highlights: ["Operations oversight", "Process improvement", "Team coordination", "Compliance support"],
    status: "Now Hiring",
    experienceLevel: "Senior Level",
    credential: "No Credential Required",
    workSetting: ["Hybrid", "Center-Based"],
    schedule: ["Flexible", "Morning"],
    postedAt: "2026-04-28",
    keywords: ["operations", "manager", "compliance", "scheduling systems"],
    details: {
      overview:
        "Oversee daily operations, team coordination, compliance support, scheduling systems, and organizational processes.",
      responsibilities: [
        "Manage operational workflows across clinical and administrative teams",
        "Support scheduling systems, reporting, and process documentation",
        "Partner with leadership on compliance and quality initiatives",
        "Identify efficiency improvements and implement scalable solutions",
        "Support vendor relationships and office operations",
      ],
      qualifications: [
        "Operations or practice management experience in healthcare or human services",
        "Strong project management and problem-solving skills",
        "Ability to collaborate across clinical and business functions",
        "Proficiency with spreadsheets, dashboards, and workflow tools",
      ],
      preferredExperience: [
        "Experience in ABA or behavioral health operations",
        "Familiarity with HIPAA and healthcare compliance frameworks",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Standard weekday schedule with leadership flexibility.",
      locationServiceArea: "Annandale, VA clinic.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "behavior-technician",
    title: "Behavior Technician (BT)",
    department: "Clinical Services",
    employment: "Full-Time / Part-Time",
    location: "Annandale, VA",
    summary:
      "Start your ABA career supporting children under BCBA supervision—ideal for candidates pursuing RBT certification.",
    highlights: ["Entry-level pathway", "RBT pathway", "Hands-on training", "Flexible hours"],
    status: "Now Hiring",
    experienceLevel: "Entry Level",
    credential: "RBT Preferred",
    workSetting: ["In-Home", "School-Based", "Community-Based"],
    schedule: ["Morning", "Afternoon", "Evening", "Weekend Availability"],
    postedAt: "2026-05-18",
    keywords: ["behavior technician", "BT", "entry level", "ABA", "RBT pathway"],
    details: {
      overview:
        "Support ABA therapy implementation under BCBA supervision while building positive relationships with children and families.",
      responsibilities: [
        "Assist with implementation of behavior support plans",
        "Collect session data and support treatment integrity",
        "Engage children with compassion, patience, and consistency",
        "Participate in training toward RBT certification when eligible",
        "Communicate observations to supervising clinicians",
      ],
      qualifications: [
        "High school diploma or equivalent",
        "Interest in pursuing RBT certification",
        "Reliable transportation and availability for direct sessions",
        "Positive attitude and teamwork orientation",
      ],
      preferredExperience: [
        "Experience with children in educational, recreational, or care settings",
        "Coursework in psychology, education, or related fields",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Morning, afternoon, evening, and weekend availability options.",
      locationServiceArea: "Annandale and nearby Northern Virginia communities.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "clinical-supervisor-annandale",
    title: "Clinical Supervisor (BCBA)",
    department: "Clinical Leadership",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Supervise direct care teams, ensure treatment integrity, and support BCBA-led clinical programming across active caseloads.",
    highlights: ["BCBA supervision", "Caseload oversight", "Team mentorship", "Quality assurance"],
    status: "Now Hiring",
    experienceLevel: "Senior Level",
    credential: "BCBA Required",
    workSetting: ["In-Home", "Hybrid", "Community-Based"],
    schedule: ["Flexible", "Afternoon"],
    postedAt: "2026-05-08",
    keywords: ["clinical supervisor", "BCBA", "supervision", "ABA"],
    details: {
      overview:
        "Provide BCBA supervision for RBT teams, monitor clinical outcomes, and partner with families to maintain high-quality ABA services.",
      responsibilities: [
        "Supervise RBTs and behavior technicians across assigned caseloads",
        "Review session data and update treatment plans as needed",
        "Conduct competency checks and support staff development",
        "Collaborate with families and interdisciplinary partners",
        "Maintain documentation and compliance standards",
      ],
      qualifications: [
        "Active BCBA certification",
        "Experience supervising direct care staff in ABA settings",
        "Strong clinical writing and communication skills",
        "Ability to manage multiple cases and priorities",
      ],
      preferredExperience: [
        "In-home and community-based ABA experience in Virginia",
        "Experience with Medicaid and commercial payer workflows",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Flexible weekday schedule with occasional evening family meetings.",
      locationServiceArea: "Annandale, VA and Northern Virginia service areas.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "billing-insurance-specialist",
    title: "Billing & Insurance Specialist",
    department: "Operations",
    employment: "Full-Time",
    location: "Annandale, VA",
    summary:
      "Support families and internal teams with insurance verification, authorizations, billing workflows, and payer communication.",
    highlights: ["Insurance verification", "Authorizations", "Billing support", "Family communication"],
    status: "Now Hiring",
    experienceLevel: "Mid Level",
    credential: "No Credential Required",
    workSetting: ["Hybrid", "Center-Based"],
    schedule: ["Morning", "Afternoon", "Flexible"],
    postedAt: "2026-04-25",
    keywords: ["billing", "insurance", "authorizations", "ABA"],
    details: {
      overview:
        "Coordinate insurance verification, authorization tracking, and billing support to help families access ABA services smoothly.",
      responsibilities: [
        "Verify insurance benefits and document coverage details",
        "Track authorization requests, renewals, and payer follow-ups",
        "Support billing workflows and resolve claim-related questions",
        "Communicate clearly with families regarding coverage and next steps",
        "Partner with client services and clinical teams on intake handoffs",
      ],
      qualifications: [
        "Healthcare billing, insurance, or revenue cycle experience",
        "Strong attention to detail and organizational skills",
        "Professional communication with families and payers",
        "Comfort working with spreadsheets and practice management tools",
      ],
      preferredExperience: [
        "ABA, behavioral health, or pediatric therapy billing experience",
        "Familiarity with Virginia Medicaid and commercial ABA coverage",
      ],
      benefits: JOB_BENEFITS,
      schedule: "Weekday business hours with flexibility for payer follow-ups.",
      locationServiceArea: "Annandale, VA clinic supporting Northern Virginia families.",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "rbt-fairfax-future",
    title: "Registered Behavior Technician (RBT) — Fairfax Expansion",
    department: "Clinical Services",
    employment: "Full-Time / Part-Time",
    location: "Fairfax, VA",
    summary:
      "Join our talent pipeline for upcoming Fairfax-area RBT openings as Eden expands clinical services across Virginia.",
    highlights: ["Future opening", "Fairfax expansion", "RBT roles", "Talent network"],
    status: "Future Opening",
    experienceLevel: "Entry Level",
    credential: "RBT Required",
    workSetting: ["In-Home", "Hybrid"],
    schedule: ["Flexible"],
    postedAt: "2026-03-01",
    keywords: ["Fairfax", "future", "RBT", "expansion"],
    isFutureOpening: true,
    details: {
      overview:
        "Express interest in upcoming RBT opportunities as Eden ABA Therapy expands into the Fairfax service area.",
      responsibilities: [
        "Join the talent network for priority consideration when roles open",
        "Participate in informational sessions about Eden's clinical model",
        "Complete pre-screening for future RBT hiring waves",
      ],
      qualifications: [
        "Active or in-progress RBT certification preferred",
        "Interest in serving families in Fairfax and surrounding communities",
      ],
      preferredExperience: ["Prior ABA or direct care experience"],
      benefits: JOB_BENEFITS,
      schedule: "Flexible schedules anticipated for future openings.",
      locationServiceArea: "Fairfax, VA and surrounding communities (planned expansion).",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "bcba-arlington-future",
    title: "BCBA — Arlington Expansion",
    department: "Clinical Leadership",
    employment: "Full-Time",
    location: "Arlington, VA",
    summary:
      "Be among the first clinical leaders considered for BCBA roles as Eden grows into the Arlington market.",
    highlights: ["Future opening", "Clinical leadership", "Arlington", "BCBA"],
    status: "Future Opening",
    experienceLevel: "Senior Level",
    credential: "BCBA Required",
    workSetting: ["Hybrid", "In-Home"],
    schedule: ["Flexible"],
    postedAt: "2026-02-15",
    keywords: ["Arlington", "BCBA", "future", "clinical leadership"],
    isFutureOpening: true,
    details: {
      overview:
        "Connect with Eden's recruiting team for future BCBA leadership opportunities in Arlington, Virginia.",
      responsibilities: [
        "Join the clinical talent pipeline for Arlington expansion",
        "Share interest in supervisory and family-facing clinical roles",
        "Participate in early planning conversations as service areas launch",
      ],
      qualifications: [
        "BCBA certification",
        "Interest in building programs in new service areas",
      ],
      preferredExperience: ["Multi-site or startup ABA program experience"],
      benefits: JOB_BENEFITS,
      schedule: "Flexible leadership schedule anticipated.",
      locationServiceArea: "Arlington, VA (planned expansion).",
      whyJoin: WHY_JOIN,
    },
  },
  {
    id: "client-coordinator-alexandria-future",
    title: "Client Services Coordinator — Alexandria",
    department: "Client Experience",
    employment: "Full-Time",
    location: "Alexandria, VA",
    summary:
      "Get early access to client experience roles supporting families as Eden expands into Alexandria.",
    highlights: ["Future opening", "Client experience", "Alexandria", "Family support"],
    status: "Future Opening",
    experienceLevel: "Mid Level",
    credential: "No Credential Required",
    workSetting: ["Hybrid"],
    schedule: ["Morning", "Afternoon"],
    postedAt: "2026-02-01",
    keywords: ["Alexandria", "client services", "future"],
    isFutureOpening: true,
    details: {
      overview:
        "Submit your interest for future client services and intake coordination roles in the Alexandria expansion area.",
      responsibilities: [
        "Join the operations and client experience talent network",
        "Indicate preferred start timeline and availability",
      ],
      qualifications: [
        "Customer service or healthcare coordination experience",
        "Strong communication and organizational skills",
      ],
      preferredExperience: ["Pediatric or behavioral health intake experience"],
      benefits: JOB_BENEFITS,
      schedule: "Weekday business hours anticipated.",
      locationServiceArea: "Alexandria, VA (planned expansion).",
      whyJoin: WHY_JOIN,
    },
  },
];

/** Active Annandale roles (excludes future openings) — used by homepage snippet */
export const ANNANDALE_JOBS: CareersJob[] = ALL_JOBS.filter(
  (job) => job.location === "Annandale, VA" && !job.isFutureOpening,
);

export const DEPARTMENT_ICONS: Record<string, string> = {
  "Clinical Services": "clinical",
  "Clinical Leadership": "leadership",
  "Training & Development": "training",
  "Client Experience": "client",
  Operations: "operations",
  Administration: "administration",
};

export function getStatusBadgeClasses(status: JobStatus) {
  switch (status) {
    case "Urgent Hiring":
      return "border-rose-200 bg-rose-50 text-rose-800 dark:border-rose-800 dark:bg-rose-950/40 dark:text-rose-200";
    case "Leadership Position":
      return "border-teal-200 bg-teal-50 text-teal-800 dark:border-teal-800 dark:bg-teal-950/40 dark:text-teal-200";
    case "Future Opening":
      return "border-sky-200 bg-sky-50 text-sky-800 dark:border-sky-800 dark:bg-sky-950/40 dark:text-sky-200";
    case "Now Hiring":
    default:
      return "border-lime-200 bg-lime-50 text-lime-900 dark:border-lime-800 dark:bg-lime-950/40 dark:text-lime-200";
  }
}

/** @deprecated Use getStatusBadgeClasses */
export function getBadgeClasses(badge: JobStatus) {
  return getStatusBadgeClasses(badge);
}

export const SAVED_JOBS_STORAGE_KEY = "eden-careers-saved-jobs";
