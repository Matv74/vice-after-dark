<!-- TODO: legal review -->

# Request and storage inventory

| Request | Trigger and destination |
| --- | --- |
| Site, fonts, assets and widget preview | Browser uses this site’s origin for pages, Next.js assets and image optimization, fonts, audio-player artwork, backgrounds, frames, the reminder file, and the countdown widget preview. |
| News | An open news drawer sends a same-origin request to `/api/gta-news` on open, refresh, and every five minutes. The route fetches `https://gtasixcountdown.com/news-data.json` server-side with JSON headers. It falls back to a local snapshot on failure. |
| YouTube | The trailer dialog and news cards load `www.youtube-nocookie.com/embed/…` after the visitor chooses to load YouTube. YouTube can then make its own requests from the frame. |
| SoundCloud | The visitor first opens the music panel and chooses to load SoundCloud. The app then requests the widget API script and player from `w.soundcloud.com`; the embed uses the configured `api.soundcloud.com` playlist and can make additional provider requests. |
| Twitch and TikTok | The shared component supports `player.twitch.tv` and `www.tiktok.com/player/v1/…`, with the same load choice. No card currently uses these providers. |
| Outbound links | Rockstar, YouTube playlists, SoundCloud playlists, UODO, and links in the news feed including X and publisher links open only on navigation. The email link opens the visitor’s mail client. |
| Removed X widget | Opening the news drawer previously loaded `platform.twitter.com/widgets.js`. Posts now link directly to X. |

| Site-owned key | Storage | Purpose |
| --- | --- | --- |
| `gta-countdown-preferences` | localStorage | Selected background, footer and panel options, background rotation, countdown effects. |
| `gta_album_volume` | localStorage | User-selected audio volume. |

The code sets no first-party cookies, sessionStorage or IndexedDB entries. The two preference keys persist until the visitor clears them. Consent for future optional services has no storage key yet. Provider-side requests and storage can vary with the browser, login and provider. [TODO: inspect provider storage in production and record or update cookie details before expanding embeds.]

[TODO: inventory forum cookies, storage, hosts, domains and expiry after choosing and configuring the separate forum software.]
