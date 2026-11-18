import { loadClips } from "@/lib/gta-clips";
import { ClipGallery } from "@/components/sites/vice-signal/ClipGallery";
import { MediaPage, mediaLocale, mediaMetadata, type MediaPageProps } from "@/components/sites/vice-signal/MediaPage";
import { mediaCopy } from "@/components/sites/vice-signal/media-copy";
import styles from "@/components/sites/vice-signal/media-page.module.css";

export async function generateMetadata({ searchParams }: MediaPageProps) {
  return mediaMetadata("clips", await mediaLocale(searchParams));
}

export default async function ClipsPage({ searchParams }: MediaPageProps) {
  const [locale, feed] = await Promise.all([mediaLocale(searchParams), loadClips()]);
  const copy = mediaCopy[locale];
  return (
    <MediaPage kind="clips" locale={locale}>
      {feed.status === "ready" && feed.clips.length > 0
        ? <ClipGallery clips={feed.clips} locale={locale} />
        : <p className={styles.feedState}>{feed.status === "ready" ? copy.noClips
          : feed.status === "unconfigured" ? copy.unconfigured : copy.clipError}</p>}
    </MediaPage>
  );
}
