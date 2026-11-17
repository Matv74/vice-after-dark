"use client";

import Image from "next/image";
import { type CSSProperties, useLayoutEffect, useRef } from "react";
import poster from "../../../../public/sites/vice-signal/scene-four/ezgif-frame-001.jpg";
import { createFrameBuffer } from "./fourth-scene-frames";
import { panelOffset, SCROLL } from "./scroll";
import { MOBILE_TOUCH_QUERY } from "./mobile-motion";
import styles from "./fourth-scene.module.css";

const scene = {
  poster,
  frameCount: 53,
  mobile: { frameCount: 36, path: "/sites/vice-signal/scene-four-m", width: 720, height: 405 },
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

function mobileFrameSource(index: number) {
  return `${scene.mobile.path}/frame-${String(index).padStart(3, "0")}.webp`;
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
    const mobile = window.matchMedia(MOBILE_TOUCH_QUERY);
    const connection = (navigator as Navigator & {
      connection?: { saveData?: boolean; effectiveType?: string };
    }).connection;
    let compact = mobile.matches;
    let nearScene = !compact;
    let needsPrepare = true;
    let measuredWidth = window.innerWidth;
    let measuredDpr = window.devicePixelRatio;
    let frames = makeBuffer();

    function makeBuffer() {
      return createFrameBuffer(compact ? scene.mobile.frameCount : scene.frameCount,
        compact ? mobileFrameSource : frameSource, () => {
          needsPrepare = true;
          schedule();
        }, compact ? 2 : undefined);
    }

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
      needsPrepare = true;
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

      const posterOnly = compact && (connection?.saveData || ["slow-2g", "2g", "3g"].includes(connection?.effectiveType ?? ""));
      if (posterOnly) section.style.setProperty("--mobile-poster-scale", String(1 + progress * .04));
      else section.style.removeProperty("--mobile-poster-scale");

      if (scroll < start - length || (compact && (!nearScene || posterOnly || scroll > fifthRelease + viewport))) {
        resetFrames();
        return;
      }
      if (context === undefined) {
        context = canvas.getContext("2d", { alpha: false });
        if (context && compact) context.imageSmoothingQuality = "low";
      }
      if (!context) return;

      buffering = true;
      const playbackLength = Math.max(length, fifthRelease - start);
      // Scroll can stop a fraction of a CSS pixel before the measured end.
      const playbackProgress = scroll >= start + playbackLength - 0.5
        ? 1 : Math.max(0, (scroll - start) / playbackLength);
      const count = compact ? scene.mobile.frameCount : scene.frameCount;
      const index = 1 + Math.round(playbackProgress * (count - 1));
      const changedFrame = index !== targetFrame;
      if (changedFrame) direction = Math.sign(index - targetFrame);
      targetFrame = index;
      if (!compact || changedFrame || needsPrepare) {
        needsPrepare = false;
        frames.prepare(targetFrame, direction);
      }

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

    function resize() {
      if (!compact) {
        refresh();
        return;
      }
      const width = window.innerWidth;
      const dpr = window.devicePixelRatio;
      if (width === measuredWidth && dpr === measuredDpr) return;
      measuredWidth = width;
      measuredDpr = dpr;
      resetFrames();
      sizeCanvas();
      refresh();
    }

    function sizeCanvas() {
      const width = compact ? Math.round(measuredWidth * Math.min(measuredDpr, 1.5)) : scene.poster.width;
      canvas!.width = width;
      canvas!.height = compact ? Math.round(width * scene.mobile.height / scene.mobile.width) : scene.poster.height;
      context = undefined;
    }

    function switchSet() {
      resetFrames();
      compact = mobile.matches;
      frames = makeBuffer();
      measuredWidth = window.innerWidth;
      measuredDpr = window.devicePixelRatio;
      sizeCanvas();
      refresh();
    }

    const proximity = new IntersectionObserver(([entry]) => {
      nearScene = entry.isIntersecting;
      if (compact) schedule();
    }, { rootMargin: "100% 0px" });
    proximity.observe(section);
    const observer = new ResizeObserver(resize);
    observer.observe(story);
    observer.observe(section);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("pageshow", refresh);
    motion.addEventListener("change", refresh);
    mobile.addEventListener("change", switchSet);
    if (compact) sizeCanvas();
    schedule();

    return () => {
      window.cancelAnimationFrame(animationFrame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pageshow", refresh);
      motion.removeEventListener("change", refresh);
      mobile.removeEventListener("change", switchSet);
      proximity.disconnect();
      observer.disconnect();
      resetFrames();
      resetFifthPanel();
      section.removeAttribute("data-scene-four-active");
      section.style.removeProperty("--scene-four-shade");
      section.style.removeProperty("--mobile-poster-scale");
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
          <picture>
            <source media={MOBILE_TOUCH_QUERY} srcSet={mobileFrameSource(1)} />
            <Image
              className={styles.poster}
              src={scene.poster}
              alt="Lucia and Jason in front of a burning car"
              fill
              loading="lazy"
              decoding="async"
              placeholder="blur"
              unoptimized
            />
          </picture>
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
