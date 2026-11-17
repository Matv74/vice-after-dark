import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { sections, SITE_NAME, uk } from "@/components/sites/vice-signal/config";
import styles from "@/components/sites/vice-signal/story.module.css";

type PageProps = { params: Promise<{ section: string }> };

export function generateStaticParams() {
  return sections.map(({ id }) => ({ section: id }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { section } = await params;
  const card = sections.find(({ id }) => id === section);
  return { title: card ? card.title + " | " + SITE_NAME : SITE_NAME };
}

export default async function SectionPage({ params }: PageProps) {
  const { section } = await params;
  const card = sections.find(({ id }) => id === section);
  if (!card) notFound();

  return (
    <main className={styles.sectionPage + " " + styles.ukrainian} lang="uk">
      <div>
        <h1>{card.title}</h1>
        <p>{uk.comingSoon}</p>
        <Link href="/#sections" className={styles.reminder}>{uk.backToSections}</Link>
      </div>
    </main>
  );
}
