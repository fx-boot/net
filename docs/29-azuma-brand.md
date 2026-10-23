# AZUMA HIROSHI identity correction — 2026-10-23

## Scope

Official international name: **AZUMA HIROSHI**, with **Azuma Hiroshi** in normal prose. Localized full names:

- ZH: 東浩（Azuma Hiroshi）
- EN: Azuma Hiroshi
- JA: 東浩（アズマ ヒロシ / Azuma Hiroshi）
- KO: 아즈마 히로시 (Azuma Hiroshi)

The latest brand instruction explicitly restores `A FILM BY AZUMA HIROSHI` in the Hero identity line. The prior ambient-background separation, neutral reel action and independent video sources remain in place. Regional emphasis is unchanged: ZH/EN lead with LANCHUAN, JA/KO with the director's international name.

Updated all current runtime identity surfaces: dictionaries, editorial and regional copy, director profile, preloader, portrait card, archive watermarks, signature reservation, director statement, contact channels, source credits, footer, document title, localized Meta description and screen-reader labels. Negative identifiers now use AH. The initial HTML title/description and authored SVG fallback also use the corrected identity.

No existing portrait JPG was present. The documented future portrait slot is now `public/media/director/azuma-hiroshi-portrait.jpg`; Vite's selection and the handoff documentation agree. Existing video, still, font and placeholder portrait bytes remain unchanged.

## Typography

- Director Hero uses `clamp(2rem, 11.1vw, 15rem)`, weight 600, tracking -0.04em, with nowrap. LANCHUAN's regional display scale is preserved.
- Archive Roman watermark uses a deliberate AZUMA / HIROSHI two-line lockup, distinct from the single-line Hero and caption.
- Footer uses two editorial rows: LANCHUAN at left, `/ AZUMA HIROSHI` at right below. This accommodates the longer official name without compressed lettering or clipping.
- Native ZH/EN/JA/KO body stacks, line breaks, motion contracts and language-routing data remain unchanged.

## Verification

- Typecheck, lint and production build passed.
- Regional routing and independent-Hero verification passed.
- Impeccable typesetting review was used for display/metadata hierarchy and localized expansion. Its pre-existing type-ramp advisories concern the established cinematic microtype; this task preserves that explicit visual brief.
- Actual browser checks: all four languages at 1440×900 and 390×844; the director Hero also checked at 1920×1080. No horizontal overflow or Hero line wrap; no retired director spelling in rendered text. New title, description and accessible names verified in each language.
- Director Hero text measures approximately 1181px at 1440px, 1575px at 1920px and 320px at 390px. The -0.04em tracking is preserved.
- Dossier and footer checked on desktop and mobile. One preview plays at a time. No new browser warnings/errors during the completed acceptance pass.
- Vite was restarted after its configuration reload stalled module delivery. The preview is online at `http://127.0.0.1:5173/`. Screenshots and DOM evidence: ignored `output/azuma-brand-2026-10-23/`. Responsive emulation was used, not physical mobile devices.

## Asset provenance

Two authored identity-bearing assets changed: `public/media/fallback.svg` and `public/media/director/README.md`. Their previous and new byte/hash records are recorded in `upstream/media/brand-identity-updates.json`; the current published registry reflects the new bytes. The Hero verifier reconstructs and checks its original 198-record baseline, allowing exactly those two documented corrections, and separately verifies their current bytes. Licensed footage records and the protected Step 1 document are unchanged.

Historical milestone reports retain the names used at their original delivery. Current product/design context and replacement instructions use the official name.
