import type { MetadataRoute } from "next";
import { sections, SITE_URL } from "@/components/sites/vice-signal/config";
import { LEGAL_DOCUMENTS, LEGAL_LOCALES } from "@/config/legal";

export default function sitemap(): MetadataRoute.Sitemap {
  const home: MetadataRoute.Sitemap = [
    {
      url: `${SITE_URL}/`,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  const sectionEntries: MetadataRoute.Sitemap = sections.map(({ id }) => ({
    url: `${SITE_URL}/sections/${id}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const legalEntries: MetadataRoute.Sitemap = LEGAL_LOCALES.flatMap(locale =>
    LEGAL_DOCUMENTS.map(document => ({
      url: `${SITE_URL}/${locale}/${document}`,
      changeFrequency: "monthly",
      priority: 0.3,
    }))
  );

  return [...home, ...sectionEntries, ...legalEntries];
}
