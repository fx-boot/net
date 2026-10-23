# Ambient Hero — 2026-10-23

## Semantic boundary

The Hero is LANCHUAN's ambient visual backdrop. Its company and artist names identify the studio and director, not authorship of the background footage. Project titles, dates, indices and film attribution belong to Selected Works.

- Renamed `heroPresents` / `.hero-presents` to `heroIdentity` / `.hero-identity`. All four editions now use `LANCHUAN / STUDIO & TECH`, followed by a localized identity line.
- Removed the Chinese director-work credit, English `FILMS BY DONG HAO`, and legacy four-language production credits in `brand.ts`.
- Removed dated `selectedMoments` labels and sample-reel titles from entry copy. The neutral actions are `观看厂牌混剪`, `Watch visual reel`, `ビジュアルリールを見る` and `비주얼 릴 보기`; dialog titles use the corresponding neutral nouns.
- Removed the decorative Hero timecode, its frame subscriber, IntersectionObserver and unused styles. Actual project transport controls remain in Selected Works.
- Full-reel media description now uses its neutral title rather than the provenance disclaimer. Licensed-source records, `isPlaceholder`, hidden Credits and legal documentation remain intact.

## Background behavior

The four independent 1080p sources and their posters are unchanged. The existing stable video node and shared decoder lease remain in use. The current source becomes visible only after `playing`, with a 600ms opacity transition over its poster; source changes and unloads clear readiness. Reduced motion disables this transition. No new RAF, timer, observer or parallel decoder was added.

The Hero retains its negative-layer letterbox shading. The title and action remain above that shading. The Hero contains no project identifier and opens the separate neutral reel dialog, not a ProjectDialog.

## Verification

Passed:

- `npm run typecheck`
- `npm run lint`
- `npm run build` (JS 435.63 kB / gzip 150.02 kB; CSS 170.09 kB / gzip 47.52 kB)
- `npm run verify:hero` (source independence, real dimensions/codecs, unchanged licensed assets and protected Step 1 document)
- `npm run verify:preview` (one decoder, modal blocking, rapid changes, offscreen pause and cleanup)

Browser checks used the existing local preview at `http://127.0.0.1:5173/`:

- ZH, EN, JA and KO at 1440×900 and 390×844: localized identity and neutral reel labels; no Hero project/year/sample attribution; no horizontal overflow; unobstructed titles; muted looping video; one playing preview.
- All four desktop source nodes reported 1920×1080. Source changes entered the opacity transition after decoding.
- Korean reel dialog showed only its neutral title, video and playback controls. Background previews stopped; ESC restored focus to the reel action and resumed the Hero.
- Mobile pause unloaded the source and restored its poster; play restarted the current source and readiness transition.
- Scrolling to Selected Works paused the Hero and played the active project. Returning to the brand mark restored Hero playback.
- No new browser warnings or errors during the checks. Temporary viewport override was reset.

Local, ignored screenshots and DOM evidence: `output/ambient-hero-2026-10-23/` (`desktop-{zh,en,ja,ko}.jpg`, `mobile-{zh,en,ja,ko}.jpg`, `reel-dialog-ko.jpg`, `checks.json`).

Preview scope: desktop browser with responsive viewport simulation; physical mobile devices were not tested in this pass.
