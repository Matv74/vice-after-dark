import { MOBILE_TOUCH_QUERY } from "./mobile-motion";

const settleTime = 42;
const settleDistance = 0.75;
const pixelsPerLine = 16;

function usesNativeScroll(event: WheelEvent) {
  if (!(event.target instanceof Element)) return true;
  if (event.target.closest("dialog[open], input, textarea, select, [contenteditable]")) return true;
  if (event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) >= Math.abs(event.deltaY)) return true;

  for (let element: Element | null = event.target; element && element !== document.body; element = element.parentElement) {
    const { overflowX, overflowY } = getComputedStyle(element);
    if ((/auto|scroll/.test(overflowX) && element.scrollWidth > element.clientWidth + 1) ||
      (/auto|scroll/.test(overflowY) && element.scrollHeight > element.clientHeight + 1)) return true;
  }

  return false;
}

export function connectWheelScroll() {
  const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const mobile = window.matchMedia(MOBILE_TOUCH_QUERY);
  let frame = 0;
  let position = 0;
  let target = 0;
  let lastScroll = 0;
  let lastTime = 0;

  function stop() {
    window.cancelAnimationFrame(frame);
    frame = 0;
  }

  function advance(time: number) {
    if (Math.abs(window.scrollY - lastScroll) > 1 || motion.matches) {
      stop();
      return;
    }

    const blend = 1 - Math.exp(-(time - lastTime) / settleTime);
    position += (target - position) * blend;
    lastTime = time;

    const settled = Math.abs(target - position) <= settleDistance;
    window.scrollTo({ top: settled ? target : position, behavior: "instant" });
    lastScroll = window.scrollY;
    frame = settled ? 0 : window.requestAnimationFrame(advance);
  }

  function wheel(event: WheelEvent) {
    if (motion.matches || mobile.matches) return;
    if (!event.cancelable || event.defaultPrevented || usesNativeScroll(event)) {
      if (frame) stop();
      return;
    }
    const root = document.scrollingElement;
    if (!root) return;

    const unit = event.deltaMode === 1 ? pixelsPerLine : event.deltaMode === 2 ? root.clientHeight : 1;
    const delta = event.deltaY * unit;
    const current = window.scrollY;
    if (!frame || Math.abs(current - lastScroll) > 1 || Math.sign(delta) !== Math.sign(target - current)) {
      target = position = lastScroll = current;
      lastTime = performance.now();
    }
    target = Math.max(0, Math.min(root.scrollHeight - root.clientHeight, target + delta));
    event.preventDefault();
    if (!frame) frame = window.requestAnimationFrame(advance);
  }

  window.addEventListener("wheel", wheel, { passive: false });
  window.addEventListener("pointerdown", stop, { passive: true });
  window.addEventListener("keydown", stop);
  window.addEventListener("hashchange", stop);
  window.addEventListener("resize", stop);
  motion.addEventListener("change", stop);

  return () => {
    stop();
    window.removeEventListener("wheel", wheel);
    window.removeEventListener("pointerdown", stop);
    window.removeEventListener("keydown", stop);
    window.removeEventListener("hashchange", stop);
    window.removeEventListener("resize", stop);
    motion.removeEventListener("change", stop);
  };
}
