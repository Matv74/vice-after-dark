"use client";

import React from "react";
import "./gta6-intro.css";

export interface GTA6IntroAnimationProps {
  /**
   * Base URL path where image assets are located.
   * Expected folder structure inside basePath:
   *   /desktop/shard0.png ... shard9.png
   *   /mobile/shard0.png ... shard9.png
   *   /desktop/poster_full.jpg, /mobile/poster_full.jpg
   *   /desktop/poster_logo.png, /mobile/poster_logo.png
   * Default: "/sites/rockstargames-vi/img"
   */
  basePath?: string;
  className?: string;
  /** Optional callback fired after the intro collage animation completes (~3.9s) */
  onAnimationEnd?: () => void;
}

const SHARD_MOVES: Array<[string, string, string]> = [
  ["-46vw", "-38vh", "-28deg"],
  ["44vw", "-42vh", "22deg"],
  ["-52vw", "10vh", "18deg"],
  ["48vw", "18vh", "-20deg"],
  ["-38vw", "44vh", "26deg"],
  ["36vw", "-30vh", "-16deg"],
  ["-30vw", "-48vh", "14deg"],
  ["30vw", "46vh", "-24deg"],
  ["-55vw", "-8vh", "12deg"],
  ["55vw", "6vh", "-14deg"],
];

export function GTA6IntroAnimation({
  basePath = "/sites/rockstargames-vi/img",
  className = "",
  onAnimationEnd,
}: GTA6IntroAnimationProps) {
  return (
    <div
      className={`gta6-intro-container ${className}`}
      onAnimationEnd={(e) => {
        if (e.animationName === "gta6-collage-out" && onAnimationEnd) {
          onAnimationEnd();
        }
      }}
      aria-hidden="true"
    >
      <div className="gta6-collage">
        {/* Desktop Shards (hidden on mobile) */}
        {SHARD_MOVES.map(([tx, ty, rot], i) => (
          <img
            key={`desk-${i}`}
            src={`${basePath}/desktop/shard${i}.png`}
            alt=""
            className="gta6-shard gta6-shard-desktop"
            loading="eager"
            style={
              {
                "--tx": tx,
                "--ty": ty,
                "--rot": rot,
                "--d": `${(i * 0.09).toFixed(2)}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Mobile Shards (visible on mobile only) */}
        {SHARD_MOVES.map(([tx, ty, rot], i) => (
          <img
            key={`mob-${i}`}
            src={`${basePath}/mobile/shard${i}.png`}
            alt=""
            className="gta6-shard gta6-shard-mobile"
            loading="eager"
            style={
              {
                "--tx": tx,
                "--ty": ty,
                "--rot": rot,
                "--d": `${(i * 0.09).toFixed(2)}s`,
              } as React.CSSProperties
            }
          />
        ))}

        {/* Full assembled cover and logo reveal */}
        <div className="gta6-assembled-cover">
          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={`${basePath}/mobile/poster_full.jpg`}
            />
            <source
              media="(min-width: 768px)"
              srcSet={`${basePath}/desktop/poster_full.jpg`}
            />
            <img
              src={`${basePath}/desktop/poster_full.jpg`}
              alt="Grand Theft Auto VI cover art"
              className="gta6-cover-img"
              loading="eager"
            />
          </picture>

          <picture>
            <source
              media="(max-width: 767px)"
              srcSet={`${basePath}/mobile/poster_logo.png`}
            />
            <source
              media="(min-width: 768px)"
              srcSet={`${basePath}/desktop/poster_logo.png`}
            />
            <img
              src={`${basePath}/desktop/poster_logo.png`}
              alt="GTA 6 Logo"
              className="gta6-logo-img"
              loading="eager"
            />
          </picture>
        </div>
      </div>
    </div>
  );
}

export default GTA6IntroAnimation;
