export const SITE_NAME = "VI";
export const SITE_TITLE = "GTA VI Countdown to your first night in Vice City";

export const SCREEN_TWO_ART = "/sites/vice-signal/screen-two-1.webp";

export const uk = {
  pageDescription: "Відлік до релізу та розділи фан-спільноти Grand Theft Auto VI.",
  artworkAlt: "Люсія та Джейсон біля автомобіля на тлі заходу сонця у Вайс-Сіті",
  countdown: "Відлік до релізу",
  home: "На головну",
  sections: "Розділи сайту",
  openMenu: "Відкрити меню",
  closeMenu: "Закрити меню",
  openSection: "Play",
  comingSoon: "Цей розділ ще готується.",
  backToSections: "До всіх розділів",
  disclaimer: "Unofficial fan project. Not affiliated with Rockstar Games or Take-Two Interactive. Grand Theft Auto is a trademark of Take-Two Interactive.",
  cards: {
    extended: { title: "An Extended Look", label: "Watch" },
    launch: { title: "Launch Trailer", label: "Watch" },
    trailer2: { title: "Trailer 2", label: "Watch" },
    trailer1: { title: "Trailer 1", label: "Watch" },
    clips: { title: "Найкращі кліпи", label: "Дивитися" },
    news: { title: "Новини", label: "Читати" },
    guides: { title: "Гайди", label: "Дивитися" },
    map: { title: "Інтерактивна мапа", label: "Дослідити" },
    streamers: { title: "Стримери", label: "Дивитися" },
    locations: { title: "Атмосферні місця", label: "Дослідити" },
  },
} as const;

export type SectionKey = keyof typeof uk.cards;

export type SectionCard = {
  id: SectionKey;
  title: string;
  label: string;
  href: string;
  image: string | null;
  imageUnoptimized?: boolean;
  videoId?: string;
};

export const sections: SectionCard[] = [
  {
    id: "extended",
    title: uk.cards.extended.title,
    label: uk.cards.extended.label,
    href: "/sections/extended",
    image: "/sites/vice-signal/cards/dwa.avif",
    videoId: "tJbzMqJGH4k",
  },
  {
    id: "launch",
    title: uk.cards.launch.title,
    label: uk.cards.launch.label,
    href: "/sections/launch",
    image: "/sites/vice-signal/cards/bag1-hq.webp",
    imageUnoptimized: true,
    videoId: "rz1B4B2yBZY",
  },
  {
    id: "trailer2",
    title: uk.cards.trailer2.title,
    label: uk.cards.trailer2.label,
    href: "/sections/trailer2",
    image: "/sites/vice-signal/cards/bag2-hq.webp",
    imageUnoptimized: true,
    videoId: "VQRLujxTm3c",
  },
  {
    id: "trailer1",
    title: uk.cards.trailer1.title,
    label: uk.cards.trailer1.label,
    href: "/sections/trailer1",
    image: "/sites/vice-signal/cards/bag3-hq.webp",
    imageUnoptimized: true,
    videoId: "QdBZY2fkU-0",
  },
];
