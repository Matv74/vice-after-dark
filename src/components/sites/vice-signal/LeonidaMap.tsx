"use client";

import { useEffect, useRef, useState } from "react";
import type { Map as LeafletMap } from "leaflet";
import styles from "./leonida-map.module.css";

type MapLabels = {
  title: string;
  zoomIn: string;
  zoomOut: string;
  reset: string;
  loading: string;
  error: string;
};

export function LeonidaMap({ labels }: { labels: MapLabels }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const resetRef = useRef<(() => void) | null>(null);
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let active = true;
    let observer: ResizeObserver | undefined;

    import("leaflet").then(L => {
      if (!active) return;

      // Tile coverage from the supplied map's configuration.
      const bounds = L.latLngBounds([-85.05112878, -135.48011639], [85.05112878, 135.48011639]);
      const map = L.map(container, {
        maxBounds: bounds,
        maxBoundsViscosity: 1,
        maxZoom: 6,
        zoomControl: false,
        zoomSnap: 0,
        zoomDelta: 0.5,
        scrollWheelZoom: false,
      });
      mapRef.current = map;

      const fit = (reset: boolean) => {
        map.invalidateSize({ animate: false, pan: false });
        const size = map.getSize();
        if (!size.x || !size.y) return;

        const minZoom = Math.max(0, map.getBoundsZoom(bounds, true));
        map.setMinZoom(minZoom);
        if (reset) map.setView(bounds.getCenter(), minZoom, { animate: false });
      };

      resetRef.current = () => fit(true);
      fit(true);

      L.tileLayer("/sites/gta6-map/mapka/{z}/{x}/{y}.webp", {
        bounds,
        maxNativeZoom: 4,
        maxZoom: 6,
        noWrap: true,
        attribution: "MapTiler Engine",
      }).addTo(map);

      observer = new ResizeObserver(() => fit(false));
      observer.observe(container);
      setStatus("ready");
    }).catch(() => {
      if (active) setStatus("error");
    });

    return () => {
      active = false;
      observer?.disconnect();
      mapRef.current?.remove();
      mapRef.current = null;
      resetRef.current = null;
    };
  }, []);

  return (
    <section className={styles.frame} aria-label={labels.title}>
      <div ref={containerRef} className={styles.canvas} />
      {status !== "ready" && (
        <p className={styles.status} role="status">{labels[status]}</p>
      )}
      <div className={styles.controls}>
        <button type="button" aria-label={labels.zoomIn} title={labels.zoomIn} disabled={status !== "ready"} onClick={() => mapRef.current?.zoomIn()}>+</button>
        <button type="button" aria-label={labels.zoomOut} title={labels.zoomOut} disabled={status !== "ready"} onClick={() => mapRef.current?.zoomOut()}>−</button>
        <button type="button" aria-label={labels.reset} title={labels.reset} disabled={status !== "ready"} onClick={() => resetRef.current?.()}>↺</button>
      </div>
    </section>
  );
}
