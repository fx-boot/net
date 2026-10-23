---
name: "LANCHUAN × 東浩"
description: "A cinematic portfolio with regional editorial editions, a projection theatre and a director's working plate."
colors:
  canvas: "#0A0B0D"
  surface: "#13151A"
  subtle: "#181A20"
  platinum: "#F8F9FA"
  titanium: "#9499A3"
  laser: "#FF3E00"
  hairline: "rgba(255, 255, 255, 0.08)"
  projection-edge: "rgba(248, 249, 250, 0.15)"
  cyan-light: "rgba(72, 125, 156, 0.10)"
  vermilion-light: "rgba(255, 62, 0, 0.035)"
  spill-core: "rgba(144, 199, 235, 0.075)"
  spill-field: "rgba(62, 105, 152, 0.055)"
  transport-bevel-bottom: "rgba(0, 0, 0, 0.6)"
  breakdown-caption: "#B1B6BF"
typography:
  display:
    fontFamily: "var(--font-brand)"
    fontSize: "clamp(5rem, 15vw, 16rem)"
    fontWeight: 600
    lineHeight: 0.79
    letterSpacing: "-0.04em"
  headline:
    fontFamily: "var(--font-serif)"
    fontSize: "clamp(70px, 7.7vw, 120px)"
    fontWeight: 400
    lineHeight: 0.98
    letterSpacing: "-0.04em"
  studio-title:
    fontFamily: "var(--font-sans)"
    fontSize: "clamp(40px, 5.4vw, 78px)"
    fontWeight: 500
    lineHeight: 1.1
    letterSpacing: "-0.04em"
  title:
    fontFamily: "var(--font-serif)"
    fontSize: "clamp(24px, 2.5vw, 38px)"
    fontWeight: 400
    lineHeight: 1.4
  monologue:
    fontFamily: "var(--font-serif)"
    fontSize: "clamp(23px, 2.05vw, 31px)"
    fontWeight: 400
    lineHeight: 1.95
  japanese-reading:
    fontFamily: "'Shippori Mincho', 'Yu Mincho', 'Hiragino Mincho ProN', 'Noto Serif JP', serif"
    fontSize: "clamp(23px, 2.05vw, 31px)"
    fontWeight: 400
    lineHeight: 2.05
    letterSpacing: "0.05em"
  body:
    fontFamily: "var(--font-sans)"
    fontSize: "15px"
    fontWeight: 400
    lineHeight: 1.6
  label:
    fontFamily: "var(--font-sans)"
    fontSize: "10px"
    fontWeight: 400
    lineHeight: 1.6
    letterSpacing: "0.1em"
  readout:
    fontFamily: "var(--font-sans)"
    fontSize: "9px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "0.15em"
  breakdown-caption:
    fontFamily: "var(--font-sans)"
    fontSize: "11px"
    fontWeight: 400
    lineHeight: 1.6
  breakdown-error:
    fontFamily: "var(--font-sans)"
    fontSize: "13px"
    fontWeight: 400
    lineHeight: 1.6
  breakdown-mobile-heading:
    fontFamily: "var(--font-serif)"
    fontSize: "26px"
    fontWeight: 400
    lineHeight: 1.4
    letterSpacing: "-0.02em"
  breakdown-mobile-study:
    fontFamily: "var(--font-sans)"
    fontSize: "7px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.05em"
  breakdown-mobile-localized-study:
    fontFamily: "var(--font-sans)"
    fontSize: "8px"
    fontWeight: 400
    lineHeight: 1.7
    letterSpacing: "0.04em"
  breakdown-mobile-pass:
    fontFamily: "var(--font-sans)"
    fontSize: "7.5px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.01em"
  breakdown-mobile-code:
    fontFamily: "var(--font-sans)"
    fontSize: "6px"
    fontWeight: 400
    lineHeight: 1.5
    letterSpacing: "0.15em"
rounded:
  square: "0"
  status-dot: "50%"
spacing:
  gutter: "clamp(22px, 4.2vw, 88px)"
  section-gap: "clamp(100px, 12vw, 190px)"
  projection-inset: "12px"
  dossier-padding: "18px"
  caption-top: "24px"
  matrix-row-y: "25px"
components:
  navigation:
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
  reel-button:
    backgroundColor: "transparent"
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
    padding: "12px 0 13px"
  transport-button:
    backgroundColor: "transparent"
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
    padding: "0"
  breakdown-viewport:
    backgroundColor: "{colors.canvas}"
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
    width: "calc((100% + 2 * var(--gutter)) * .72)"
  filter:
    backgroundColor: "transparent"
    textColor: "{colors.titanium}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0"
  filter-active:
    backgroundColor: "transparent"
    textColor: "{colors.platinum}"
    typography: "{typography.label}"
    rounded: "{rounded.square}"
    padding: "0"
  manual-copy-input:
    backgroundColor: "transparent"
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
    padding: "10px 0"
    width: "100%"
  project-frame:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
    width: "100%"
  dossier:
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
    padding: "{spacing.dossier-padding}"
  capacity-row:
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
    padding: "25px 0"
  email-button:
    backgroundColor: "transparent"
    textColor: "{colors.platinum}"
    rounded: "{rounded.square}"
    padding: "0"
---

# Design System: LANCHUAN × 東浩

## Overview

**Creative North Star: "A film title, a projection room, an author's working plate."**

The portfolio is contemporary, cold and cinematic. Obsidian supports illuminated moving images; monolithic sans type establishes the studio, while restrained serif text gives the director's voice a separate register. Fine optical readouts and frame geometry provide scale without competing with the films.

The material character comes from a projection gate and a medium-format negative holder. The reserved portrait is an intentional typographic plate until a real portrait is supplied. Surfaces stay open and square, with changes in light and content density carrying the transition from viewing to reading.

**Key Characteristics:**

- Cold obsidian and platinum, with titanium for secondary information.
- A rare laser accent used for active markers and the projection ruler.
- Monolithic title typography beside small technical readouts.
- Square image gates, fine edges and a medium-format dossier.
- Static ambient light, a stepped living-grain canvas and restrained motion inside stable controls.
- Four-language typography with a distinct Japanese reading stack.

This capture follows the final source cascade in [src/main.tsx](src/main.tsx): global, spatial, cinema, projection, then sensory styles. The breakdown and scrub components also import their scoped style sheets. [src/styles/tokens.css](src/styles/tokens.css) owns shared primitives; [src/styles/projection.css](src/styles/projection.css) owns the current composition. Compatibility aliases with names such as “warm”, “parchment” or “brass” resolve to the current cold palette and do not establish a second identity.

## Colors

One vivid signal sits within a cool, nearly neutral darkroom. Frontmatter contains the canonical values.

### Primary

- **Laser:** Active category dots, copy confirmation dots, the logo's recording mark and the moving projection-ruler indicator. Use it as a signal, not as a large panel fill.

### Neutral

- **Obsidian Canvas:** The page, hero and projection-room foundation.
- **Projection Surface:** Elevated utility areas, film fallbacks and the dialog's sticky top bar.
- **Subtle Dark:** A supporting tone retained in the shared surface vocabulary.
- **Platinum:** Main type, focus outlines and illuminated details.
- **Titanium:** Metadata, secondary explanations, catalogue controls and credits.
- **Hairline:** Low-contrast row divisions and section rules.
- **Projection Edge:** The clearer image-gate outline and technique-matrix rules.

### Ambient light

- **Cold Cyan Light** and **Vermilion Light:** Very low-alpha radial illumination. They are atmosphere behind the content, not additional action colors. Preserve the source RGBA values rather than replacing them with solid approximations.

The sensory additions have four explicit, narrow material exceptions: **Spill Core** `rgba(144,199,235,.075)` and **Spill Field** `rgba(62,105,152,.055)` are the horizontal anamorphic reflections in `sensory.css`; **Transport Bevel Bottom** `rgba(0,0,0,.6)` belongs only to the transport ink's hover/focus lower edge; **Breakdown Caption** `#b1b6bf` is the comparison instruction caption in `breakdown.css`. These actual source values are allowed material roles, not a new palette ramp, body-text replacement or action-color expansion.

**The Signal Rule.** Keep the laser accent attached to an active state, recording cue or transport position; use platinum for ordinary links and focus.

Source: [src/styles/tokens.css](src/styles/tokens.css), [src/styles/global.css](src/styles/global.css), [src/styles/projection.css](src/styles/projection.css).

## Typography

**Display Font:** Self-hosted Instrument Sans, with the language-specific sans fallbacks from the token file.  
**Reading Font:** Self-hosted Bodoni Moda for Latin text, followed by the applicable CJK serif stack.  
**Label/Mono Font:** SFMono-Regular, Consolas, Liberation Mono, monospace.

Instrument Sans is dense and direct; Bodoni provides the contrasting editorial voice. Monospace is reserved for indexes, timecodes, coordinates and readouts. There is no single mathematical scale: each hierarchy is tied to its viewing distance.

### Hierarchy

- **Display:** The frontmatter display role is the hero's studio name. At widths up to (700px), it becomes (15.9vw), with line-height (.85); its weight and tight tracking remain.
- **Headline:** The serif works heading uses the headline role. On mobile it becomes (57px), line-height (1.1). Contact uses a larger serif treatment, `clamp(70px, 10vw, 144px)`, line-height (1), becoming (63px) on mobile.
- **Studio title:** Instrument Sans identifies the studio inside the reading section. On mobile its size is (42px).
- **Title:** The frontmatter title role is the current theatre film caption. Mobile captions are (23px); archive titles are (23px) on desktop and (21px) on mobile.
- **Monologue:** The director's serif text uses the monologue role; it becomes (22px) at widths up to (1100px). The lead is (1.35em), line-height (1.65), and uses balanced wrapping; mobile uses (1.25em), line-height (1.8).
- **Body:** The default body is compact. Technique descriptions use (12px), line-height (1.9), with a maximum measure of (50ch); project descriptions use (14px), line-height (1.9), and a maximum measure of (60em).
- **Label and readout:** Small navigation and operational text uses the label/mono distinction. Preserve generous control hit areas even when the visible type is small.

### Scoped comparison typography

The frontmatter's `breakdown-*` roles explicitly record the current comparison styles, including their small optical inscriptions. Caption/instruction text is (11px), becoming (10px) on mobile; the load-error status is (13px). The mobile heading is (26px). The mobile `COLOR STUDY` descriptor is (7px), with an (8px) localized descriptor; mobile PASS labels are (7.5px) and the LC metadata code is (6px). These values are restricted to this aperture, not a replacement for the body's (15px) reading text. The heading still inherits the relevant CJK serif stack, and Japanese uses `.04em` tracking for this heading.

The PASS labels and LC technical code are `aria-hidden` optical annotations, duplicated in meaning by the independent four-language accessible description. The visible study descriptor is a short caption; detailed asset truth remains in that accessible description and provenance documents. Localized operating instructions remain a separate paragraph associated with the native range, and error recovery is a real status message. Tiny technical inscriptions must never become the only route to operation, asset truth or failure recovery.

### Language behavior

Chinese uses the documented default CJK stacks. Korean replaces the sans and serif fallbacks with Korean fonts and keeps words together in reading text, film titles and selected headings. Japanese replaces both stacks; its serif stack includes the self-hosted Shippori Mincho followed by Japanese system fallbacks, with no Chinese fallback. Bodoni remains first for Latin glyphs.

The Korean director monologue keeps the final two words of its last sentence together with `white-space: nowrap`. This is a rendering wrapper for that ending; the dictionary text is unchanged.

Japanese reading text uses proportional alternate glyphs (`'palt' 1`), strict line breaking, line-height (2.05) and tracking (.05em). The Japanese lead is (1.2em), line-height (1.9); this language-specific selector takes precedence over the general mobile lead rule. Film titles, statement titles and name plates also use the Japanese serif stack.

**The Language Fidelity Rule.** Preserve the language-specific font stack and line-breaking rules when adding text; never route Japanese reading text through Chinese fallback fonts.

Source: [src/styles/tokens.css](src/styles/tokens.css), [src/styles/global.css](src/styles/global.css), [src/styles/spatial.css](src/styles/spatial.css), [src/styles/projection.css](src/styles/projection.css), [src/components/about/DirectorStatement.tsx](src/components/about/DirectorStatement.tsx).

## Layout

Shared horizontal gutters are fluid, as defined in the frontmatter. The general section-spacing token is a starting point; current sections use distinct vertical intervals instead of repeating one uniform gap. Hero media fills (100svh), with a desktop minimum height of (560px) and a mobile minimum of (540px).

The projection carousel reaches through the section gutters to the viewport edges. Its centred film slot occupies (72%) of the stage and uses an image ratio of (2.39). At widths up to (700px), the slot occupies (84%) and uses (16:9). Side films retain opacity (.25) and scale (.88), while the current film uses (1) for both. Their captions are hidden and their controls are inert. The stage is clipped and allows vertical touch scrolling.

On desktops at least (701px) wide with hover, a fine pointer and no reduced-motion preference, the film planes use perspective (1400px): the left side rotates (8deg), the right side (-8deg), and the current film (0deg). Mobile, coarse-pointer and reduced-motion layouts retain the unrotated slot treatment.

The archive uses three columns, two at widths up to (1100px), and one at widths up to (700px). Its desktop gaps are (85px 32px), with a mobile row gap of (65px).

The director section's outer `.biography.section-space` is a block container. Its independent `.biography-spread` contains the twelve-column desktop layout: portrait in columns (1–4), reading track in columns (6–12). This bounds the portrait's sticky travel to the spread and prevents overlap with the comparison gate below it. Up to (1100px), the portrait spans five columns and reading starts at column seven. Up to (700px), the spread becomes one column; the portrait is (86%) wide, centred and no longer sticky. Contact representation changes from two columns to one. The navigation switches to the menu presentation at (1000px); this is distinct from the main (700px) composition breakpoint.

Desktop review targets (1440×900) and mobile review targets (390×844) come from PRODUCT.md; they are review sizes, not additional breakpoints.

Source: [src/styles/global.css](src/styles/global.css), [src/styles/cinema.css](src/styles/cinema.css), [src/styles/projection.css](src/styles/projection.css), [src/components/works/CinemaCarousel.tsx](src/components/works/CinemaCarousel.tsx).

## Elevation & Depth

Depth is primarily tonal: static radial light, a thin illuminated image edge, darker wings and a scaled current film. One native Canvas grain surface sits over the scene at opacity (.032), or (.028) on mobile. The dossier has a cool, restrained metal-like gradient; it is a frame material, not a rounded floating card. Ambient light uses no Gaussian or backdrop blur layers.

The works section adds localized cold-cyan and vermilion radials, `rgba(37,88,113,.16)` and `rgba(127,34,27,.06)`. The director section uses `rgba(65,115,130,.12)` and the same localized vermilion value over its existing dark tonal field. These static fields establish different viewing distances without animated lighting.

Inactive theatre images retain a visible fine edge and use the static image grade `contrast(1.04) saturate(.88) brightness(1.28)`. Their image containers have no extra desaturation filter. A faint vertical edge wash replaces the previous heavy horizontal side wash; opacity (.25) still keeps the side planes subordinate to the current image.

### Shadow Vocabulary

- **Projected film:** `0 22px 60px -32px #000` supports the current theatre image only.
- **Spatial shadow:** A low-alpha radial black gradient appears with desktop pointer lift. It is an inert visual descendant and disappears for mobile, coarse pointers and reduced motion.
- **Reel legibility:** `0 1px 12px #0008` is a small text shadow behind the hero reel control.
- **Logo response:** `drop-shadow(0 0 4px rgba(248,249,250,.2))` appears on the logo optics during hover/focus; it is not a full-screen filter.

**The Fixed Shell Rule.** Pointer sensing stays on an untransformed control shell. Transform the inert visual descendants, not the hit target. Share the existing frame driver rather than adding another animation loop.

Ambient gradients remain static. The hero and theatre additionally receive a narrow, low-alpha cyan horizontal spill and a vermilion reflection; only their transform changes with measured scroll position and viewport aspect. Both share the existing measure/write phases and become static on mobile, coarse pointers and reduced motion. Film and metadata can move at different rates within that rig. Reduced motion, coarse-pointer and mobile treatments remove pointer lift and reading dimming; reduced motion also removes carousel transitions and the ruler spring.

### Living grain budget

`FilmGrainCanvas.tsx` replaces the retired 192×192 bitmap. Its backing width and height are half the CSS viewport dimensions, giving one quarter of the pixel count and a 2× CSS enlargement, capped at (960×540). A deterministic correlated random walk updates monochrome pixels at no more than (12fps), quantized by the shared frame clock without catch-up draws. This is original procedural texture, not a physical Kodak emulsion simulation. One soft-light composite preserves endpoint highlights and sharp contours; it is the sole full-screen blend surface, not a stack of animated light effects. At this low opacity it should read as darkroom texture rather than visible static, but it is not a luminance-selective mask and may subtly affect midtones.

Hidden pages and open modals pause the canvas subscription. Mobile, coarse-pointer and reduced-motion environments render one still frame per viewport size. Forced colors hide the decorative canvas and spill. Do not claim a GPU percentage, 120Hz panel performance or universal frame budget from this architecture alone; record measured work separately.

Source: [src/styles/spatial.css](src/styles/spatial.css), [src/styles/cinema.css](src/styles/cinema.css), [src/styles/projection.css](src/styles/projection.css), [src/lib/cinemaFrames.ts](src/lib/cinemaFrames.ts).

## Shapes

The system is square and optical. Image gates, buttons, manual-copy inputs, the dossier and matrix rows have sharp corners. Circular shapes are tiny status dots, not container corners. Dividers are one-pixel rules; active projection images use an inset one-pixel outline. Four short corner brackets frame the theatre image, inset by the frontmatter projection spacing; mobile brackets shrink and sit closer to the edge. The dossier retains a (4:5) portrait aperture and narrow perforated side rails.

Source: [src/styles/global.css](src/styles/global.css), [src/styles/cinema.css](src/styles/cinema.css), [src/styles/projection.css](src/styles/projection.css).

## Components

### Buttons

Controls feel like a projection console: compact type, clear space and exposed rules.

- **Reel:** An unfilled platinum text button with a bottom rule, play glyph and bracketed timecode. It has a minimum height of (52px). Desktop magnetic movement is applied to its inner ink; the control stays fixed. Mobile reduces visible type and inner gaps.
- **Transport:** Unfilled previous/next controls flank the console. Their minimum height is (60px) on desktop and (54px) on mobile; disabled controls use opacity (.3). The inert inner ink gains a hairline bevel on hover/focus and presses down (1px), with vertical scale (.97), on activation. The sensing button stays fixed.
- **Email copy:** Large italic serif text, underlined on hover. A successful copy flips the address into a monospace confirmation and laser dot; a live status announces the result. Reduced-motion treatment removes the flip.
- **Focus:** Ordinary controls use a platinum outline (2px) offset by (6px). Film buttons use a (1px) platinum outline offset by (10px).

### Filters and view controls

Category filters are plain text buttons, not filled pills. Inactive text is titanium; selection becomes platinum and gains a small laser dot (5px). The view switcher uses icons plus small text; the active icon is platinum. Preserve the `aria-pressed` state and minimum control height of (44px).

### Film cards and projection gate

Films are square-edged image apertures with external title, index and metadata. Archive images are (16:9); theatre images use the layout-specific gate. Hover/focus can raise image scale to (1.025), while the caption stays visually open without a card fill. The current theatre image keeps its fine edge and corner marks. Side films are inert; the current film opens the native project dialog.

The current desktop film can warm four local source-time stills on pointer movement or focus. The horizontal pointer position selects one of four images; their opacity crossfades over (.26s). The external timecode follows the normalized source duration at a (24fps) display timebase, not a claim that the four still images are continuous video. Leaving the image returns to the cover. A keyboard-only native range exposes the same scanning position without nesting another control inside the film button. Archive, inactive planes, mobile, coarse-pointer and reduced-motion modes retain the cover/preview fallback. Image-load failure keeps the cover. Geometry is read from the static trigger and each write is scheduled after the shared read phase.

### Transport ruler

The frame ruler is a native range with a transparent (44px) pointer target, localized accessible names, keyboard operation and a visible focus outline. Clicking or dragging chooses a reel; the inert marker moves by transform only. The physical response uses stiffness (190), damping (23), a delta cap of (50ms) and integration substeps no longer than (1/240s). It unsubscribes at rest and removes `will-change`; reduced motion places the marker immediately. The spring is a visual gear response, not a promise of tactile hardware feedback.

### Inputs / Fields

The text input is a manual-copy fallback, not a general lead form. It is a read-only, full-width transparent field with platinum text, a hairline bottom border, square corners and the frontmatter padding. Focus keeps the standard visible outline and selects the email address. Native ranges serve the transport ruler, desktop film scanning and the comparison gate; retain their localized names and visible focus treatments.

### Navigation

The studio logo anchors the left side; small uppercase section links sit to the right on desktop. Hover underlines the links. The four-language control uses individual ZH / EN / KO / JA buttons and a moving underline, with localized accessible names. On narrower layouts the navigation becomes a dark menu with a (44px) toggle; Escape closes it and restores toggle focus. Do not substitute a native language select.

### Director dossier

A cool square shell surrounds the reserved portrait aperture. Perforation rails, optical corner marks and tiny coordinates frame a large Chinese name above stacked DONG / HAO type. The caption below carries the readable name, romanization and role. This is a reserved typographic portrait, not evidence of a supplied photograph or signature.

### Technique matrix

Three semantic definition-list rows describe the studio's creative disciplines. Each row pairs a small mono code with a larger Instrument Sans English title, a localized label when applicable, and a titanium description below. The row rules use the projection-edge tone; the final bottom rule uses the hairline tone. Desktop rows use columns (32px) and remaining space; mobile uses (23px) and remaining space.

### Cine-Breakdown gate

A (2.39:1) comparison gate follows the independent director/technique spread in the outer About block. Its desktop width is `calc((100% + 2 * var(--gutter)) * .72)`, matching 72% of the body's client width and the theatre's central aperture without including scrollbar width. Mobile uses (100%) of the About content width while retaining (2.39:1). The visible `COLOR STUDY` caption and its four-language accessible description identify the present same-frame comparison; production-slot labels must never turn licensed stock into a claimed client VFX delivery.

Both layers use the registered `refraction-2.jpg`. The left simulation is `contrast(.62) saturate(.42) brightness(1.12)`; the right presentation grade is `contrast(1.12) saturate(1.08) brightness(.96)`. Desktop pointer movement changes a rectangular clip; a laser divider uses `rgba(255,62,0,.8)` and an inert translating track. A separate (44px) touch target captures the pointer at the divider, leaving the remainder vertically scrollable. Pointer-up samples its final client X coordinate before releasing capture, so the last drag segment is retained; pointer-cancel keeps the last position rather than adopting the cancellation coordinate. The native range remains keyboard accessible with Home, End and arrow keys; its focus outlines the entire fixed frame. All geometry reads occur in the shared measure phase. No blur, own RAF or continuous autonomous animation is added. Reduced motion retains direct manipulation.

### Optional acoustic atmosphere

`CinemaSoundControl` is the sole sound toggle, fixed to the bottom-right throughout the page with a minimum (112×44px) control area. Hero keeps only its separate video pause/play control. The sound pipeline is strictly opt-in and does not persist consent. No `AudioContext` exists before a sound-button gesture. It synthesizes a (50Hz) sine with digital peak amplitude `10 ** (-36 / 20)`, plus a reusable (15ms), low-pass (1800Hz) decaying noise click on reel or language actions. The -36dBFS value is a digital peak, not an acoustic sound-pressure or perceived-loudness guarantee. Closing a modal, restoring focus or reopening a tab never resumes sound automatically. Blur, hidden state and film dialogs silence the graph; disposal stops and closes it. Existing films remain separate, with their licensed-media audio truth unchanged.

### Film dialog

The native full-screen dialog has an almost opaque obsidian atmosphere, a sticky surface-toned utility bar and a contained (16:9) player. It retains scroll locking, Escape close, visible focus and return to the opening control. Opening a film is an explicit visitor action. Credits and source attribution belong in the existing Credits surface.

Source: [src/styles/global.css](src/styles/global.css), [src/styles/cinema.css](src/styles/cinema.css), [src/styles/projection.css](src/styles/projection.css), [src/components](src/components), [src/i18n/LanguageSwitcher.tsx](src/i18n/LanguageSwitcher.tsx).

## Regional editorial editions

`html[lang]` remaps the same semantic light and surface roles in `tokens.css`.
Chinese uses an obsidian city-blue field and `#D9381E` signals; English holds
platinum, neutral titanium and `#FF3E00` laser accents. Japanese uses ink blue
with an amber light capped at `rgba(197,160,89,.08)`, wider gutters and longer
chapter pauses. Korean raises surface luminance, pairs restrained cyan/violet
light and tightens vertical pacing while retaining 1.85 leading and keep-all.

The ambient layer, theatre surround, About chapter, Contact and anamorphic
spill consume these tokens. Four registered color properties settle for
(450ms) on a locale change; there is no autonomous background animation,
blur, new RAF or extra media decoder. Reduced motion applies themes directly.
`geo-aesthetics.css` adjusts reading measure, section pauses and studio-first
content spacing, never the fixed trigger, 72% aperture or 2.39:1 film ratio.
`typography.css` remains the sole owner of all four isolated glyph stacks.

Chinese and English show LANCHUAN as the hero wordmark and lead with studio
capacity; Japanese and Korean lead with AZUMA HIROSHI and the director's voice.
These are editorial priorities, not visitor-location detection or claims
about every reader in a country. All work and both contact channels remain
available in every edition.

## Do's and Don'ts

### Do:

- **Do** preserve each edition's semantic palette and reserve its accent for existing signal roles.
- **Do** keep the hero name heavy, tightly tracked and clearly separate from the reel entry.
- **Do** preserve the theatre's central image gate and its distinct mobile ratio.
- **Do** place movement inside stable sensing shells and use the existing shared frame driver.
- **Do** keep one stepped grain canvas within the documented opacity and resolution budget, retaining static ambient radials.
- **Do** preserve four-language text, Japanese strict line breaking and Korean word grouping.
- **Do** retain visible focus, touch and keyboard film navigation, reduced motion and dialog focus return.
- **Do** keep the portrait and signature reservation honest until the corresponding real assets exist.

### Don't:

- **Don't** introduce brown ageing effects, sepia paper, VHS-store decoration or plastic card surfaces.
- **Don't** turn the laser accent into a large background or a generic button fill.
- **Don't** add Gaussian blur, full-screen filter animation or stacked blend-mode light layers; the single low-opacity soft-light grain surface is the documented exception.
- **Don't** animate the pointer sensing shell or make moving visual descendants interactive.
- **Don't** replace the language buttons with a native select or give Japanese text Chinese font fallbacks.
- **Don't** fabricate a portrait, signature, client endorsement, festival achievement or hardware-performance claim.

### Official director lettering — 2026-10-23

The international director identity is AZUMA HIROSHI (Azuma Hiroshi in prose).
The author-led JA/KO Hero keeps one line with Instrument Sans, weight 600,
tracking -0.04em and `--type-director-monolith: clamp(2rem, 11.1vw, 15rem)`.
The ZH/EN factory-led Hero retains LANCHUAN. All four identity lines use the
brand-approved `A FILM BY AZUMA HIROSHI`.
The dossier's AZUMA / HIROSHI watermark is an intentional two-line lockup
(`clamp(36px, 4vw, 64px)`; 49px at the existing mobile breakpoint), while the
caption remains a compact single-line Roman name beside 東浩. The footer
uses two rows: LANCHUAN above, `/ AZUMA HIROSHI` right aligned below at
`clamp(1.5rem, 4.9vw, 5.8rem)` / 6.4vw on mobile. Existing cinematic microtype
and the isolated ZH/EN/JA/KO reading stacks retain their approved roles.
