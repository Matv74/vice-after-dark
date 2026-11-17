# Instructions for AI / Developer: GTA 6 Shard & Logo Reveal Animation

This module contains the exact intro collage animation of GTA VI (where 10 shattered artwork shards fly in from various angles with 3D-like offsets and rotations, assemble into the official cover, display the GTA VI logo, and fade out).

---

## 📁 Package Contents

- **`GTA6IntroAnimation.tsx`**: Fully standalone React/Next.js client component.
- **`gta6-intro.css`**: Standalone CSS containing keyframes (`gta6-shard-in`, `gta6-collage-out`, `gta6-fade-in`), timing variables (`--tx`, `--ty`, `--rot`, `--d`), responsive breakpoints, and accessibility (`prefers-reduced-motion`).
- **`index.ts`**: Clean export entry point.

---

## 🖼️ Required Image Assets

The component requires the original sliced shards and poster assets.
By default, the component looks at `basePath` (default is `/sites/rockstargames-vi/img`).

### Directory Structure Needed in `public/` of your target project:

```text
public/
└── assets/gta6/ (or custom path passed to basePath prop)
    ├── desktop/
    │   ├── shard0.png
    │   ├── shard1.png
    │   ├── shard2.png
    │   ├── shard3.png
    │   ├── shard4.png
    │   ├── shard5.png
    │   ├── shard6.png
    │   ├── shard7.png
    │   ├── shard8.png
    │   ├── shard9.png
    │   ├── poster_full.jpg
    │   └── poster_logo.png
    └── mobile/
        ├── shard0.png ... shard9.png
        ├── poster_full.jpg
        └── poster_logo.png
```

> **Source Location in Current Project:**
> `ai-website-cloner-template/public/sites/rockstargames-vi/img/desktop/`
> `ai-website-cloner-template/public/sites/rockstargames-vi/img/mobile/`

---

## 🚀 How to Integrate into Another Project

### 1. Copy Files
Copy the folder `components/gta6-intro-animation/` into your new project's `components/` directory.

### 2. Copy Assets
Copy `public/sites/rockstargames-vi/img/desktop/` and `mobile/` containing `shard*.png`, `poster_full.jpg`, and `poster_logo.png` into your new project's public directory (e.g. `public/gta6-intro/`).

### 3. Usage Example (Next.js / React)

```tsx
import { GTA6IntroAnimation } from "@/components/gta6-intro-animation";

export default function HeroSection() {
  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Background content shown AFTER intro fades */}
      <div className="absolute inset-0 flex items-center justify-center text-white">
        <h1>Welcome to Vice City</h1>
      </div>

      {/* The GTA 6 intro overlay */}
      <GTA6IntroAnimation
        basePath="/gta6-intro"
        onAnimationEnd={() => console.log("Intro completed")}
      />
    </div>
  );
}
```

---

## ⚙️ Component Props

| Prop | Type | Default | Description |
|---|---|---|---|
| `basePath` | `string` | `"/sites/rockstargames-vi/img"` | Path to the directory containing `/desktop/` and `/mobile/` assets. |
| `className` | `string` | `""` | Additional CSS classes for the root container. |
| `onAnimationEnd` | `() => void` | `undefined` | Callback fired when the intro finishes fading out (~3.9s). |

---

## ⏱️ Animation Timeline & Mechanics

1. **0.00s – 1.70s**: Shards fly in from off-screen (`--tx`, `--ty`, `--rot`, scale 1.35 down to 1.0) with cubic-bezier easing and staggered delays (`i * 0.09s`).
2. **1.80s – 2.70s**: Full assembled key art + GTA VI logo fade in smoothly under the shards.
3. **3.10s – 4.00s**: The entire collage fades out (`gta6-collage-out`), revealing whatever hero/page content lies underneath.
