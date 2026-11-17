import type { LandingLocale } from "./landing-routes";

export const interfaceCopy = {
  en: {
    customize: "Customize", background: "Background", backgroundAlt: "GTA VI background",
    toggles: {
      showFooterToggle: "Show footer toggle", showNewsToggle: "Show news toggle",
      showMusicToggle: "Show music player toggle", autoChangeBg: "Change background every 20 seconds",
      showDailyEffects: "Daily countdown effects",
    },
    showFooter: "Show footer", hideFooter: "Hide footer",
    disclaimer: "Unofficial fan project. Not affiliated with Rockstar Games or Take-Two Interactive. Grand Theft Auto is a trademark of Take-Two Interactive.",
    region: {
      name: "Release region", auto: "Auto",
      note: "Auto follows midnight in your time zone. Manual selections use the listed release windows.",
    },
    news: {
      toggle: "Toggle news feed", title: "Latest News", refresh: "Refresh news", refreshing: "Refreshing news…",
      cached: "Showing the saved source feed", saved: "Saved feed", updated: "Updated", important: "Important",
      failed: "Failed to load news. Please try again later.", loading: "Loading news…", empty: "No news available at the moment.",
      video: "Video for", viewPost: "View post on X", open: "Open", openLink: "Open source",
    },
    music: {
      toggle: "Toggle GTA VI music player", player: "GTA VI audio player", stream: "GTA VI album audio stream",
      load: "Load SoundCloud", cover: "GTA VI album cover", seek: "Seek track", previous: "Previous track",
      pause: "Pause", play: "Play", loading: "Loading SoundCloud player…", next: "Next track",
      repeatOff: "Disable repeat", repeatOn: "Enable repeat", unavailable: "SoundCloud playback is unavailable.",
      playlist: "Open the playlist", unmute: "Unmute", mute: "Mute", volume: "Volume",
      youtube: "Open playlist on YouTube", soundcloud: "Open playlist on SoundCloud",
      tracks: "Tracks", tracklist: "Toggle track list", playing: "Playing", selected: "Selected",
    },
    embed: {
      heading: "Embed Widget", size: "Size preset", custom: "Custom dimensions",
      widths: { small: "Small", medium: "Medium", large: "Large" }, width: "Width", height: "Height",
      preview: "Live preview", instruction: "Copy the code below to embed the GTA 6 countdown widget on your site.",
      code: "Embed code", copy: "Copy code", copied: "Copied!", select: "Select the code to copy it.",
    },
    backgrounds: {
      default: "Default cover", transparent: "Transparent", solid: "Solid dark",
      "gta-vi-artwork-bg.webp": "GTA VI artwork", "gta-vi-trailer2-art.webp": "Artwork from Trailer 2",
      "Official_Cover_Art_landscape.webp": "GTA VI cover art",
      "ULTIMATE_EDITION_SAFEHOUSE_VEHICLES_03.0c9.qtpdi.tf.webp": "Ultimate Edition safe house",
      "gta-vi-vicecity-sign.webp": "Vice City sign", "vice-city-beach.webp": "Vice City beach",
      "Jason_and_Lucia_16.05-d133mx68ku.jpg.avif": "Jason and Lucia", "gta-vi-bg-trailer.mp4": "GTA VI Trailer",
      "gta-vi-bg-trailer-2.mp4": "GTA VI Trailer 2",
    },
  },
  uk: {
    customize: "Налаштування", background: "Тло", backgroundAlt: "Тло GTA VI",
    toggles: {
      showFooterToggle: "Показувати кнопку нижнього колонтитула", showNewsToggle: "Показувати кнопку новин",
      showMusicToggle: "Показувати кнопку плеєра", autoChangeBg: "Змінювати тло кожні 20 секунд",
      showDailyEffects: "Щоденні ефекти таймера",
    },
    showFooter: "Показати нижній колонтитул", hideFooter: "Приховати нижній колонтитул",
    disclaimer: "Неофіційний фанатський сайт. Проєкт не пов’язаний із Rockstar Games або Take-Two Interactive. Grand Theft Auto — торговельна марка Take-Two Interactive.",
    region: {
      name: "Регіон релізу", auto: "Автоматично",
      note: "Автоматичний відлік іде до місцевої півночі. Ручний вибір використовує час, указаний для відповідного регіону.",
    },
    news: {
      toggle: "Перемкнути панель новин", title: "Останні новини", refresh: "Оновити новини", refreshing: "Оновлення новин…",
      cached: "Показано збережену стрічку", saved: "Збережена стрічка", updated: "Оновлено", important: "Важливо",
      failed: "Не вдалося завантажити новини. Спробуйте ще раз пізніше.", loading: "Завантаження новин…",
      empty: "Зараз немає новин.", video: "Відео до публікації", viewPost: "Переглянути допис у X",
      open: "Відкрити", openLink: "Відкрити джерело",
    },
    music: {
      toggle: "Перемкнути музичний плеєр GTA VI", player: "Музичний плеєр GTA VI", stream: "Аудіопотік альбому GTA VI",
      load: "Завантажити SoundCloud", cover: "Обкладинка альбому GTA VI", seek: "Позиція в треку",
      previous: "Попередній трек", pause: "Призупинити", play: "Відтворити", loading: "Завантаження плеєра SoundCloud…",
      next: "Наступний трек", repeatOff: "Вимкнути повтор", repeatOn: "Увімкнути повтор",
      unavailable: "Відтворення через SoundCloud недоступне.", playlist: "Відкрити плейлист",
      unmute: "Увімкнути звук", mute: "Вимкнути звук", volume: "Гучність", youtube: "Відкрити плейлист на YouTube",
      soundcloud: "Відкрити плейлист на SoundCloud", tracks: "Треки", tracklist: "Перемкнути список треків",
      playing: "Відтворюється", selected: "Вибрано",
    },
    embed: {
      heading: "Вбудувати віджет", size: "Розмір", custom: "Власні розміри",
      widths: { small: "Малий", medium: "Середній", large: "Великий" }, width: "Ширина", height: "Висота",
      preview: "Попередній перегляд", instruction: "Скопіюйте код, щоб додати таймер GTA 6 на свій сайт.",
      code: "Код для вставлення", copy: "Копіювати код", copied: "Скопійовано!", select: "Виділіть код, щоб скопіювати.",
    },
    backgrounds: {
      default: "Стандартна обкладинка", transparent: "Прозоре", solid: "Темне",
      "gta-vi-artwork-bg.webp": "Ілюстрація GTA VI", "gta-vi-trailer2-art.webp": "Ілюстрація з другого трейлера",
      "Official_Cover_Art_landscape.webp": "Обкладинка GTA VI",
      "ULTIMATE_EDITION_SAFEHOUSE_VEHICLES_03.0c9.qtpdi.tf.webp": "Схованка з Ultimate Edition",
      "gta-vi-vicecity-sign.webp": "Вивіска Вайс-Сіті", "vice-city-beach.webp": "Пляж Вайс-Сіті",
      "Jason_and_Lucia_16.05-d133mx68ku.jpg.avif": "Джейсон і Лусія", "gta-vi-bg-trailer.mp4": "Трейлер GTA VI",
      "gta-vi-bg-trailer-2.mp4": "Другий трейлер GTA VI",
    },
  },
  pl: {
    customize: "Ustawienia", background: "Tło", backgroundAlt: "Tło GTA VI",
    toggles: {
      showFooterToggle: "Pokaż przycisk stopki", showNewsToggle: "Pokaż przycisk aktualności",
      showMusicToggle: "Pokaż przycisk odtwarzacza", autoChangeBg: "Zmieniaj tło co 20 sekund",
      showDailyEffects: "Codzienne efekty odliczania",
    },
    showFooter: "Pokaż stopkę", hideFooter: "Ukryj stopkę",
    disclaimer: "Nieoficjalny serwis fanowski, niezwiązany z Rockstar Games ani Take-Two Interactive. Grand Theft Auto jest znakiem towarowym Take-Two Interactive.",
    region: {
      name: "Region premiery", auto: "Automatycznie",
      note: "Tryb automatyczny odlicza do lokalnej północy. Wybór ręczny korzysta z godzin podanych dla danego regionu.",
    },
    news: {
      toggle: "Przełącz panel aktualności", title: "Najnowsze wiadomości", refresh: "Odśwież wiadomości", refreshing: "Odświeżanie wiadomości…",
      cached: "Wyświetlane są zapisane wiadomości", saved: "Zapisane wiadomości", updated: "Aktualizacja", important: "Ważne",
      failed: "Nie udało się wczytać wiadomości. Spróbuj ponownie później.", loading: "Wczytywanie wiadomości…",
      empty: "Brak wiadomości.", video: "Film do wiadomości", viewPost: "Zobacz post na X", open: "Otwórz", openLink: "Otwórz źródło",
    },
    music: {
      toggle: "Przełącz odtwarzacz muzyki GTA VI", player: "Odtwarzacz muzyki GTA VI", stream: "Strumień audio albumu GTA VI",
      load: "Wczytaj SoundCloud", cover: "Okładka albumu GTA VI", seek: "Pozycja w utworze",
      previous: "Poprzedni utwór", pause: "Wstrzymaj", play: "Odtwórz", loading: "Wczytywanie odtwarzacza SoundCloud…",
      next: "Następny utwór", repeatOff: "Wyłącz powtarzanie", repeatOn: "Włącz powtarzanie",
      unavailable: "Odtwarzanie z SoundCloud jest niedostępne.", playlist: "Otwórz playlistę",
      unmute: "Włącz dźwięk", mute: "Wycisz", volume: "Głośność", youtube: "Otwórz playlistę na YouTube",
      soundcloud: "Otwórz playlistę na SoundCloud", tracks: "Utwory", tracklist: "Przełącz listę utworów",
      playing: "Odtwarzanie", selected: "Wybrano",
    },
    embed: {
      heading: "Osadź widżet", size: "Rozmiar", custom: "Własne wymiary",
      widths: { small: "Mały", medium: "Średni", large: "Duży" }, width: "Szerokość", height: "Wysokość",
      preview: "Podgląd na żywo", instruction: "Skopiuj kod, aby osadzić licznik GTA 6 na swojej stronie.",
      code: "Kod do osadzenia", copy: "Skopiuj kod", copied: "Skopiowano!", select: "Zaznacz kod, aby go skopiować.",
    },
    backgrounds: {
      default: "Domyślna okładka", transparent: "Przezroczyste", solid: "Ciemne",
      "gta-vi-artwork-bg.webp": "Grafika GTA VI", "gta-vi-trailer2-art.webp": "Grafika z drugiego zwiastuna",
      "Official_Cover_Art_landscape.webp": "Okładka GTA VI",
      "ULTIMATE_EDITION_SAFEHOUSE_VEHICLES_03.0c9.qtpdi.tf.webp": "Kryjówka z Ultimate Edition",
      "gta-vi-vicecity-sign.webp": "Szyld Vice City", "vice-city-beach.webp": "Plaża w Vice City",
      "Jason_and_Lucia_16.05-d133mx68ku.jpg.avif": "Jason i Lucia", "gta-vi-bg-trailer.mp4": "Zwiastun GTA VI",
      "gta-vi-bg-trailer-2.mp4": "Drugi zwiastun GTA VI",
    },
  },
} as const;

export function backgroundLabel(locale: LandingLocale, id: string, original: string) {
  const labels: Readonly<Record<string, string>> = interfaceCopy[locale].backgrounds;
  return labels[id] ?? original;
}
