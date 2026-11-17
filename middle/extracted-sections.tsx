import React from "react";

// ============================================================================
// ПОВ'ЯЗАНІ ДОПОМІЖНІ КОМПОНЕНТИ (UI COMPONENTS)
// ============================================================================

/** Базовий шлях до зображень. У новому проекті змініть на ваш шлях */
const IMG_BASE_PATH = "/sites/rockstargames-vi/img";

/**
 * Адаптивний тег <picture> з окремими джерелами для мобільних та десктопних екранів
 */
export function Pic({
  desktop,
  mobile,
  alt = "",
  className = "",
  loading = "lazy",
}: {
  desktop: string;
  mobile?: string;
  alt?: string;
  className?: string;
  loading?: "lazy" | "eager";
}) {
  return (
    <picture>
      {mobile && (
        <source media="(max-width: 767px)" srcSet={`${IMG_BASE_PATH}/${mobile}`} />
      )}
      <source media="(min-width: 768px)" srcSet={`${IMG_BASE_PATH}/${desktop}`} />
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={`${IMG_BASE_PATH}/${mobile ?? desktop}`}
        alt={alt}
        className={className}
        loading={loading}
        draggable={false}
      />
    </picture>
  );
}

/** Іконка стрілки для кнопок-пігулок */
export function ArrowIcon() {
  return (
    <svg
      width="15"
      height="15"
      viewBox="0 0 15 15"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <path
        d="M1.5 7.5h11M8.5 3.5l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/**
 * Заокруглена кнопка-посилання з підтримкою трьох кольорових тем
 */
export function PillButton({
  children,
  variant = "yellow",
  className = "",
  href = "#",
}: {
  children: React.ReactNode;
  variant?: "yellow" | "pink" | "white";
  className?: string;
  href?: string;
}) {
  const colors =
    variant === "yellow"
      ? "bg-(--btn-yellow) text-[#221d0e]"
      : variant === "pink"
        ? "bg-(--btn-pink) text-[#2b1520]"
        : "bg-white text-black";

  return (
    <a
      href={href}
      className={`inline-flex items-center gap-2.5 rounded-full px-6 py-3 text-[15px] font-bold leading-none transition-transform hover:scale-[1.03] ${colors} ${className}`}
    >
      {children}
      <ArrowIcon />
    </a>
  );
}


// ============================================================================
// ЦІЛЬОВІ БЛОКИ З КЛАСОМ:
// "mx-auto flex max-w-[1108px] flex-col gap-6 px-4 pt-6 md:px-0" ТА "...pt-10 md:px-0"
// ============================================================================

/**
 * 1. БЛОК ПРОМО-КАРТОК (PromoCards)
 * Контейнерний клас: mx-auto flex max-w-[1108px] flex-col gap-6 px-4 pt-6 md:px-0
 * Містить 2 великі промо-банери:
 *  - Ultimate Edition
 *  - Vintage Vice City Pack (Pre-order bonuses)
 */
export function PromoCardsBlock() {
  return (
    <section className="mx-auto flex max-w-[1108px] flex-col gap-6 px-4 pt-6 md:px-0">
      {/* Картка 1: Ultimate Edition */}
      <div className="relative aspect-[2560/1384] w-full overflow-hidden rounded-[24px]">
        <Pic
          desktop="desktop/ultimate-edition.jpg"
          mobile="mobile/ultimate-edition.jpg"
          alt="Grand Theft Auto VI Ultimate Edition box art"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <span className="absolute left-[10%] top-[7%] font-deco-cond text-[13px] tracking-[0.45em] text-white/90 md:left-[12%] md:top-[8%]">
          ULTIMATE&nbsp;EDITION
        </span>
        <div className="absolute right-[6%] top-1/2 flex w-[52%] -translate-y-1/2 flex-col items-start gap-4 md:w-[30%]">
          <h2 className="font-deco-cond text-[clamp(26px,2.9vw,42px)] leading-[1.02] text-(--cream)">
            ULTIMATE
            <br />
            EDITION
          </h2>
          <p className="text-[15px] font-semibold leading-snug text-white/95">
            An exclusive collection of items threaded across all aspects of
            Jason and Lucia&apos;s story.
          </p>
          <PillButton>Learn More</PillButton>
        </div>
      </div>

      {/* Картка 2: Vintage Vice City Pack */}
      <div className="relative aspect-[2560/1440] w-full overflow-hidden rounded-[24px] bg-[#14141f]">
        <Pic
          desktop="vintage-vice-city-pack.jpg"
          mobile="vintage-vice-city-pack.jpg"
          alt="Vintage Vice City Pack pre-order bonus"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-y-0 right-0 w-full bg-gradient-to-r from-transparent via-[#14141f]/40 to-[#14141f]/85 md:w-1/2" />
        <div className="absolute right-[6%] top-1/2 flex w-[88%] -translate-y-1/2 flex-col items-start gap-4 md:w-[34%]">
          <span className="text-[13px] font-bold tracking-[0.3em] text-(--pink)">
            PRE-ORDER BONUSES
          </span>
          <h2 className="font-deco-cond text-[clamp(26px,2.9vw,42px)] leading-[1.02] text-(--cream)">
            VINTAGE VICE
            <br />
            CITY PACK
          </h2>
          <p className="text-[15px] font-semibold leading-snug text-white/95">
            Pre-order to get unique benefits that flash back to when the neon
            burned brightest.
          </p>
          <PillButton>Learn More</PillButton>
        </div>
      </div>
    </section>
  );
}

/**
 * 2. БЛОК ІНФОРМАЦІЙНИХ КАРТОК (InfoCards)
 * Контейнерний клас: mx-auto flex max-w-[1108px] flex-col gap-6 px-4 pt-10 md:px-0
 * Містить 4 контентні карточки однакової висоти/пропорцій:
 *  - 1: Music (In-Game Radio, Soundtrack, Score) -> текст зліва
 *  - 2: Screenshots (The Launch Gallery) -> текст справа
 *  - 3: Downloads (Media & Artwork) -> текст зліва
 *  - 4: People & Places (Only in Leonida) -> текст справа
 */
export function InfoCardsBlock() {
  return (
    <section className="mx-auto flex max-w-[1108px] flex-col gap-6 px-4 pt-10 md:px-0">
      {/* 1. Music — позиціонування тексту зліва */}
      <div className="relative aspect-[2560/1024] w-full overflow-hidden rounded-[24px]">
        <Pic
          desktop="desktop/music.jpg"
          mobile="mobile/music.jpg"
          alt="In-game radio, soundtrack and score"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
        <div className="absolute left-8 top-1/2 flex w-[80%] -translate-y-1/2 flex-col items-start gap-3 md:left-10 md:w-[36%]">
          <span className="font-deco-cond text-[13px] tracking-[0.3em] text-(--cream)">
            MUSIC
          </span>
          <h2 className="font-deco-cond text-[clamp(26px,2.9vw,42px)] leading-[1.02] text-(--cream)">
            IN-GAME RADIO, SOUNDTRACK, AND&nbsp;SCORE
          </h2>
          <p className="text-[15px] font-semibold leading-snug text-white/95">
            Listen to the Official Score and Soundtrack, plus select in-game
            radio stations.
          </p>
          <PillButton>Explore More</PillButton>
        </div>
      </div>

      {/* 2. Launch gallery — позиціонування тексту справа */}
      <div className="relative aspect-[2560/1024] w-full overflow-hidden rounded-[24px]">
        <Pic
          desktop="desktop/launch-gallery.jpg"
          mobile="mobile/launch-gallery.jpg"
          alt="The Launch Gallery screenshots"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent" />
        <div className="absolute right-8 top-1/2 flex w-[80%] -translate-y-1/2 flex-col items-start gap-3 md:right-10 md:w-[32%]">
          <span className="text-[13px] font-bold tracking-[0.3em] text-(--cyan)">
            SCREENSHOTS
          </span>
          <h2 className="font-deco-cond text-[clamp(26px,2.9vw,42px)] leading-[1.02] text-(--cream)">
            THE LAUNCH
            <br />
            GALLERY
          </h2>
          <p className="text-[15px] font-semibold leading-snug text-white/95">
            Get a stunning look inside Leonida with a collection of new
            screenshots.
          </p>
          <PillButton>View All</PillButton>
        </div>
      </div>

      {/* 3. Media & artwork — позиціонування тексту зліва */}
      <div className="relative aspect-[2560/1024] w-full overflow-hidden rounded-[24px]">
        <Pic
          desktop="desktop/media-artwork.jpg"
          mobile="mobile/media-artwork.jpg"
          alt="Media and artwork downloads"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />
        <div className="absolute left-8 top-1/2 flex w-[80%] -translate-y-1/2 flex-col items-start gap-3 md:left-10 md:w-[36%]">
          <span className="text-[13px] font-bold tracking-[0.3em] text-(--cyan)">
            DOWNLOADS
          </span>
          <h2 className="font-deco-cond text-[clamp(26px,2.9vw,42px)] leading-[1.02] text-(--cream)">
            MEDIA &amp; ARTWORK
          </h2>
          <p className="text-[15px] font-semibold leading-snug text-white/95">
            Download and share official videos, screenshots, and more.
          </p>
          <PillButton>See All</PillButton>
        </div>
      </div>

      {/* 4. Only in Leonida — позиціонування тексту справа + рожева кнопка */}
      <div className="relative aspect-[2560/1024] w-full overflow-hidden rounded-[24px]">
        <Pic
          desktop="desktop/only-in-leonida.jpg"
          mobile="mobile/only-in-leonida.jpg"
          alt="Only in Leonida"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-l from-black/55 via-black/15 to-transparent" />
        <div className="absolute right-8 top-1/2 flex w-[80%] -translate-y-1/2 flex-col items-start gap-3 md:right-10 md:w-[32%]">
          <span className="text-[13px] font-bold tracking-[0.3em] text-(--cyan)">
            PEOPLE &amp; PLACES
          </span>
          <h2 className="font-deco-cond text-[clamp(26px,2.9vw,42px)] leading-[1.02] text-(--cream)">
            ONLY IN LEONIDA
          </h2>
          <p className="text-[15px] font-semibold leading-snug text-white/95">
            Vice City, USA. The darkest side of the sunniest place in America.
          </p>
          <PillButton variant="pink">Explore More</PillButton>
        </div>
      </div>
    </section>
  );
}

/**
 * Загальний експорт за замовчуванням: об'єднує всі ці секції разом для зручного рендеру
 */
export default function ExtractedSections() {
  return (
    <div className="w-full bg-[#0d0d17] py-6">
      <PromoCardsBlock />
      <InfoCardsBlock />
    </div>
  );
}
