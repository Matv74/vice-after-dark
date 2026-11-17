import "server-only";
import { isNewsItem, newsSource, type NewsFeedResponse } from "@/components/sites/gtasixcountdown/news-data";
import snapshot from "@/app/api/gta-news/snapshot.json";

export async function loadNews(revalidate = 0): Promise<NewsFeedResponse> {
  try {
    const response = await fetch(newsSource, {
      next: { revalidate },
      signal: AbortSignal.timeout(4500),
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      const data: { news?: unknown } = await response.json();
      if (Array.isArray(data?.news) && data.news.every(isNewsItem)) {
        return { news: data.news, saved: false };
      }
    }
  } catch {
    // The saved feed is available even if the upstream request fails.
  }
  return { news: snapshot.news, saved: true };
}
