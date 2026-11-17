"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useMemo, useSyncExternalStore } from "react";
import { HOME_LANGUAGE, RELEASE_LISTINGS_NOTE, RELEASE_REGION_KEY, RELEASE_WINDOWS, remainingReleaseSeconds, resolveReleaseWindow } from "../vice-signal/config";
import { assetRoot, coverArt, widgetBackgrounds } from "./assets";
import { CustomizeSelect } from "./CustomizeSelect";
import styles from "./countdown.module.css";
import siteStyles from "./site.module.css";

const hour = 3600;
const day = 24 * hour;
const regionOptions = [
  { value: "", label: "Auto" },
  ...RELEASE_WINDOWS.map(window => ({ value: window.id, label: window.labels[HOME_LANGUAGE] })),
];
const regionChange = "gta-release-region-change";
let unsavedChoice: string | null | undefined;
let regionRequested = false;
let regionInfo: { country?: string; clockOffset: number } | null = null;

function subscribeToClock(notify: () => void) {
  const interval = window.setInterval(notify, 1000);
  document.addEventListener("visibilitychange", notify);
  return () => {
    window.clearInterval(interval);
    document.removeEventListener("visibilitychange", notify);
  };
}

const clockSnapshot = () => Math.floor(Date.now() / 1000) * 1000;
const neutralSnapshot = () => null;
const readRegionInfo = () => regionInfo;

function subscribeToRegion(notify: () => void) {
  window.addEventListener(regionChange, notify);
  window.addEventListener("storage", notify);
  return () => {
    window.removeEventListener(regionChange, notify);
    window.removeEventListener("storage", notify);
  };
}

function readRegion() {
  if (unsavedChoice !== undefined) return unsavedChoice;
  try {
    return window.localStorage.getItem(RELEASE_REGION_KEY);
  } catch {
    return null;
  }
}

function saveRegion(choice: string) {
  try {
    if (choice) window.localStorage.setItem(RELEASE_REGION_KEY, choice);
    else window.localStorage.removeItem(RELEASE_REGION_KEY);
    unsavedChoice = undefined;
  } catch {
    unsavedChoice = choice || null;
  }
  window.dispatchEvent(new Event(regionChange));
}

async function requestRegion() {
  if (regionRequested) return;
  regionRequested = true;

  try {
    const startedAt = Date.now();
    const response = await fetch("/api/region", { cache: "no-store" });
    const receivedAt = Date.now();
    if (!response.ok) return;

    const data = await response.json();
    const serverTime = Date.parse(response.headers.get("Date") ?? "");
    regionInfo = {
      country: typeof data?.country === "string" ? data.country : undefined,
      clockOffset: Number.isFinite(serverTime) ? serverTime - (startedAt + receivedAt) / 2 : 0,
    };
    window.dispatchEvent(new Event(regionChange));
  } catch {
    // The browser timezone and clock are sufficient when the endpoint is unavailable.
  }
}

export function useReleaseRegion() {
  const ready = useSyncExternalStore(subscribeToRegion, () => true, () => false);
  const choice = useSyncExternalStore(subscribeToRegion, readRegion, neutralSnapshot);
  const info = useSyncExternalStore(subscribeToRegion, readRegionInfo, neutralSnapshot);
  useEffect(() => {
    if (ready && !choice && !readRegion()) void requestRegion();
  }, [choice, ready]);

  const countryHint = info?.country;
  const release = useMemo(() => ready
    ? resolveReleaseWindow(choice, countryHint, Intl.DateTimeFormat().resolvedOptions().timeZone)
    : null, [choice, countryHint, ready]);
  return { choice, release, clockOffset: info?.clockOffset ?? 0 };
}

function useCountdown() {
  const now = useSyncExternalStore(subscribeToClock, clockSnapshot, neutralSnapshot);
  const { release, clockOffset } = useReleaseRegion();
  const left = release && now !== null
    ? remainingReleaseSeconds(release.unlockAt, now + clockOffset)
    : null;
  const remaining = left ?? 0;

  return {
    remaining: left,
    units: [
      Math.floor(remaining / day),
      Math.floor((remaining % day) / hour),
      Math.floor((remaining % hour) / 60),
      remaining % 60,
    ],
  };
}

const palettes = [
  ["#ff5cc2", "#ff8c5c"],
  ["#00f2ff", "#ff2a85"],
  ["#c94bff", "#4b5bff"],
  ["#ffb84d", "#ff5cc2"],
  ["#ff0099", "#00e5ff"],
  ["#ff6b35", "#c94bff"],
];

function midnightPhase(remaining: number | null) {
  if (remaining === null || remaining < 6) return "";
  const offset = remaining % day;
  if (offset > 0 && offset <= 5) return styles.charging;
  if (offset === 0 || offset >= day - 2) return styles.daybreak;
  return "";
}

const englishTimer = { out: "Out Now", label: "Time until GTA VI release", units: ["Days", "Hours", "Minutes", "Seconds"] };

export function Countdown({ effects, copy = englishTimer }: { effects: boolean; copy?: { out: string; label: string; units: readonly string[] } }) {
  const { remaining, units } = useCountdown();
  const [days] = units;
  const [primary, secondary] = palettes[days % palettes.length];
  const particleCount = days <= 3 ? 22 : days <= 7 ? 16 : days <= 14 ? 12 : days <= 30 ? 8 : 5;
  const phase = effects ? midnightPhase(remaining) : "";

  return remaining === 0 ? <p className={styles.released}>{copy.out}</p> : (
    <div
      className={[styles.stage, effects && styles.effects, effects && days <= 3 && styles.critical, phase].filter(Boolean).join(" ")}
      style={{ "--primary": primary, "--secondary": secondary } as CSSProperties}
    >
      {effects && (
        <div className={styles.ambient} aria-hidden="true" key={days}>
          <div className={styles.aura} />
          {Array.from({ length: particleCount }, (_, index) => (
            <i key={index} style={{
              "--left": ((index * 97 + days * 13) % 92 + 4) + "%",
              "--size": (3 + (index * 7) % 5) + "px",
              "--duration": (4.2 + ((index * 11) % 5) * 0.75) + "s",
              "--delay": (-((index * 17) % 10) * 0.55) + "s",
              "--drift": (12 * ((index * 23) % 7 - 3)) + "px",
            } as CSSProperties} />
          ))}
        </div>
      )}
      {phase && <div className={styles.midnightFlash} aria-hidden="true" />}
      <div className={styles.countdown} role="timer" aria-label={copy.label}>
        {copy.units.map((label, index) => (
          <div className={styles.card} key={label} style={{ "--index": index } as CSSProperties}>
            <span className={styles.digit} key={index === 3 && !phase ? label : units[index]}>
              {remaining === null ? "–" : units[index]}
            </span>
            <p>{label}</p>
            {effects && <div className={styles.sheen} aria-hidden="true" />}
          </div>
        ))}
      </div>
    </div>
  );
}

export function ReleaseRegionSettings() {
  const { choice, release } = useReleaseRegion();
  const selected = RELEASE_WINDOWS.some(window => window.id === choice) ? choice ?? "" : "";

  return (
    <div className={siteStyles.releaseRegion}>
      <CustomizeSelect label="Release region" value={selected} options={regionOptions}
        onChange={saveRegion} describedBy="gta-release-region-note" />
      {release?.approximate && <p>Approximate · midnight on 19 November, local time</p>}
      {!selected && release?.window && <p>Auto · {release.window.labels[HOME_LANGUAGE]}</p>}
      <p id="gta-release-region-note">{RELEASE_LISTINGS_NOTE}</p>
      <p>Xbox uses the same windows, unconfirmed.</p>
    </div>
  );
}

export function CountdownWidget({ background }: { background: string }) {
  const { remaining, units } = useCountdown();
  const isTransparent = background === "transparent";
  const image = widgetBackgrounds.some(([, value]) => value === background) && background.endsWith(".webp")
    ? background
    : coverArt;

  useEffect(() => {
    document.documentElement.dataset.countdownWidget = "";
    return () => { delete document.documentElement.dataset.countdownWidget; };
  }, []);

  return (
    <main
      className={styles.widget}
      style={{
        backgroundColor: isTransparent ? "transparent" : "#0a0814",
        backgroundImage: isTransparent || background === "solid"
          ? undefined
          : "radial-gradient(circle, #0f0c1ebf, #0a0814f2), url(" + assetRoot + "/backgrounds/" + image + ")",
      }}
    >
      <div className={styles.widgetCard}>
        <Image className={styles.widgetLogo} src={assetRoot + "/logo.png"} alt="GTA VI" width={960} height={729} unoptimized />
        {remaining === 0 ? <p className={styles.widgetReleased}>Released</p> : (
          <div className={styles.widgetUnits} role="timer" aria-label="Time until GTA VI release">
            {["Days", "Hrs", "Min", "Sec"].map((label, index) => (
              <div key={label}><b>{remaining === null ? "–" : units[index]}</b><span>{label}</span></div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
