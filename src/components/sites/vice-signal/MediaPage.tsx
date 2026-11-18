import type { Metadata } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { LanguageLinks, languageLabel } from "../gtasixcountdown/LanguageLinks";
import { COUNTDOWN_PATHS, MEDIA_PATHS, type LandingLocale } from "../gtasixcountdown/landing-routes";
import { mediaCopy } from "./media-copy";
import "./story.module.css";
import layout from "./leonida-map.module.css";
import styles from "./media-page.module.css";

type MediaKind = keyof typeof MEDIA_PATHS;
export type MediaPageProps = { searchParams: Promise<{ lang?: string | string[] }> };

export async function mediaLocale(searchParams: MediaPageProps["searchParams"]): Promise<LandingLocale> {
  const { lang } = await searchParams;
  return lang === "uk" || lang === "pl" ? lang : "en";
}

export function mediaMetadata(kind: MediaKind, locale: LandingLocale): Metadata {
  const paths = MEDIA_PATHS[kind];
  return {
    title: `${mediaCopy[locale][kind]} | GTA Six Watch`,
    alternates: { canonical: paths[locale], languages: { ...paths, "x-default": paths.en } },
  };
}

export function MediaPage({ kind, locale, children }: {
  kind: MediaKind; locale: LandingLocale; children: ReactNode;
}) {
  const copy = mediaCopy[locale];

  return (
    <main className={layout.page} lang={locale}>
      <div className={layout.layout}>
        <header className={layout.header}>
          <div className={layout.headerRow}>
            <Link href={COUNTDOWN_PATHS[locale]} className={layout.back}>
              <span aria-hidden="true">←</span> {copy.back}
            </Link>
            <nav className={layout.languages} aria-label={languageLabel[locale]}>
              <LanguageLinks current={locale} paths={MEDIA_PATHS[kind]} />
            </nav>
          </div>
          <h1>{copy[kind]}</h1>
          <p className={styles.intro}>{kind === "streamers" ? copy.twitchIntro : copy.clipsIntro}</p>
        </header>
        {children}
      </div>
    </main>
  );
}
