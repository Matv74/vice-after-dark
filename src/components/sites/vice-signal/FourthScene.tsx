"use client";

import Image from "next/image";
import { type CSSProperties, useLayoutEffect, useRef } from "react";
import poster from "../../../../public/sites/vice-signal/scene-four/ezgif-frame-001.jpg";
import { createFrameBuffer } from "./fourth-scene-frames";
import { panelOffset, SCROLL } from "./scroll";
import styles from "./fourth-scene.module.css";

const scene = {
  poster,
  frameCount: 53,
  revealRangeVh: 1,
  extraScrollVh: 0.5,
} as const;

const sceneStyles = {
  "--scene-four-reveal-length": `${scene.revealRangeVh * 100}svh`,
  "--scene-four-extra-scroll": `${scene.extraScrollVh * 100}svh`,
  "--scene-five-panel-length": `${SCROLL.PANEL_RANGE_VH * 100}svh`,
  "--scene-five-overlap": `${SCROLL.FIFTH_PANEL_OVERLAP_PX}px`,
  "--scene-four-ambient": scene.poster.blurDataURL ? `url("${scene.poster.blurDataURL}")` : undefined,
} as CSSProperties;

function frameSource(index: number) {
  return index === 1 ? scene.poster.src : `/sites/vice-signal/scene-four/ezgif-frame-${String(index).padStart(3, "0")}.jpg`;
}

function smoothstep(progress: number) {
  return progress ** 2 * (3 - 2 * progress);
}

export function FourthScene() {
  const sectionRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rangeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    const canvas = canvasRef.current;
    const rangeMarker = rangeRef.current;
    const story = section?.parentElement;
    const fifthPanel = section?.nextElementSibling;
    if (!section || !canvas || !rangeMarker || !story || !(fifthPanel instanceof HTMLElement)) return;

    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const frames = createFrameBuffer(scene.frameCount, frameSource, schedule);

    let context: CanvasRenderingContext2D | null | undefined;
    let animationFrame = 0;
    let needsMeasure = true;
    let start = 0;
    let length = 0;
    let fifthStart = 0;
    let fifthRelease = 0;
    let viewport = 0;
    let lastFifthProgress = -1;
    let lastProgress = 0;
    let buffering = false;
    let direction = 1;
    let targetFrame = 1;
    let displayedFrame = 1;

    const resetFifthPanel = () => {
      lastFifthProgress = -1;
      fifthPanel.removeAttribute("data-scene-five-active");
      fifthPanel.removeAttribute("data-scene-five-filled");
      fifthPanel.style.removeProperty("--scene-five-shift");
      section.style.removeProperty("--scene-five-shade");
    };

    const resetFrames = () => {
      if (!buffering) return;
      buffering = false;
      frames.clear();
      direction = 1;
      targetFrame = 1;
      displayedFrame = 1;
      canvas.removeAttribute("data-frame-index");
    };

    const render = () => {
      animationFrame = 0;
      if (motion.matches || !story.hasAttribute("data-pinned")) {
        needsMeasure = true;
        lastProgress = 0;
        section.removeAttribute("data-scene-four-active");
        section.style.removeProperty("--scene-four-shade");
        resetFifthPanel();
        resetFrames();
        return;
      }

      const scroll = window.scrollY;
      if (needsMeasure) {
        const bounds = section.getBoundingClientRect();
        start = bounds.top + scroll;
        length = rangeMarker.getBoundingClientRect().height;
        viewport = length / scene.revealRangeVh;
        fifthStart = start + length + viewport * scene.extraScrollVh - Math.min(length, SCROLL.FIFTH_PANEL_OVERLAP_PX);
        fifthRelease = fifthPanel.getBoundingClientRect().top + scroll;
        lastFifthProgress = -1;
        needsMeasure = false;
      }
      if (length <= 0) return;

      const fifthRange = fifthRelease - fifthStart;
      if (fifthRange > 0) {
        const fifthProgress = Math.min(1, Math.max(0, (scroll - fifthStart) / fifthRange));
        if (fifthProgress !== lastFifthProgress) {
          lastFifthProgress = fifthProgress;
          const fill = smoothstep(fifthProgress);
          const shift = panelOffset(viewport, fifthRange, fifthProgress, fifthRelease - scroll);
          fifthPanel.style.setProperty("--scene-five-shift", `${shift}px`);
          fifthPanel.toggleAttribute("data-scene-five-active", fifthProgress > 0);
          fifthPanel.toggleAttribute("data-scene-five-filled", fifthProgress === 1);
          section.style.setProperty("--scene-five-shade", String(fill));
        }
      }

      const progress = Math.min(1, Math.max(0, (scroll - start) / length));
      if (progress !== lastProgress) {
        lastProgress = progress;
        const reveal = smoothstep(progress);
        section.style.setProperty("--scene-four-shade", String(1 - reveal));
        section.toggleAttribute("data-scene-four-active", progress > 0);
      }

      if (scroll < start - length) {
        resetFrames();
        return;
      }
      if (context === undefined) context = canvas.getContext("2d", { alpha: false });
      if (!context) return;

      buffering = true;
      const playbackLength = Math.max(length, fifthRelease - start);
      // Scroll can stop a fraction of a CSS pixel before the measured end.
      const playbackProgress = scroll >= start + playbackLength - 0.5
        ? 1 : Math.max(0, (scroll - start) / playbackLength);
      const index = 1 + Math.round(playbackProgress * (scene.frameCount - 1));
      if (index !== targetFrame) direction = Math.sign(index - targetFrame);
      targetFrame = index;
      frames.prepare(targetFrame, direction);

      const next = frames.closest(targetFrame, displayedFrame);
      if (!next) return;
      context.drawImage(next.image, 0, 0, canvas.width, canvas.height);
      displayedFrame = next.index;
      canvas.dataset.frameIndex = String(displayedFrame);
    };

    function schedule() {
      if (!animationFrame) animationFrame = window.requestAnimationFrame(render);
    }

    function refresh() {
      needsMeasure = true;
      schedule();
    }

    const observer = new ResizeObserver(refresh);
    observer.observe(story);
    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", refresh, { passive: true });
    window.addEventListener("pageshow", refresh);
    motion.addEventListener("change", refresh);
    schedule();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", refresh);
      window.removeEventListener("pageshow", refresh);
      motion.removeEventListener("change", refresh);
      observer.disconnect();
      resetFrames();
      resetFifthPanel();
      section.removeAttribute("data-scene-four-active");
      section.style.removeProperty("--scene-four-shade");
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      id="vice-scene-four"
      className={styles.scene}
      aria-label="GTA VI scene"
      data-frame-count={scene.frameCount}
      style={sceneStyles}
    >
      <div className={styles.frame}>
        <div className={styles.posterFrame}>
          <Image
            className={styles.poster}
            src={scene.poster}
            alt="Lucia and Jason in front of a burning car"
            fill
            loading="lazy"
            placeholder="blur"
            unoptimized
          />
          <canvas
            ref={canvasRef}
            className={`${styles.poster} ${styles.canvas}`}
            width={scene.poster.width}
            height={scene.poster.height}
            aria-hidden="true"
          />
        </div>
      </div>
      <div ref={rangeRef} className={styles.revealRange} aria-hidden="true" />
    </section>
  );
}
