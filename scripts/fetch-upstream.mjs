import fs from 'node:fs/promises';
import path from 'node:path';
import crypto from 'node:crypto';

async function get(url, json = false) {
  for (let attempt = 0; attempt < 3; attempt++) {
    try {
      const r = await fetch(url, { signal: AbortSignal.timeout(18000), headers: { 'User-Agent': 'MoChen-Portfolio-SourceAudit' } });
      if (!r.ok) throw new Error(`${r.status} ${url}`);
      return json ? await r.json() : await r.text();
    } catch (e) { if (attempt === 2) throw e; }
  }
}
const manifest = [];
async function save(repo, commit, file, destination) {
  const url = `https://raw.githubusercontent.com/${repo}/${commit}/${file}`;
  let content;
  try { content = await get(url); }
  catch { const data = await get(`https://api.github.com/repos/${repo}/contents/${file}?ref=${commit}`, true); content = Buffer.from(data.content, 'base64').toString('utf8'); }
  await fs.mkdir(path.dirname(destination), { recursive: true });
  await fs.writeFile(destination, content);
  const record = { repo, commit, file, url, destination, sha256: crypto.createHash('sha256').update(content).digest('hex') };
  manifest.push(record);
  console.log(`Saved ${destination} (${content.length} characters)`);
  return content;
}
const rb = await get('https://api.github.com/repos/DavidHDev/react-bits/commits/main', true);
for (const [category, name] of [['TextAnimations', 'BlurText'], ['Animations', 'Crosshair'], ['Animations', 'Noise']]) {
  const file = `src/ts-tailwind/${category}/${name}/${name}.tsx`;
  const content = await save('DavidHDev/react-bits', rb.sha, file, `upstream/react-bits/${name}.tsx`);
  await fs.mkdir('src/components/react-bits', { recursive: true });
  await fs.writeFile(`src/components/react-bits/${name}.tsx`, `// React Bits — David Haz. MIT + Commons Clause. See upstream/react-bits/LICENSE.md.\n${content}`);
}
await save('DavidHDev/react-bits', rb.sha, 'LICENSE.md', 'upstream/react-bits/LICENSE.md');
const tree = JSON.parse(await fs.readFile('upstream/uiverse/tree.json', 'utf8'));
const files = ['Buttons/Spacious74_helpless-tiger-55.html', 'Buttons/Spacious74_horrible-horse-4.html', 'Radio-buttons/Galahhad_perfect-cheetah-72.html', 'Radio-buttons/Spacious74_lovely-goose-53.html', 'loaders/EmmaxPlay_polite-husky-37.html', 'Cards/Smit-Prajapati_smart-liger-5.html', 'LICENSE'];
for (const file of files) await save('uiverse-io/galaxy', tree.sha, file, `upstream/uiverse/${file}`);
await fs.writeFile('upstream/manifest.json', JSON.stringify(manifest, null, 2));
