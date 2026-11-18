"use client";

import { useEffect, useState } from "react";
import type { StreamFeed } from "@/lib/gta-media-types";
import type { LandingLocale } from "../gtasixcountdown/landing-routes";
import { mediaCopy } from "./media-copy";
import styles from "./media-page.module.css";

type StreamSnapshot = Extract<StreamFeed, { streams: unknown }>;

export function LiveStreams({ locale }: { locale: LandingLocale }) {
  const [status, setStatus] = useState<StreamFeed["status"] | "loading">("loading");
  const [snapshot, setSnapshot] = useState<StreamSnapshot>();
  const copy = mediaCopy[locale];

  useEffect(() => {
    const controller = new AbortController();
    let pending = false;
    let timer: ReturnType<typeof setTimeout> | undefined;

    async function refresh() {
      if (pending || document.hidden) return;
      pending = true;
      try {
        const response = await fetch("/api/gta-streams", {
          signal: AbortSignal.any([controller.signal, AbortSignal.timeout(24_000)]),
          cache: "no-store",
        });
        if (!response.ok) throw new Error("Twitch refresh failed");
        const feed: StreamFeed = await response.json();
        if (controller.signal.aborted) return;
        if ("streams" in feed) setSnapshot(feed);
        if (feed.status === "unconfigured") setSnapshot(undefined);
        setStatus(feed.status);
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      } finally {
        pending = false;
        if (!controller.signal.aborted && !document.hidden) timer = setTimeout(refresh, 60_000);
      }
    }

    function onVisibilityChange() {
      clearTimeout(timer);
      if (!document.hidden) void refresh();
    }

    void refresh();
    document.addEventListener("visibilitychange", onVisibilityChange);
    return () => {
      controller.abort();
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisibilityChange);
    };
  }, []);

  const message = status === "error" ? copy.streamError
    : status === "category-missing" ? copy.categoryMissing
    : status === "ready" ? (!snapshot?.streams.length ? copy.noStreams : undefined)
    : copy[status];

  return (
    <>
      <div className={styles.feedState} role="status">
        {message && <p>{message}</p>}
        {snapshot && (
          <p>{copy.updated} <time dateTime={snapshot.updatedAt}>
            {new Date(snapshot.updatedAt).toLocaleTimeString(locale, { hour: "numeric", minute: "2-digit" })}
          </time></p>
        )}
      </div>
      {!!snapshot?.streams.length && (
        <ol className={styles.grid}>
          {snapshot.streams.map((stream, index) => (
            <li key={stream.id} className={styles.card}>
              <div className={styles.preview}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={stream.thumbnail} alt="" width={480} height={270} loading="lazy" />
                <span className={styles.rank}>#{index + 1}</span>
              </div>
              <div className={styles.content}>
                <p className={styles.creator}>{stream.name}</p>
                <h2>{stream.title}</h2>
                <p>{stream.viewers.toLocaleString(locale)} {copy.viewers}</p>
                <a className={styles.action} href={`https://www.twitch.tv/${encodeURIComponent(stream.login)}`}
                  target="_blank" rel="noopener noreferrer">{copy.watchTwitch} ↗</a>
              </div>
            </li>
          ))}
        </ol>
      )}
    </>
  );
}
