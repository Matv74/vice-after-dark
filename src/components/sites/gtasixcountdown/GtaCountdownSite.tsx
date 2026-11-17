"use client";

import { ViceStory } from "@/components/sites/vice-signal/ViceStory";
import Image from "next/image";
import { ChevronUp, Newspaper, Settings } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { assetRoot, backgroundFiles, backgrounds, coverArt, stillBackgrounds } from "./assets";
import { Countdown, CountdownWidget } from "./Countdown";
import { EmbedSettings } from "./EmbedSettings";
import { MusicPlayer } from "./MusicPlayer";
import { NewsFeed } from "./NewsFeed";
import styles from "./site.module.css";

const defaults = {
  background: coverArt as (typeof backgroundFiles)[number],
  footerVisible: true,
  showFooterToggle: true,
  showNewsToggle: true,
  showMusicToggle: true,
  autoChangeBg: false,
  showDailyEffects: true,
};

type Preferences = typeof defaults;
type Panel = "customize" | "news" | "music";

const settingsKey = "gta-countdown-preferences";
const defaultSettings = JSON.stringify(defaults);
let temporarySettings: string | undefined;

function readSettings() {
  if (temporarySettings !== undefined) return temporarySettings;
  try {
    return localStorage.getItem(settingsKey) ?? defaultSettings;
  } catch {
    return defaultSettings;
  }
}

function subscribeToSettings(notify: () => void) {
  window.addEventListener("storage", notify);
  window.addEventListener(settingsKey, notify);
  return () => {
    window.removeEventListener("storage", notify);
    window.removeEventListener(settingsKey, notify);
  };
}

function parseSettings(raw: string): Preferences {
  try {
    const parsed = { ...defaults, ...JSON.parse(raw) } as Preferences;
    if (!backgroundFiles.includes(parsed.background)) parsed.background = coverArt;
    return parsed;
  } catch {
    return defaults;
  }
}

function saveSettings(update: Partial<Preferences>) {
  const value = JSON.stringify({ ...parseSettings(readSettings()), ...update });
  try {
    localStorage.setItem(settingsKey, value);
  } catch {
    temporarySettings = value;
  }
  window.dispatchEvent(new Event(settingsKey));
}

function subscribeToHash(notify: () => void) {
  window.addEventListener("hashchange", notify);
  return () => window.removeEventListener("hashchange", notify);
}

const currentHash = () => window.location.hash;
const emptyHash = () => "";
const serverSettings = () => defaultSettings;

const toggles = [
  ["Show Footer Toggle", "showFooterToggle"],
  ["Show News Toggle", "showNewsToggle"],
  ["Show Music Player Toggle", "showMusicToggle"],
  ["Auto Change Background (20s)", "autoChangeBg"],
  ["Daily Countdown Effects", "showDailyEffects"],
] as const;

const optimizedCoverPath = assetRoot + "/backgrounds/Official_Cover_Art_landscape-optimized.webp";

function BackgroundMedia({ file, fading }: { file: Preferences["background"]; fading?: boolean }) {
  const path = file === coverArt ? optimizedCoverPath : assetRoot + "/backgrounds/" + file;
  const className = fading ? styles.incoming : undefined;

  return file.endsWith(".mp4") ? (
    <video className={className} src={path} autoPlay muted loop playsInline poster={optimizedCoverPath} />
  ) : (
    // These intentionally retain their natural dimensions for the source site's center crop.
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={path} alt="GTA VI Background" />
  );
}

function CountdownPage() {
  const settings = parseSettings(useSyncExternalStore(subscribeToSettings, readSettings, serverSettings));
  const [panel, setPanel] = useState<Panel | null>(null);
  const [controlsVisible, setControlsVisible] = useState(true);
  const [musicPlaying, setMusicPlaying] = useState(false);
  const [musicActivated, setMusicActivated] = useState(false);
  const [previousBackground, setPreviousBackground] = useState<Preferences["background"] | null>(null);
  const transitionTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const changeBackground = useCallback((file: Preferences["background"]) => {
    const current = parseSettings(readSettings()).background;
    if (file === current) return;
    setPreviousBackground(current);
    saveSettings({ background: file });
    clearTimeout(transitionTimer.current);
    transitionTimer.current = setTimeout(() => setPreviousBackground(null), 2000);
  }, []);

  useEffect(() => () => clearTimeout(transitionTimer.current), []);

  useEffect(() => {
    if (!settings.autoChangeBg) return;
    const interval = window.setInterval(() => {
      const current = parseSettings(readSettings()).background;
      const index = stillBackgrounds.findIndex((file) => file === current);
      changeBackground(stillBackgrounds[(index + 1) % stillBackgrounds.length]);
    }, 20000);
    return () => window.clearInterval(interval);
  }, [settings.autoChangeBg, changeBackground]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    const reveal = () => {
      setControlsVisible(true);
      clearTimeout(timer);
      timer = setTimeout(() => setControlsVisible(false), 3000);
    };
    reveal();
    window.addEventListener("pointermove", reveal);
    window.addEventListener("pointerdown", reveal);
    window.addEventListener("keydown", reveal);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("pointermove", reveal);
      window.removeEventListener("pointerdown", reveal);
      window.removeEventListener("keydown", reveal);
    };
  }, []);

  useEffect(() => {
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setPanel(null);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, []);

  const togglePanel = (next: Panel) => {
    if (next === "music") setMusicActivated(true);
    setPanel((current) => current === next ? null : next);
  };
  const visible = controlsVisible || panel !== null;
  const floating = styles.control + (visible ? " " + styles.controlVisible : "");

  return (
    <div className={styles.site}>
      <div className={styles.background} aria-hidden="true">
        {previousBackground && <BackgroundMedia key={previousBackground} file={previousBackground} />}
        <BackgroundMedia key={settings.background} file={settings.background} fading={previousBackground !== null} />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <main className={styles.content}>
        <h1 className="sr-only">GTA VI Countdown Timer | Days Until Grand Theft Auto 6 Release Date</h1>
        <Image className={styles.logo} src={assetRoot + "/logo.png"} alt="Grand Theft Auto VI Official Logo" width={960} height={729} priority unoptimized />
        <Countdown effects={settings.showDailyEffects} />
      </main>

      {settings.showNewsToggle && (
        <button className={floating + " " + styles.news + (panel === "news" ? " " + styles.newsOpen : "")}
          type="button" aria-label="Toggle News Feed" aria-expanded={panel === "news"} aria-controls="gta-news-feed"
          onClick={() => togglePanel("news")}>
          <Newspaper aria-hidden="true" />
        </button>
      )}
      <NewsFeed open={panel === "news"} />

      {settings.showMusicToggle && (
        <button className={floating + " " + styles.music + (settings.footerVisible ? " " + styles.aboveFooter : "") + (musicPlaying ? " " + styles.controlVisible : "")}
          type="button" aria-label="Toggle GTA VI Music Player" title="GTA VI: The Album Audio Player"
          aria-expanded={panel === "music"} aria-controls="gta-music-player" onClick={() => togglePanel("music")}>
          {musicPlaying
            ? <span className={styles.equalizer} aria-hidden="true"><i /><i /><i /><i /></span>
            : <svg viewBox="0 0 512 512" aria-hidden="true"><use href="/sites/gtasixcountdown/music/icons.svg#music" /></svg>}
        </button>
      )}
      {musicActivated && (
        <MusicPlayer open={panel === "music"} footerVisible={settings.footerVisible} onPlayingChange={setMusicPlaying} />
      )}

      <button className={floating + " " + styles.customize}
        type="button" aria-expanded={panel === "customize"} aria-controls="gta-customization"
        onClick={() => togglePanel("customize")}>
        <Settings aria-hidden="true" /> Customize
      </button>
      <section
        className={styles.customization + (panel === "customize" ? " " + styles.customizationOpen : "")}
        inert={panel !== "customize"} id="gta-customization" aria-labelledby="gta-customize-title"
      >
        <h2 id="gta-customize-title">Customize</h2>
        <label className={styles.backgroundPicker} htmlFor="gta-background">Background:</label>
        <select id="gta-background" value={settings.background} onChange={(event) => {
          const file = backgroundFiles.find((value) => value === event.target.value);
          if (file) changeBackground(file);
        }}>
          {backgrounds.map(([label, file]) => <option key={file} value={file}>{label}</option>)}
        </select>
        {toggles.map(([label, key]) => (
          <label className={styles.checkbox} key={key}>
            <input type="checkbox" checked={settings[key]} onChange={(event) => saveSettings({ [key]: event.target.checked })} />
            <span aria-hidden="true" />
            {label}
          </label>
        ))}
        <EmbedSettings />
      </section>

      {settings.showFooterToggle && (
        <button type="button" className={floating + " " + styles.footerToggle + (settings.footerVisible ? " " + styles.footerShown : "")}
          aria-label={settings.footerVisible ? "Hide footer" : "Show footer"} aria-expanded={settings.footerVisible}
          aria-controls="gta-footer" onClick={() => saveSettings({ footerVisible: !settings.footerVisible })}>
          <ChevronUp aria-hidden="true" />
        </button>
      )}
      <footer id="gta-footer" className={styles.footer} hidden={!settings.footerVisible}>
        <p>This is an unofficial fan-made countdown clock. GTA and all related marks are trademarks of Take-Two Interactive and Rockstar Games. This site is not affiliated with or endorsed by Take-Two Interactive or Rockstar Games.</p>
      </footer>
    </div>
  );
}

export function GtaCountdownSite() {
  const hash = useSyncExternalStore(subscribeToHash, currentHash, emptyHash);
  const [path, query] = hash.split("?");

  if (path === "#/widget") {
    return <CountdownWidget background={new URLSearchParams(query).get("bg") ?? "default"} />;
  }

  return <ViceStory><CountdownPage /></ViceStory>;
}

