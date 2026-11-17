// TODO: legal review
"use client";

import { usePathname } from "next/navigation";
import { CONTACT_EMAIL, DEFAULT_LEGAL_LOCALE, isLegalLocale, LEGAL_DOCUMENTS } from "@/config/legal";
import { legalCopy } from "./legal-copy";
import styles from "./legal.module.css";

export function LegalFooter() {
  const segment = usePathname().split("/")[1];
  const locale = isLegalLocale(segment) ? segment : DEFAULT_LEGAL_LOCALE;
  const copy = legalCopy[locale];

  return (
    <footer lang={locale} className={styles.footer}>
      <p>{copy.fanLine}</p>
      <nav aria-label={copy.legalLabel} className={styles.links}>
        {LEGAL_DOCUMENTS.map(document => (
          <a key={document} href={`/${locale}/${document}`}>{copy.titles[document]}</a>
        ))}
        <a href={`/${locale}/cookies#settings`}>{copy.settings}</a>
        <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
      </nav>
    </footer>
  );
}
