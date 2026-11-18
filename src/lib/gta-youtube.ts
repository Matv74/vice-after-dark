import type { Clip } from "./gta-media-types";

const month = 30 * 24 * 60 * 60 * 1000;
const searches = ["GTA 6 streamer clips", "GTA 6 funny moments"];
const gtaSix = /\b(?:gta|grand theft auto)\s*(?:6|vi)\b/i;
const excluded = /\b(?:trailers?|concepts?|fan[ -]?made|(?:gta|grand theft auto)\s*(?:5|v))\b/i;

async function youtube<T>(endpoint: string, params: Record<string, string>, key: string): Promise<T> {
  const url = new URL(`https://www.googleapis.com/youtube/v3/${endpoint}`);
  url.search = new URLSearchParams({ ...params, key }).toString();
  const response = await fetch(url, { cache: "no-store", signal: AbortSignal.timeout(7000) });
  if (!response.ok) throw new Error("YouTube data unavailable");
  return response.json();
}

type SearchResult = { items: { id: { videoId: string } }[] };
type Video = {
  id: string;
  snippet: { title: string; channelTitle: string; publishedAt: string; liveBroadcastContent: string };
  status: { embeddable: boolean; privacyStatus: string };
  statistics?: { viewCount?: string };
};

export async function fetchRecentClips(key: string): Promise<Clip[]> {
  const cutoff = new Date(Date.now() - month).toISOString();
  const results = await Promise.all(searches.map(q => youtube<SearchResult>("search", {
    part: "snippet",
    q,
    type: "video",
    order: "viewCount",
    videoEmbeddable: "true",
    publishedAfter: cutoff,
    maxResults: "25",
  }, key)));
  const ids = [...new Set(results.flatMap(result => result.items.map(item => item.id.videoId)))];
  if (!ids.length) return [];

  const { items } = await youtube<{ items: Video[] }>("videos", {
    part: "snippet,status,statistics",
    id: ids.join(","),
  }, key);
  return items
    .filter(({ snippet, status }) => status.embeddable && status.privacyStatus === "public" &&
      snippet.publishedAt >= cutoff && snippet.liveBroadcastContent === "none" &&
      gtaSix.test(snippet.title) && !excluded.test(snippet.title))
    .map(({ id, snippet, statistics }) => ({
      id, title: snippet.title, channel: snippet.channelTitle, views: Number(statistics?.viewCount ?? 0),
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 12);
}
