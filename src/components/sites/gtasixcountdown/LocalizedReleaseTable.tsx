"use client";

import { useReleaseRegion } from "./Countdown";
import { ReleaseTable } from "./ReleaseTable";
import { landingCopy } from "./landing-copy";
import type { LandingLocale } from "./landing-routes";

export function LocalizedReleaseTable({ locale }: { locale: LandingLocale }) {
  const { release } = useReleaseRegion();
  const copy = landingCopy[locale];
  return (
    <>
      {release?.approximate && <p>{copy.approximate}</p>}
      <ReleaseTable locale={locale} labels={copy.table} active={release?.window?.id} />
    </>
  );
}
