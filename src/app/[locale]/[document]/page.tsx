// TODO: legal review
import { notFound } from "next/navigation";
import { legalCopy } from "@/components/legal/legal-copy";
import styles from "@/components/legal/legal.module.css";
import { CONTACT_EMAIL, isLegalDocument, isLegalLocale, LEGAL_DOCUMENTS, LEGAL_LOCALES } from "@/config/legal";

export function generateStaticParams() {
  return LEGAL_LOCALES.flatMap(locale => LEGAL_DOCUMENTS.map(document => ({ locale, document })));
}

export default async function LegalPage({ params }: { params: Promise<{ locale: string; document: string }> }) {
  const { locale, document } = await params;
  if (!isLegalLocale(locale) || !isLegalDocument(document)) notFound();
  const copy = legalCopy[locale];

  return (
    <main lang={locale} className={styles.page}>
      <div className={styles.document}>
        <h1>{copy.titles[document]}</h1>
        <nav aria-label={copy.languages} className={styles.languages}>
          {LEGAL_LOCALES.map(language => (
            <a key={language} href={`/${language}/${document}`} hrefLang={language} lang={language}
              aria-current={language === locale ? "page" : undefined}>
              {{ uk: "Українська", en: "English", pl: "Polski" }[language]}
            </a>
          ))}
        </nav>
        {copy[document].map(([heading, body]) => (
          <section key={heading}>
            <h2>{heading}</h2>
            <p>{body}</p>
          </section>
        ))}
        {document === "privacy" && <p><a href="https://uodo.gov.pl/en/681/1404">{copy.complaint}</a></p>}
        {document === "cookies" && (
          <>
            <div className={styles.table}>
              <table className="w-full text-left text-sm">
                <caption className="sr-only">{copy.titles.cookies}</caption>
                <thead><tr>{copy.columns.map(column => <th key={column} scope="col" className="p-2">{column}</th>)}</tr></thead>
                <tbody>
                  {copy.storageRows.map(([key, ...cells]) => (
                    <tr key={key} className="border-t">
                      <th scope="row" className="break-all p-2">{key}</th>
                      {cells.map(cell => <td key={cell} className="p-2">{cell}</td>)}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <section id="settings">
              <h2>{copy.settings}</h2>
              {copy.options.map(option => <p key={option}>{option}</p>)}
            </section>
          </>
        )}
        <p>{copy.contact} · <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a></p>
      </div>
    </main>
  );
}
