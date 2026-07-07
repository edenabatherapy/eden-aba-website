import type { ServiceMeaningAnimationType } from "@/components/ServiceMeaningAnimation";

/** English menu group label in locales/en.json — nav display uses common.navABATherapy. */
export const SERVICES_MENU_LABEL = "Services";

/** Stable menu group id used across locales (en + vi). */
export const SERVICES_MENU_ID = "services";

export type ServicesMegaMenuItem = {
  id: string;
  title: string;
  href: string;
  description: string;
  animationType: ServiceMeaningAnimationType;
  sectionId: string;
};

export type ServicesMegaMenuSection = {
  id: string;
  title: string;
  items: ServicesMegaMenuItem[];
};

const SERVICE_SECTIONS: ServicesMegaMenuSection[] = [
  {
    id: "aba-services",
    title: "ABA Services",
    items: [
      {
        id: "aba-therapy",
        title: "ABA Therapy",
        href: "/services/aba-therapy",
        description:
          "Learn how evidence-based Applied Behavior Analysis supports communication, learning, behavior, and independence for children and families.",
        animationType: "center",
        sectionId: "aba-services",
      },
      {
        id: "home-based-aba",
        title: "Home-Based ABA Therapy",
        href: "/services/home-based-aba-therapy",
        description:
          "Personalized ABA therapy delivered in your child's home, helping build communication, daily living, behavior, and social skills in a familiar environment.",
        animationType: "home",
        sectionId: "aba-services",
      },
      {
        id: "center-based-aba",
        title: "Center-Based ABA Therapy",
        href: "/services/center-based-aba-therapy",
        description:
          "Structured therapy in a supportive clinical setting with learning spaces, peer interaction, clinical supervision, and individualized treatment programs.",
        animationType: "center",
        sectionId: "aba-services",
      },
      {
        id: "school-based-aba",
        title: "School-Based ABA Therapy",
        href: "/services/school-based-aba-therapy",
        description:
          "ABA support coordinated with school environments to improve classroom readiness, behavior, communication, and participation in learning.",
        animationType: "school",
        sectionId: "aba-services",
      },
      {
        id: "community-based-aba",
        title: "Community-Based ABA Therapy",
        href: "/services/community-based-aba-therapy",
        description:
          "Real-world ABA support that helps children practice safety, communication, social participation, and independence in community settings.",
        animationType: "community",
        sectionId: "aba-services",
      },
      {
        id: "virtual-aba",
        title: "Virtual ABA Therapy",
        href: "/services/virtual-aba-therapy",
        description:
          "Remote ABA support, parent coaching, and consultation through secure virtual sessions for families needing flexible access to care.",
        animationType: "virtual",
        sectionId: "aba-services",
      },
      {
        id: "after-school",
        title: "After School Programs",
        href: "/services/after-school-programs",
        description:
          "BCBA-supervised after-school ABA supporting communication, homework routines, emotional regulation, and safe transitions when clinically appropriate.",
        animationType: "school",
        sectionId: "aba-services",
      },
    ],
  },
  {
    id: "clinical-aba-services",
    title: "Clinical ABA Services",
    items: [
      {
        id: "early-intervention",
        title: "Early Intervention ABA Therapy",
        href: "/services/early-intervention-aba-therapy",
        description:
          "Early support for young children to build communication, imitation, play, daily living skills, and positive learning routines.",
        animationType: "home",
        sectionId: "clinical-aba-services",
      },
      {
        id: "behavior-assessment",
        title: "Behavior Assessment",
        href: "/services/behavior-assessment",
        description:
          "Detailed review of behavior patterns, triggers, communication needs, safety concerns, and family priorities before treatment planning.",
        animationType: "center",
        sectionId: "clinical-aba-services",
      },
      {
        id: "individualized-aba",
        title: "Individualized ABA Programs",
        href: "/services/individualized-aba-programs",
        description:
          "Customized treatment goals based on each child's strengths, developmental needs, caregiver priorities, and measurable progress data.",
        animationType: "center",
        sectionId: "clinical-aba-services",
      },
      {
        id: "social-skills",
        title: "Social Skills Training",
        href: "/services/social-skills-training",
        description:
          "Support for peer interaction, turn-taking, greetings, play, shared attention, conversation, and friendship-building skills.",
        animationType: "school",
        sectionId: "clinical-aba-services",
      },
      {
        id: "parent-training",
        title: "Parent Training & Support",
        href: "/services/parent-training-support",
        description:
          "Practical coaching and education that helps caregivers reinforce skills, manage routines, and support progress between therapy sessions.",
        animationType: "home",
        sectionId: "clinical-aba-services",
      },
    ],
  },
  {
    id: "eden-family-services",
    title: "Eden Family Services",
    items: [
      {
        id: "occupational-therapy",
        title: "Occupational Therapy",
        href: "/services/occupational-therapy",
        description:
          "Pediatric occupational therapy supporting fine motor skills, sensory processing, daily living routines, and participation—coordinated with Eden's ABA programs when appropriate.",
        animationType: "occupational",
        sectionId: "eden-family-services",
      },
      {
        id: "speech-language",
        title: "Speech & Language Therapy",
        href: "/services/speech-language-therapy",
        description:
          "Speech-language therapy for communication, language development, articulation, social communication, and AAC—integrated with Eden's family-centered ABA care.",
        animationType: "speech",
        sectionId: "eden-family-services",
      },
      {
        id: "feeding-swallowing",
        title: "Feeding & Swallowing Therapy",
        href: "/services/feeding-swallowing-therapy",
        description:
          "Feeding therapy supporting safe eating, oral-motor skills, texture progression, and positive mealtime routines alongside Eden's interdisciplinary team.",
        animationType: "feeding",
        sectionId: "eden-family-services",
      },
    ],
  },
];

export const servicesMegaMenuSections = SERVICE_SECTIONS;

export const servicesMegaMenuItems: ServicesMegaMenuItem[] = SERVICE_SECTIONS.flatMap(
  (section) => section.items,
);

/** English link labels — aligned with locales/en.json menu services columns. */
export const SERVICE_MENU_LINK_LABELS = servicesMegaMenuItems.map((item) => item.title);

export function isServicesMegaMenuGroup(
  enGroup: { id?: string; label?: string; type?: string } | undefined,
): boolean {
  if (!enGroup) return false;
  return (
    enGroup.id === SERVICES_MENU_ID ||
    enGroup.label === SERVICES_MENU_LABEL ||
    enGroup.type === "services-mega"
  );
}
