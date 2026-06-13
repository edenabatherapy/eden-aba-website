import { NextResponse } from "next/server";
import type { DocumentCategory } from "@/lib/insurance/db/model";
import {
  appendDocumentToRecord,
  getVerificationRecord,
  removeDocumentFromRecord,
} from "@/lib/insurance/db/repository";
import {
  deleteInsuranceDocument,
  storeInsuranceDocument,
} from "@/lib/insurance/documents/storage";
import { toFamilyPortalStatus } from "@/lib/insurance/publicStatus";
import { getPortalSessionFromCookies } from "@/lib/insurance/portal/session";

export const dynamic = "force-dynamic";

const VALID_CATEGORIES = new Set<DocumentCategory>([
  "insurance_card",
  "medicaid_document",
  "referral",
]);

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function POST(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const session = await getPortalSessionFromCookies();

  if (!session || session.requestId !== id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid upload payload." }, { status: 400 });
  }

  const categoryRaw = String(formData.get("category") || "").trim();
  if (!VALID_CATEGORIES.has(categoryRaw as DocumentCategory)) {
    return NextResponse.json({ error: "Invalid document category." }, { status: 400 });
  }

  const file = formData.get("file");
  if (!(file instanceof File)) {
    return NextResponse.json({ error: "File is required." }, { status: 400 });
  }

  const replace = String(formData.get("replace") || "") === "true";

  try {
    const stored = await storeInsuranceDocument({
      requestId: id,
      category: categoryRaw as DocumentCategory,
      file,
    });

    const updated = await appendDocumentToRecord(id, stored, {
      replaceCategory: replace,
    });
    if (!updated) {
      return NextResponse.json({ error: "Request not found." }, { status: 404 });
    }

    return NextResponse.json({
      ok: true,
      document: {
        id: stored.id,
        category: stored.category,
        safeName: stored.safeName,
        size: stored.size,
        uploadedAt: stored.uploadedAt,
      },
      portal: toFamilyPortalStatus(updated),
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Upload failed.";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const session = await getPortalSessionFromCookies();

  if (!session || session.requestId !== id) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const url = new URL(request.url);
  const documentId = url.searchParams.get("documentId")?.trim();
  if (!documentId) {
    return NextResponse.json({ error: "Document ID is required." }, { status: 400 });
  }

  const record = await getVerificationRecord(id);
  if (!record) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  const target = (record.documents || []).find((doc) => doc.id === documentId);
  if (!target) {
    return NextResponse.json({ error: "Document not found." }, { status: 404 });
  }

  try {
    await deleteInsuranceDocument(id, target.storageName);
  } catch {
    // Continue even if file is already missing from disk.
  }

  const updated = await removeDocumentFromRecord(id, documentId);
  if (!updated) {
    return NextResponse.json({ error: "Request not found." }, { status: 404 });
  }

  return NextResponse.json({
    ok: true,
    portal: toFamilyPortalStatus(updated),
  });
}
