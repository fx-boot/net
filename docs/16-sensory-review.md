# Sensory finish review — 2026-10-23

**Verdict: Approve within the stated scope and evidence bounds.** No open P1/P2 issue remains. The animation ownership, stable sensing geometry, touch divider, source provenance and optional audio lifecycle pass the source review and supplied evidence checks. One new P2 accessible-name finding was corrected and rechecked in source before this final verdict.

## Scope and methods

Reviewed the new `FilmGrainCanvas` / `grainWalk` integration and `Providers` / `cinemaFrames`; `CineBreakdown` and its scoped CSS; `FilmScrub` / `useFilmScrub` / `ProjectCard` integration; `transportSpring` / `useTransportSpring` / `CinemaCarousel`; and `cinemaAudio` / `CinemaSoundControl`. The decorative `AnamorphicLightSpill` subscription and sensory CSS were checked for clock ownership and fallback behavior. This is not an audit of older portfolio content.

The review used the installed **Design accessibility-review** skill at `C:/Users/Administrator/.codex/plugins/cache/knowledge-work-plugins/design/1.2.0/skills/accessibility-review/SKILL.md` and **Engineering code-review** skill at `C:/Users/Administrator/.codex/plugins/cache/knowledge-work-plugins/engineering/1.2.0/skills/code-review/SKILL.md`, both in their standalone local mode. No external plugin connector, Figma session, code-review service or detector was used. `PRODUCT.md`, the relevant `DESIGN.md` contracts and `docs/14-breakdown-source.md` supplied the product and provenance constraints.

The reviewer read source, independently ran the two targeted verification scripts, inspected the saved browser evidence and viewed the four final stills. The parent agent owned the browser session; this reviewer did not open or operate a browser or edit implementation source.

## Finding resolved before approval

| Priority | Location | Finding and impact | Required correction |
| --- | --- | --- | --- |
| P2, resolved | `src/components/effects/CinemaSoundControl.tsx:9` | The original localized `aria-label` omitted the visible `SOUND [ OFF/ON ]` text, impairing speech-input matching (WCAG 2.1 SC 2.5.3, Label in Name). | The final source prefixes the complete displayed `SOUND [ OFF/ON ]` label before the localized action. `aria-pressed`, the status description and all four translations remain. Rechecked directly in the final source. |

No open P1/P2 finding is asserted from the reviewed source or evidence. The final scrub cleanup also resets `aria-valuetext` to the same zero timecode as its numeric value and visual readout; that narrow correction was rechecked in source and adds no driver or lifecycle behavior.

## Architecture and correctness

- `Providers` owns the sole requestAnimationFrame loop, with Lenis `autoRaf: false`. Grain, comparison geometry, scrub geometry, spill and the ruler spring subscribe to the shared clock; they create no competing RAF loop. Hidden pages cancel the driver, and unmount removes listeners/subscriptions.
- Geometry-sensitive additions read an untransformed shell. Comparison and scrub handlers record pointer coordinates; the shared measure phase reads invalidated bounds before queued style writes. The new comparison pointer-up handler retains its final client X sample before capture release.
- The quarter-pixel-count grain backing store is capped at 960×540, changes at no more than 12 draws/second without catch-up draws, and uses a single low-opacity soft-light surface. Mobile/coarse pointer/reduced motion uses a still texture. Hidden pages and modals remove the active grain subscription. Forced colors hide the decorative grain and spill.
- The ruler spring substeps its elapsed time, settles and unsubscribes; reduced motion assigns its target directly. Its visual indicator moves inside a fixed ruler/input target. Rapid target changes clean up the previous subscription.
- Scrub layers are decorative and load after pointer/focus interest. Missing/unloaded layers fall back to the cover. The selected carousel film owns the enhancement, while other films stay inert. The displayed timecode represents the scan position across a sparse four-frame preview; it is not evidence of continuous video seeking or a frame-accurate editing tool.
- Audio constructs no context before an explicit sound-button gesture. Its revision guard cancels stale authorization; blur, hidden state, pagehide and modals silence it. Closing a dialog or returning focus does not resume it. Mechanical clicks require the active opted-in graph and are rate-limited; click nodes disconnect on completion and the final owner closes the context.

## Keyboard, touch and semantic review

| Addition | Source behavior and evidence | Limits |
| --- | --- | --- |
| Comparison gate | A named native range remains in tab order with localized description and dynamic value text. Standard native arrows/Home/End apply; `:focus-within` outlines the frame. A separate 44px divider target captures touch, while the rest of the frame permits vertical scrolling. The saved Japanese touch evidence ends at 25/75. | This reviewer did not perform screen-reader or physical touch-device testing. At extreme divider endpoints the clipped visible portion of the target is smaller; a WCAG 2.1 AA failure is not inferred from the skill's 44px design guidance alone. |
| Film scan | A separately focusable native range follows the project button, exposes a visible slider on keyboard focus, and has localized instructions/value text. It stops key propagation so arrows scan rather than advance the carousel. The project button remains the full-film action. | The enhancement is absent for mobile/coarse pointers and reduced motion; those visitors retain the cover, carousel and explicit film action. The keyboard preview is a desktop enhancement, not an additional mobile gesture. |
| Transport ruler | A named native range selects a film with value text containing its ordinal and title. Arrows/Home/End remain native; the carousel explicitly excludes inputs from its own arrow handler. The hit area is 44px high and the focus outline is attached to the fixed ruler. Previous/next buttons remain available. | Native range behavior is supported by source and parent browser evidence, not a fresh assistive-technology pass by this reviewer. |
| Sound | A native 112×44px button provides `aria-pressed`, busy state and localized polite status. Its final accessible name begins with its complete visible text. It can be activated by Enter/Space, is disabled during dialogs and never autoplays sound. | Browser audio state is not a measurement of perceived loudness. Voice-control matching itself was not exercised by this reviewer. |

The four dictionaries (`zh`, `en`, `ko`, `ja`) provide names/instructions for all new controls. The saved 390px evidence reports zero horizontal overflow for Chinese, English, Korean and Japanese. Source preserves the Japanese font treatment and existing language-context architecture. No full WCAG conformance claim is made: image-background contrast, 200% zoom, forced-color native-range rendering, screen-reader announcements and voice-control matching need actual device/assistive-technology checks.

## Verification and measured bounds

Independent commands completed successfully:

- `node scripts/verify-sensory.mjs`: quarter-resolution/capped grain dimensions, changing bounded monochrome walk, 12fps interval, spring convergence at simulated 60/120Hz, timecode conversion and 24 distinct, hash-verified source frames across six films.
- `node scripts/verify-audio.mjs`: 9/9 mocked Web Audio contract cases covering no pre-consent graph, oscillator/click parameters, interruption and owner cleanup, no automatic resume, unsupported/rejected audio and rapid OFF during pending resume.

Saved browser evidence reviewed:

- `output/sensory-2026-10-23/combined-stress.json`: 10,016ms and 89 scroll/scrub cycles; 584 RAF interval samples, P95 16.8ms, maximum 16.9ms, zero samples over 34ms, one registered driver and zero instrumented geometry reads after writes.
- The same diagnostics contain cumulative grain CPU work averaging 4.16ms/draw (maximum 6.5ms at 720×450). These are JavaScript-side draw measurements, not GPU utilization or total rendering cost; their 314 effect samples should not be interpreted as 314 draws inside the ten-second stress window.
- `transport-browser.json` records the final film selected at range value 11 of 12 and settled ruler position 1. `mobile-vfx.json` records Japanese split 25, zero overflow and one still grain draw at 195×422. `mobile-languages.json` records localized control names and zero overflow for the other three languages.
- `audio-browser.json` records explicit resume to `on/running`, an English-language change that retains state, and OFF to `off/suspended`. The more extensive failure/race coverage comes from mocks, not physical device output. The parent also reported the modal path returning `paused/suspended` with no automatic resume; that report is separate from the limited saved `audio-browser.json` entries.

The recorded RAF intervals are consistent with a 60Hz capture and support only that session. They do not establish 120Hz hardware performance, GPU usage below 1%, performance on slower devices or universal absence of dropped/compositor frames. The 60/120Hz spring test is numerical simulation only. The -36dBFS oscillator parameter is digital amplitude, not an acoustic SPL or perceived-volume guarantee.

## Final visual and provenance check

Viewed `hero-1440.jpg`, `vfx-1440.jpg`, `vfx-ja-390.jpg` and `works-scrub-1440.jpg` under `output/sensory-2026-10-23/`. The final desktop comparison has clear heading/gate separation and no portrait overlap in the supplied frame; the mobile Japanese gate retains its 25/75 split without horizontal overflow. The works capture shows the current film and `TC 00:00:11:04`; the console and global sound control remain separate. A still cannot verify grain motion or spring feel.

Both comparison passes use the same licensed `refraction-2.jpg`; the left is a CSS low-contrast simulation and the right is a presentation grade. The visible `COLOR STUDY` label, four-language accessible explanation and source document identify that limitation. This is not original camera Log footage, an actual CGI before/after, a client VFX delivery or evidence of a claimed studio capability. The production-slot pass labels must continue to be read within that disclosed study context.

The final two-line follow-up was limited to the sound accessible name and scrub cleanup value text; both were inspected directly after the targeted scripts had passed. No broader test expansion or implementation edit was performed by this reviewer. Approval covers these sensory additions; the unverified bounds above remain explicit.
