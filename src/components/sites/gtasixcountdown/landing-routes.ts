export const COUNTDOWN_PATHS = {
  en: "/",
  uk: "/uk",
  pl: "/pl",
} as const;

export type LandingLocale = keyof typeof COUNTDOWN_PATHS;
export const COUNTDOWN_ALTERNATES = { ...COUNTDOWN_PATHS, "x-default": COUNTDOWN_PATHS.en };
export const LANGUAGE_NAMES = { en: "English", uk: "Українська", pl: "Polski" } as const;
