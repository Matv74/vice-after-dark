"use client";

import Image from "next/image";
import Script from "next/script";
import { useEffect, useRef, useState } from "react";
import { ProviderNotice } from "@/components/legal/ExternalEmbed";
import styles from "./music.module.css";

const assetPath = "/sites/gtasixcountdown/music";
const albumCover = `${assetPath}/album-cover.jpg`;
const soundCloudPlaylist = "https://soundcloud.com/atlanticrecords/sets/gtavithealbum";
const youtubePlaylist = "https://www.youtube.com/playlist?list=PLdg0nPcr3qrw";
const playlistApi = "https://api.soundcloud.com/playlists/2300288925";
const widgetSource = `https://w.soundcloud.com/player/?${new URLSearchParams({
  url: playlistApi,
  color: "#ff5cc2",
  auto_play: "false",
  hide_related: "true",
  show_comments: "false",
  show_user: "true",
  show_reposts: "false",
  show_teaser: "false",
  continuous_play: "true",
})}`;

const tracks = [
  { title: "That's It (feat. Future & Metro Boomin)", artist: "Yung Lean", duration: 161 },
  { title: "RHYNO (prod. Guy-Manuel de Homem-Christo)", artist: "Travis Scott", duration: 198 },
  { title: "Sexy Magic", artist: "CA7RIEL, Paco Amoroso, PinkPantheress, Fred again..", duration: 165 },
  { title: "Last Thing You Need", artist: "Morgan Wallen", duration: 182 },
  { title: "Suzuki", artist: "Fuerza Regida", duration: 190 },
  { title: "Macacoa 2000", artist: "Rauw Alejandro", duration: 173 },
  { title: "Don't Chart", artist: "Cardi B", duration: 164 },
  { title: "Bright Lights, Big City", artist: "Keith Richards", duration: 210 },
];

type Sound = { duration?: number };
type WidgetEvent = "READY" | "PLAY" | "PAUSE" | "FINISH" | "PLAY_PROGRESS" | "ERROR";

interface SoundCloudWidget {
  bind(event: string, handler: (data?: { currentPosition?: number }) => void): void;
  unbind(event: string): void;
  getCurrentSoundIndex(callback: (index: number) => void): void;
  getSounds(callback: (sounds: Sound[]) => void): void;
  play(): void;
  pause(): void;
  seekTo(position: number): void;
  skip(index: number): void;
  setVolume(volume: number): void;
}

type WidgetFactory = ((frame: HTMLIFrameElement) => SoundCloudWidget) & {
  Events: Record<WidgetEvent, string>;
};

declare global {
  interface Window {
    SC?: { Widget: WidgetFactory };
  }
}

type MusicPlayerProps = {
  open: boolean;
  footerVisible: boolean;
  onPlayingChange?: (playing: boolean) => void;
};

function savedVolume() {
  try {
    const value = window.localStorage.getItem("gta_album_volume");
    const volume = value === null ? 80 : Number(value);
    return Number.isFinite(volume) ? Math.min(100, Math.max(0, volume)) : 80;
  } catch {
    return 80;
  }
}

function formatTime(seconds: number) {
  return `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, "0")}`;
}

type IconName = "previous" | "play" | "pause" | "next" | "repeat" | "mute" | "volume-low" |
  "volume-high" | "tracklist" | "external-link" | "youtube";

function PlayerIcon({ name }: { name: IconName }) {
  return (
    <svg className={`${styles.icon} ${name === "previous" || name === "next" ? styles.narrowIcon : ""}`} aria-hidden="true">
      <use href={`${assetPath}/icons.svg#${name}`} />
    </svg>
  );
}

export function MusicPlayer({ open, footerVisible, onPlayingChange }: MusicPlayerProps) {
  const frame = useRef<HTMLIFrameElement>(null);
  const widget = useRef<SoundCloudWidget | null>(null);
  const playTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const repeatTrack = useRef(false);
  const currentTrack = useRef(0);
  const playbackRequested = useRef(false);
  const [enabled, setEnabled] = useState(false);
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [status, setStatus] = useState<"loading" | "ready" | "unavailable">("loading");
  const [playing, setPlaying] = useState(false);
  const [trackIndex, setTrackIndex] = useState(0);
  const [position, setPosition] = useState(0);
  const [remoteSounds, setRemoteSounds] = useState<Sound[]>([]);
  const [volume, setVolume] = useState(80);
  const [muted, setMuted] = useState(false);
  const [repeat, setRepeat] = useState(false);
  const [showTracks, setShowTracks] = useState(false);

  const trackCount = remoteSounds.length ? Math.min(tracks.length, remoteSounds.length) : tracks.length;
  const track = tracks[trackIndex];
  const duration = (remoteSounds[trackIndex]?.duration ?? track.duration * 1000) / 1000;

  useEffect(() => {
    onPlayingChange?.(playing);
  }, [onPlayingChange, playing]);

  useEffect(() => {
    if (!scriptLoaded || !frame.current || !window.SC?.Widget) return;

    const { Widget } = window.SC;
    const player = Widget(frame.current);
    const events = Widget.Events;
    let active = true;
    widget.current = player;

    const timeout = window.setTimeout(() => setStatus("unavailable"), 15000);
    const syncTrack = () => player.getCurrentSoundIndex((index) => {
      if (active && Number.isInteger(index) && index >= 0 && index < tracks.length) {
        currentTrack.current = index;
        setTrackIndex(index);
      }
    });

    player.bind(events.READY, () => {
      window.clearTimeout(timeout);
      const initialVolume = savedVolume();
      player.setVolume(initialVolume);
      setVolume(initialVolume);
      setStatus("ready");
      player.getSounds((sounds) => {
        if (active && Array.isArray(sounds)) setRemoteSounds(sounds);
      });
      syncTrack();
      if (playbackRequested.current) player.play();
    });
    player.bind(events.PLAY, () => {
      setPlaying(true);
      playbackRequested.current = false;
      syncTrack();
    });
    player.bind(events.PAUSE, () => setPlaying(false));
    player.bind(events.PLAY_PROGRESS, (event) => {
      if (typeof event?.currentPosition === "number") setPosition(event.currentPosition / 1000);
    });
    player.bind(events.FINISH, () => {
      if (repeatTrack.current) {
        const index = currentTrack.current;
        if (playTimer.current) clearTimeout(playTimer.current);
        playTimer.current = setTimeout(() => {
          player.skip(index);
          player.seekTo(0);
          player.play();
        }, 80);
      } else {
        setPlaying(false);
      }
      setPosition(0);
    });
    player.bind(events.ERROR, () => {
      window.clearTimeout(timeout);
      setPlaying(false);
      setStatus("unavailable");
    });

    return () => {
      active = false;
      window.clearTimeout(timeout);
      if (playTimer.current) clearTimeout(playTimer.current);
      for (const event of Object.values(events)) {
        player.unbind(event);
      }
      widget.current = null;
    };
  }, [scriptLoaded]);

  function selectTrack(index: number) {
    const target = (index + trackCount) % trackCount;
    currentTrack.current = target;
    setTrackIndex(target);
    setPosition(0);

    const player = widget.current;
    if (status !== "ready" || !player) return;
    if (playTimer.current) clearTimeout(playTimer.current);
    player.skip(target);
    playTimer.current = setTimeout(() => {
      player.seekTo(0);
      player.play();
    }, 80);
  }

  function changePosition(seconds: number) {
    setPosition(seconds);
    widget.current?.seekTo(seconds * 1000);
  }

  function changeVolume(value: number) {
    setVolume(value);
    setMuted(false);
    widget.current?.setVolume(value);
    try {
      window.localStorage.setItem("gta_album_volume", String(value));
    } catch {
      // Playback can continue in browsing modes that block storage.
    }
  }

  function toggleMute() {
    const wasSilent = muted || volume === 0;
    if (wasSilent && volume === 0) {
      changeVolume(80);
      return;
    }
    setMuted(!wasSilent);
    widget.current?.setVolume(wasSilent ? volume : 0);
  }

  return (
    <>
      {enabled && <>
      <Script
        id="gta-soundcloud-widget-api"
        src="https://w.soundcloud.com/player/api.js"
        onReady={() => setScriptLoaded(true)}
        onError={() => setStatus("unavailable")}
      />
      <iframe
        ref={frame}
        title="GTA VI The Album Audio Stream"
        className={styles.stream}
        src={widgetSource}
        allow="autoplay; encrypted-media"
        tabIndex={-1}
        aria-hidden="true"
      />
      </>}

      <section
        id="gta-music-player"
        aria-label="GTA VI Audio Player"
        inert={!open}
        className={`${styles.panel} ${open ? styles.open : ""} ${footerVisible ? styles.withFooter : ""}`}
      >
        <header className={styles.header}>
          <h2>GTA VI: The Album</h2>
        </header>
        {!enabled && (
          <div className={styles.streamError}>
            <ProviderNotice provider="SoundCloud" />
            <button type="button" onClick={() => setEnabled(true)}>Load SoundCloud</button>
          </div>
        )}

        <div className={styles.artwork}>
          <div className={styles.recordSleeve}>
            <div className={`${styles.record} ${playing ? styles.spinning : ""}`} aria-hidden="true">
              <span className={styles.label} />
            </div>
            <Image className={styles.cover} src={albumCover} alt="GTA VI: The Album cover" width={130} height={130} unoptimized />
          </div>
        </div>

        <div className={styles.trackInfo}>
          <h3 title={track.title}>{track.title}</h3>
          <p title={track.artist}>{track.artist}</p>
        </div>

        <div className={styles.progressSection}>
          <div className={styles.scrubber}>
            <progress value={Math.min(duration, position)} max={duration} aria-hidden="true" />
            <input
              type="range" aria-label="Seek track" min={0} max={duration} step={0.5}
              value={Math.min(duration, position)} disabled={status !== "ready"}
              onChange={(event) => changePosition(Number(event.target.value))}
            />
          </div>
          <div className={styles.time}>
            <span>{formatTime(position)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        <div className={styles.primary}>
          <button type="button" aria-label="Previous track" title="Previous track" onClick={() => {
            if (position > 3) changePosition(0);
            else selectTrack(trackIndex - 1);
          }}>
            <PlayerIcon name="previous" />
          </button>
          <button
            type="button"
            className={styles.play}
            aria-label={playing ? "Pause music" : "Play music"}
            title={status === "loading" ? "Loading SoundCloud player…" : playing ? "Pause" : "Play"}
            disabled={!enabled || status === "unavailable"}
            onClick={() => {
              if (status === "loading") playbackRequested.current = true;
              else if (playing) widget.current?.pause();
              else widget.current?.play();
            }}
          >
            <PlayerIcon name={playing ? "pause" : "play"} />
          </button>
          <button type="button" aria-label="Next track" title="Next track" onClick={() => selectTrack(trackIndex + 1)}>
            <PlayerIcon name="next" />
          </button>
          <button type="button" aria-label={repeat ? "Disable repeat" : "Enable repeat"} aria-pressed={repeat}
            title={`Repeat Song: ${repeat ? "On" : "Off"}`} onClick={() => {
              repeatTrack.current = !repeat;
              setRepeat(!repeat);
            }}>
            <PlayerIcon name="repeat" />
          </button>
        </div>

        {status === "unavailable" && <p className={styles.streamError} role="status">SoundCloud playback is unavailable. <a href={soundCloudPlaylist} target="_blank" rel="noreferrer">Open the playlist</a>.</p>}

        <div className={styles.secondary}>
          <div className={styles.volume}>
            <button type="button" aria-label="Toggle mute" title={muted || volume === 0 ? "Unmute" : "Mute"} onClick={toggleMute}>
              <PlayerIcon name={muted || volume === 0 ? "mute" : volume < 50 ? "volume-low" : "volume-high"} />
            </button>
            <input type="range" aria-label="Volume slider" min={0} max={100} value={muted ? 0 : volume}
              onChange={(event) => changeVolume(Number(event.target.value))} />
          </div>

          <div className={styles.actions}>
            <a href={youtubePlaylist} target="_blank" rel="noreferrer" aria-label="Open playlist on YouTube" title="Open playlist on YouTube">
              <PlayerIcon name="youtube" /><span>YouTube</span>
            </a>
            <button type="button" aria-label="Toggle tracklist" title="View tracklist" aria-expanded={showTracks}
              aria-controls="gta-album-tracklist" onClick={() => setShowTracks(!showTracks)}>
              <PlayerIcon name="tracklist" /><span>Tracks</span>
            </button>
            <a href={soundCloudPlaylist} target="_blank" rel="noreferrer" aria-label="Open playlist on SoundCloud" title="Open playlist on SoundCloud">
              <PlayerIcon name="external-link" />
            </a>
          </div>
        </div>

        {showTracks && (
          <ol id="gta-album-tracklist" className={styles.tracklist}>
            {tracks.slice(0, trackCount).map(({ title, artist }, index) => (
              <li key={title}>
                <button type="button" className={styles.trackItem} aria-current={trackIndex === index ? "true" : undefined}
                  onClick={() => selectTrack(index)}>
                  <span className={styles.trackNumber}>{index + 1}</span>
                  <span className={styles.trackDetails}><strong>{title}</strong><small>{artist}</small></span>
                  {trackIndex === index && <span className={`${styles.equalizer} ${playing ? styles.running : ""}`} aria-label={playing ? "Playing" : "Selected"}>
                    <i /><i /><i /><i />
                  </span>}
                </button>
              </li>
            ))}
          </ol>
        )}
      </section>
    </>
  );
}
