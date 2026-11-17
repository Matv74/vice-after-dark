// TODO: legal review
import { notFound, redirect } from "next/navigation";
import { DEFAULT_LEGAL_LOCALE, isLegalDocument } from "@/config/legal";

export default async function DefaultLegalPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: document } = await params;
  if (!isLegalDocument(document)) notFound();
  redirect(`/${DEFAULT_LEGAL_LOCALE}/${document}`);
}
