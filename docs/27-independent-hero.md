# Four independent regional Hero films

Accepted implementation, 2026-10-23. Preview: http://127.0.0.1:5173/.

## Source and delivery

| Edition | Independent source | Motion / poster | Delivery |
| --- | --- | --- | --- |
| ZH | Mixkit 42342: city-night aerial | `/media/hero/zh.mp4` / `zh.jpg` | 1920×1080, 24fps, 8s, 2.97 MB |
| EN | Mixkit 101699: blue/green optical refraction | `/media/hero/en.mp4` / `en.jpg` | 1920×1080, 24fps, 8s, 3.25 MB |
| JA | Mixkit 3977: curtain, trees and window light | `/media/hero/ja.mp4` / `ja.jpg` | 1920×1080, 23.976fps, 8.008s, 3.53 MB |
| KO | Mixkit 50429: neon spotlight and contemporary dance | `/media/hero/ko.mp4` / `ko.jpg` | 1920×1080, 24fps, 8s, 2.86 MB |

All files are H.264 High / yuv420p, fast-start MP4, with zero audio tracks.
All four corresponding posters are genuine 1920×1080 frames. The source IDs,
master hashes and runtime outputs are distinct from each other and from every
catalogue source. No native master was upscaled. These remain licensed stock
placeholders, not actual LANCHUAN directing or VFX credits. No watermark was added.
Full licence links, creators and transformations are recorded in MEDIA-LICENSES.md
and `upstream/media/hero-assets.json`. Large originals/source HTML are ignored.

## Configuration and runtime contract

- `src/data/heroMedia.ts` is the single four-language path/provenance table.
  Replace a language's video and poster there, and update its provenance and
  published hashes. No project catalogue edit is needed.
- `dictionaries.ts` re-exports `heroMediaPaths`; `mockData.ts` binds those paths
  into `heroBackgroundsByLanguage`, including translated descriptions and
  `isPlaceholder: true`. The film catalogue and its regional priorities are intact.
- Hero backgrounds are independent from `showreelsByLanguage`. The full-reel
  dialog continues to use `/media/video/cinema-showreel.mp4`, exactly 12 seconds;
  its UI timecode does not incorrectly use an eight-second background duration.
- The existing shared decoding lease, visibility/reduced-motion checks, priority
  arbitration and generation guards are retained. There is no new RAF, observer
  loop, autoplay attribute, or second background playback scheduler.
- The video DOM node is stable across language changes, preserving its Observer.
  Only the poster image is keyed by its source to reset an earlier image failure.
- Pause/resume uses the visitor's pause intent plus the real `video.paused`
  state. Manual pause and `emptied` clear the playing indicator: `load()` may
  cancel a pending native `pause` event while unloading the source. This fixes
  the previously stuck pause button without keeping an idle decoder loaded.
- Japanese portrait cropping uses `object-position: 18% center` on both the
  poster and video below 701px, retaining the tree/window detail rather than
  centering the dark window mullion. No image stretching is introduced.
- The hidden Credits panel links to the active regional Hero's actual source.

## Automated acceptance

The final code passed `typecheck`, `lint`, `build`, `verify:hero`, `verify:assets`,
`verify:catalog`, `verify:preview` and `verify:geo`.

`verify:hero` inspects actual MP4 boxes and JPEG headers: 1920×1080, H.264 High,
one video track/no audio, frame timing, fast-start order, 2–5 MB size, byte count,
SHA-256, source separation and SSR bindings. Four available local native masters
were independently checked. The normalized registry now contains 206 published
assets; all 198 previous entries and the Step 1 architecture document are intact.

The SSR-only verification servers explicitly disable both HMR and the Vite 8
WebSocket server so parallel verification does not claim the live dev HMR port.
The application dev server's HMR configuration is unchanged.

Final production bundle: JS 436.21 kB (gzip 150.21 kB); CSS 170.46 kB (gzip
47.58 kB). The build completed without warnings or errors.

## Browser acceptance

Actual in-app Chromium, logical viewports 1440×900 and 390×844:

| Check | Observed result |
| --- | --- |
| Four language editions, both viewports | Correct distinct local source and poster; native video dimensions 1920×1080; playback clock advances; muted / loop / playsInline true |
| Regional catalogue after Hero source changes | ZH Night Passage, EN Refraction, JA Between Silence, KO Residual Heat remain the first selected films |
| Decoder arbitration | One playing preview in each recorded state; leaving Hero for Works unloads Hero and starts the current work |
| Full Showreel dialog | Independent 12s full-reel source; background/work previews paused and unloaded; ESC closes and returns focus to reel entry |
| Credits | Active Korean source 50429 linked; all previews stopped while open |
| Manual pause/resume, mobile | Pause: no active source and playing count 0, correct play label. Resume: correct 1080p source, playing count 1 and pause label |
| Four language layouts | No document horizontal overflow; native font isolation retained; Japanese mobile crop corrected |
| Console | No new warning/error captured during the final media acceptance window |

Local screenshots and DOM observations are in ignored
`output/independent-hero-2026-10-23/`: `desktop-{zh,en,ja,ko}.jpg`,
`mobile-{zh,en,ja,ko}.jpg`, `desktop.json`, `mobile.json`, `interactions.json`
and `console.json`. Screenshots use the app's physical export scale; logical
viewport dimensions above are the browser's configured sizes.

This verifies the observed Chromium session, not every browser's autoplay
policy, a GPU utilization figure, or a guaranteed seamless optical loop join.
No hardware performance percentage is inferred from the recorded DOM states.

## Version archive

The preceding regional curation stage is commit
`9d799e04b7ebfbadcc8be30e1191aceddfae1fab`, tagged
`v1.1-geo-aesthetics`, already pushed to `origin/main` and its matching tag.
This media stage is committed separately as
`feat(hero): 独立接入四语高清水印级首屏背景视频`.
The actual resulting hash and verified remote push are supplied in delivery.
