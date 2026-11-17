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
    description: "Check Rockstar’s edition comparison if you’re deciding whether the extras are worth it.",
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
    description: "Curious about the retro-themed pre-order pack? Rockstar lists the included items on its editions page.",
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
    description: "Start with Rockstar’s music page if you want to explore what you’ll hear on the radio or during the story.",
    action: "Explore More",
    destination: "/music",
    alt: "In-game radio, soundtrack and score",
    mobileArt: true,
  },
  {
    id: "gallery",
    title: "The Launch Gallery",
    category: "Screenshots",
    description: "Browse the launch screenshots at your own pace and see what details you missed in the trailers.",
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
    description: "Looking for a trailer, screenshot, or piece of artwork? Rockstar collects its media here.",
    action: "See All",
    destination: "/media",
    alt: "Media and artwork downloads",
    mobileArt: true,
  },
  {
    id: "leonida",
    title: "Only in Leonida",
    category: "People & Places",
    description: "Get acquainted with the people and places around Vice City through Rockstar’s guide to Leonida.",
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
