export type NewsItem = {
  id: number;
  title: string;
  date: string;
  important?: boolean;
  content?: string | null;
  videoEmbed?: string | null;
  tweetUrl?: string | null;
  linkUrl?: string | null;
};

export type NewsFeedResponse = {
  news: NewsItem[];
  saved: boolean;
};

export const newsSource = "https://gtasixcountdown.com/news-data.json";

export function isNewsItem(item: unknown): item is NewsItem {
  if (typeof item !== "object" || item === null) return false;

  const fields = item as Record<string, unknown>;
  return (
    typeof fields.id === "number" &&
    typeof fields.title === "string" &&
    typeof fields.date === "string" &&
    Number.isFinite(Date.parse(fields.date)) &&
    (fields.important === undefined || typeof fields.important === "boolean") &&
    ["content", "videoEmbed", "tweetUrl", "linkUrl"].every(
      (key) => fields[key] == null || typeof fields[key] === "string",
    )
  );
}

export function newsLink(value?: string | null) {
  if (!value) return null;

  try {
    const url = new URL(value, newsSource);
    return url.protocol === "https:" || url.protocol === "http:" ? url : null;
  } catch {
    return null;
  }
}
