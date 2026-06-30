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

  enGroup?.columns?.forEach((enColumn, colIdx) => {
    const displayColumn = menuGroup?.columns?.[colIdx];
    if (!displayColumn) return;

    enColumn.links.forEach((enLink, linkIdx) => {
      const englishLabel =
        typeof enLink === "object" && enLink !== null ? (enLink as { label: string }).label : String(enLink);
      const displayLink = displayColumn.links[linkIdx];
      const displayLabel =
        typeof displayLink === "object" && displayLink !== null
          ? (displayLink as { label: string }).label
          : String(displayLink);
      titleByEnglishLabel[englishLabel] = displayLabel;
    });
  });

  if (Object.keys(titleByEnglishLabel).length === 0) {
    return (item: { title: string }) => item.title;
  }

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
