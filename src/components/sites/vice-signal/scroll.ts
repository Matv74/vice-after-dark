// Visual reference: https://www.rockstargames.com/VI (inspiration only, no assets or code copied)

import { SCREEN_TWO_ART } from "./config";
import { MOBILE_TOUCH_QUERY } from "./mobile-motion";

export const SCROLL = {
  INTRO_RANGE_VH: 1,
  HERO_ZOOM_TO: 0.90,
  HERO_DIM_TO: 0.20,
  HERO_FADE_START: 0.70,
  S2_START: 0.30,
  S2_VISIBLE_AT: 0.85,
  S2_DIM_FROM: 0.35,
  HEADER_REVEAL_RANGE: 0.10,
  HOLD_PX: 200,
  PANEL_RANGE_VH: 1,
  FIFTH_PANEL_OVERLAP_PX: 100,
  RECEDE_PX: 100,
  MOBILE_MAX_WIDTH: 768,
  MOBILE_RECEDE_PX: undefined as number | undefined,
  RECEDE_SCALE_TO: 0.97,
  RECEDE_DIM_TO: 0.75,
  SCREEN3_BG: "#161628",
  FADE_TO_BG_START: 0,
  FADE_TO_BG_END: 0.7,
  REDUCED_FADE_MS: 180,
  EASING: {
    zoom: "power2.inOut",
    recede: "power1.inOut",
    opacity: "linear",
    fadeToBg: "smoothstep",
  },
} as const;

const curves = {
  "power1.inOut": (progress: number) => progress < .5
    ? 2 * progress ** 2
    : 1 - (-2 * progress + 2) ** 2 / 2,
  "power2.inOut": (progress: number) => progress < .5
    ? 4 * progress ** 3
    : 1 - (-2 * progress + 2) ** 3 / 2,
  linear: (progress: number) => progress,
  smoothstep: (progress: number) => progress ** 2 * (3 - 2 * progress),
};

const ratio = (value: number) => Math.min(1, Math.max(0, value));
const lerp = (from: number, to: number, progress: number) => from + (to - from) * progress;

export function panelBackgroundProgress(progress: number) {
  const { FADE_TO_BG_START: start, FADE_TO_BG_END: end } = SCROLL;
  return end > start
    ? curves[SCROLL.EASING.fadeToBg](ratio((progress - start) / (end - start)))
    : Number(progress >= end);
}

export function panelOffset(viewport: number, range: number, progress: number, naturalY: number) {
  if (naturalY <= 0) return 0;
  // Start at rest and match native scroll speed when the panel reaches the top.
  const travel = progress ** 2 * (viewport * (3 - 2 * progress) - range * (1 - progress));
  return viewport - travel - naturalY;
}

function phaseBounds(height: number, recedeLength: number) {
  const introEnd = height * SCROLL.INTRO_RANGE_VH;
  const recedeStart = introEnd + SCROLL.HOLD_PX;
  const panelStart = recedeStart + recedeLength;
  const release = panelStart + height * SCROLL.PANEL_RANGE_VH;
  return { introEnd, recedeStart, panelStart, release };
}

function resizeDistance(distance: number, previous: ReturnType<typeof phaseBounds>, next: ReturnType<typeof phaseBounds>) {
  if (distance <= previous.introEnd) return distance * next.introEnd / previous.introEnd;
  if (distance <= previous.recedeStart) return next.introEnd + distance - previous.introEnd;
  if (distance <= previous.panelStart) {
    return lerp(next.recedeStart, next.panelStart,
      (distance - previous.recedeStart) / (previous.panelStart - previous.recedeStart));
  }
  if (distance <= previous.release) {
    return lerp(next.panelStart, next.release,
      (distance - previous.panelStart) / (previous.release - previous.panelStart));
  }
  return next.release + distance - previous.release;
}

type SceneElements = {
  story: HTMLDivElement;
  stage: HTMLDivElement;
  hero: HTMLDivElement;
  artwork: HTMLImageElement;
  header: HTMLElement;
  panel: HTMLElement;
};

export function connectScroll({ story, stage, hero, artwork, header, panel }: SceneElements) {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobileTouch = window.matchMedia(MOBILE_TOUCH_QUERY);
  let previousWidth = window.innerWidth;
  const zoom = curves[SCROLL.EASING.zoom];
  const recede = curves[SCROLL.EASING.recede];
  const coverScale = 1 / Math.min(1, SCROLL.RECEDE_SCALE_TO);
  const fade = curves[SCROLL.EASING.opacity];
  let viewport = 0;
  let recedeLength: number = SCROLL.RECEDE_PX;
  let origin = 0;
  let reducedFadeAt = 0;
  let frame = 0;
  let geometryChanged = true;
  let lastScroll = Number.NaN;
  let imageReady = artwork.complete && artwork.naturalWidth > 0;
  stage.style.setProperty("--art-backdrop", `url("${SCREEN_TWO_ART}")`);

  function render() {
    frame = 0;
    const enhanced = !motion.matches;
    const needsGeometry = geometryChanged;
    const previousScroll = lastScroll;
    let scroll = window.scrollY;
    if (geometryChanged) {
      const previousViewport = viewport;
      const previousRecedeLength = recedeLength;
      const previousDistance = lastScroll - origin;
      const wasPinned = story.hasAttribute("data-pinned");
      recedeLength = window.innerWidth <= SCROLL.MOBILE_MAX_WIDTH
        ? SCROLL.MOBILE_RECEDE_PX ?? SCROLL.RECEDE_PX
        : SCROLL.RECEDE_PX;
      story.style.setProperty("--recede-distance", recedeLength + "px");
      stage.style.setProperty("--art-cover-scale", String(coverScale));
      story.toggleAttribute("data-pinned", enhanced);
      viewport = Math.max(1, (enhanced ? stage : hero).getBoundingClientRect().height);
      origin = story.getBoundingClientRect().top + scroll;
      if (!enhanced) {
        reducedFadeAt = panel.getBoundingClientRect().top + scroll - window.innerHeight;
      }
      geometryChanged = false;

      // Preserve the current scene on resize. Scroll input itself never sets scroll position.
      if (enhanced && wasPinned && previousViewport > 0 && previousDistance >= 0 &&
        (Math.abs(viewport - previousViewport) >= 1 || recedeLength !== previousRecedeLength)) {
        const nextDistance = resizeDistance(previousDistance,
          phaseBounds(previousViewport, previousRecedeLength), phaseBounds(viewport, recedeLength));
        window.scrollTo({ top: origin + nextDistance, behavior: "instant" });
        scroll = window.scrollY;
      }
    } else if (scroll === lastScroll) {
      return;
    }
    lastScroll = scroll;

    const { introEnd, recedeStart, panelStart, release } = phaseBounds(viewport, recedeLength);
    const distance = Math.max(0, scroll - origin);
    if (enhanced && !needsGeometry && previousScroll - origin >= release && distance >= release) return;
    const intro = ratio(distance / introEnd);
    const recedeProgress = recedeLength > 0
      ? ratio((distance - recedeStart) / recedeLength)
      : Number(distance >= recedeStart);
    const panelRange = release - panelStart;
    const panelProgress = ratio((distance - panelStart) / panelRange);
    if (mobileTouch.matches) {
      story.toggleAttribute("data-panel-entered", enhanced && panelProgress > 0);
      panel.style.setProperty("--panel-mobile-gap-factor", String(1 - panelProgress));
    }
    const artworkStart = introEnd * SCROLL.S2_START;
    const recedeScaleProgress = ratio((distance - artworkStart) / (release - artworkStart));
    const artProgress = ratio((intro - SCROLL.S2_START) / (1 - SCROLL.S2_START));

    const headerAlpha = enhanced ? fade(ratio((intro - SCROLL.S2_START) / SCROLL.HEADER_REVEAL_RANGE)) : 1;
    const showHeader = enhanced ? headerAlpha > 0 : distance >= viewport;
    header.toggleAttribute("data-active", showHeader);
    header.toggleAttribute("inert", !showHeader);
    header.style.setProperty("--header-alpha", String(headerAlpha));
    hero.inert = enhanced && imageReady && intro >= SCROLL.HERO_FADE_START;
    story.toggleAttribute("data-art-arriving", !enhanced && distance >= viewport * SCROLL.S2_START);
    story.toggleAttribute("data-panel-arriving", !enhanced && scroll >= reducedFadeAt);
    if (!enhanced) return;

    const artOpacity = imageReady ? fade(ratio((intro - SCROLL.S2_START) / (SCROLL.S2_VISIBLE_AT - SCROLL.S2_START))) : 0;
    const heroFade = imageReady ? fade(ratio((intro - SCROLL.HERO_FADE_START) / (1 - SCROLL.HERO_FADE_START))) : 0;
    // The artwork scales inside a full-size frame, with dimming on a separate layer.
    const sceneScale = lerp(1, SCROLL.RECEDE_SCALE_TO, recedeScaleProgress);
    const sceneLight = lerp(SCROLL.S2_DIM_FROM, 1, zoom(artProgress))
      * lerp(1, SCROLL.RECEDE_DIM_TO, recede(recedeProgress));
    const fadeToBg = panelBackgroundProgress(panelProgress);
    const panelShift = panelOffset(viewport, panelRange, panelProgress, release - distance);

    const heroZoomProgress = zoom(intro);
    hero.style.setProperty("--hero-scale", String(lerp(1, SCROLL.HERO_ZOOM_TO, heroZoomProgress)));
    hero.style.setProperty("--hero-shade", String(imageReady ? 1 - lerp(1, SCROLL.HERO_DIM_TO, heroZoomProgress) : 0));
    hero.style.setProperty("--hero-alpha", String(1 - heroFade));
    stage.style.setProperty("--art-scale", String(sceneScale));
    stage.style.setProperty("--art-shade", String(lerp(1 - sceneLight, 1, fadeToBg)));
    stage.style.setProperty("--art-alpha", String(Math.max(artOpacity, fadeToBg)));
    story.toggleAttribute("data-panel-filled", fadeToBg === 1);
    // Panel slides in purely via translateY — no opacity fade, cards ride along.
    panel.style.setProperty("--panel-shift", panelShift + "px");
  }

  function schedule() {
    if (!frame) frame = window.requestAnimationFrame(render);
  }

  function refresh() {
    geometryChanged = true;
    schedule();
  }

  function resize() {
    const width = window.innerWidth;
    if (mobileTouch.matches && width === previousWidth) return;
    previousWidth = width;
    refresh();
  }

  function ready() {
    imageReady = artwork.naturalWidth > 0;
    geometryChanged = true;
    schedule();
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("pageshow", refresh);
  motion.addEventListener("change", refresh);
  artwork.addEventListener("load", ready);
  const observer = new ResizeObserver(refresh);
  observer.observe(stage);
  render();

  return () => {
    window.cancelAnimationFrame(frame);
    window.removeEventListener("scroll", schedule);
    window.removeEventListener("resize", resize);
    window.removeEventListener("pageshow", refresh);
    motion.removeEventListener("change", refresh);
    artwork.removeEventListener("load", ready);
    observer.disconnect();
    story.removeAttribute("data-pinned");
    story.removeAttribute("data-art-arriving");
    story.removeAttribute("data-panel-arriving");
    story.removeAttribute("data-panel-filled");
    story.removeAttribute("data-panel-entered");
    panel.style.removeProperty("--panel-mobile-gap-factor");
    header.removeAttribute("data-active");
    header.inert = true;
    hero.inert = false;
  };
}
