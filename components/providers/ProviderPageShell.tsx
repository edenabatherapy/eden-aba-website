import EdenPageShell from "@/components/common/EdenPageShell";
import EdenSiteHeader from "@/components/common/EdenSiteHeader";
import ProviderSectionNav from "@/components/providers/ProviderSectionNav";
import type { ProviderBreadcrumbItem } from "@/components/providers/ProviderBreadcrumbs";
import ProviderBreadcrumbs from "@/components/providers/ProviderBreadcrumbs";

type ProviderPageShellProps = {
  children: React.ReactNode;
  breadcrumbs?: ProviderBreadcrumbItem[];
  showSectionNav?: boolean;
};

export default function ProviderPageShell({
  children,
  breadcrumbs,
  showSectionNav = true,
}: ProviderPageShellProps) {
  return (
    <EdenPageShell
      header={
        <>
          <EdenSiteHeader />
          {breadcrumbs ? <ProviderBreadcrumbs items={breadcrumbs} /> : null}
          {showSectionNav ? <ProviderSectionNav /> : null}
        </>
      }
      newsletterSource="provider-page"
    >
      {children}
    </EdenPageShell>
  );
}
