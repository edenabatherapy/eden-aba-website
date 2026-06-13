import FamilyPortalClient from "@/components/insurance/FamilyPortalClient";

export const dynamic = "force-dynamic";

type PageProps = {
  params: Promise<{ id: string }>;
};

export default async function InsurancePortalPage({ params }: PageProps) {
  const { id } = await params;

  return (
    <main className="min-h-screen bg-gradient-to-b from-[#ddf4f4]/40 to-white px-4 py-8 sm:px-6 sm:py-12">
      <FamilyPortalClient requestId={id} />
    </main>
  );
}
