import { loadStreams } from "@/lib/gta-twitch";

export async function GET() {
  const feed = await loadStreams();
  return Response.json(feed, {
    status: feed.status === "error" ? 503 : 200,
    headers: { "Cache-Control": "no-store" },
  });
}
