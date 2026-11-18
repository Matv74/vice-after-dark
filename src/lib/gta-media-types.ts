export type Stream = {
  id: string;
  login: string;
  name: string;
  title: string;
  thumbnail: string;
  viewers: number;
};

export type StreamFeed =
  | { status: "ready" | "category-missing"; streams: Stream[]; updatedAt: string }
  | { status: "unconfigured" | "error" };

export type Clip = { id: string; title: string; channel: string; views: number };

export type ClipFeed =
  | { status: "ready"; clips: Clip[] }
  | { status: "unconfigured" | "error" };
