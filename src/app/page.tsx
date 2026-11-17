import type { Metadata } from "next";
import { GTA6Intro } from "@/components/sites/gtasixcountdown/GTA6Intro";
import { GtaCountdownSite } from "@/components/sites/gtasixcountdown/GtaCountdownSite";
import { SITE_TITLE, SITE_URL, uk } from "@/components/sites/vice-signal/config";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: SITE_TITLE,
  description: uk.pageDescription,
  openGraph: {
    title: SITE_TITLE,
    description: uk.pageDescription,
    url: SITE_URL,
  },
  twitter: {
    title: SITE_TITLE,
    description: uk.pageDescription,
  },
};

export default function Home() {
  return (
    <>
      <GTA6Intro />
      <GtaCountdownSite />
    </>
  );
}
