import { NextResponse } from "next/server";
import { requireAdminAuth } from "@/lib/insurance/admin/requireAdmin";
import { getVerificationRecord } from "@/lib/insurance/db/repository";
import { readInsuranceDocument } from "@/lib/insurance/documents/storage";

export const dynamic = "force-dynamic";

type RouteContext = {
  params: Promise<{ id: string; documentId: string }>;
};

export async function GET(request: Request, context: RouteContext) {
  const auth = await requireAdminAuth(request);
  if (auth.ok === false) {
    return auth.response;
  }

  const { id, documentId } = await context.params;
  const record = await getVerificationRecord(id);

  if (!record) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  const document = (record.documents || []).find((doc) => doc.id === documentId);
  if (!document) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  try {
    const buffer = await readInsuranceDocument(id, document.storageName);
    const contentType =
      document.mimeType === "application/octet-stream"
        ? "application/pdf"
        : document.mimeType;

    return new NextResponse(new Uint8Array(buffer), {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${document.safeName}"`,
        "Cache-Control": "no-store",
      },
    });
  } catch {
    return NextResponse.json({ error: "Unable to retrieve document." }, { status: 500 });
  }
}
