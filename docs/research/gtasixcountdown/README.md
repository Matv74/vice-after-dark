# GTA VI Countdown clone

The project serves the countdown at [http://127.0.0.1:3000/](http://127.0.0.1:3000/). From the project root, start it with:

```powershell
.\.tools\node\npm.cmd run dev -- --hostname 127.0.0.1
```

## Routes

| Source | Local | Implementation |
| --- | --- | --- |
| [Countdown homepage](https://gtasixcountdown.com/) | `/` | `src/app/page.tsx` and the components in `src/components/sites/gtasixcountdown` |
| [Countdown widget](https://gtasixcountdown.com/#/widget?bg=default) | `/#/widget?bg=default` | Hash routing in `GtaCountdownSite.tsx` and the widget in `Countdown.tsx` |
| [Public news data](https://gtasixcountdown.com/news-data.json) | `/api/gta-news` | Live feed endpoint with the saved source feed as a fallback |

The homepage and embed count down to November 19, 2026 at midnight in the visitor’s time zone, following the source. The settings panel preserves the source's displayed size preset names and uses its actual iframe dimensions.

## Assets

- The 18 background images in `public/sites/gtasixcountdown/backgrounds` retain their [source filenames](https://gtasixcountdown.com/). Their origin paths use `/img/backgrounds/`. The two locally served MP4s come from `/img/backgrounds/videos/`.
- The local logo and tab icon come from the [countdown logo](https://gtasixcountdown.com/img/icons/Grand_Theft_Auto_VI_logo_%28with_gradient%29.svg.png) and [original favicon](https://gtasixcountdown.com/img/icons/official-gta-vi-logo.webp).
- `public/sites/gtasixcountdown/fonts` contains the source's Bebas Neue and Inter fonts and their license notices. [Source font stylesheet](https://fonts.googleapis.com/css2?family=Bebas+Neue&family=Inter:wght@300;400;600;700&display=swap)
- The music panel uses the [source album artwork](https://i1.sndcdn.com/artworks-zzFl8vqxgsAtCI5y-oyvRJA-t500x500.jpg) and the original [SoundCloud playlist](https://soundcloud.com/atlanticrecords/sets/gtavithealbum). Music and remote news embeds depend on their providers.

## Browser comparison

Source and clone rendered with the default cover selected and the panels closed. Measurements below are CSS pixels, rounded to the nearest pixel.

| Viewport | Logo (left, top, width, height) | Cards | Footer |
| --- | --- | --- | --- |
| 1440 × 900 | 654, 310, 132, 100 on both | 140 × 140, 20 gap, top 430 on both | 65 high on both |
| 390 × 844 | 129, 317, 132, 100 on both | 70 × 70, 9 gap between cards, top 437 on both | 96 high on both |

Also checked spacing and overflow at 546 × 1183 and 1920 × 1080. The browser checks exercised the ticking timer, two muted looping trailers, 20-second background cycling, footer settings after reload, widget preview and copy, live news refresh and an X embed, and SoundCloud playback and track switching.

The animated embers, glow, and midnight transition were recreated in CSS. The browser comparison covered the ambient effects during the countdown. The midnight transition was implemented from source behavior and inspected in code.
