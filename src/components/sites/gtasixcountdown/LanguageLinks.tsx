import { COUNTDOWN_PATHS, LANGUAGE_NAMES, type LandingLocale } from "./landing-routes";

const languages = ["en", "uk", "pl"] as const;
export const languageLabel = { en: "Language", uk: "Мова сайту", pl: "Język strony" };

export function LanguageLinks({ current }: { current?: LandingLocale }) {
  return languages.map(language => (
    <a key={language} href={COUNTDOWN_PATHS[language]} hrefLang={language} lang={language}
      aria-current={current === language ? "page" : undefined}>
      {LANGUAGE_NAMES[language]}
    </a>
  ));
}
