export const COUNTDOWN_PATHS = {
  en: "/",
  uk: "/uk",
  pl: "/pl",
} as const;

export type LandingLocale = keyof typeof COUNTDOWN_PATHS;
export const MAP_PATHS = { en: "/map", uk: "/map?lang=uk", pl: "/map?lang=pl" } as const;
export const MEDIA_PATHS = {
  streamers: { en: "/streamers", uk: "/streamers?lang=uk", pl: "/streamers?lang=pl" },
  clips: { en: "/clips", uk: "/clips?lang=uk", pl: "/clips?lang=pl" },
} as const;
export const COUNTDOWN_ALTERNATES = { ...COUNTDOWN_PATHS, "x-default": COUNTDOWN_PATHS.en };
export const LANGUAGE_NAMES = { en: "English", uk: "Українська", pl: "Polski" } as const;
