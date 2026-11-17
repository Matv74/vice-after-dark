"use client";

import Image from "next/image";
import { ArrowUpRight, Menu, Play, X } from "lucide-react";
import { type CSSProperties, type ReactNode, useLayoutEffect, useRef, useState } from "react";
import { SCREEN_TWO_ART, sections, SITE_NAME, type SectionCard } from "./config";
import { interfaceCopy } from "../gtasixcountdown/interface-copy";
import type { LandingLocale } from "../gtasixcountdown/landing-routes";
import { storyCopy, storyTitle } from "./story-copy";
import { FifthScene } from "./FifthScene";
import { FourthScene } from "./FourthScene";
import { connectScroll, SCROLL } from "./scroll";
import { connectWheelScroll } from "./wheel-scroll";
import styles from "./story.module.css";

const [featured, ...portraitCards] = sections;
const primaryCards = portraitCards.slice(0, 3);
const extraCards = portraitCards.slice(3);

function trailerUrl(card: SectionCard) {
  return card.videoId && /^[\w-]{11}$/.test(card.videoId)
    ? `https://www.youtube.com/watch?v=${card.videoId}`
    : undefined;
}

function StoryHeader({ headerRef, locale }: { headerRef: React.RefObject<HTMLElement | null>; locale: LandingLocale }) {
  const copy = storyCopy[locale];
  const menu = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState(false);

  function openMenu() {
    menu.current?.showModal();
    setOpen(true);
  }

  return (
    <>
      <header ref={headerRef} className={styles.header} inert>
        <a className={styles.brand} href="#countdown" aria-label={SITE_NAME + " — " + copy.home}>
          {SITE_NAME}
        </a>
        <div className={styles.headerActions}>
          <button
            className={styles.iconButton}
            type="button" aria-label={copy.openMenu} aria-haspopup="dialog"
            aria-expanded={open} aria-controls="vice-menu" onClick={openMenu}
          >
            <Menu aria-hidden="true" />
          </button>
        </div>
      </header>
      <dialog
        ref={menu} id="vice-menu" className={styles.menu} aria-label={copy.sections}
        onClose={() => setOpen(false)}
      >
        <div className={styles.menuHeader}>
          <a className={styles.brand} href="#countdown" onClick={() => menu.current?.close()}>{SITE_NAME}</a>
          <button
            className={styles.iconButton} type="button" aria-label={copy.closeMenu}
            onClick={() => menu.current?.close()}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav aria-label={copy.sections}>
          <a href="#countdown" onClick={() => menu.current?.close()}>{copy.countdown}</a>
          {sections.map((section) => {
            const videoUrl = trailerUrl(section);

            return (
              <a
                key={section.id}
                href={videoUrl ?? section.href}
                target={videoUrl ? "_blank" : undefined}
                rel={videoUrl ? "noopener noreferrer" : undefined}
                onClick={() => menu.current?.close()}
              >
                {storyTitle(copy, section)}<ArrowUpRight aria-hidden="true" />
              </a>
            );
          })}
        </nav>
      </dialog>
    </>
  );
}

function Card({ card, featured, locale }: { card: SectionCard; featured?: boolean; locale: LandingLocale }) {
  const videoUrl = trailerUrl(card);
  const copy = storyCopy[locale];
  const title = storyTitle(copy, card);

  return (
    <div className={styles.cardSlot}>
      <a
        href={videoUrl ?? card.href}
        target={videoUrl ? "_blank" : undefined}
        rel={videoUrl ? "noopener noreferrer" : undefined}
        data-card={card.id}
        className={styles.card + (featured ? " " + styles.featured : "")}
      >
        <div className={styles.cardArt} data-art={card.id} aria-hidden="true">
          {card.image && (
            <Image
              src={card.image}
              alt={title}
              fill
              unoptimized={card.imageUnoptimized}
              sizes={featured
                ? "(max-width: 768px) calc(100vw - 24px), (max-width: 1650px) 80vw, 1320px"
                : "(max-width: 416px) 72vw, (max-width: 768px) 300px, (max-width: 1650px) 27vw, 424px"}
            />
          )}
        </div>
        {!featured && (
          <span className={styles.cardAction} aria-hidden="true">
            <Play fill="currentColor" />
          </span>
        )}
        <div className={styles.cardText}>
          <span className={styles.label}>{copy.watch}</span>
          <h3>{title}</h3>
          {featured && (
            <span className={styles.featuredAction} aria-hidden="true">
              <Play fill="currentColor" />
              {copy.play}
            </span>
          )}
        </div>
      </a>
    </div>
  );
}

export function ViceStory({ children, locale }: { children: ReactNode; locale: LandingLocale }) {
  const copy = storyCopy[locale];
  const story = useRef<HTMLDivElement>(null);
  const stage = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLDivElement>(null);
  const artwork = useRef<HTMLImageElement>(null);
  const header = useRef<HTMLElement>(null);
  const panel = useRef<HTMLElement>(null);

  useLayoutEffect(connectWheelScroll, []);

  useLayoutEffect(() => {
    if (!story.current || !stage.current || !hero.current || !artwork.current || !header.current || !panel.current) return;
    return connectScroll({
      story: story.current,
      stage: stage.current,
      hero: hero.current,
      artwork: artwork.current,
      header: header.current,
      panel: panel.current,
    });
  }, []);

  const sceneStyles = {
    "--pin-distance": "calc(" + (SCROLL.INTRO_RANGE_VH + SCROLL.PANEL_RANGE_VH) * 100 + "svh + " + SCROLL.HOLD_PX + "px)",
    "--reduced-fade": SCROLL.REDUCED_FADE_MS + "ms",
    "--hero-cover-scale": 1 / SCROLL.HERO_ZOOM_TO,
    "--screen3-bg": SCROLL.SCREEN3_BG,
  } as CSSProperties;

  return (
    <div ref={story} className={styles.story} id="countdown" style={sceneStyles}>
      <div ref={stage} className={styles.stage}>
        <div ref={hero} className={styles.hero}>
          {children}
          <div className={styles.heroShade} aria-hidden="true" />
        </div>
        <div className={styles.artFrame}>
          <div className={styles.artScene}>
            <Image
              ref={artwork} src={SCREEN_TWO_ART} alt={copy.artwork} fill
              sizes="100vw" unoptimized preload decoding="async"
              className={styles.artwork}
            />
            <div className={styles.artShade} aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className={styles.runway} aria-hidden="true" />
      <div className={styles.ukrainian} id="sections">
        <StoryHeader headerRef={header} locale={locale} />
        <section ref={panel} className={styles.panel} id="vice-panel" aria-labelledby="vice-sections-heading">
          <div className={styles.column}>
            <h2 className="sr-only" id="vice-sections-heading">{copy.trailers}</h2>
            <Card card={featured} featured locale={locale} />
            <div className={styles.primaryCards}>
              {primaryCards.map((card) => <Card key={card.id} card={card} locale={locale} />)}
            </div>
            {extraCards.length > 0 && (
              <div className={styles.extraCards}>
                {extraCards.map((card) => <Card key={card.id} card={card} locale={locale} />)}
              </div>
            )}
          </div>
          <footer className={styles.legal}>{interfaceCopy[locale].disclaimer}</footer>
        </section>
      </div>
      <FourthScene locale={locale} />
      <FifthScene locale={locale} />
    </div>
  );
}
