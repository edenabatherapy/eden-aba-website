import PortalVerifyForm from "@/components/insurance/PortalVerifyForm";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function InsuranceStatusVerifyPage({ searchParams }: PageProps) {
  const { ref } = await searchParams;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ddf4f4]/40 to-white px-4 py-8 sm:px-6 sm:py-12">
      <PortalVerifyForm requestId={ref?.trim()} />
    </main>
  );
}
