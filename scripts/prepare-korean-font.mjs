import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';

// Official Fontsource repository; keep its complete, tested Unicode partitions.
const commit = '86edcf1aab7fd27e8960ea3555aab50e3480a098';
const base = `https://cdn.jsdelivr.net/gh/fontsource/font-files@${commit}/fonts/google/noto-serif-kr`;
const digest = bytes => createHash('sha256').update(bytes).digest('hex');
async function fetchBytes(url) {
  let failure;
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const response = await fetch(url, {signal: AbortSignal.timeout(30000)});
      if (!response.ok) throw new Error(`${response.status}: ${url}`);
      return Buffer.from(await response.arrayBuffer());
    } catch (error) { failure = error; }
  }
  throw failure;
}
await fs.mkdir('public/fonts/noto-serif-kr', {recursive: true});
await fs.mkdir('upstream/fonts', {recursive: true});
const cssBytes = await fetchBytes(`${base}/400.css`);
const originalCss = cssBytes.toString('utf8');
const names = [...originalCss.matchAll(/url\(\.\/files\/(noto-serif-kr-[^)]+\.woff2)\)/gu)].map(match => match[1]);
if (names.length !== 124 || new Set(names).size !== 124) throw new Error('Unexpected upstream Korean partition count.');
const records = [];
let cursor = 0;
await Promise.all(Array.from({length: 4}, async () => {
  while (cursor < names.length) {
    const name = names[cursor++];
    const local = `public/fonts/noto-serif-kr/${name}`;
    const url = `${base}/files/${name}`;
    const bytes = await fetchBytes(url);
    if (bytes.subarray(0, 4).toString() !== 'wOF2') throw new Error(`Invalid font ${name}`);
    await fs.writeFile(local, bytes);
    records.push({local, bytes: bytes.length, sha256: digest(bytes), source: url});
  }
}));
const css = `/* Noto Serif KR 400 / SIL OFL 1.1. Fontsource commit ${commit}.\n   Original Unicode ranges retained; WOFF fallback omitted for modern browsers. */\n` + originalCss
  .replace(/url\(\.\/files\/([^)]+\.woff2)\) format\('woff2'\), url\(\.\/files\/[^)]+\.woff\) format\('woff'\)/gu, "url('/fonts/noto-serif-kr/$1') format('woff2')");
await fs.writeFile('src/styles/fonts-korean.css', css);
const licenseResponse = await fetch('https://api.github.com/repos/google/fonts/contents/ofl/notoserifkr/OFL.txt');
if (!licenseResponse.ok) throw new Error(`Korean OFL: ${licenseResponse.status}`);
const licenseInfo = await licenseResponse.json();
const license = Buffer.from(licenseInfo.content, 'base64');
await fs.writeFile('public/fonts/Noto-Serif-KR-OFL.txt', license);
records.push({local: 'public/fonts/Noto-Serif-KR-OFL.txt', bytes: license.length, sha256: digest(license), source: licenseInfo.html_url});
records.sort((left, right) => left.local.localeCompare(right.local));
await fs.writeFile('upstream/fonts/typography-manifest.json', JSON.stringify({
  family: 'Noto Serif KR', weight: 400, style: 'normal', license: 'SIL OFL 1.1',
  repository: 'https://github.com/fontsource/font-files', commit,
  css: {source: `${base}/400.css`, sha256: digest(cssBytes), partitions: names.length},
  files: records,
}, null, 2) + '\n');
console.log(JSON.stringify({partitions: names.length, fontBytes: records.filter(record => record.local.endsWith('.woff2')).reduce((sum, record) => sum + record.bytes, 0), commit}));
