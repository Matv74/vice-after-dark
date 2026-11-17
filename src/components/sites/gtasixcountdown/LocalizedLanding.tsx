import type { Metadata } from "next";
import { SITE_URL } from "../vice-signal/config";
import { Countdown } from "./Countdown";
import { LocalizedReleaseTable } from "./LocalizedReleaseTable";
import { landingCopy } from "./landing-copy";
import { COUNTDOWN_ALTERNATES, COUNTDOWN_PATHS, type LandingLocale } from "./landing-routes";
import styles from "./release-guide.module.css";

export function landingMetadata(locale: LandingLocale): Metadata {
  const { title, description } = landingCopy[locale];
  return {
    metadataBase: new URL(SITE_URL),
    title,
    description,
    alternates: { canonical: COUNTDOWN_PATHS[locale], languages: COUNTDOWN_ALTERNATES },
  };
}

export function LocalizedLanding({ locale }: { locale: LandingLocale }) {
  const copy = landingCopy[locale];
  return (
    <main className={styles.guide}>
      <div className={styles.inner}>
        <a href={COUNTDOWN_PATHS.en} hrefLang="en">{copy.home}</a>
        <h1 className={styles.landingTitle}>{copy.title}</h1>
        <Countdown effects={false} copy={copy.timer} />
        <h2>{copy.guide}</h2>
        {copy.intro.map(paragraph => <p key={paragraph}>{paragraph}</p>)}
        <p>{copy.note}</p>
        <LocalizedReleaseTable locale={locale} />
        <h3>{copy.faqTitle}</h3>
        <dl>
          {copy.faq.map(([question, answer]) => (
            <div key={question}><dt>{question}</dt><dd>{answer}</dd></div>
          ))}
        </dl>
      </div>
    </main>
  );
}
