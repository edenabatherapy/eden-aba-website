export function parseMenuLinkEntry(displayEntry: unknown, enEntry: unknown) {
  const enMeta = typeof enEntry === "object" && enEntry !== null ? (enEntry as Record<string, unknown>) : null;
  const displayMeta =
    typeof displayEntry === "object" && displayEntry !== null ? (displayEntry as Record<string, unknown>) : null;

  return {
    key: (enMeta?.key as string) || (enMeta?.label as string) || enEntry,
    displayLabel: (displayMeta?.label as string) || displayEntry,
    badge: (enMeta?.badge as string) || null,
    comingSoon: Boolean(enMeta?.comingSoon),
  };
}

export function buildMenuDisplayTitleResolver(
  menuGroup: { columns?: { links: unknown[] }[] } | undefined,
  enGroup: { columns?: { links: unknown[] }[] } | undefined,
) {
  const titleByEnglishLabel: Record<string, string> = {};
  const column = menuGroup?.columns?.[0];
  const enColumn = enGroup?.columns?.[0];

  if (!column || !enColumn) {
    return (item: { title: string }) => item.title;
  }

  column.links.forEach((link, linkIdx) => {
    const enLink = enColumn.links[linkIdx];
    const englishLabel =
      typeof enLink === "object" && enLink !== null ? (enLink as { label: string }).label : String(enLink);
    const displayLabel =
      typeof link === "object" && link !== null ? (link as { label: string }).label : String(link);
    titleByEnglishLabel[englishLabel] = displayLabel;
  });

  return (item: { title: string }) => titleByEnglishLabel[item.title] || item.title;
}

export function buildSectionTitleResolver(
  menuGroup: { columns?: { title: string }[] } | undefined,
  enGroup: { columns?: { title: string }[] } | undefined,
) {
  const titleByEnglishSection: Record<string, string> = {};

  menuGroup?.columns?.forEach((col, colIdx) => {
    const enCol = enGroup?.columns?.[colIdx];
    if (enCol) {
      titleByEnglishSection[enCol.title] = col.title;
    }
  });

  return (title: string) => titleByEnglishSection[title] || title;
}
