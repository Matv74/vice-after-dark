import type { LandingLocale } from "../gtasixcountdown/landing-routes";
import { storyCopy } from "./story-copy";
import styles from "./fifth-scene.module.css";

const imageRoot = "/sites/vice-signal/scene-five";

type CardCopy = {
  title: string;
  description: string;
};

type SceneCard = CardCopy & {
  id: "telegram" | "streamers" | "clips" | "news" | "map" | "locations";
  artwork: string;
  translations: Record<Exclude<LandingLocale, "en">, CardCopy>;
  mobileArt?: boolean;
  promo?: boolean;
  align?: "right";
};

const comingSoon = { en: "Coming Soon", uk: "Незабаром", pl: "Wkrótce" };

const cards: readonly SceneCard[] = [
  {
    id: "telegram",
    artwork: "ultimate",
    title: "Telegram Channel",
    description: "Follow GTA VI announcements, new trailers, and updates from the community in one place.",
    translations: {
      uk: { title: "Канал у Telegram", description: "Анонси GTA VI, нові трейлери та оновлення від спільноти в одному місці." },
      pl: { title: "Kanał na Telegramie", description: "Zapowiedzi GTA VI, nowe zwiastuny i wieści od społeczności w jednym miejscu." },
    },
    mobileArt: true,
    promo: true,
    align: "right",
  },
  {
    id: "streamers",
    artwork: "vintage",
    title: "Top Streamers",
    description: "Discover GTA creators who stream gameplay, break down trailers, and talk all things Vice City.",
    translations: {
      uk: { title: "Топ стримерів", description: "Знайомтеся з авторами, які стримлять GTA, розбирають трейлери й обговорюють Вайс-Сіті." },
      pl: { title: "Top streamerzy", description: "Poznaj twórców, którzy streamują GTA, analizują zwiastuny i rozmawiają o Vice City." },
    },
    promo: true,
    align: "right",
  },
  {
    id: "clips",
    artwork: "music",
    title: "Clips",
    description: "Rewatch standout moments, fan edits, and trailer details you might have missed.",
    translations: {
      uk: { title: "Кліпи", description: "Яскраві моменти, фанатські нарізки й деталі трейлерів, які легко пропустити." },
      pl: { title: "Klipy", description: "Najciekawsze momenty, fanowskie montaże i detale zwiastunów, które łatwo przeoczyć." },
    },
    mobileArt: true,
  },
  {
    id: "news",
    artwork: "gallery",
    title: "News",
    description: "Catch up on Rockstar announcements and the latest GTA VI coverage.",
    translations: {
      uk: { title: "Новини", description: "Анонси Rockstar та свіжі новини про GTA VI." },
      pl: { title: "Aktualności", description: "Ogłoszenia Rockstar i najnowsze wiadomości o GTA VI." },
    },
    mobileArt: true,
    align: "right",
  },
  {
    id: "map",
    artwork: "media",
    title: "Map",
    description: "Get your bearings in Leonida, from Vice City’s streets to the roads beyond the city.",
    translations: {
      uk: { title: "Мапа", description: "Зорієнтуйтеся в Леоніді: від вулиць Вайс-Сіті до доріг за містом." },
      pl: { title: "Mapa", description: "Zorientuj się w Leonidzie: od ulic Vice City po drogi za miastem." },
    },
    mobileArt: true,
  },
  {
    id: "locations",
    artwork: "leonida",
    title: "Locations",
    description: "A closer look at Leonida’s neighborhoods, landmarks, and out-of-the-way spots is on the way.",
    translations: {
      uk: { title: "Локації", description: "Тут з’явиться путівник районами, пам’ятками й маловідомими місцями Леоніди." },
      pl: { title: "Lokacje", description: "Pojawi się tu przewodnik po dzielnicach, atrakcjach i mniej znanych miejscach Leonidy." },
    },
    mobileArt: true,
    align: "right",
  },
];

export function FifthScene({ locale }: { locale: LandingLocale }) {
  return (
    <section id="vice-scene-five" className={styles.entry} aria-label={storyCopy[locale].explore}>
      <div className={styles.scene}>
        <div className={styles.cards}>
          {cards.map(card => {
            const copy = locale === "en" ? card : card.translations[locale];

            return (
              <article key={card.id} className={styles.card} data-promo={card.promo} data-align={card.align}>
                <picture className={styles.art}>
                  {card.mobileArt && <source media="(max-width: 767px)" srcSet={`${imageRoot}/${card.artwork}-mobile.webp`} />}
                  <img src={`${imageRoot}/${card.artwork}.webp`} alt="" loading="lazy" decoding="async" />
                </picture>
                <div className={styles.content}>
                  {card.id === "streamers" && <span className={styles.liveBadge}>LIVE</span>}
                  {card.id === "locations" && <span className={styles.soonBadge}>{comingSoon[locale]}</span>}
                  <h2>{copy.title}</h2>
                  <p className={styles.description}>{copy.description}</p>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
