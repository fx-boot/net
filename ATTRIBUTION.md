# Third-party code and adaptations

Retrieved 2026-10-16. Original source files are preserved in `upstream/`; exact source URLs, commit IDs and original SHA-256 hashes are recorded in `upstream/manifest.json`. Runtime adaptations live in `src/` and are not presented as unmodified upstream files.

## React Bits — David Haz

Repository: https://github.com/DavidHDev/react-bits

Commit: `7381f14b15e8f9e00b01ce5b6ac4416f7ee360c4`.

License: MIT + Commons Clause, full original text in `upstream/react-bits/LICENSE.md`. This portfolio integrates components as part of a website; it does not offer the components as a standalone library for sale.

- `src/ts-tailwind/TextAnimations/BlurText/BlurText.tsx`: local adaptation subscribes to live reduced-motion and visibility changes; renders static text and removes Motion children when hidden/reduced, clears delayed transitions. Normal animation retains the upstream `motion/react` implementation.
- `src/ts-tailwind/Animations/Crosshair/Crosshair.tsx`: local adaptation tears down Canvas RAF and listeners when document is hidden or reduced motion enabled. The wrapper limits it to the works region and fine pointers, and adds a VIEW PROJECT label.
- `src/ts-tailwind/Animations/Noise/Noise.tsx`: local adaptation sets fps to zero on document hidden/reduced motion and cancels scheduled RAF; local section opacity is 0.06, rate 12fps. Existing observer and object URL cleanup retained.

## Uiverse — Galaxy archive (MIT)

Repository: https://github.com/uiverse-io/galaxy

Commit: `adbd2adde0a299a3956ea288fb444ec01891ca41`. Full MIT license: `upstream/uiverse/LICENSE`. The complete, non-truncated GitHub tree is saved in `upstream/uiverse/tree.json`.

| Requested | Verified source used | Adaptation |
| --- | --- | --- |
| Spacious74/lazy-dragonfly-64 | `Buttons/Spacious74_helpless-tiger-55.html` | Requested file absent from the complete official tree. Replacement retains radial metallic border, layered inner button and light blob; silver/ice palette, pill geometry, glass surface, focus-visible and restrained hover. |
| risabbir/good-chicken-7 | `Radio-buttons/Spacious74_lovely-goose-53.html` | Requested file absent from tree. Replacement retains native radio + adjacent name selector; changes green tab strip to charcoal rounded pills. Visually hidden input stays focusable, unlike upstream display:none. Removes invalid empty color declaration. |
| EmmaxPlay/polite-husky-37 | `loaders/EmmaxPlay_polite-husky-37.html` | Original exact component recovered. Two pseudo-element spinner layers retained; purple changed to silver/ice, rotation slowed, status label and reduced-motion/hidden pause added. |
| Smit-Prajapati/smart-liger-5 | `Cards/Smit-Prajapati_smart-liger-5.html` | Original exact component recovered. Perspective, preserve-3d, translated content and glass overlay retained; 30° becomes 3°, green becomes silver-black, contact text and copy action replace demo logo/social controls. |

All adaptations are scoped under `uv-` CSS classes in `src/styles/uiverse.css`. Other downloaded candidates are research snapshots only and are not used in the app.

## Other dependencies

Anime.js (Julian Garnier, MIT), Lenis (Darkroom Engineering, MIT), Motion (MIT), Lucide (ISC), React (MIT), Vite (MIT), Tailwind CSS (MIT). Installed versions are locked in package-lock.json; package license files remain in node_modules.

MotionSites public previews were design references only: https://motionsites.org/prompts/digital-director and https://motionsites.org/prompts/ai-film-studio . No paid prompt or proprietary source was acquired or copied.

Typography and footage are separately documented in MEDIA-LICENSES.md.

Runtime React Bits adaptations additionally move latest-prop ref synchronization into layout effects; BlurText stores its initial phase as state and schedules load transitions with a cancellable RAF. Upstream snapshots remain byte-for-byte unchanged.

## Editorial redesign — 2026-10-19

At the user's request, visible demo notices and provenance are consolidated into the footer Credits dialog and these documents. All people, commissioned projects, awards and representation remain fictional presentation data; moving notices does not establish real directing credits or award claims. The original isPlaceholder flags, four-language dictionaries and source-media records remain intact.

The former Uiverse glass reel button, rounded radio tabs and perspective business cards are no longer used. Their original sources, licenses and research hashes remain archived. The loader was further rewritten as a one-pixel moving exposure line; current styles live in uiverse.css. The editorial grids, text language buttons, laurel table and typography are project-specific implementations. React Bits Noise remains on the portrait; BlurText and Crosshair are archived components and no longer mounted in the page. Copyright/stock notices remain accessible in the footer Credits dialog.

Bodoni Moda 400 italic Latin WOFF2 was downloaded from the Google Fonts CSS API on 2026-10-19 for email typography. It uses the existing SIL OFL 1.1 license. Exact source and published hash are recorded in MEDIA-LICENSES.md and upstream/media/published-assets.json.

## LANCHUAN / DONG HAO brand identity — 2026-10-22

The inline LanchuanLogo, optical 川/prism mark, new favicon, director frame corners and darkroom placeholder are original SVG/CSS work for this project. They do not derive from a stock portrait or a third-party trademark template. The company/director names and four-language identity forms follow the client brief. The signature is a reserved baseline, not a fabricated signature. Previous Mo Chen attribution entries remain historical. Existing React Bits, Uiverse, fonts and footage licenses remain in force.

## Spatial Cinema references — 2026-10-22

Aceternity public 3D Card registry (https://ui.aceternity.com/registry/3d-card.json) was read for perspective / preserve-3d / translateZ structure. Codrops MagneticButtons demo1/buttonCtrl.js at b2ee8ac9cd561e13198335cca5684fe1c31d543c was read for interpolation and magnetic text; its MIT license is archived. React Bits DecryptedText TS-TW at 7381f14b15e8f9e00b01ce5b6ac4416f7ee360c4 was read for bounded character resolution; existing MIT + Commons Clause license remains. Source files and SHA-256 are in upstream/spatial-references.json. The initial Codrops src/js/button.js request returned 404; the actual demo1/buttonCtrl.js path was then recovered from the official Git tree.

Runtime useSpatialRig, ScrambleLabel, OpticalText, MorphIcon and AmbientLight are project-written adaptations of these interaction patterns, using the existing Lenis/Anime.js lifecycle. No Aceternity commercial template or Codrops GSAP runtime was installed. No third-party component is claimed as wholly original source.

## Projection theatre art direction — 2026-10-23

A24 Catalog (https://catalog.a24films.com/) and DIVISION (https://www.division.global/) were studied as content and art-direction references: image-first browsing, collection indexing and restrained production contacts. No brand assets, typefaces, film stills or proprietary implementation were copied from either site. An attempted visual browser visit to DIVISION timed out; its official indexed page and contents were available, so no pixel-for-pixel visual comparison is claimed.

Codrops On-Scroll 3D Carousel and React Bits Tilted Card were examined at pinned commits; exact source URLs, SHA-256 and licence distinctions are in docs/12-reference-research.md. The project adapts their hierarchy, inert visual plane and settle-to-idle principles into its existing shared animation clock. It does not install these entire examples or their GSAP/WebGL runtimes. Aceternity registry code was read but not copied because its event/transform coupling conflicts with our stable sensing shells and its registry licence was not established as blanket MIT.

The negative-holder.svg, projection-gate corner geometry, transport SVGs and silver-grain.png are original project-authored assets. The grayscale tile is generated deterministically by scripts/generate-silver-grain.mjs and rendered once at opacity .03. It is not third-party footage or an AI-generated portrait. The former animated Noise component remains archived but is no longer mounted. The director portrait and signature remain reserved.
