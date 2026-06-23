import EdenSiteHeader from "@/components/common/EdenSiteHeader";
import FamilyNewsletter from "@/components/common/FamilyNewsletter";
import Footer from "@/components/common/Footer";

type CareersSubpageShellProps = {
  children: React.ReactNode;
};

export default function CareersSubpageShell({ children }: CareersSubpageShellProps) {
  return (
    <div className="bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
      <EdenSiteHeader />
      <main id="main-content">{children}</main>
      <FamilyNewsletter />
      <Footer />
    </div>
  );
}
