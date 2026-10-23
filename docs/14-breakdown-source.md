# Cine-Breakdown asset pair — 2026-10-23

The interactive comparison is a **color study**, not evidence of an actual client VFX delivery. Both sides use the existing local `public/media/stills/refraction-2.jpg`, a frame from the licensed Mixkit video *Model in western fashion seen through acrylic* (source https://mixkit.co/free-stock-video/model-in-western-fashion-seen-through-acrylic-101645/). The frame and source permissions are already registered in `MEDIA-LICENSES.md` and `upstream/media/published-assets.json`. No third-party image was added or altered on disk.

- Left pass: CSS `contrast(.62) saturate(.42) brightness(1.12)` simulates a low-contrast ungraded appearance. It is **not** an original camera Log image, a green-screen plate, or a reconstruction of the camera response curve.
- Right pass: CSS `contrast(1.12) saturate(1.08) brightness(.96)` is the presentation grade of the same frame. No CGI object or compositing work is attributed to LANCHUAN.
- The brief’s technical labels `PASS 01: RAW UNGRADED` and `PASS 02: LANCHUAN VFX FINAL` describe the intended production slots. The visible `COLOR STUDY` caption and localized accessible description identify the present pair accurately. Replace both passes together with approved, aligned production plates before making a project-specific capability claim.

## Interaction and performance contract

`CineBreakdown.tsx` subscribes to the existing cinema measure phase. Pointer handlers store coordinates only. The registered measure callback caches the stable viewport rectangle; all invalidated geometry is read before queued writes to the split, range value, percentage and accessible value text. It creates no RAF, interval, canvas or animation engine. Off-screen subscription work exits immediately; `document.hidden` pauses the shared driver and cancels capture. All observers and listeners disconnect on unmount.

Desktop pointer movement reveals the two passes. On touch, the 44px-wide divider target captures the pointer; surrounding frame remains vertically scrollable. A native range remains in the tab order and supports standard arrow, Home and End keys with four-language labels and descriptions. The static viewport never transforms. Only the inert divider track translates; the raw pass uses one rectangular clip. No blur, blend-mode stack or postprocessing layer is added. Reduced motion retains direct manipulation without autonomous motion.
