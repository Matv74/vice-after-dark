"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { SITE_URL } from "../vice-signal/config";
import { widgetBackgrounds } from "./assets";
import { backgroundLabel, interfaceCopy } from "./interface-copy";
import { landingCopy } from "./landing-copy";
import { COUNTDOWN_PATHS, type LandingLocale } from "./landing-routes";
import styles from "./site.module.css";

const sizes = [
  { value: "small", width: 320, height: 150 },
  { value: "medium", width: 380, height: 240 },
  { value: "large", width: 450, height: 320 },
] as const;

export function EmbedSettings({ locale }: { locale: LandingLocale }) {
  const { background: backgroundCopy, embed: copy } = interfaceCopy[locale];
  const widgetTitle = landingCopy[locale].countdown.heading;
  const [expanded, setExpanded] = useState(false);
  const [background, setBackground] = useState("default");
  const [preset, setPreset] = useState<(typeof sizes)[number]["value"] | "custom">("medium");
  const [dimensions, setDimensions] = useState({ width: 380, height: 240 });
  const [copyStatus, setCopyStatus] = useState("");
  const width = Math.max(200, Math.min(1200, dimensions.width));
  const height = Math.max(150, Math.min(1200, dimensions.height));
  const path = COUNTDOWN_PATHS[locale];
  const widgetPath = path + "#/widget?bg=" + encodeURIComponent(background);
  const code = expanded
    ? '<iframe src="' + window.location.origin + widgetPath +
      '" width="' + width + '" height="' + height +
      '" title="' + widgetTitle + '" frameborder="0" style="border:none; overflow:hidden;" scrolling="no"></iframe>' +
      '\n<p><a href="' + SITE_URL + path + '">' + widgetTitle + '</a></p>'
    : "";

  function updatePreset(value: string) {
    const size = sizes.find((candidate) => candidate.value === value);
    setPreset(size?.value ?? "custom");
    if (size) setDimensions({ width: size.width, height: size.height });
    setCopyStatus("");
  }

  async function copyCode() {
    try {
      await navigator.clipboard.writeText(code);
      setCopyStatus(copy.copied);
    } catch {
      setCopyStatus(copy.select);
    }
  }

  return (
    <section className={styles.embed}>
      <button
        type="button"
        className={styles.embedHeader}
        onClick={() => setExpanded((value) => !value)}
        aria-expanded={expanded}
        aria-controls="gta-embed-options"
      >
        {copy.heading} <ChevronDown size={19} />
      </button>
      {expanded && (
        <div className={styles.embedBody} id="gta-embed-options">
          <label>{backgroundCopy}
            <select value={background} onChange={(event) => { setBackground(event.target.value); setCopyStatus(""); }}>
              {widgetBackgrounds.map(([label, value]) => <option key={value} value={value}>{backgroundLabel(locale, value, label)}</option>)}
            </select>
          </label>
          <label>{copy.size}
            <select value={preset} onChange={(event) => updatePreset(event.target.value)}>
              {sizes.map(({ value, width, height }) => <option key={value} value={value}>{copy.widths[value]} ({width}×{height})</option>)}
              <option value="custom">{copy.custom}</option>
            </select>
          </label>
          {preset === "custom" && (
            <div className={styles.dimensions}>
              {(["width", "height"] as const).map((axis) => (
                <label key={axis}>{copy[axis]}
                  <input
                    type="number"
                    min={axis === "width" ? 200 : 150}
                    max={1200}
                    value={dimensions[axis] || ""}
                    onChange={(event) => {
                      setDimensions({ ...dimensions, [axis]: Number(event.target.value) });
                      setCopyStatus("");
                    }}
                  />
                </label>
              ))}
            </div>
          )}
          <div>{copy.preview}</div>
          <div className={styles.preview}>
            <iframe src={widgetPath} width={width} height={height} title={copy.preview} />
          </div>
          <p>{copy.instruction}</p>
          <textarea aria-label={copy.code} value={code} readOnly onFocus={(event) => event.currentTarget.select()} />
          <button className={styles.copy} type="button" onClick={copyCode} aria-live="polite">
            {copyStatus || copy.copy}
          </button>
        </div>
      )}
    </section>
  );
}
