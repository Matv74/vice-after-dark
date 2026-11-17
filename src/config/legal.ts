// TODO: legal review
export const CONTACT_EMAIL = "Maximch4874@gmail.com";
export const ADS_ENABLED: boolean = false;
export const ANALYTICS_PROVIDER: string = "none";
export const FORUM_ENABLED: boolean = true;
export const FORUM_MINIMUM_AGE = 16; // TODO: verify before launch.

export const LEGAL_LOCALES = ["en", "uk", "pl"] as const;
export const DEFAULT_LEGAL_LOCALE = "en";
export const LEGAL_DOCUMENTS = ["privacy", "terms", "cookies", "disclaimer"] as const;
export type LegalLocale = (typeof LEGAL_LOCALES)[number];
export type LegalDocument = (typeof LEGAL_DOCUMENTS)[number];

export function isLegalLocale(value: string): value is LegalLocale {
  return LEGAL_LOCALES.some(locale => locale === value);
}

export function isLegalDocument(value: string): value is LegalDocument {
  return LEGAL_DOCUMENTS.some(document => document === value);
}

// Future integrations must call this only with an explicit opt-in from their consent UI.
export function canLoadOptionalService(category: "ads" | "analytics", optedIn = false) {
  return optedIn && (category === "ads" ? ADS_ENABLED : ANALYTICS_PROVIDER !== "none");
}
