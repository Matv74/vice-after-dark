import type { SectionKey } from "./config";

type StoryCopy = {
  home: string;
  openMenu: string;
  closeMenu: string;
  sections: string;
  countdown: string;
  trailers: string;
  titles: Partial<Record<SectionKey, string>>;
  watch: string;
  play: string;
  artwork: string;
  scene: string;
  fireArtwork: string;
  explore: string;
};

export const storyCopy = {
  en: {
    home: "Home", openMenu: "Open menu", closeMenu: "Close menu", sections: "Site sections",
    countdown: "Release countdown", trailers: "Trailers", titles: {}, watch: "Watch", play: "Play",
    artwork: "Lucia and Jason next to a car at sunset in Vice City",
    scene: "GTA VI scene", fireArtwork: "Lucia and Jason in front of a burning car", explore: "Explore Grand Theft Auto VI",
  },
  uk: {
    home: "Головна", openMenu: "Відкрити меню", closeMenu: "Закрити меню", sections: "Розділи сайту",
    countdown: "Відлік до релізу", trailers: "Трейлери",
    titles: { extended: "Розширений показ", launch: "Релізний трейлер", trailer2: "Другий трейлер", trailer1: "Перший трейлер" },
    watch: "Дивитися", play: "Відтворити", artwork: "Лусія та Джейсон біля авто на заході сонця у Вайс-Сіті",
    scene: "Сцена з GTA VI", fireArtwork: "Лусія та Джейсон перед палаючим авто", explore: "Дослідіть Grand Theft Auto VI",
  },
  pl: {
    home: "Strona główna", openMenu: "Otwórz menu", closeMenu: "Zamknij menu", sections: "Sekcje strony",
    countdown: "Odliczanie do premiery", trailers: "Zwiastuny",
    titles: { extended: "Rozszerzony pokaz", launch: "Zwiastun premierowy", trailer2: "Drugi zwiastun", trailer1: "Pierwszy zwiastun" },
    watch: "Obejrzyj", play: "Odtwórz", artwork: "Lucia i Jason obok samochodu o zachodzie słońca w Vice City",
    scene: "Scena z GTA VI", fireArtwork: "Lucia i Jason przed płonącym samochodem", explore: "Poznaj Grand Theft Auto VI",
  },
} satisfies Record<"en" | "uk" | "pl", StoryCopy>;

export function storyTitle(copy: StoryCopy, card: { id: SectionKey; title: string }) {
  return copy.titles[card.id] ?? card.title;
}
