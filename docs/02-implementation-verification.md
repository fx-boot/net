# Step 2 implementation and verification

Date: 2026-10-16. Workspace: `D:\网页设计\mo-chen-director`.

## Scope completed

Vite React/TypeScript initialization was performed in `.tools/vite-scaffold` and merged only into nonexistent destinations. The approved research document was not edited or deleted. Its SHA-256 remains `9006D3A3EEE685C2815BE9FEB61C46894491E2601B8317F31C9E4F82684A3642`.

Node v24.19.0 was located at `C:\Users\Administrator\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe`. The runtime/common locations did not contain npm/npx, so the official npm 12.2.0 package was installed into project-local `.tools/npm`, with cache in `.tools/npm-cache`. No system PATH change was made. Dependencies are locked in package-lock.json.

All eight architecture constraints are implemented: timed nonblocking opening; controlled viewport-aware Hero video; sequenced filtering; demand-loaded desktop preview; accessible modal teardown; sticky biography; observed awards/signature; contact cards and copy fallback. Anime.js v4 `createScope`, `stagger`, `svg.createDrawable()` are used. Lenis has one manual RAF and cleanup. React Bits originals and local adaptations are separate. Uiverse replacements, paths, provenance and licenses are explicitly recorded in ATTRIBUTION.md.

Four languages are integrated through React Context, not browser translation: zh/en/ko/ja, 112 UI text keys per language, six fully localized project records per language, director statements, festival awards and representation data. A shared language selector appears in desktop navigation and inside the mobile menu. localStorage remembers the preference; html lang and document title update without page navigation. Latin fonts are local WOFF2; CJK fallbacks and line spacing are language-specific.

## Commands actually executed

| Check | Result |
| --- | --- |
| `node node_modules/typescript/bin/tsc -b` | Exit 0, no type errors |
| `node node_modules/oxlint/bin/oxlint` | Exit 0, no errors or warnings; immutable upstream snapshots excluded |
| `node scripts/verify-assets.mjs` | 11 upstream hashes, 33 published assets, four dictionaries, 24 project translations and Step 1 hash verified |
| `node node_modules/vite/bin/vite.js build` | Exit 0, no build errors or chunk-size warnings |
| FFmpeg probe, decode and extraction | All seven source clips decoded; final silent reel confirmed video-only, 24.00s |

Final production output: entry JS 368.58 kB / 124.28 kB gzip; lazy BlurText/Motion chunk 138.06 kB / 45.82 kB gzip; CSS 35.30 kB / 8.59 kB gzip. Video sizes are separate; full 1080p clips total approximately 57 MB after compression, while the initially loaded silent 720p reel is approximately 4.5 MB. Full clips and project previews are not all loaded at startup.

## Browser smoke observations

The Playwright CLI was installed, but launching a separate local Edge process was blocked by profile-directory permissions in this environment. Testing continued through Codex's in-app browser controls; this is not a claim that the CLI run succeeded.

- Normal cold startup completed its opening sequence and rendered Hero/video, navigation and all content.
- zh → ko → ja → en updated headings and metadata. Reload retained en; subsequent testing restored zh. Mobile menu exposed all four choices and switched to ko successfully.
- Commercials filter settled on two records in the rendered page.
- A project detail displayed its real local clip, translated credits and stills. Closing removed the dialog/player and returned focus to the project trigger.
- The final Showreel dialog loaded `showreel-silent.mp4`; the background paused while the dialog video played. ESC removed the dialog and returned focus to Watch Full Reel. Only one video node remained afterward.
- Latest cold load and language switch produced no console errors/warnings. Earlier live multi-file Context refactoring briefly caused HMR errors; they were absent after final reload.
- Default desktop screenshot inspected; a 390×844 viewport was used to inspect the mobile menu. A complete responsive visual audit has not been claimed. Automated offscreen radio clicks in the resized in-app browser initially hit a project instead; after resetting viewport and inspecting visible controls, the filter interaction passed. Repeat mobile gesture testing in phase 4.
- Final preview saved as `output/playwright/hero-final.png`. Local development server is available at http://127.0.0.1:5173/.

## User-reported sound issue resolved

The original generated demo soundtrack contained sustained low tones, heard as humming when unmuted. It has been removed from the public media and generation script. The new reel is explicitly video-only; all four UI languages describe it as a silent sample and disable its unavailable sound toggle. The current browser was confirmed to have loaded this new file. Real replacement films can still use native player audio and the Hero sound toggle by setting `hasAudio: true`.

## Fourth-stage acceptance still to run

Full 1440/1920/768/390 layout review across all four languages; real touch/keyboard flows; rapid filter race stress; fullscreen on supported browsers; forced playback/network/clipboard failures; reduced-motion and background-tab cases; repeated modal opens and memory/RAF/Observer inspection; Performance traces on target devices. The implemented cleanup and fallbacks are not evidence of measured leak-free or constant-60fps performance.

This stage provides a complete buildable demo with source/asset provenance. The intentionally fictional identity, awards, companies and example.com contacts must be replaced with the director's actual approved information for public release.
