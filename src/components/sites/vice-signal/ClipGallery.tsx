"use client";

import { useState } from "react";
import { ExternalEmbed } from "@/components/legal/ExternalEmbed";
import type { Clip } from "@/lib/gta-media-types";
import type { LandingLocale } from "../gtasixcountdown/landing-routes";
import { mediaCopy } from "./media-copy";
import styles from "./media-page.module.css";

export function ClipGallery({ clips, locale }: { clips: Clip[]; locale: LandingLocale }) {
  const [activeId, setActiveId] = useState<string>();
  const copy = mediaCopy[locale];

  return (
    <ol className={styles.grid}>
      {clips.map(clip => (
        <li key={clip.id} className={styles.card}>
          <div className={styles.content}>
            <p className={styles.creator}>{clip.channel}</p>
            <h2>{clip.title}</h2>
            <p>{clip.views.toLocaleString(locale)} {copy.views}</p>
            <div className={styles.embed}>
              <ExternalEmbed provider="YouTube" id={clip.id} title={clip.title} locale={locale}
                className={styles.player} active={activeId === clip.id} onActivate={() => setActiveId(clip.id)} />
            </div>
            <a className={styles.action} href={`https://www.youtube.com/watch?v=${encodeURIComponent(clip.id)}`}
              target="_blank" rel="noopener noreferrer">{copy.watchYouTube} ↗</a>
          </div>
        </li>
      ))}
    </ol>
  );
}
