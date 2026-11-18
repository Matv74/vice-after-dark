import { unstable_cache } from "next/cache";
import type { ClipFeed } from "./gta-media-types";
import { fetchRecentClips } from "./gta-youtube";

const recentClips = unstable_cache(
  async () => fetchRecentClips(process.env.YOUTUBE_API_KEY ?? ""),
  ["gta-vi-youtube-clips"],
  { revalidate: 3600 },
);

export async function loadClips(): Promise<ClipFeed> {
  if (!process.env.YOUTUBE_API_KEY) return { status: "unconfigured" };
  try {
    return { status: "ready", clips: await recentClips() };
  } catch {
    return { status: "error" };
  }
}
