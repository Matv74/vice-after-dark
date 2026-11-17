import type { Metadata } from "next";
import { GTA6Intro } from "@/components/sites/gtasixcountdown/GTA6Intro";
import { GtaCountdownSite } from "@/components/sites/gtasixcountdown/GtaCountdownSite";
import { HOME_DESCRIPTION, HOME_LANGUAGE, HOME_SOCIAL_IMAGE, SITE_NAME, SITE_TITLE, SITE_URL } from "@/components/sites/vice-signal/config";
import { COUNTDOWN_ALTERNATES } from "@/components/sites/gtasixcountdown/landing-routes";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
    languages: COUNTDOWN_ALTERNATES,
  },
  title: SITE_TITLE,
  description: HOME_DESCRIPTION,
  openGraph: {
    title: SITE_TITLE,
    description: HOME_DESCRIPTION,
    url: `${SITE_URL}/`,
    locale: "en_US",
    type: "website",
    images: [HOME_SOCIAL_IMAGE],
  },
  twitter: {
    title: SITE_TITLE,
    description: HOME_DESCRIPTION,
    card: "summary_large_image",
    images: [{ url: HOME_SOCIAL_IMAGE.url, alt: HOME_SOCIAL_IMAGE.alt }],
  },
};

export default function Home() {
  const website = { "@context": "https://schema.org", "@type": "WebSite", name: SITE_NAME, url: `${SITE_URL}/`, inLanguage: HOME_LANGUAGE };

  return (
    <>
      <GTA6Intro />
      <GtaCountdownSite />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(website).replace(/</g, "\\u003c") }} />
    </>
  );
}
