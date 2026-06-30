import EdenPageShell from "@/components/common/EdenPageShell";
import EdenSiteHeader from "@/components/common/EdenSiteHeader";

type CareersSubpageShellProps = {
  children: React.ReactNode;
};

export default function CareersSubpageShell({ children }: CareersSubpageShellProps) {
  return (
    <EdenPageShell header={<EdenSiteHeader />} newsletterSource="careers-subpage">
      {children}
    </EdenPageShell>
  );
}
