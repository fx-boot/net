# Media and font provenance

Verified on 2026-10-16. All director identities, projects, credits, awards, clients and representation details are fictional demonstration data (`isPlaceholder: true`). Stock imagery is not represented as a real directing credit. All project stills are extracted from their corresponding licensed video, not unrelated image searches.

## Footage

Each source page below returned `data-license="videoFree"`. Source HTML snapshots are saved in `upstream/media/*-source.html`. The applicable terms are the [Mixkit Video Free License](https://mixkit.co/license/#videoFree). Contributor information is available on each original page. This is licensed stock, not public-domain or “copyright-free” footage.

| Local prefix / demo use | Official source | Verified direct MP4 |
| --- | --- | --- |
| tide / retired sea study, retained source archive | [Sea waves and big rocks](https://mixkit.co/free-stock-video/sea-waves-and-big-rocks-1932/) | https://assets.mixkit.co/videos/1932/1932-1080.mp4 |
| night / 夜行者 | [City seen from the heights at night](https://mixkit.co/free-stock-video/city-seen-from-the-heights-at-night-5011/) | https://assets.mixkit.co/videos/5011/5011-1080.mp4 |
| between / 无声之间 | [Artistic performance of a pair of dancers](https://mixkit.co/free-stock-video/artistic-performance-of-a-pair-of-dancers-41412/) | https://assets.mixkit.co/videos/41412/41412-1080.mp4 |
| wild / 旷野来信 | [Take area over a considerable forest](https://mixkit.co/free-stock-video/take-area-over-a-considerable-forest-44605/) | https://assets.mixkit.co/videos/44605/44605-1080.mp4 |
| heat / 余温 | [Performance of a contemporary dancer](https://mixkit.co/free-stock-video/performance-of-a-contemporary-dancer-41409/) | https://assets.mixkit.co/videos/41409/41409-1080.mp4 |
| refraction / 折光 | [Model in western fashion seen through acrylic](https://mixkit.co/free-stock-video/model-in-western-fashion-seen-through-acrylic-101645/) | https://assets.mixkit.co/nie07c56ybs0w2m4zhfolf4gcg8u |
| portrait / 肖像示意 | [Photographer in a forest](https://mixkit.co/free-stock-video/photographer-in-a-forest-2181/) | https://assets.mixkit.co/videos/2181/2181-1080.mp4 |

All seven MP4 sources were downloaded and decoded with FFmpeg; the source probe output, byte counts and original SHA-256 hashes are in `upstream/media/manifest.json`. Original downloads are archived in ignored `.tools/media-originals/`. The manifest’s `local` identifies the publication target; its top-level `bytes`/`sha256` describe the original download, while `published` describes the recompressed file. Full-duration publication copies retain 1920×1080 and use H.264 CRF25 / faststart. Previews are seven-second 1280×720 crops. Posters and stills are JPEG frames at 2s and 5s.

The retained historical `showreel-silent.mp4` is a 24-second local edit: four seconds from each of the original six project previews, in table order. The active 2026-10-23 replacement edit is documented below. **Both have no audio track.** An earlier embedded synthesized tonal bed was removed after user feedback about humming. That historical soundtrack remains absent from the media. The 2026-10-23 optional Web Audio atmosphere described below is a separate, explicitly requested interface feature; it never autoplays. Native player audio support remains available for replacement films; set `hasAudio: true` when adding a real soundtrack. No third-party music is included.

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

## Active projection replacement — historical stage, 2026-10-23

At this historical stage, the Hero and first catalogue entry stopped using the daylight rocks/sea clip. Eight derivatives, **1,947,314 bytes total**, were generated from the licensed refraction, heat and night masters. The edited twelve-second reel is now retained only as the full Showreel; all active Hero backgrounds use the independent sources documented below. Original sources remain available for traceability. No authored CGI delivery or new shoot is implied.

| Publication | Exact source treatment |
| --- | --- |
| `public/media/video/cinema-showreel.mp4` | Twelve-second silent edit: refraction source 3–7s, spotlit contemporary dancer source 5–9s, then city-night source 8–12s. Each chapter is normalized to 96 frames, 24fps, with a short final-frame hold when required, producing exactly 288 output frames. |
| `public/media/video/cinema-refraction-loop.mp4` | Ten-second silent excerpt from the acrylic/refraction source, source time 3–13s, 240 output frames. |
| `public/media/posters/cinema-showreel.jpg` | True refraction-source frame at 3s, matching the edited full Showreel's opening. |
| `public/media/posters/cinema-refraction.jpg` | True refraction-source frame at 7s. |
| `public/media/stills/cinema-refraction-{1,2,3,4}.jpg` | True refraction-source frames at 3s, 7s, 11s and 15s. |

All derivatives use a 1280×536 centre-cropped aperture (approximately 2.39:1), without generated imagery, optical-flow synthesis or an added soundtrack. MP4s are H.264/yuv420p CRF25 with faststart, 24fps. The first entry's complete-film link reuses the licensed 18.44-second `refraction-full.mp4` master at its recorded 23.98fps source rate. The loop and reel use ordinary edit boundaries; no claim of a mathematically seamless loop is made.

`scripts/prepare-cinema-motion.mjs` reproduces these derivatives from local masters. `upstream/media/cinema-motion.json` records source pages, exact sample times, dimensions, output bytes and SHA-256; the eight records are also registered in `published-assets.json`. The [acrylic source page](https://mixkit.co/free-stock-video/model-in-western-fashion-seen-through-acrylic-101645/) explicitly offers commercial/personal use under the [Mixkit Stock Video Free License](https://mixkit.co/license/#videoFree), rechecked 2026-10-23. Dancer and city sources retain their already verified Video Free licences above. All catalogue placeholders remain `isPlaceholder: true`; none of this stock is attributed as a real Dong Hao directing credit.

## Korean typography localization — 2026-10-23

Noto Serif KR Regular 400 is self-hosted as the complete 124 WOFF2 Unicode
partitions from the [official Fontsource repository](https://github.com/fontsource/font-files/tree/86edcf1aab7fd27e8960ea3555aab50e3480a098/fonts/google/noto-serif-kr),
commit `86edcf1aab7fd27e8960ea3555aab50e3480a098`, delivered through its immutable
jsDelivr mirror. Font binaries and their original Unicode ranges are unmodified;
the stylesheet only rewrites URLs to local files and omits the obsolete WOFF
alternative. The 124 binaries total **3,280,928 bytes**. Browsers request only
ranges needed by Korean text; other languages do not use this family.

The font uses SIL Open Font License 1.1. The complete original notice is retained
in `public/fonts/Noto-Serif-KR-OFL.txt`, retrieved from the [Google Fonts source](https://github.com/google/fonts/blob/main/ofl/notoserifkr/OFL.txt).
Immutable source URLs, byte counts and SHA-256 hashes are recorded in
`upstream/fonts/typography-manifest.json`; `scripts/prepare-korean-font.mjs`
reproduces the local delivery. No large variable TTF is shipped. This supersedes
the historical system-only Korean serif fallback described earlier. Chinese
fonts and locale sans faces remain platform fallbacks; existing local Japanese
Shippori Mincho and Latin fonts retain their original licenses.

## Independent four-language Hero backgrounds — 2026-10-23

All four active Hero backgrounds are newly downloaded sources, separate from
the film catalogue and from each other. None reuses catalogue sources 101645,
5011, 41412, 44605, 41409 or 2181, or the retired sea source 1932. The full
Showreel remains the separate twelve-second edit documented above; it is not
used as a background. Every stock record retains `isPlaceholder: true`.

| Language / publication | Official source and creator | Content | MP4 bytes / duration |
| --- | --- | --- | --- |
| ZH — `public/media/hero/zh.mp4` and `zh.jpg` | [Mixkit 42342](https://mixkit.co/free-stock-video/aerial-shot-of-a-city-at-night-42342/), Mixkit | City-night aerial, high-rise architecture and traffic light. The source does not name the city; it is not represented as Chongqing. | 2,969,856 / 8.000s |
| EN — `public/media/hero/en.mp4` and `en.jpg` | [Mixkit 101699](https://mixkit.co/free-stock-video/abstract-lights-shifting-from-blue-to-green-101699/), Mixkit | Blue-to-green light passing through acrylic; a real optical abstraction, not an authored CGI delivery. | 3,250,373 / 8.000s |
| JA — `public/media/hero/ja.mp4` and `ja.jpg` | [Mixkit 3977](https://mixkit.co/free-stock-video/view-of-a-window-with-a-curtain-3977/), edgarfernandez | Quiet window, moving curtain, tree silhouettes and daylight. Soft foreground focus is part of the original photography. | 3,534,030 / 8.008s |
| KO — `public/media/hero/ko.mp4` and `ko.jpg` | [Mixkit 50429](https://mixkit.co/free-stock-video/woman-dancing-under-a-neon-spotlight-50429/), Mixkit; individual creator not named | Contemporary dancer under a blue/green neon spotlight and circular stage light. | 2,859,304 / 8.000s |

The four individual official pages explicitly offer personal and commercial use
under the [Mixkit Stock Video Free License](https://mixkit.co/license/modal/videoFree/),
rechecked on 2026-10-23. It permits editing and website use without mandatory
attribution, subject to the [Mixkit terms](https://mixkit.co/terms/). Credits
retains the active regional source link. No footage is claimed as an actual
Dong Hao directing credit, and no watermark has been added.

All four masters and outputs are native **1920×1080**, with no upscaling or
stretching. The delivered files use H.264 High / yuv420p, MP4 fast-start,
approximately 24fps, and **zero audio tracks**. Each is 2–5 MB. The browser uses
`object-fit: cover` to crop the frame proportionally. Four 1920×1080 JPEG posters
are extracted from the first decoded output frame (ZH/EN are sampled at their
corresponding source start); they are local weak-network fallbacks. Ordinary
edit boundaries are looped; a mathematically seamless join is not claimed.

`upstream/media/hero-assets.json` is the normalized provenance index, including
source/master metadata, official licence URLs, source excerpt positions, output
byte counts, codec details and SHA-256. The per-source records are
`hero-zh-en.json`, `hero-ja.json` and `hero-ko.json` in the same folder. Only the
eight edited runtime files are added to `published-assets.json` (206 total);
large masters and downloaded source HTML stay in ignored `.tools/hero-sources/`.
`npm run verify:hero` reads actual MP4 boxes and JPEG headers, checks hashes,
native dimensions, video-only H.264, timing, fast-start, delivery size, source
separation, and the four-language runtime bindings. The original 198 published
asset records are preserved byte-for-byte as normalized records.

