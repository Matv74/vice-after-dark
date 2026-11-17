import type { CSSProperties } from "react";
import { assetRoot } from "./assets";
import styles from "./intro.module.css";

const introRoot = `${assetRoot}/intro`;
const transparentPixel = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const motionAllowed = "(prefers-reduced-motion: no-preference)";
const shardMoves = [
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
] as const;

function IntroImage({ file, className, style }: {
  file: string;
  className: string;
  style?: CSSProperties;
}) {
  return (
    <picture className={className} style={style}>
      <source media={`${motionAllowed} and (width < 768px)`} srcSet={`${introRoot}/mobile/${file}`} />
      <source media={motionAllowed} srcSet={`${introRoot}/desktop/${file}`} />
      <img src={transparentPixel} alt="" />
    </picture>
  );
}

export function GTA6Intro() {
  return (
    <div className={styles.intro} aria-hidden="true">
      {shardMoves.map(([x, y, rotate], index) => (
        <IntroImage
          key={index}
          file={`shard${index}.png`}
          className={styles.shard}
          style={{ "--x": x, "--y": y, "--rotate": rotate, "--delay": `${index * 90}ms` } as CSSProperties}
        />
      ))}
      <div className={styles.assembled}>
        <IntroImage file="poster_full.jpg" className={styles.poster} />
        <IntroImage file="poster_logo.png" className={styles.poster} />
      </div>
    </div>
  );
}
