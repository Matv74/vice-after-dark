export const COUNTDOWN_PATHS = {
  en: "/",
  uk: "/uk/gta-6-countdown",
  pl: "/pl/gta-6-countdown",
} as const;

export type LandingLocale = Exclude<keyof typeof COUNTDOWN_PATHS, "en">;
export const COUNTDOWN_ALTERNATES = { ...COUNTDOWN_PATHS, "x-default": COUNTDOWN_PATHS.en };
