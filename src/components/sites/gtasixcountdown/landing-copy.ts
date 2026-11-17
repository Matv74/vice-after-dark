import type { LandingLocale } from "./landing-routes";

export const landingCopy = {
  en: {
    countdown: {
      title: "GTA VI Countdown – GTA 6 Release Time in Your Time Zone",
      heading: "GTA VI Countdown",
      description: "Live GTA VI countdown to 19 November 2026. Check the GTA 6 release time in your time zone for PS5 and Xbox Series X|S.",
    },
    released: {
      title: "GTA VI Release Date and Unlock Time – PS5 and Xbox",
      heading: "GTA VI Release Date and Unlock Time",
      description: "GTA VI launched on 19 November 2026 for PS5 and Xbox Series X|S. See the original release time in your region.",
    },
    ogLocale: "en_US",
    timer: { label: "Time until GTA VI release", units: ["Days", "Hours", "Minutes", "Seconds"], shortUnits: ["Days", "Hrs", "Min", "Sec"], out: "Out Now" },
  },
  uk: {
    countdown: {
      title: "Таймер до виходу GTA 6 — відлік і час релізу в Україні",
      heading: "Відлік до виходу GTA 6",
      description: "Дивіться відлік до виходу GTA 6. Дізнайтеся, о котрій гра відкриється за Києвом на PS5 та Xbox Series X|S.",
    },
    released: {
      title: "Коли вийшла GTA 6 в Україні — дата, час і платформи",
      heading: "Коли вийшла GTA 6 в Україні",
      description: "GTA VI вийшла 19 листопада 2026 року на PS5 та Xbox Series X|S. Дізнайтеся точний час запуску за Києвом та в інших регіонах.",
    },
    ogLocale: "uk_UA",
    timer: { label: "Час до виходу GTA VI", units: ["Дні", "Години", "Хвилини", "Секунди"], shortUnits: ["Дні", "Год", "Хв", "Сек"], out: "Гра вже вийшла" },
  },
  pl: {
    countdown: {
      title: "Odliczanie do premiery GTA 6 – godzina premiery w Polsce",
      heading: "Odliczanie do premiery GTA 6",
      description: "Sprawdź odliczanie do premiery GTA 6 i godzinę odblokowania gry w Polsce na PS5 oraz Xbox Series X|S.",
    },
    released: {
      title: "Kiedy wyszło GTA 6 w Polsce – data, godzina i platformy",
      heading: "Kiedy wyszło GTA 6 w Polsce",
      description: "GTA VI ukazało się 19 listopada 2026 r. na PS5 i Xbox Series X|S. Sprawdź godzinę premiery w Polsce oraz w innych regionach.",
    },
    ogLocale: "pl_PL",
    timer: { label: "Czas do premiery GTA VI", units: ["Dni", "Godziny", "Minuty", "Sekundy"], shortUnits: ["Dni", "Godz.", "Min", "Sek"], out: "Gra jest już dostępna" },
  },
} as const;

export function getLandingCopy(locale: LandingLocale, now: number) {
  // Switch the search copy after the last local release window has passed.
  const phase = now >= Date.UTC(2026, 10, 19, 12) ? "released" : "countdown";
  return landingCopy[locale][phase];
}
