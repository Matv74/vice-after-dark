import { ArrowUpRight } from "lucide-react";
import styles from "./fifth-scene.module.css";

const imageRoot = "/sites/vice-signal/scene-five";
const officialSite = "https://www.rockstargames.com/VI";

type SceneCard = {
  id: string;
  title: string;
  category?: string;
  description: string;
  action: string;
  destination: string;
  alt: string;
  mobileArt?: boolean;
  promo?: boolean;
  align?: "right";
  accent?: "pink";
};

const cards: readonly SceneCard[] = [
  {
    id: "ultimate",
    title: "Ultimate Edition",
    description: "An exclusive collection of items threaded across all aspects of Jason and Lucia’s story.",
    action: "Learn More",
    destination: "/editions",
    alt: "Grand Theft Auto VI Ultimate Edition box art",
    mobileArt: true,
    promo: true,
    align: "right",
  },
  {
    id: "vintage",
    title: "Vintage Vice City Pack",
    category: "Pre-order Bonuses",
    description: "Pre-order to get unique benefits that flash back to when the neon burned brightest.",
    action: "Learn More",
    destination: "/editions",
    alt: "Vintage Vice City Pack pre-order bonus",
    promo: true,
    align: "right",
  },
  {
    id: "music",
    title: "In-Game Radio, Soundtrack, and Score",
    category: "Music",
    description: "Listen to the Official Score and Soundtrack, plus select in-game radio stations.",
    action: "Explore More",
    destination: "/music",
    alt: "In-game radio, soundtrack and score",
    mobileArt: true,
  },
  {
    id: "gallery",
    title: "The Launch Gallery",
    category: "Screenshots",
    description: "Get a stunning look inside Leonida with a collection of new screenshots.",
    action: "View All",
    destination: "/launch-gallery",
    alt: "The Launch Gallery screenshots",
    mobileArt: true,
    align: "right",
  },
  {
    id: "media",
    title: "Media & Artwork",
    category: "Downloads",
    description: "Download and share official videos, screenshots, and more.",
    action: "See All",
    destination: "/media",
    alt: "Media and artwork downloads",
    mobileArt: true,
  },
  {
    id: "leonida",
    title: "Only in Leonida",
    category: "People & Places",
    description: "Vice City, USA. The darkest side of the sunniest place in America.",
    action: "Explore More",
    destination: "/only-in-leonida",
    alt: "Only in Leonida",
    mobileArt: true,
    align: "right",
    accent: "pink",
  },
];

export function FifthScene() {
  return (
    <section id="vice-scene-five" className={styles.entry} lang="en" aria-label="Explore Grand Theft Auto VI">
      <div className={styles.scene}>
        <div className={styles.cards}>
          {cards.map(card => (
            <article key={card.id} className={styles.card} data-promo={card.promo} data-align={card.align}>
              <picture className={styles.art}>
                {card.mobileArt && <source media="(max-width: 767px)" srcSet={`${imageRoot}/${card.id}-mobile.webp`} />}
                <img src={`${imageRoot}/${card.id}.webp`} alt={card.alt} loading="lazy" decoding="async" />
              </picture>
              <div className={styles.content}>
                {card.category && <p className={styles.category}>{card.category}</p>}
                <h2>{card.title}</h2>
                <p className={styles.description}>{card.description}</p>
                <a
                  className={styles.action}
                  data-accent={card.accent}
                  href={`${officialSite}${card.destination}`}
                  aria-label={`${card.action} — ${card.title}`}
                >
                  {card.action}
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
