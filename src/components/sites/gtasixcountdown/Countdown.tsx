"use client";

import Image from "next/image";
import { type CSSProperties, useEffect, useSyncExternalStore } from "react";
import { assetRoot, coverArt, widgetBackgrounds } from "./assets";
import styles from "./countdown.module.css";

const releaseDate = new Date(2026, 10, 19).getTime();
const hour = 3600;
const day = 24 * hour;

function subscribeToClock(notify: () => void) {
  const interval = window.setInterval(notify, 200);
  window.addEventListener("visibilitychange", notify);
  return () => {
    window.clearInterval(interval);
    window.removeEventListener("visibilitychange", notify);
  };
}

const secondsLeft = () => Math.max(0, Math.round((releaseDate - Date.now()) / 1000));
const getServerTime = () => null;

function useCountdown() {
  const left = useSyncExternalStore(subscribeToClock, secondsLeft, getServerTime);
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

export function Countdown({ effects }: { effects: boolean }) {
  const { remaining, units } = useCountdown();
  const [days] = units;
  const [primary, secondary] = palettes[days % palettes.length];
  const particleCount = days <= 3 ? 22 : days <= 7 ? 16 : days <= 14 ? 12 : days <= 30 ? 8 : 5;
  const phase = effects ? midnightPhase(remaining) : "";

  if (remaining === 0) return <p className={styles.released}>Out Now</p>;

  return (
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
      <div className={styles.countdown} role="timer" aria-label="Time until GTA VI release">
        {["Days", "Hours", "Minutes", "Seconds"].map((label, index) => (
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
