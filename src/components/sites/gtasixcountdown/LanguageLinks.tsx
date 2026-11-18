import { COUNTDOWN_PATHS, LANGUAGE_NAMES, type LandingLocale } from "./landing-routes";

const languages = ["en", "uk", "pl"] as const;
export const languageLabel = { en: "Language", uk: "Мова сайту", pl: "Język strony" };

export function LanguageLinks({
  current,
  paths = COUNTDOWN_PATHS,
}: {
  current?: LandingLocale;
  paths?: Record<LandingLocale, string>;
}) {
  return languages.map(language => (
    <a key={language} href={paths[language]} hrefLang={language} lang={language}
      aria-current={current === language ? "page" : undefined}>
      {LANGUAGE_NAMES[language]}
    </a>
  ));
}
