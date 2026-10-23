# ACRO HAT / 東浩 — personal artist edition

Delivered 2026-10-24. This document supersedes previous brand-positioning reports; historical reports and the protected Step 1 document retain their original content.

## Identity and structure

- Current application, public identity assets, HTML metadata and four-language dictionaries contain no retired company or director identities.
- Navigation follows the user's follow-up correction: a **single-line ACRO HAT wordmark**, with no stacked English subtitle or decorative REC point.
- Every Hero uses ACRO HAT, the requested ANIME & CINEMA WORKS / DIRECTED BY ACRO HAT imprint and the four supplied teaser lines. Regional media and lighting remain independent.
- The director statement is primary in every language. Chinese and Japanese use the complete supplied introduction and five body paragraphs; English and Korean match the cross-media / AI philosophy. Scroll focus is retained.
- Four creative disciplines cover AI & computational cinema, 2D/3D animation & CGI, live-action & drama, and commercials & music PV.
- Contact is a single personal atelier channel. The Japanese heading is exactly **ACRO HAT へのご相談**, with DIRECTOR & ATELIER CONTACT. Footer copyright is **© 2026 ACRO HAT (東浩). ALL RIGHTS RESERVED.**

## Film catalog and assets

Five filters: All, AI & Hybrid, Animation, Live-action & Drama, Commercials & PV. `ProjectEntry.category` accepts `ai-hybrid`, `animation`, `live-action`, `commercials-pv`. Stable IDs, regional weights, previews, full films and scrub frames remain independent.

The 12 demo entries include reference-study slots for each category. Licensed live-action footage used in AI/animation presentation slots is **not evidence of actual AI or animation work**. Placeholder flags and Credits disclosures remain; replace these entries with authorized finished films before presenting them as actual directing credits. The factory supports 50 entries and all category filters are populated.

Reserved portrait: `public/media/director/acro-hat-portrait.jpg`. Contact remains `atelier@example.com` until a verified address is supplied. No stock person is presented as the director. The unsigned signature reservation is preserved.

Three authored identity assets changed: favicon, generic fallback poster, and portrait instructions. Their hashes are recorded in `upstream/media/brand-identity-updates.json`; original media baseline records are recoverable. Licensed video, still and font bytes were not modified.

## Verification

- `npm run typecheck`, `npm run lint`, `npm run build`.
- `verify:brand`, `verify:catalog`, `verify:geo`, `verify:preview`, `verify:hero`, `verify:assets`.
- Browser: 1440×900 and 390×844, all four languages. Hero wordmark is one line; no document horizontal overflow or retired identity in rendered text. Locale-specific serif stacks retained.
- Five filters display results; four regional first films remain night / refraction / between / heat. Dialog opening stops background previews; Escape closes it. Japanese language survives reload.
- Runtime playback, fixed pointer shells and shared animation frame code were not changed. Preview arbitration regression includes 100 rapid film changes. This task does not make a new device-wide FPS claim.

Local screenshot evidence (ignored, not part of public build): `output/acro-hat-2026-10-24/`. It contains desktop/mobile Hero captures for all four languages, the Japanese dossier/contact, works and `browser-checks.json`.

Preview: http://127.0.0.1:5173/
