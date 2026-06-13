import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";

type PageProps = {
  searchParams: Promise<{ ref?: string }>;
};

export default async function InsurancePortalVerifyRedirect({ searchParams }: PageProps) {
  const { ref } = await searchParams;
  const query = ref?.trim() ? `?ref=${encodeURIComponent(ref.trim())}` : "";
  redirect(`/insurance/status${query}`);
}
