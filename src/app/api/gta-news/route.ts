import {
  isNewsItem,
  newsSource,
  type NewsFeedResponse,
} from "@/components/sites/gtasixcountdown/news-data";
import snapshot from "./snapshot.json";

export async function GET() {
  let payload: NewsFeedResponse = { news: snapshot.news, saved: true };

  try {
    const response = await fetch(newsSource, {
      cache: "no-store",
      signal: AbortSignal.timeout(4500),
      headers: { Accept: "application/json" },
    });

    if (response.ok) {
      const data: { news?: unknown } = await response.json();
      if (Array.isArray(data?.news) && data.news.every(isNewsItem)) {
        payload = { news: data.news, saved: false };
      }
    }
  } catch {
    // The built-in snapshot keeps the drawer available if the source is unreachable.
  }

  return Response.json(payload, {
    headers: { "Cache-Control": "no-store" },
  });
}
