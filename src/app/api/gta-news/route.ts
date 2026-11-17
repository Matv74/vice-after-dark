import { loadNews } from "@/lib/gta-news";

export async function GET() {
  return Response.json(await loadNews(), {
    headers: { "Cache-Control": "no-store" },
  });
}
