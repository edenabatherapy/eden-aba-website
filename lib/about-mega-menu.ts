/** English menu group label in locales/en.json. */
export const ABOUT_MENU_LABEL = "About Eden";

/** Stable menu group id used across locales (en + vi). */
export const ABOUT_MENU_ID = "about-eden";

export function isAboutMegaMenuGroup(
  enGroup: { id?: string; label?: string; type?: string } | undefined,
): boolean {
  if (!enGroup) return false;
  return (
    enGroup.id === ABOUT_MENU_ID ||
    enGroup.label === ABOUT_MENU_LABEL ||
    enGroup.type === "about-mega"
  );
}
