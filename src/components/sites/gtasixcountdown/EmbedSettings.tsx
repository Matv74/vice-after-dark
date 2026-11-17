"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { widgetBackgrounds } from "./assets";
import styles from "./site.module.css";

const sizes = [
  { value: "small", label: "Small (320x200)", width: 320, height: 150 },
  { value: "medium", label: "Medium (380x320)", width: 380, height: 240 },
  { value: "large", label: "Large (450x400)", width: 450, height: 320 },
] as const;

export function EmbedSettings() {
  const [expanded, setExpanded] = useState(false);
  const [background, setBackground] = useState("default");
  const [preset, setPreset] = useState<(typeof sizes)[number]["value"] | "custom">("medium");
  const [dimensions, setDimensions] = useState({ width: 380, height: 240 });
  const [copyStatus, setCopyStatus] = useState("");
  const width = Math.max(200, Math.min(1200, dimensions.width));
  const height = Math.max(150, Math.min(1200, dimensions.height));
  const hash = "#/widget?bg=" + encodeURIComponent(background);
  const code = expanded
    ? '<iframe src="' + window.location.origin + window.location.pathname + hash +
      '" width="' + width + '" height="' + height +
      '" frameborder="0" style="border:none; overflow:hidden;" scrolling="no"></iframe>'
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
      setCopyStatus("Copied!");
    } catch {
      setCopyStatus("Select the code to copy it.");
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
        Embed Widget <ChevronDown size={19} />
      </button>
      {expanded && (
        <div className={styles.embedBody} id="gta-embed-options">
          <label>Background:
            <select value={background} onChange={(event) => { setBackground(event.target.value); setCopyStatus(""); }}>
              {widgetBackgrounds.map(([label, value]) => <option key={value} value={value}>{label}</option>)}
            </select>
          </label>
          <label>Size Preset:
            <select value={preset} onChange={(event) => updatePreset(event.target.value)}>
              {sizes.map(({ label, value }) => <option key={value} value={value}>{label}</option>)}
              <option value="custom">Custom Dimensions</option>
            </select>
          </label>
          {preset === "custom" && (
            <div className={styles.dimensions}>
              {(["width", "height"] as const).map((axis) => (
                <label key={axis}>{axis === "width" ? "Width:" : "Height:"}
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
          <div>Live Preview:</div>
          <div className={styles.preview}>
            <iframe src={"/" + hash} width={width} height={height} title="GTA 6 Countdown Widget Preview" />
          </div>
          <p>Copy the code below to embed the GTA 6 countdown widget on your site:</p>
          <textarea aria-label="Embed code" value={code} readOnly onFocus={(event) => event.currentTarget.select()} />
          <button className={styles.copy} type="button" onClick={copyCode} aria-live="polite">
            {copyStatus || "Copy Code"}
          </button>
        </div>
      )}
    </section>
  );
}
