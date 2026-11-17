import type { Metadata } from "next";
import { GTA6Intro } from "@/components/sites/gtasixcountdown/GTA6Intro";
import { GtaCountdownSite } from "@/components/sites/gtasixcountdown/GtaCountdownSite";
import { SITE_NAME, uk } from "@/components/sites/vice-signal/config";

export const metadata: Metadata = {
  title: SITE_NAME,
  description: uk.pageDescription,
};

export default function Home() {
  return (
    <>
      <GTA6Intro />
      <GtaCountdownSite />
    </>
  );
}
