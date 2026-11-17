export function GET(request: Request) {
  const hint = request.headers.get("x-vercel-ip-country")?.trim().toUpperCase() ?? "";
  const country = /^[A-Z]{2}$/.test(hint) ? hint : null;

  return Response.json({ country }, {
    headers: {
      "Cache-Control": "private, no-store",
      Date: new Date().toUTCString(),
    },
  });
}
