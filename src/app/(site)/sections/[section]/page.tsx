import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sections, SITE_NAME } from "@/components/sites/vice-signal/config";
import styles from "@/components/sites/vice-signal/story.module.css";

type PageProps = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return sections.map(({ id }) => ({ section: id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  const card = sections.find(({ id }) => id === section);
  return {
    title: card ? card.title + " | " + SITE_NAME : SITE_NAME,
    robots: { index: false, follow: true },
    alternates: {
      canonical: `/sections/${section}`,
    },
  };
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params;
  const card = sections.find(({ id }) => id === section);
  if (!card) notFound();

  return (
    <main className={styles.sectionPage + " " + styles.ukrainian}>
      <div>
        <h1>{card.title}</h1>
        <p>This section is still in development.</p>
        <Link href="/#sections" className={styles.reminder}>Back to trailers</Link>
      </div>
    </main>
  );
}
