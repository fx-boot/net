# Active projection: independent source review

Date: 2026-10-23. Review scope is the active-preview implementation, not a full-site WCAG conformance claim. Applied the installed Engineering `code-review` and Design `accessibility-review` skills from `knowledge-work-plugins/*/1.2.0/skills/`. No browser was controlled and no implementation files were edited by this reviewer.

## Findings

| Priority | Location | Finding | Action / status |
| --- | --- | --- | --- |
| P2, resolved during review | `src/hooks/usePreviewPlayback.ts:13` | The initial promise callback checked component lifetime and current lease ownership, but not the specific `play()` attempt. If the same client lost and reacquired the lease before an older rejection arrived, that rejection could mark a newer attempt unavailable. An obsolete effect's successful promise could also pause a new lease on the same video element. | Current source increments an attempt generation on start, stop and cleanup. Both promise branches reject obsolete generations; the success branch returns before touching the video. Confirmed by independently rereading lines 13–36. This was a source-level interleaving finding; no browser reproduction is claimed. |
| P2, resolved during review | `src/components/hero/Hero.tsx:40` | The initial implementation disabled the only manual play action after an autoplay rejection, making recovery impossible for visitors whose browser denies autoplay. | Current code exposes `playback.retry()`, keeps the button enabled and allows an explicit manual play attempt. Confirmed by rereading the updated source. |

## Correctness and performance checks

- `PreviewPlayback.reconcile()` revokes and synchronously stops the previous owner before invoking the next owner's `start()`. Hero priority 10 and all work previews priority 20 share one registry. Keeping the work priority stable when a centre slot becomes a side slot avoids recreating its source effect before the frozen-frame exit. The registry adds no RAF or interval.
- `ProjectCard` mounts the autoplay preview for the selected cinema card without requiring hover. Stable nonselected cinema slots are disabled/inert and contain no preview video. An outgoing slot may briefly retain its paused video element during the bounded dissolve. Archive mode creates a preview only for the current desktop hover/focus card, with the same bounded paused exit.
- The hook assigns a source only when it owns the lease. Every stop pauses synchronously before the next owner starts. Hero immediately removes `src` and calls `load()`. Portfolio previews may retain their frozen frame for at most 380ms to finish the exit dissolve; the timer then removes the source and calls `load()`. A restart clears that timer, and unmount clears it and unloads immediately.
- Page visibility, intersection and reduced-motion preferences participate in eligibility. The modal block is applied in a layout effect; the portfolio and Hero also receive the modal's blocked state. Dialog playback has its own controls and its existing close cleanup removes its source.
- `PreviewVideo` does not display its moving layer until `playing`; unloaded/unavailable media leaves the poster available. The local `PreviewPresence` wrapper retains the outgoing element for a native CSS opacity exit, while its `exiting` prop immediately removes playback eligibility. Its paused last frame dissolves to the old card's poster over 350ms; the incoming centre preview independently fades in when playing. This is a frozen-frame handoff, not simultaneous playback of two preview streams. Two video DOM elements can briefly coexist during that handoff.
- `Providers` remains the only application RAF owner, with Lenis `autoRaf: false`; no new video hook owns a render loop.

### Additive presence/timer review

The final follow-up was bounded to `usePreviewPlayback.ts:14–43`, `PreviewVideo.tsx:7–27`, `ProjectCard.tsx:37` and `preview.css:1–2`. No new blocking finding was identified. `PreviewPresence` conditionally restores retained state before commit when a preview becomes visible, and owns one cancellable 350ms removal timer while leaving. Its effect cleanup cancels that timer on re-entry or unmount. Reduced-motion removes the outgoing element immediately. Presence loss stops the old stream synchronously; the 380ms source-unload allowance exceeds the 350ms opacity exit, with immediate disposal when the retained element unmounts. Starting again cancels the pending source unload before restoring the source, so an old timer cannot clear the resumed stream. Cleanup invalidates pending play promises, releases the lease, clears the timer and unloads immediately. Hero uses the default immediate-unload path. No event listener or spatial geometry moved onto the visual layer.

The final implementation uses native CSS opacity transitions and the local presence wrapper; the intermediate Motion `AnimatePresence` / `motion.video` implementation is not shipped. No animation-frame driver was added by this handoff.

The one-owner guarantee is an application-level active-playback guarantee. This source review does not measure browser-internal hardware decoder allocation, retained-frame memory or the media pipeline's prebuffering during the bounded 380ms frozen-frame retention.

## Accessibility and stable geometry

- The autoplaying central preview has a keyboard-operable, localized pause/play button with `aria-pressed` and a 44px minimum height. Reduced-motion omits the autoplay preview and its unnecessary control.
- Hero retains a keyboard-operable localized play/pause action and a status message for failure. Decorative portfolio preview videos are `aria-hidden`; the project-opening button retains a localized accessible name.
- Carousel keyboard arrows, native range navigation, touch swiping and the focusable still-scrub range remain available. Side slots are removed from keyboard/screen-reader interaction using both `inert` and `aria-hidden`.
- `.card-trigger` keeps `transform: none` and `overflow: visible`; `.card-visual` and all its descendants have `pointer-events: none`. Tilt, preview scaling and visual parallax are applied below the sensing shell. The new playback layer introduces no transformed event target.
- This source review does not certify screen-reader speech, contrast over every moving frame, browser autoplay policies or 60/120Hz frame delivery. Root browser QA is required for those runtime paths.

## Verdict

**Approve within this bounded source-review scope.** Both identified issues were fixed and reread. Central autoplay, single-owner arbitration, cleanup, pausable motion and the static sensing contract pass source review. The existing arbitration test covers 100 film changes and resource handoff; adding a deferred-promise regression test for the generation guard would strengthen future coverage. Root browser QA remains responsible for actual autoplay, switching, offscreen/modal suspension and four-language layout evidence.
