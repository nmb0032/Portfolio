---
title: Building Skykeep - A 3D Tower Defense Game in the Browser
date: '2026-09-11'
author: Nick Belvin
excerpt: An original 3D isometric island tower defense game built with TypeScript, Three.js, and Vite, hosted as a static site on GitHub Pages.
image: /images/posts/skykeep-gameplay.png
---

I wanted to see how clean and responsive I could make a full 3D tower defense game that runs completely in the browser with zero backend, no accounts, and no external asset servers.

You can play it right now at [nmb0032.github.io/sky-keep](https://nmb0032.github.io/sky-keep/) or browse the source on [GitHub](https://github.com/nmb0032/sky-keep).

![Skykeep title screen showing Clover Crossing 3D diorama](/images/posts/skykeep-menu.png)

## What's in the game

- **Three low-poly isometric islands:** Clover Crossing, Sunspoke Mesa, and Moonwater Reach, playable in Quick Play or a sequential 30-round campaign (plus endless mode after you clear round 30).
- **Six towers with branching upgrades:** Pinwheel, Mortar, Frostbell, Needler, Farwatch, and Orchard. Each tower has two upgrade branches with three ranks, and committing one branch to rank 3 caps the other at rank 2.
- **Ten balloon tiers:** From single-shell Rose balloons up to armored, multi-child Grand Zephyrs that split recursively down the path as outer layers pop.
- **Full local persistence:** Mid-round progress, cash, towers, cooldowns, and active enemies autosave to `sessionStorage` so refreshing the tab picks up right where you left off.

![Gameplay on Clover Crossing with towers placed and the Pinwheel inspector open](/images/posts/skykeep-gameplay.png)

## Technical challenges

### 1. Decoupling the simulation from Three.js

Early on, the biggest trap in a browser 3D game is tying gameplay math to `requestAnimationFrame` and visual projectiles. If a dart has to fly across the screen to deal damage, a fast-forward toggle (`2x` or `3x` speed) or a slow laptop frame rate starts changing hit detection, and multiple towers firing at the same balloon can waste shots on an enemy that's already popped.

To avoid all of that, the entire simulation lives in pure TypeScript (`src/game/simulation.ts`) on a fixed `0.05s` tick. Combat resolves atomically inside the step function, and the Three.js projectiles (`src/scene.ts`) are purely visual feedback. When a hit pops a multi-layer balloon, leftover damage carries into the first child chain after armor is applied, while splash and multi-target attacks snapshot their targets up front so newly spawned child balloons don't get double-hit on the same tick.

Because the simulation is just plain data and pure functions, mid-round autosave saves the exact tick state, and the Playwright end-to-end tests can step the simulation deterministically without flaky wall-clock waits.

![Active wave on Sunspoke Mesa with Mortar splash targeting](/images/posts/skykeep-mesa.png)

### 2. Letting players load custom Blender `.glb` models safely

I built a **Model workshop** dialog where you can swap any tower or enemy mesh with your own `.glb` file from Blender and store it locally in IndexedDB. Since the browser is loading arbitrary binary files, I didn't want a huge or malformed export to freeze Three.js or pull remote URLs.

Before `GLTFLoader` ever touches a file, `AssetManager` parses the GLB binary header and JSON chunk directly and enforces strict budgets: a 12 MB file limit, caps on meshes, vertices, nodes, textures, skin joints, and animation keyframes, plus an allowlist of local glTF extensions with zero external image URIs allowed. If anything fails validation—or if browser storage is blocked—it falls back cleanly to the built-in procedural low-poly geometry.

### 3. Keeping 3D controls and responsive layouts out of each other's way

Tower defense UIs get cramped quickly on narrow screens. On mobile (`<= 760px`), the right-hand tower inspector switches to a bottom sheet above the build dock, and the Three.js camera shifts its target so the island stays framed in the unobstructed viewport above the sheet. Touch placement uses a two-step preview and confirm button so a stray tap doesn't accidentally spend cash on the wrong tile, and UI pointer events never bleed through onto the underlying WebGL canvas.
