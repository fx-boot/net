# Four-language typography system

The document language is the only locale selector. `LanguageProvider` changes
`html[lang]`; `src/styles/typography.css` then selects an independent serif/sans
pair. The file is imported after the visual component styles, so old responsive
line-height rules cannot silently undo a language's reading rhythm.

| Language | Prose / film titles | Labels / technical metadata | Reading rules |
| --- | --- | --- | --- |
| 中文 | Songti SC → Source Han Serif CN → Noto Serif SC → STSong | PingFang SC → Source Han Sans CN → Noto Sans SC → Microsoft YaHei | Strict punctuation line breaking; no borrowed Korean/Japanese stack |
| English | Bodoni Moda → Didot → Playfair Display | Instrument Sans → Inter → Helvetica Neue | Technical labels track at `0.18em`; tabular lining numerals |
| 한국어 | Noto Serif KR → KoPub Batang → Nanum Myeongjo → Batang | Pretendard → Noto Sans KR → Apple SD Gothic Neo → Malgun Gothic | `keep-all`, no emergency splitting of prose, `1.85` leading |
| 日本語 | Shippori Mincho → Yu Mincho → Hiragino Mincho ProN → Noto Serif JP | Hiragino Sans → Yu Gothic → Noto Sans JP | `palt`, strict Japanese punctuation, `0.05em` prose tracking, `2.05` leading |

The serif families apply to monologues, prose, film names and editorial headings.
Interface labels retain their locale's sans family. The former `--font-mono`
token aliases the locale sans stack; measured readouts use `tabular-nums` rather
than allowing Consolas to introduce unrelated CJK fallback glyphs.

`DONG HAO`, `LANCHUAN`, the SVG logo and Latin email addresses are fixed brand
lettering, not locale fallbacks. Brand lettering retains Instrument Sans; Latin
email addresses and the English statement title retain Bodoni Moda. Localized
copy confirmations stay in the locale sans family and never synthesize an italic
Hangul/Kana face. Other locale-specific type does not put a Latin face before its
CJK serif family.

## Real Korean font delivery

Korean serif rendering is self-hosted, not dependent on Batang being installed.
The complete Noto Serif KR 400 partition set comes from the official Fontsource
font-files repository at commit `86edcf1aab7fd27e8960ea3555aab50e3480a098`.
The original 124 Unicode ranges and font binaries are retained; the obsolete
WOFF fallback is omitted and URLs point to local WOFF2 files. Only ranges needed
by text on the page are fetched by the browser. No font request is sent to Google
or another external host during normal browsing.

- Runtime declarations: `src/styles/fonts-korean.css`.
- Runtime binaries: `public/fonts/noto-serif-kr/`.
- Full SIL Open Font License 1.1: `public/fonts/Noto-Serif-KR-OFL.txt`.
- Immutable source URLs, sizes and SHA-256: `upstream/fonts/typography-manifest.json`.
- Reproduction: `node scripts/prepare-korean-font.mjs`.

The 23.8 MB upstream variable TTF was not shipped. Fontsource's complete WOFF2
partitions provide modern browser coverage without that download. Existing local
Shippori Mincho and Latin fonts remain unchanged. Chinese and locale sans
fallbacks use installed platform fonts; their exact appearance can vary across
operating systems, but their declared stacks do not cross into another CJK
locale. Static 400 CJK fonts deliberately avoid browser-synthesized weights.

## Validation path

Switch ZH → EN → KO → JA at desktop and mobile widths. Inspect the monologue,
project name, business description and technical timecode: each should expose
its matching serif/sans family; KO prose must keep complete words and use `1.85`
leading, while JA prose uses `palt` and `2.05`. Scroll to the director statement
in KO so the browser requests the actual Noto Serif KR ranges. Refresh once to
confirm the persisted language. Check long titles and email wrapping separately
from prose: URLs/emails retain deliberate emergency wrapping for accessibility.
