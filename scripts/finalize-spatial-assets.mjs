import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const sha = bytes => crypto.createHash('sha256').update(bytes).digest('hex');
const manifest = JSON.parse(await fs.readFile('upstream/media/published-assets.json', 'utf8'));
for (const local of ['public/fonts/shippori-mincho-regular.woff2','public/fonts/Shippori-Mincho-OFL.txt','public/media/director/darkroom-placeholder.svg','public/media/fallback.svg','public/favicon.svg']) {
 const bytes = await fs.readFile(local);
 const entry = { local, bytes: bytes.length, sha256: sha(bytes) };
 const index = manifest.findIndex(asset => asset.local === local);
 if (index < 0) manifest.push(entry); else manifest[index] = entry;
}
await fs.writeFile('upstream/media/published-assets.json', JSON.stringify(manifest,null,2)+'\n');
const refs = JSON.parse(await fs.readFile('upstream/spatial-references.json','utf8'));
try {
 const response = await fetch('https://api.github.com/repos/codrops/MagneticButtons/git/trees/master?recursive=1', {signal:AbortSignal.timeout(15000)});
 if (response.ok) {
  const tree = await response.json();
  const source = tree.tree.find(item=>item.path === 'src/js/demo1/buttonCtrl.js');
  if (source) {
   const url = `https://raw.githubusercontent.com/codrops/MagneticButtons/${tree.sha}/${source.path}`;
   const result = await fetch(url, {signal:AbortSignal.timeout(15000)});
   if (result.ok) {
    const bytes=Buffer.from(await result.arrayBuffer());
    const destination='upstream/spatial/codrops-button.js';
    await fs.writeFile(destination,bytes);
    const entry={url,destination,commit:tree.sha,bytes:bytes.length,sha256:sha(bytes)};
    const index=refs.findIndex(source=>source.destination===destination);
    if(index<0) refs.push(entry); else refs[index]=entry;
   }
  }
 }
} catch (error) { console.log('Codrops source lookup:',error.message); }
await fs.writeFile('upstream/spatial-references.json',JSON.stringify(refs,null,2)+'\n');
console.log('Updated published asset hashes and source references.');
