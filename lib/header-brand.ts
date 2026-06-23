export function getHeaderBrandClasses(compact: boolean) {
  if (compact) {
    return {
      shell: "gap-2 pr-1 sm:gap-2.5 sm:pr-2 lg:pr-3",
      logo: "h-10 max-h-10 shrink-0 sm:h-11 sm:max-h-11 lg:h-12 lg:max-h-12 xl:h-[3rem] xl:max-h-[3rem]",
      textWrap: "hidden min-w-0 sm:block sm:max-w-[9.5rem] md:max-w-[11rem] lg:max-w-[12.5rem]",
      name: "truncate text-xs font-extrabold leading-tight tracking-tight text-[#1f7a2e] sm:text-sm lg:text-base xl:text-lg dark:text-emerald-300",
      tagline:
        "truncate text-[10px] font-semibold leading-snug text-[#128c8c] sm:text-[11px] lg:text-xs dark:text-emerald-400/90",
    };
  }

  return {
    shell: "gap-2.5 pr-1 sm:gap-3 sm:pr-2 lg:gap-3.5 lg:pr-4",
    logo: "h-11 max-h-11 shrink-0 sm:h-12 sm:max-h-12 lg:h-14 lg:max-h-14 xl:h-[3.75rem] xl:max-h-[3.75rem] 2xl:h-16 2xl:max-h-16",
    textWrap: "hidden min-w-0 sm:block sm:max-w-[10.5rem] md:max-w-[12rem] lg:max-w-[14rem] xl:max-w-none",
    name: "truncate text-sm font-extrabold leading-tight tracking-tight text-[#1f7a2e] sm:text-base lg:text-lg xl:text-xl dark:text-emerald-300",
    tagline:
      "truncate text-[11px] font-semibold leading-snug text-[#128c8c] sm:text-xs lg:text-sm dark:text-emerald-400/90",
  };
}

export function getHeaderShellClasses(compact: boolean) {
  return compact ? "py-2 sm:py-2" : "py-2.5 sm:py-3 lg:py-3";
}
