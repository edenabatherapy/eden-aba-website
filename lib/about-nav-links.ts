export type AboutNavLink = {
  label: string;
  href: string;
  menuKey: string;
};

export const ABOUT_NAV_LINKS: AboutNavLink[] = [
  { label: "Our Story", href: "/about/our-story", menuKey: "Our Story" },
  {
    label: "Our Mission & Values",
    href: "/about/mission-values",
    menuKey: "Our Mission & Values",
  },
  { label: "Our Approach", href: "/about/our-approach", menuKey: "Our Approach" },
  { label: "Our Team", href: "/about/our-team", menuKey: "Our Team" },
  {
    label: "Clinical Quality",
    href: "/about/clinical-quality",
    menuKey: "Clinical Quality",
  },
  {
    label: "Community Impact",
    href: "/about/community-impact",
    menuKey: "Community Impact",
  },
  { label: "Contact Us", href: "/contact", menuKey: "Contact Us" },
];
