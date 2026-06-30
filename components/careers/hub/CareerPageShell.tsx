import EdenPageShell from "@/components/common/EdenPageShell";
import EdenSiteHeader from "@/components/common/EdenSiteHeader";

type CareerPageShellProps = {
  children: React.ReactNode;
};

export default function CareerPageShell({ children }: CareerPageShellProps) {
  return (
    <EdenPageShell header={<EdenSiteHeader />} newsletterSource="careers-page">
      {children}
    </EdenPageShell>
  );
}
