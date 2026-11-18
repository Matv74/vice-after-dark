import { LiveStreams } from "@/components/sites/vice-signal/LiveStreams";
import { MediaPage, mediaLocale, mediaMetadata, type MediaPageProps } from "@/components/sites/vice-signal/MediaPage";

export async function generateMetadata({ searchParams }: MediaPageProps) {
  return mediaMetadata("streamers", await mediaLocale(searchParams));
}

export default async function StreamersPage({ searchParams }: MediaPageProps) {
  const locale = await mediaLocale(searchParams);
  return <MediaPage kind="streamers" locale={locale}><LiveStreams locale={locale} /></MediaPage>;
}
