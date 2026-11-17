import type { MetadataRoute } from "next";
import { SITE_URL } from "@/components/sites/vice-signal/config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
