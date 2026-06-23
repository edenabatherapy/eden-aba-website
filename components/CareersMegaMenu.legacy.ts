import {
  CAREERS_DEFAULT_PREVIEW,
  CAREERS_MENU_ITEMS,
  type CareersMenuItem,
  type CareersPreviewPanel,
} from "@/lib/careers/career-menu-data";

/** @deprecated Use CareersPreviewPanel from career-menu-data */
export type CareersPreview = CareersPreviewPanel & {
  title?: string;
  learnMoreText?: string;
};

/** @deprecated Use CareersMenuItem from career-menu-data */
export type CareersMegaMenuItem = CareersMenuItem & {
  title?: string;
  animationType?: CareersMenuItem["preview"]["animationType"];
};

export const careersDefaultPreview: CareersPreview = {
  ...CAREERS_DEFAULT_PREVIEW,
  title: CAREERS_DEFAULT_PREVIEW.headline,
  learnMoreText: CAREERS_DEFAULT_PREVIEW.cta,
};

export const careersItems: CareersMegaMenuItem[] = CAREERS_MENU_ITEMS.map((item) => ({
  ...item,
  title: item.label,
  animationType: item.preview.animationType,
}));
