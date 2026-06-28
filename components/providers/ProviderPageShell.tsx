import EdenSiteHeader from "@/components/common/EdenSiteHeader";
import FamilyNewsletter from "@/components/common/FamilyNewsletter";
import Footer from "@/components/common/Footer";
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
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <EdenSiteHeader />
      {breadcrumbs ? <ProviderBreadcrumbs items={breadcrumbs} /> : null}
      {showSectionNav ? <ProviderSectionNav /> : null}
      <main id="main-content">{children}</main>
      <FamilyNewsletter />
      <Footer />
    </div>
  );
}
