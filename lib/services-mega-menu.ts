import { MENU_LINK_ROUTES } from "@/lib/navigation";
import type { ServiceMeaningAnimationType } from "@/components/ServiceMeaningAnimation";

/** English menu group label in locales/en.json — nav display uses common.navABATherapy. */
export const SERVICES_MENU_LABEL = "Services";

/** Stable menu group id used across locales (en + vi). */
export const SERVICES_MENU_ID = "services";


export type ServicesMegaMenuItem = {
  title: string;
  href: string;
  description: string;
  comingSoon: boolean;
  animationType: ServiceMeaningAnimationType;
};

/** English link labels — must stay aligned with locales/en.json menu[0].columns[0].links. */
export const SERVICE_MENU_LINK_LABELS = [
  "Home-Based ABA Therapy",
  "Center-Based ABA Therapy",
  "Community-Based ABA Therapy",
  "School-Based ABA Therapy",
  "Virtual ABA Therapy",
  "After School Programs",
  "Occupational Therapy",
  "Speech & Language Therapy",
  "Feeding & Swallowing Therapy",
] as const;

type ServiceMenuLinkLabel = (typeof SERVICE_MENU_LINK_LABELS)[number];

function serviceHref(menuLabel: string): string {
  const route = MENU_LINK_ROUTES[menuLabel as keyof typeof MENU_LINK_ROUTES];
  return route?.path ?? "#";
}

const SERVICE_ITEM_DEFINITIONS: Array<{
  title: ServiceMenuLinkLabel;
  description: string;
  comingSoon: boolean;
  animationType: ServiceMeaningAnimationType;
}> = [
  {
    title: "Home-Based ABA Therapy",
    description:
      "Personalized ABA therapy delivered in your child's home, helping build communication, daily living, behavior, and social skills in a familiar environment.",
    comingSoon: false,
    animationType: "home",
  },
  {
    title: "Center-Based ABA Therapy",
    description:
      "Structured therapy in a supportive center setting with learning spaces, peer interaction, clinical supervision, and individualized treatment programs.",
    comingSoon: false,
    animationType: "center",
  },
  {
    title: "Community-Based ABA Therapy",
    description:
      "Real-world ABA support that helps children practice safety, communication, social participation, and independence in community settings.",
    comingSoon: false,
    animationType: "community",
  },
  {
    title: "School-Based ABA Therapy",
    description:
      "ABA support coordinated with school environments to improve classroom readiness, behavior, communication, and participation in learning.",
    comingSoon: false,
    animationType: "school",
  },
  {
    title: "Virtual ABA Therapy",
    description:
      "Remote ABA support, parent coaching, and consultation through secure virtual sessions for families needing flexible access to care.",
    comingSoon: false,
    animationType: "virtual",
  },
  {
    title: "After School Programs",
    description:
      "Structured after school ABA programs that support social skills, homework routines, communication, and safe participation after the school day.",
    comingSoon: false,
    animationType: "school",
  },
  {
    title: "Occupational Therapy",
    description:
      "Coming soon to Eden Family. Occupational therapy will support sensory needs, fine motor skills, self-care routines, and daily independence.",
    comingSoon: true,
    animationType: "occupational",
  },
  {
    title: "Speech & Language Therapy",
    description:
      "Coming soon to Eden Family. Speech therapy will support communication, language development, social communication, and expressive skills.",
    comingSoon: true,
    animationType: "speech",
  },
  {
    title: "Feeding & Swallowing Therapy",
    description:
      "Coming soon to Eden Family. Feeding support will help children with safe eating, food variety, oral-motor skills, and mealtime routines.",
    comingSoon: true,
    animationType: "feeding",
  },
];

export const servicesMegaMenuItems: ServicesMegaMenuItem[] = SERVICE_ITEM_DEFINITIONS.map((item) => ({
  ...item,
  href: item.comingSoon ? "#" : serviceHref(item.title),
}));

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
