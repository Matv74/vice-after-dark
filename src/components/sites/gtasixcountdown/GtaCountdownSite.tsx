"use client";

import { ViceStory } from "@/components/sites/vice-signal/ViceStory";
import { MOBILE_TOUCH_QUERY } from "@/components/sites/vice-signal/mobile-motion";
import Image from "next/image";
import { ChevronUp, Newspaper, Settings } from "lucide-react";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { interfaceCopy, backgroundLabel } from "./interface-copy";
import { languageLabel } from "./LanguageLinks";
import { COUNTDOWN_PATHS, LANGUAGE_NAMES, type LandingLocale } from "./landing-routes";
import { assetRoot, backgroundFiles, backgrounds, coverArt, stillBackgrounds } from "./assets";
import { Countdown, CountdownWidget, ReleaseRegionSettings } from "./Countdown";
import { CustomizeSelect } from "./CustomizeSelect";
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
const defaultSettings = "{}";
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

function readPreferences(raw: string): Partial<Preferences> {
  try {
    const saved: unknown = JSON.parse(raw);
    return saved && typeof saved === "object" && !Array.isArray(saved) ? saved as Partial<Preferences> : {};
  } catch {
    return {};
  }
}

function parseSettings(raw: string, compact = false): Preferences {
  const parsed = { ...defaults, showDailyEffects: !compact, ...readPreferences(raw) };
  if (!backgroundFiles.includes(parsed.background)) parsed.background = coverArt;
  return parsed;
}

function saveSettings(update: Partial<Preferences>) {
  const value = JSON.stringify({ ...readPreferences(readSettings()), ...update });
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
const desktopSnapshot = () => false;
const mobileSnapshot = () => window.matchMedia(MOBILE_TOUCH_QUERY).matches;
function subscribeToMobile(notify: () => void) {
  const media = window.matchMedia(MOBILE_TOUCH_QUERY);
  media.addEventListener("change", notify);
  return () => media.removeEventListener("change", notify);
}

const toggles = [
  "showFooterToggle", "showNewsToggle", "showMusicToggle", "autoChangeBg", "showDailyEffects",
] as const;

const optimizedCoverPath = assetRoot + "/backgrounds/Official_Cover_Art_landscape-optimized.webp";
const languageOptions = (["en", "uk", "pl"] as const).map(value => ({ value, label: LANGUAGE_NAMES[value] }));

function BackgroundMedia({ file, fading, alt }: { file: Preferences["background"]; fading?: boolean; alt: string }) {
  const path = file === coverArt ? optimizedCoverPath : assetRoot + "/backgrounds/" + file;
  const className = fading ? styles.incoming : undefined;

  return file.endsWith(".mp4") ? (
    <video className={className} src={path} autoPlay muted loop playsInline poster={optimizedCoverPath} />
  ) : (
    // These intentionally retain their natural dimensions for the source site's center crop.
    // eslint-disable-next-line @next/next/no-img-element
    <img className={className} src={path} alt={alt} />
  );
}

function CountdownPage({ locale, heading }: { locale: LandingLocale; heading: string }) {
  const copy = interfaceCopy[locale];
  const compact = useSyncExternalStore(subscribeToMobile, mobileSnapshot, desktopSnapshot);
  const settings = parseSettings(useSyncExternalStore(subscribeToSettings, readSettings, serverSettings), compact);
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
      if (event.key === "Escape" && !event.defaultPrevented &&
        !(event.target instanceof Element && event.target.closest("[data-customize-options], [data-popup-open][role=combobox]"))) {
        setPanel(null);
      }
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
        {previousBackground && <BackgroundMedia key={previousBackground} file={previousBackground} alt={copy.backgroundAlt} />}
        <BackgroundMedia key={settings.background} file={settings.background} alt={copy.backgroundAlt} fading={previousBackground !== null} />
      </div>
      <div className={styles.overlay} aria-hidden="true" />
      <main className={styles.content}>
        <div className={styles.brand}>
          <Image className={styles.logo} src={assetRoot + "/icon.webp"} alt="" width={1200} height={848} preload unoptimized />
          <p className={styles.brandTitle}>GTA VI</p>
          <h1 className={styles.brandTagline}>{heading}</h1>
        </div>
        <Countdown effects={settings.showDailyEffects} locale={locale} />
      </main>

      {settings.showNewsToggle && (
        <button className={floating + " " + styles.news + (panel === "news" ? " " + styles.newsOpen : "")}
          type="button" aria-label={copy.news.toggle} aria-expanded={panel === "news"} aria-controls="gta-news-feed"
          onClick={() => togglePanel("news")}>
          <Newspaper aria-hidden="true" />
        </button>
      )}
      <NewsFeed open={panel === "news"} locale={locale} />

      {settings.showMusicToggle && (
        <button className={floating + " " + styles.music + (settings.footerVisible ? " " + styles.aboveFooter : "") + (musicPlaying ? " " + styles.controlVisible : "")}
          type="button" aria-label={copy.music.toggle} title={copy.music.player}
          aria-expanded={panel === "music"} aria-controls="gta-music-player" onClick={() => togglePanel("music")}>
          {musicPlaying
            ? <span className={styles.equalizer} aria-hidden="true"><i /><i /><i /><i /></span>
            : <svg viewBox="0 0 512 512" aria-hidden="true"><use href="/sites/gtasixcountdown/music/icons.svg#music" /></svg>}
        </button>
      )}
      {musicActivated && (
        <MusicPlayer open={panel === "music"} footerVisible={settings.footerVisible} onPlayingChange={setMusicPlaying} locale={locale} />
      )}

      <button className={floating + " " + styles.customize}
        type="button" aria-expanded={panel === "customize"} aria-controls="gta-customization"
        onClick={() => togglePanel("customize")}>
        <Settings aria-hidden="true" /> {copy.customize}
      </button>
      <section
        className={styles.customization + (panel === "customize" ? " " + styles.customizationOpen : "")}
        inert={panel !== "customize"} id="gta-customization" aria-labelledby="gta-customize-title"
      >
        <h2 id="gta-customize-title">{copy.customize}</h2>
        {panel === "customize" && <>
        <div className={styles.pickerSetting}>
          <CustomizeSelect label={languageLabel[locale]} value={locale} options={languageOptions}
            onChange={(value) => {
              const language = languageOptions.find(option => option.value === value)?.value;
              if (language && language !== locale) window.location.assign(COUNTDOWN_PATHS[language]);
            }} />
        </div>
        <ReleaseRegionSettings locale={locale} />
        <div className={styles.pickerSetting}>
          <CustomizeSelect label={copy.background} value={settings.background}
            options={backgrounds.map(([label, value]) => ({ label: backgroundLabel(locale, value, label), value }))}
            onChange={(next) => {
              const file = backgroundFiles.find((value) => value === next);
              if (file) changeBackground(file);
            }} />
        </div>
        {toggles.map(key => (
          <label className={styles.checkbox} key={key}>
            <input type="checkbox" checked={settings[key]} onChange={(event) => saveSettings({ [key]: event.target.checked })} />
            <span aria-hidden="true" />
            {copy.toggles[key]}
          </label>
        ))}
        <EmbedSettings locale={locale} />
        </>}
      </section>

      {settings.showFooterToggle && (
        <button type="button" className={floating + " " + styles.footerToggle + (settings.footerVisible ? " " + styles.footerShown : "")}
          aria-label={settings.footerVisible ? copy.hideFooter : copy.showFooter} aria-expanded={settings.footerVisible}
          aria-controls="gta-footer" onClick={() => saveSettings({ footerVisible: !settings.footerVisible })}>
          <ChevronUp aria-hidden="true" />
        </button>
      )}
      <footer id="gta-footer" className={styles.footer} hidden={!settings.footerVisible}>
        <p>{copy.disclaimer}</p>
      </footer>
    </div>
  );
}

export function GtaCountdownSite({ locale, heading }: { locale: LandingLocale; heading: string }) {
  const hash = useSyncExternalStore(subscribeToHash, currentHash, emptyHash);
  const [path, query] = hash.split("?");

  if (path === "#/widget") {
    return <CountdownWidget locale={locale} background={new URLSearchParams(query).get("bg") ?? "default"} />;
  }

  return (
    <ViceStory locale={locale}><CountdownPage locale={locale} heading={heading} /></ViceStory>
  );
}

