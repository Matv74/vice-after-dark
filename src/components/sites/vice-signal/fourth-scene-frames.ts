const preloadRadius = 3;
export function createFrameBuffer(frameCount: number, source: (index: number) => string, onSettled: () => void, maxPending = 3) {
  const decoded = new Map<number, HTMLImageElement>();
  const pending = new Map<number, HTMLImageElement>();
  const failed = new Set<number>();

  function cancel(index: number, image: HTMLImageElement) {
    pending.delete(index);
    image.removeAttribute("src");
  }

  function load(index: number, speculative: boolean) {
    const image = new Image();
    pending.set(index, image);
    image.src = source(index);

    const decode = () => {
      if (pending.get(index) !== image) return;
      void image.decode().then(
      () => {
        if (pending.get(index) !== image) return;
        pending.delete(index);
        decoded.set(index, image);
        onSettled();
      },
      () => {
        if (pending.get(index) !== image) return;
        pending.delete(index);
        failed.add(index);
        onSettled();
      },
      );
    };
    if (speculative && typeof window.requestIdleCallback === "function") {
      window.requestIdleCallback(decode, { timeout: 80 });
    } else {
      decode();
    }
  }

  return {
    prepare(target: number, direction: number) {
      const nearby = [target];
      for (let offset = 1; offset <= preloadRadius; offset++) {
        nearby.push(target + direction * offset, target - direction * offset);
      }

      for (const index of decoded.keys()) {
        if (!nearby.includes(index)) decoded.delete(index);
      }
      const requested = nearby
        .filter(index => index >= 1 && index <= frameCount && !decoded.has(index) && !failed.has(index))
        .slice(0, maxPending);
      for (const [index, image] of pending) {
        if (!requested.includes(index)) cancel(index, image);
      }

      for (const index of requested) {
        if (!pending.has(index)) load(index, maxPending === 2 && index !== target);
      }
    },

    closest(target: number, displayed: number) {
      const step = Math.sign(displayed - target);
      for (let index = target; index !== displayed; index += step) {
        const image = decoded.get(index);
        if (image) return { index, image };
      }
    },

    clear() {
      for (const [index, image] of pending) cancel(index, image);
      decoded.clear();
      failed.clear();
    },
  };
}
