export const SITE_NAME = "VI";
export const SITE_TITLE = "GTA 6 Countdown (GTA VI) – Release Time in Your Timezone";
export const SITE_URL = "https://www.gtasixwatch.site";
export const HOME_LANGUAGE = "en";
export const HOME_DESCRIPTION = "Live GTA 6 countdown to 19 Nov 2026. Check GTA VI unlock times for Ukraine, Poland, the UK and US. Unofficial fan site.";
export const HOME_SOCIAL_IMAGE = {
  // TODO: Replace this crop with original site artwork.
  url: "/sites/vice-signal/seo-cover.jpg",
  width: 1200,
  height: 630,
  alt: "GTA VI cover artwork set in Vice City",
};
export const RELEASE_DATE = "19 November 2026";
export const RELEASE_LISTINGS_NOTE = "Unlock times follow PlayStation Store listings and may change.";

export const RELEASE_REGION_KEY = "gta-countdown-release-region";

export const RELEASE_WINDOWS = [
  { id: "nz", utc: "2026-11-18T11:00:00Z", labels: { uk: "Нова Зеландія", en: "New Zealand", pl: "Nowa Zelandia" }, countries: ["NZ"] },
  { id: "au", utc: "2026-11-18T13:00:00Z", labels: { uk: "Австралія", en: "Australia", pl: "Australia" }, countries: ["AU"] },
  { id: "jp_kr", utc: "2026-11-18T15:00:00Z", labels: { uk: "Японія та Корея", en: "Japan / South Korea", pl: "Japonia i Korea Południowa" }, countries: ["JP", "KR"] },
  { id: "hk_my_sg_tw", utc: "2026-11-18T16:00:00Z", labels: { uk: "Гонконг, Малайзія, Сінгапур, Тайвань", en: "Hong Kong / Malaysia / Singapore / Taiwan", pl: "Hongkong / Malezja / Singapur / Tajwan" }, countries: ["HK", "MY", "SG", "TW"] },
  { id: "id_th", utc: "2026-11-18T17:00:00Z", labels: { uk: "Індонезія та Таїланд", en: "Indonesia / Thailand", pl: "Indonezja i Tajlandia" }, countries: ["ID", "TH"] },
  { id: "in", utc: "2026-11-18T18:30:00Z", labels: { uk: "Індія", en: "India", pl: "Indie" }, countries: ["IN"] },
  { id: "ae", utc: "2026-11-18T20:00:00Z", labels: { uk: "ОАЕ", en: "United Arab Emirates", pl: "Zjednoczone Emiraty Arabskie" }, countries: ["AE"] },
  { id: "sa_tr", utc: "2026-11-18T21:00:00Z", labels: { uk: "Саудівська Аравія та Туреччина", en: "Saudi Arabia / Türkiye", pl: "Arabia Saudyjska i Turcja" }, countries: ["SA", "TR"] },
  { id: "eet", utc: "2026-11-18T22:00:00Z", labels: { uk: "Україна, Фінляндія, Греція", en: "Ukraine / Finland / Greece", pl: "Ukraina / Finlandia / Grecja" }, countries: ["UA", "BG", "CY", "FI", "GR", "IL", "RO", "ZA"] },
  { id: "cet", utc: "2026-11-18T23:00:00Z", labels: { uk: "Польща, Німеччина, Франція", en: "Poland / Germany / France", pl: "Polska / Niemcy / Francja" }, countries: ["PL", "DE", "FR", "IT", "ES", "CZ", "SK", "HU", "AT", "BE", "NL", "LU", "SE", "NO", "DK", "CH", "HR", "SI", "MT"] },
  { id: "gmt", utc: "2026-11-19T00:00:00Z", labels: { uk: "Велика Британія, Ірландія, Португалія", en: "UK / Ireland / Portugal", pl: "Wielka Brytania / Irlandia / Portugalia" }, countries: ["GB", "IE", "IS", "PT"] },
  { id: "south_cone", utc: "2026-11-19T03:00:00Z", labels: { uk: "Аргентина, Бразилія, Чилі", en: "Argentina / Brazil / Chile", pl: "Argentyna / Brazylia / Chile" }, countries: ["AR", "BR", "CL", "PY", "UY"] },
  { id: "bo", utc: "2026-11-19T04:00:00Z", labels: { uk: "Болівія", en: "Bolivia", pl: "Boliwia" }, countries: ["BO"] },
  { id: "na_east", utc: "2026-11-19T05:00:00Z", labels: { uk: "США, Канада, Колумбія", en: "United States / Canada / Colombia", pl: "Stany Zjednoczone / Kanada / Kolumbia" }, countries: ["US", "CA", "CO", "EC", "PA", "PE"] },
  { id: "ca_mx", utc: "2026-11-19T06:00:00Z", labels: { uk: "Мексика, Коста-Рика, Гватемала", en: "Mexico / Costa Rica / Guatemala", pl: "Meksyk / Kostaryka / Gwatemala" }, countries: ["CR", "SV", "GT", "HN", "MX", "NI"] },
] as const;

export type ReleaseWindow = (typeof RELEASE_WINDOWS)[number];

// A representative city makes the local time unambiguous for multi-zone windows.
export const RELEASE_EXAMPLE_ZONES: Record<ReleaseWindow["id"], string> = {
  nz: "Pacific/Auckland",
  au: "Australia/Sydney",
  jp_kr: "Asia/Tokyo",
  hk_my_sg_tw: "Asia/Hong_Kong",
  id_th: "Asia/Jakarta",
  in: "Asia/Kolkata",
  ae: "Asia/Dubai",
  sa_tr: "Asia/Riyadh",
  eet: "Europe/Kyiv",
  cet: "Europe/Warsaw",
  gmt: "Europe/London",
  south_cone: "America/Argentina/Buenos_Aires",
  bo: "America/La_Paz",
  na_east: "America/New_York",
  ca_mx: "America/Mexico_City",
};

export const RELEASE_BY_COUNTRY = new Map<string, ReleaseWindow>(
  RELEASE_WINDOWS.flatMap(window => window.countries.map(country => [country, window] as const)),
);

const zonesByCountry: Record<string, readonly string[]> = {
  NZ: ["Pacific/Auckland", "Pacific/Chatham"],
  AU: ["Australia/Sydney", "Australia/Melbourne", "Australia/Brisbane", "Australia/Adelaide", "Australia/Perth", "Australia/Darwin", "Australia/Hobart", "Australia/Broken_Hill", "Australia/Eucla", "Australia/Lindeman", "Australia/Lord_Howe"],
  JP: ["Asia/Tokyo"], KR: ["Asia/Seoul"], HK: ["Asia/Hong_Kong"],
  MY: ["Asia/Kuala_Lumpur", "Asia/Kuching"], SG: ["Asia/Singapore"], TW: ["Asia/Taipei"],
  ID: ["Asia/Jakarta", "Asia/Pontianak", "Asia/Makassar", "Asia/Jayapura"], TH: ["Asia/Bangkok"],
  IN: ["Asia/Kolkata", "Asia/Calcutta"], AE: ["Asia/Dubai"],
  SA: ["Asia/Riyadh"], TR: ["Europe/Istanbul", "Asia/Istanbul"],
  UA: ["Europe/Kyiv", "Europe/Kiev", "Europe/Uzhgorod", "Europe/Zaporozhye"],
  BG: ["Europe/Sofia"], CY: ["Asia/Nicosia", "Europe/Nicosia", "Asia/Famagusta"],
  FI: ["Europe/Helsinki"], GR: ["Europe/Athens"], IL: ["Asia/Jerusalem", "Asia/Tel_Aviv"], RO: ["Europe/Bucharest"], ZA: ["Africa/Johannesburg"],
  PL: ["Europe/Warsaw"], DE: ["Europe/Berlin", "Europe/Busingen"], FR: ["Europe/Paris"],
  IT: ["Europe/Rome"], ES: ["Europe/Madrid", "Africa/Ceuta", "Atlantic/Canary"], CZ: ["Europe/Prague"],
  SK: ["Europe/Bratislava"], HU: ["Europe/Budapest"], AT: ["Europe/Vienna"], BE: ["Europe/Brussels"],
  NL: ["Europe/Amsterdam"], LU: ["Europe/Luxembourg"], SE: ["Europe/Stockholm"], NO: ["Europe/Oslo"],
  DK: ["Europe/Copenhagen"], CH: ["Europe/Zurich"], HR: ["Europe/Zagreb"], SI: ["Europe/Ljubljana"], MT: ["Europe/Malta"],
  GB: ["Europe/London"], IE: ["Europe/Dublin"], IS: ["Atlantic/Reykjavik"], PT: ["Europe/Lisbon", "Atlantic/Madeira", "Atlantic/Azores"],
  AR: ["America/Argentina/Buenos_Aires", "America/Buenos_Aires", "America/Argentina/Cordoba", "America/Cordoba", "America/Argentina/Salta", "America/Argentina/Jujuy", "America/Jujuy", "America/Argentina/Tucuman", "America/Argentina/Catamarca", "America/Catamarca", "America/Argentina/La_Rioja", "America/Argentina/San_Juan", "America/Argentina/Mendoza", "America/Mendoza", "America/Argentina/San_Luis", "America/Argentina/Rio_Gallegos", "America/Argentina/Ushuaia"],
  BR: ["America/Sao_Paulo", "America/Manaus", "America/Belem", "America/Fortaleza", "America/Recife", "America/Salvador", "America/Bahia", "America/Maceio", "America/Araguaina", "America/Santarem", "America/Cuiaba", "America/Campo_Grande", "America/Porto_Velho", "America/Boa_Vista", "America/Rio_Branco", "America/Eirunepe", "America/Noronha"],
  CL: ["America/Santiago", "America/Punta_Arenas", "America/Coyhaique", "Pacific/Easter"],
  PY: ["America/Asuncion"], UY: ["America/Montevideo"], BO: ["America/La_Paz"],
  US: ["America/New_York", "America/Detroit", "America/Chicago", "America/Denver", "America/Phoenix", "America/Los_Angeles", "America/Boise", "America/Anchorage", "America/Juneau", "America/Sitka", "America/Metlakatla", "America/Yakutat", "America/Nome", "America/Adak", "Pacific/Honolulu", "America/Indiana/Indianapolis", "America/Indianapolis", "America/Indiana/Knox", "America/Indiana/Marengo", "America/Indiana/Petersburg", "America/Indiana/Tell_City", "America/Indiana/Vevay", "America/Indiana/Vincennes", "America/Indiana/Winamac", "America/Kentucky/Louisville", "America/Louisville", "America/Kentucky/Monticello", "America/North_Dakota/Beulah", "America/North_Dakota/Center", "America/North_Dakota/New_Salem"],
  CA: ["America/Toronto", "America/Montreal", "America/Vancouver", "America/Edmonton", "America/Winnipeg", "America/Halifax", "America/St_Johns", "America/Regina", "America/Glace_Bay", "America/Moncton", "America/Goose_Bay", "America/Blanc-Sablon", "America/Iqaluit", "America/Atikokan", "America/Coral_Harbour", "America/Rankin_Inlet", "America/Resolute", "America/Swift_Current", "America/Cambridge_Bay", "America/Inuvik", "America/Creston", "America/Dawson_Creek", "America/Fort_Nelson", "America/Whitehorse", "America/Dawson", "America/Yellowknife", "America/Thunder_Bay", "America/Nipigon", "America/Rainy_River", "America/Pangnirtung"],
  CO: ["America/Bogota"], EC: ["America/Guayaquil", "Pacific/Galapagos"], PA: ["America/Panama"], PE: ["America/Lima"],
  CR: ["America/Costa_Rica"], SV: ["America/El_Salvador"], GT: ["America/Guatemala"], HN: ["America/Tegucigalpa"],
  MX: ["America/Mexico_City", "America/Cancun", "America/Monterrey", "America/Merida", "America/Matamoros", "America/Mazatlan", "America/Bahia_Banderas", "America/Chihuahua", "America/Ciudad_Juarez", "America/Ojinaga", "America/Hermosillo", "America/Tijuana", "America/Santa_Isabel"],
  NI: ["America/Managua"],
};

const countryByZone = new Map(
  Object.entries(zonesByCountry).flatMap(([country, zones]) => zones.map(zone => [zone, country] as const)),
);

export function resolveReleaseWindow(manual: string | null, countryHint?: string, timeZone?: string) {
  const country = countryByZone.get(timeZone ?? "");
  const window = RELEASE_WINDOWS.find(window => window.id === manual)
    ?? RELEASE_BY_COUNTRY.get(countryHint?.toUpperCase() ?? "")
    ?? RELEASE_BY_COUNTRY.get(country ?? "");

  return window
    ? { window, unlockAt: Date.parse(window.utc), approximate: false }
    : { window: null, unlockAt: new Date(2026, 10, 19).getTime(), approximate: true };
}

export function remainingReleaseSeconds(unlockAt: number, now: number) {
  return Math.max(0, Math.ceil((unlockAt - now) / 1000));
}

export const SCREEN_TWO_ART = "/sites/vice-signal/screen-two-1.webp";

export const uk = {
  pageDescription: "Відлік до релізу та розділи фан-спільноти Grand Theft Auto VI.",
  artworkAlt: "Люсія та Джейсон біля автомобіля на тлі заходу сонця у Вайс-Сіті",
  countdown: "Відлік до релізу",
  home: "На головну",
  sections: "Розділи сайту",
  openMenu: "Відкрити меню",
  closeMenu: "Закрити меню",
  openSection: "Play",
  comingSoon: "Цей розділ ще готується.",
  backToSections: "До всіх розділів",
  disclaimer: "Unofficial fan project. Not affiliated with Rockstar Games or Take-Two Interactive. Grand Theft Auto is a trademark of Take-Two Interactive.",
  cards: {
    extended: { title: "An Extended Look", label: "Watch" },
    launch: { title: "Launch Trailer", label: "Watch" },
    trailer2: { title: "Trailer 2", label: "Watch" },
    trailer1: { title: "Trailer 1", label: "Watch" },
    clips: { title: "Найкращі кліпи", label: "Дивитися" },
    news: { title: "Новини", label: "Читати" },
    guides: { title: "Гайди", label: "Дивитися" },
    map: { title: "Інтерактивна мапа", label: "Дослідити" },
    streamers: { title: "Стримери", label: "Дивитися" },
    locations: { title: "Атмосферні місця", label: "Дослідити" },
  },
} as const;

export type SectionKey = keyof typeof uk.cards;

export type SectionCard = {
  id: SectionKey;
  title: string;
  label: string;
  href: string;
  image: string | null;
  imageUnoptimized?: boolean;
  videoId?: string;
};

export const sections: SectionCard[] = [
  {
    id: "extended",
    title: uk.cards.extended.title,
    label: uk.cards.extended.label,
    href: "/sections/extended",
    image: "/sites/vice-signal/cards/dwa.avif",
    videoId: "tJbzMqJGH4k",
  },
  {
    id: "launch",
    title: uk.cards.launch.title,
    label: uk.cards.launch.label,
    href: "/sections/launch",
    image: "/sites/vice-signal/cards/bag1-hq.webp",
    imageUnoptimized: true,
    videoId: "rz1B4B2yBZY",
  },
  {
    id: "trailer2",
    title: uk.cards.trailer2.title,
    label: uk.cards.trailer2.label,
    href: "/sections/trailer2",
    image: "/sites/vice-signal/cards/bag2-hq.webp",
    imageUnoptimized: true,
    videoId: "VQRLujxTm3c",
  },
  {
    id: "trailer1",
    title: uk.cards.trailer1.title,
    label: uk.cards.trailer1.label,
    href: "/sections/trailer1",
    image: "/sites/vice-signal/cards/bag3-hq.webp",
    imageUnoptimized: true,
    videoId: "QdBZY2fkU-0",
  },
];
