# Regional theme source review — 2026-10-23

Scope: Geo-Aesthetics CSS, regional Hero, About and Contact integration.
This is a bounded source review. Browser rendering, physical-device font
appearance and full-site accessibility require the separate browser evidence.

## Resolved palette expectations

Values below resolve the locale declarations in `src/styles/tokens.css`.
They are source expectations, not a claimed `getComputedStyle()` capture.

| Locale | Canvas | Main text | Secondary text | Accent / detail | Ambient direction |
| --- | --- | --- | --- | --- | --- |
| ZH | `#090C11` | `#F5F7FA` | `#A1A9B6` | `#D9381E` | City blue / vermilion |
| EN | `#0A0B0D` | `#F8F9FA` | `#A0A5AF` | `#FF3E00` | Titanium / laser orange |
| JA | `#0B0E14` | `#F1F0EB` | `#A5A5AA` | `#C84B31` / `#C5A059` | Ink blue / amber at 0.08 alpha |
| KO | `#0C0F16` | `#FCFCFF` | `#ACB4C4` | `#FF4A45` | Cyan / restrained violet |

## Contrast calculation

The standard sRGB relative-luminance formula, with channel linearization at
0.04045 and contrast `(Llighter + 0.05) / (Ldarker + 0.05)`, was evaluated
against the exact source hex values. This covers opaque token pairs only;
it does not certify text on images, translucent gradients or dimmed states.

| Locale | Main text / canvas | Secondary text / subtle surface |
| --- | ---: | ---: |
| ZH | 18.25:1 | 7.31:1 |
| EN | 18.68:1 | 7.04:1 |
| JA | 16.93:1 | 6.87:1 |
| KO | 18.72:1 | 7.82:1 |

## Architecture checks

- `typography.css` is byte-identical to the baseline Git blob:
  `1c4eb7bcc33f04c97f956a1599344ede93532296`. Japanese Mincho/palt/2.05
  leading and Korean keep-all/1.85 leading remain isolated.
- `cinema.css`, which owns static triggers and the inert moving descendants,
  is unchanged: Git blob `dcf2a1a61f9257755a582dae4b6ac25eefffe322`.
- Theme CSS adds no RAF, pointer listeners, media source or decoder.
  Existing fixed decorative layers retain `pointer-events: none`.
- Four registered color properties interpolate for 450ms only when the
  edition changes; no autonomous ambient animation, blur or blend layer
  is introduced. Reduced motion applies the new edition immediately.
- Hero title, narrative and accessible title come from one `GeoNarrative`
  record. ZH/EN lead with LANCHUAN; JA/KO lead with DONG HAO.
- About changes real keyed DOM order, rather than CSS order. Contact similarly
  changes the actual channel sequence. Both business routes remain available.

## Responsive review notes

At the requested 1440×900 and 390×844 viewport sizes, the authored Hero
positions leave separate bands for the regional sentence, reel entry, title
and credits. Font rasterization and actual bounds must still be confirmed
in the root browser pass. LANCHUAN uses 13.5vw desktop and 14.25vw mobile,
with the fixed Latin brand face; the mobile title does not inherit CJK stacks.

Source review identified a short-height risk around 600px tall viewports:
the regional sentence at y=267 and the reel entry positioned 245px above
the bottom could overlap. The approved adaptation sets Hero minimum height
to 700px at widths up to 700px, and to 740px for wider viewports whose height
is at most 740px. This extends the chapter naturally instead of shrinking
type or controls. The 1440×900 and 390×844 requested views are unaffected.
The final root browser pass verifies the additional 390×600 case.
