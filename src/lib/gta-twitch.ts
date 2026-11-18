import type { StreamFeed } from "./gta-media-types";

const category = "Grand Theft Auto VI";
type Token = { value: string; expiresAt: number };
let tokenRequest: Promise<Token> | undefined;
let token: Token | undefined;

async function getToken(clientId: string, secret: string): Promise<Token> {
  if (token && Date.now() < token.expiresAt) return token;

  tokenRequest ??= (async () => {
    const response = await fetch("https://id.twitch.tv/oauth2/token", {
      method: "POST",
      body: new URLSearchParams({
        client_id: clientId, client_secret: secret, grant_type: "client_credentials",
      }),
      cache: "no-store",
      signal: AbortSignal.timeout(6000),
    });
    if (!response.ok) throw new Error("Twitch authentication failed");
    const { access_token, expires_in } = await response.json();
    token = { value: access_token, expiresAt: Date.now() + (expires_in - 60) * 1000 };
    return token;
  })().finally(() => { tokenRequest = undefined; });

  return tokenRequest;
}

async function helix<T>(path: string, params: Record<string, string>, clientId: string, secret: string) {
  const url = new URL(`https://api.twitch.tv/helix/${path}`);
  url.search = new URLSearchParams(params).toString();
  const request = (credential: Token) => fetch(url, {
    headers: { "Client-Id": clientId, Authorization: `Bearer ${credential.value}` },
    cache: "no-store",
    signal: AbortSignal.timeout(6000),
  });

  const credential = await getToken(clientId, secret);
  let response = await request(credential);
  if (response.status === 401) {
    if (token === credential) token = undefined;
    response = await request(await getToken(clientId, secret));
  }
  if (!response.ok) throw new Error("Twitch data unavailable");
  const { data } = await response.json() as { data: T[] };
  return data;
}

type HelixStream = {
  id: string;
  user_login: string;
  user_name: string;
  title: string;
  thumbnail_url: string;
  viewer_count: number;
  type: string;
};

async function fetchStreams(clientId: string, secret: string): Promise<StreamFeed> {
  const games = await helix<{ id: string; name: string }>("games", { name: category }, clientId, secret);
  const game = games.find(entry => entry.name === category);
  if (!game) return { status: "category-missing", streams: [], updatedAt: new Date().toISOString() };

  const sources = await helix<HelixStream>("streams", { game_id: game.id, first: "10" }, clientId, secret);
  const streams = sources
    .filter(stream => stream.type === "live")
    .sort((a, b) => b.viewer_count - a.viewer_count)
    .slice(0, 10)
    .map(stream => ({
      id: stream.id,
      login: stream.user_login,
      name: stream.user_name,
      title: stream.title,
      thumbnail: stream.thumbnail_url.replace("{width}", "480").replace("{height}", "270"),
      viewers: stream.viewer_count,
    }));
  return { status: "ready", streams, updatedAt: new Date().toISOString() };
}

let cached: { data: StreamFeed; expiresAt: number } | undefined;
let pending: Promise<StreamFeed> | undefined;

export async function loadStreams(): Promise<StreamFeed> {
  const clientId = process.env.TWITCH_CLIENT_ID;
  const secret = process.env.TWITCH_CLIENT_SECRET;
  if (!clientId || !secret) return { status: "unconfigured" };
  if (cached && Date.now() < cached.expiresAt) return cached.data;

  pending ??= fetchStreams(clientId, secret).then(data => {
    cached = { data, expiresAt: Date.now() + 55_000 };
    return data;
  }).catch((): StreamFeed => ({ status: "error" }))
    .finally(() => { pending = undefined; });
  return pending;
}
