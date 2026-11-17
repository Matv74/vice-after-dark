import type { Metadata } from "next";
import { cache } from "react";
import { HOME_SOCIAL_IMAGE, SITE_URL } from "../vice-signal/config";
import { GTA6Intro } from "./GTA6Intro";
import { GtaCountdownSite } from "./GtaCountdownSite";
import { getLandingCopy, landingCopy } from "./landing-copy";
import { COUNTDOWN_ALTERNATES, COUNTDOWN_PATHS, type LandingLocale } from "./landing-routes";

const currentCopy = cache((locale: LandingLocale) => getLandingCopy(locale, Date.now()));

const website = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "GTA Six Watch",
  url: new URL(COUNTDOWN_PATHS.en, SITE_URL).href,
  inLanguage: "en",
};

export function landingMetadata(locale: LandingLocale): Metadata {
  const { title, description } = currentCopy(locale);
  const canonical = COUNTDOWN_PATHS[locale];

  return {
    metadataBase: new URL(SITE_URL),
    alternates: { canonical, languages: COUNTDOWN_ALTERNATES },
    title,
    description,
    icons: { icon: { url: "/favicon.png", type: "image/png", sizes: "96x96" } },
    openGraph: {
      title, description, url: canonical, locale: landingCopy[locale].ogLocale,
      type: "website", images: [HOME_SOCIAL_IMAGE],
    },
    twitter: { title, description, card: "summary_large_image", images: [HOME_SOCIAL_IMAGE] },
  };
}

export function CountdownLanding({ locale }: { locale: LandingLocale }) {
  return (
    <>
      <GTA6Intro />
      <GtaCountdownSite locale={locale} heading={currentCopy(locale).heading} />
      {locale === "en" && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, "\\u003c") }} />
      )}
    </>
  );
}
