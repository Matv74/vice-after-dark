"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ExternalEmbed } from "@/components/legal/ExternalEmbed";
import { newsLink, type NewsFeedResponse, type NewsItem } from "./news-data";
import styles from "./news.module.css";

const itemDate = new Intl.DateTimeFormat("en-US", {
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function NewsCard({ item, open }: { item: NewsItem; open: boolean }) {
  const link = newsLink(item.linkUrl);
  const tweet = newsLink(item.tweetUrl);
  const tweetId = tweet &&
    ["x.com", "www.x.com", "twitter.com", "www.twitter.com"].includes(tweet.hostname)
    ? tweet.pathname.match(/\/status\/(\d+)(?:\/|$)/)?.[1]
    : null;
  const video = newsLink(item.videoEmbed);
  const videoId = video?.protocol === "https:" &&
    ["www.youtube.com", "www.youtube-nocookie.com"].includes(video.hostname) &&
    video.pathname.match(/^\/embed\/([\w-]{11})\/?$/)?.[1];

  return (
    <article className={`${styles.card} ${item.important ? styles.important : ""}`}>
      <h3>{item.title}</h3>
      {item.important && <span className={styles.badge}>Important</span>}
      <time className={styles.date} dateTime={item.date}>
        {itemDate.format(new Date(item.date))}
      </time>
      <div className={styles.content}>
        {item.content && <p>{item.content}</p>}
        {open && videoId && (
          <ExternalEmbed
            className={styles.video}
            provider="YouTube"
            id={videoId}
            title={`Video for ${item.title}`}
          />
        )}
        {tweet && tweetId && tweet.href !== link?.href && (
          <a className={styles.link} href={tweet.href} target="_blank" rel="noreferrer">View post on X →</a>
        )}
        {link && (
          <a
            className={styles.link}
            href={link.href}
            target="_blank"
            rel="noreferrer"
            aria-label={`Open ${item.title}`}
          >
            Click to open link <span aria-hidden="true">→</span>
          </a>
        )}
      </div>
    </article>
  );
}

export function NewsFeed({ open }: { open: boolean }) {
  const [items, setItems] = useState<NewsItem[]>([]);
  const [updated, setUpdated] = useState<Date | null>(null);
  const [saved, setSaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState(false);
  const request = useRef<AbortController | null>(null);

  const refresh = useCallback(async () => {
    if (request.current) return;

    const controller = new AbortController();
    request.current = controller;
    setLoading(true);
    setFailed(false);

    try {
      const response = await fetch("/api/gta-news", { signal: controller.signal });
      if (!response.ok) throw new Error("News feed unavailable");

      const payload: NewsFeedResponse = await response.json();
      if (controller.signal.aborted) return;

      setItems(payload.news.sort((a, b) => Date.parse(b.date) - Date.parse(a.date)));
      setSaved(payload.saved);
      setUpdated(new Date());
    } catch {
      if (!controller.signal.aborted) setFailed(true);
    } finally {
      if (request.current === controller) {
        request.current = null;
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    if (!open) return;

    // Schedule the initial load and repeat while the drawer is open.
    const initial = window.setTimeout(refresh, 0);
    const interval = window.setInterval(refresh, 300_000);
    return () => {
      window.clearTimeout(initial);
      window.clearInterval(interval);
      request.current?.abort();
      request.current = null;
    };
  }, [open, refresh]);

  return (
    <aside
      id="gta-news-feed"
      aria-labelledby="gta-news-heading"
      inert={!open}
      className={`${styles.drawer} ${open ? styles.open : ""}`}
    >
      <header className={styles.header}>
        <h2 id="gta-news-heading">Latest News</h2>
        <div className={styles.controls}>
          <button
            type="button"
            className={styles.refresh}
            onClick={refresh}
            disabled={loading}
            aria-label={loading ? "Refreshing news" : "Refresh news"}
            title={loading ? "Refreshing news..." : "Refresh news"}
          >
            ↻
          </button>
          {updated && (
            <span
              className={styles.updated}
              title={saved ? "Showing the saved source feed" : undefined}
            >
              {saved ? "Saved feed" : `Updated ${updated.toLocaleTimeString("en-US", {
                hour: "2-digit",
                minute: "2-digit",
              })}`}
            </span>
          )}
        </div>
      </header>
      {failed && (
        <p className={styles.error} role="status">Failed to load news. Please try again later.</p>
      )}
      {!failed && items.length === 0 && (
        <p className={styles.message} role="status">
          {loading || !updated ? "Loading news..." : "No news available at the moment."}
        </p>
      )}
      <div className={styles.list}>
        {items.map((item) => (
          <NewsCard key={item.id} item={item} open={open} />
        ))}
      </div>
    </aside>
  );
}

export default NewsFeed;
