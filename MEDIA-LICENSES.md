# Media and font provenance

Verified on 2026-10-16. All director identities, projects, credits, awards, clients and representation details are fictional demonstration data (`isPlaceholder: true`). Stock imagery is not represented as a real directing credit. All project stills are extracted from their corresponding licensed video, not unrelated image searches.

## Footage

Each source page below returned `data-license="videoFree"`. Source HTML snapshots are saved in `upstream/media/*-source.html`. The applicable terms are the [Mixkit Video Free License](https://mixkit.co/license/#videoFree). Contributor information is available on each original page. This is licensed stock, not public-domain or “copyright-free” footage.

| Local prefix / demo use | Official source | Verified direct MP4 |
| --- | --- | --- |
| tide / 潮汐之后 | [Sea waves and big rocks](https://mixkit.co/free-stock-video/sea-waves-and-big-rocks-1932/) | https://assets.mixkit.co/videos/1932/1932-1080.mp4 |
| night / 夜行者 | [City seen from the heights at night](https://mixkit.co/free-stock-video/city-seen-from-the-heights-at-night-5011/) | https://assets.mixkit.co/videos/5011/5011-1080.mp4 |
| between / 无声之间 | [Artistic performance of a pair of dancers](https://mixkit.co/free-stock-video/artistic-performance-of-a-pair-of-dancers-41412/) | https://assets.mixkit.co/videos/41412/41412-1080.mp4 |
| wild / 旷野来信 | [Take area over a considerable forest](https://mixkit.co/free-stock-video/take-area-over-a-considerable-forest-44605/) | https://assets.mixkit.co/videos/44605/44605-1080.mp4 |
| heat / 余温 | [Performance of a contemporary dancer](https://mixkit.co/free-stock-video/performance-of-a-contemporary-dancer-41409/) | https://assets.mixkit.co/videos/41409/41409-1080.mp4 |
| refraction / 折光 | [Model in western fashion seen through acrylic](https://mixkit.co/free-stock-video/model-in-western-fashion-seen-through-acrylic-101645/) | https://assets.mixkit.co/nie07c56ybs0w2m4zhfolf4gcg8u |
| portrait / 肖像示意 | [Photographer in a forest](https://mixkit.co/free-stock-video/photographer-in-a-forest-2181/) | https://assets.mixkit.co/videos/2181/2181-1080.mp4 |

All seven MP4 sources were downloaded and decoded with FFmpeg; the source probe output, byte counts and original SHA-256 hashes are in `upstream/media/manifest.json`. Original downloads are archived in ignored `.tools/media-originals/`. The manifest’s `local` identifies the publication target; its top-level `bytes`/`sha256` describe the original download, while `published` describes the recompressed file. Full-duration publication copies retain 1920×1080 and use H.264 CRF25 / faststart. Previews are seven-second 1280×720 crops. Posters and stills are JPEG frames at 2s and 5s.

`showreel-silent.mp4` is a 24-second local edit: four seconds from each of the six project previews, in table order. **It has no audio track.** An earlier embedded synthesized tonal bed was removed after user feedback about humming. That historical soundtrack remains absent from the media. The 2026-10-23 optional Web Audio atmosphere described below is a separate, explicitly requested interface feature; it never autoplays. Native player audio support remains available for replacement films; set `hasAudio: true` when adding a real soundtrack. No third-party music is included.

The original `fallback.svg` provides a neutral film-frame image if a local JPEG cannot load. All page imagery and fonts are served from this project; remote sources are recorded for replacement and provenance, so normal browsing does not require external media servers. External source URLs were available when fetched; hosting may change later.

## Local typefaces

- Instrument Sans variable Latin WOFF2, Fontsource package `@fontsource-variable/instrument-sans` 5.3.0. [Fontsource source](https://github.com/fontsource/font-files/tree/main/fonts/google/instrument-sans). Original package filename: `instrument-sans-latin-wght-normal.woff2`; runtime filename: `public/fonts/instrument-sans-latin-variable.woff2`.
- Bodoni Moda variable Latin WOFF2, Fontsource package `@fontsource-variable/bodoni-moda` 5.3.0. [Fontsource source](https://github.com/fontsource/font-files/tree/main/fonts/google/bodoni-moda). Original package filename: `bodoni-moda-latin-standard-normal.woff2`; runtime filename: `public/fonts/bodoni-moda-latin-variable.woff2`.
- Both use SIL Open Font License 1.1. Complete license files are retained beside the fonts as `Instrument-Sans-OFL.txt` and `Bodoni-Moda-OFL.txt`. Font binaries are copied without modification. CJK glyphs use system fonts (PingFang/Microsoft YaHei, Malgun Gothic, Yu Gothic/Meiryo and appropriate serif fallbacks), not the Latin-only font files.

`upstream/media/published-assets.json` records SHA-256 and sizes for every shipped font, full clip, preview, poster and still. Run `npm run verify:assets` to verify these and upstream component hashes.

### Italic addition, 2026-10-19

- Bodoni Moda italic 400, Latin WOFF2, Google Fonts v28. Local file: `public/fonts/bodoni-moda-latin-italic.woff2`. SIL Open Font License 1.1, same family license retained beside the font. Downloaded without modifying the binary.
- Official CSS query: https://fonts.googleapis.com/css2?family=Bodoni+Moda:ital,wght@1,400&display=swap
- Exact font source: https://fonts.gstatic.com/s/bodonimoda/v28/aFT07PxzY382XsXX63LUYJSPUqb0pL6OQqxrZLnVbvZedvJtj-V7tIaZKMNItnDI.woff2
- SHA-256 and byte count appended to `upstream/media/published-assets.json`; the other 33 publication records remain unchanged. CJK serif glyphs still use installed system fallbacks, not bundled CJK fonts.

## Director assets and new identity — 2026-10-22

LANCHUAN / 重庆澜川科技有限公司 and 東浩 / DONG HAO are client-supplied identities. `public/media/director/donghao-portrait.jpg` is reserved for the authorized portrait and is not supplied. At startup/build, Vite selects that JPG only if present; otherwise it serves the original abstract `darkroom-placeholder.svg` with no failed JPG request. `public/media/director/README.md` records the handoff. No stock person is presented as Dong Hao, and no handwriting is claimed as his signature. The six films, their sample credits and festival entries remain demonstration records; source footage and its permissions are unchanged. Contact addresses studio@example.com and atelier@example.com are reserved examples.

## Japanese type and platinum identity — 2026-10-22

Shippori Mincho Regular was downloaded from https://raw.githubusercontent.com/google/fonts/main/ofl/shipporimincho/ShipporiMincho-Regular.ttf under SIL OFL 1.1. The original TTF is archived in upstream/fonts; its hash and the original license source are in upstream/spatial-references.json. FontTools 4.67.0 with Brotli 1.2.0 recompressed the complete font without subsetting or editing outlines. Runtime file public/fonts/shippori-mincho-regular.woff2 is 3,164,464 bytes; full license public/fonts/Shippori-Mincho-OFL.txt. All publication hashes are recorded in upstream/media/published-assets.json. Reproduction script: scripts/convert-japanese-font.py.

The Japanese serif stack now uses this local Japanese font, rather than the historical system-only fallback described above. Platinum recoloring of original fallback SVGs does not change third-party footage licenses. Main UI contains no demo disclaimers; source/placeholder disclosures remain in Credits and these documents.

## Expanded screening catalog — 2026-10-22

The catalog now contains twelve placeholder presentation records. The original six project IDs, clips, previews, stills and reel chapters remain unchanged. The additional six concept records reuse the same six licensed sources through sourceProjectId; they do not represent six new shoots or additional footage licenses. Every generated record retains isPlaceholder: true. No new media was downloaded for this performance and catalog rebuild.
# Original procedural assets — 2026-10-23

The original 192×192 `public/media/texture/silver-grain.png` has been retired and deleted from the shipped assets. `scripts/generate-silver-grain.mjs` remains a historical generation tool, not the current runtime texture source. The current `FilmGrainCanvas.tsx` / `grainWalk.ts` uses an original native Canvas correlated random walk, no third-party raster, interval or independent RAF. The description “silver grain” is an art-direction analogy, not a physical simulation of any Kodak or other manufacturer's film stock. Desktop updates are limited to 12fps on a half-width/half-height backing surface, opacity .032; mobile/reduced-motion uses a static generated frame, opacity .028 on mobile. No measured GPU percentage is implied.

`public/media/director/negative-holder.svg` remains an original abstract geometric negative plate with no human likeness. These original procedural/vector works introduce no external media licence. Existing video, poster and font licensing remains unchanged.

## Source-time film-strip stills — 2026-10-23

Twenty-four new 1280×720 JPEG stills are extracted from the six already licensed local full films: six sources × four source-time frames, totaling **1,782,611 bytes**. They add sampling positions, not new film shoots or additional footage licences. `upstream/media/scrub-frames.json` records each source video, duration, source frame rate, the 24fps interface timebase, actual extraction time, byte count and SHA-256. Published paths are `public/media/stills/{tide,night,between,wild,heat,refraction}-scrub-{1,2,3,4}.jpg`. The twelve demonstration catalogue records reuse their corresponding six registered source sets.

The pointer-driven timecode interpolates position over the source duration while the aperture crossfades among these four sampled stills. It is not continuous video scrubbing and the 24fps display timebase does not change the source video's recorded frame rate.

## Cine-Breakdown color study — 2026-10-23

The new comparison reuses the registered `public/media/stills/refraction-2.jpg` on both sides; no image or CGI asset is newly licensed. CSS simulates the left low-contrast ungraded look (`contrast(.62) saturate(.42) brightness(1.12)`); the right applies a display grade (`contrast(1.12) saturate(1.08) brightness(.96)`). Neither pass is an original camera Log plate or an actual delivered LANCHUAN VFX shot. The visible `COLOR STUDY` descriptor and four-language accessible description preserve that boundary. See `docs/14-breakdown-source.md` for replacement and interaction contracts.

## Optional synthesized room audio — 2026-10-23

`src/lib/cinemaAudio.ts` generates an opt-in 50Hz sine and a short mechanical click through the Web Audio API. It contains no sampled third-party recording or music track and creates no AudioContext before an explicit visitor sound-button gesture. Consent is never persisted. The sine's -36dBFS figure describes its **digital peak amplitude**, `10 ** (-36 / 20)`, not speaker sound pressure, measured room volume or a perceived-loudness guarantee. The click is an original 15ms decaying pseudorandom noise impulse passed through an 1800Hz low-pass filter, not a recording of a proprietary camera shutter. Hidden pages, focus loss and film dialogs silence the graph; returning does not automatically restart audio. The silent MP4s are unchanged.

