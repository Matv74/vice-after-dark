import type { Metadata } from "next";
import Link from "next/link";
import "leaflet/dist/leaflet.css";
import { COUNTDOWN_PATHS, MAP_PATHS } from "@/components/sites/gtasixcountdown/landing-routes";
import { LanguageLinks, languageLabel } from "@/components/sites/gtasixcountdown/LanguageLinks";
import { LeonidaMap } from "@/components/sites/vice-signal/LeonidaMap";
import "@/components/sites/vice-signal/story.module.css";
import styles from "@/components/sites/vice-signal/leonida-map.module.css";

const copy = {
  en: {
    title: "Map of Leonida",
    back: "Back to GTA Six Watch",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    reset: "Reset view",
    loading: "Loading the map…",
    error: "The map couldn’t load. Reload the page to try again.",
  },
  uk: {
    title: "Мапа Леоніди",
    back: "Назад до GTA Six Watch",
    zoomIn: "Збільшити масштаб",
    zoomOut: "Зменшити масштаб",
    reset: "Початковий вигляд",
    loading: "Завантажуємо мапу…",
    error: "Не вдалося завантажити мапу. Оновіть сторінку, щоб спробувати ще раз.",
  },
  pl: {
    title: "Mapa Leonidy",
    back: "Wróć do GTA Six Watch",
    zoomIn: "Przybliż",
    zoomOut: "Oddal",
    reset: "Widok początkowy",
    loading: "Wczytywanie mapy…",
    error: "Nie udało się wczytać mapy. Odśwież stronę, aby spróbować ponownie.",
  },
};

type PageProps = { searchParams: Promise<{ lang?: string | string[] }> };

function getLocale(lang: string | string[] | undefined) {
  return lang === "uk" || lang === "pl" ? lang : "en";
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const locale = getLocale((await searchParams).lang);
  return {
    title: `${copy[locale].title} | GTA Six Watch`,
    alternates: {
      canonical: MAP_PATHS[locale],
      languages: { ...MAP_PATHS, "x-default": MAP_PATHS.en },
    },
  };
}

export default async function MapPage({ searchParams }: PageProps) {
  const locale = getLocale((await searchParams).lang);
  const labels = copy[locale];

  return (
    <main className={styles.page} lang={locale}>
      <div className={styles.layout}>
        <header className={styles.header}>
          <div className={styles.headerRow}>
            <Link href={COUNTDOWN_PATHS[locale]} className={styles.back}>
              <span aria-hidden="true">←</span> {labels.back}
            </Link>
            <nav className={styles.languages} aria-label={languageLabel[locale]}>
              <LanguageLinks current={locale} paths={MAP_PATHS} />
            </nav>
          </div>
          <h1>{labels.title}</h1>
        </header>
        <LeonidaMap labels={labels} />
      </div>
    </main>
  );
}
