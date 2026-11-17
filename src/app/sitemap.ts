import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/sites/vice-signal/config";
import { LEGAL_DOCUMENTS, LEGAL_LOCALES } from "@/config/legal";
import { COUNTDOWN_ALTERNATES, COUNTDOWN_PATHS } from "@/components/sites/gtasixcountdown/landing-routes";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    Object.entries(COUNTDOWN_ALTERNATES).map(([locale, path]) => [locale, new URL(path, SITE_URL).href]),
  );
  const countdownPages: MetadataRoute.Sitemap = Object.values(COUNTDOWN_PATHS).map(path => ({
    url: new URL(path, SITE_URL).href,
    changeFrequency: "daily",
    priority: path === "/" ? 1 : 0.9,
    alternates: { languages },
  }));

  const legalEntries: MetadataRoute.Sitemap = LEGAL_LOCALES.flatMap(locale =>
    LEGAL_DOCUMENTS.map(document => ({
      url: `${SITE_URL}/${locale}/${document}`,
      changeFrequency: "monthly",
      priority: 0.3,
    }))
  );

  return [...countdownPages, ...legalEntries];
}
