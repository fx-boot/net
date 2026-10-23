import fs from 'node:fs/promises';
import crypto from 'node:crypto';
const entries = [
  ['https://raw.githubusercontent.com/google/fonts/main/ofl/shipporimincho/ShipporiMincho-Regular.ttf', 'upstream/fonts/ShipporiMincho-Regular.ttf'],
  ['https://raw.githubusercontent.com/google/fonts/main/ofl/shipporimincho/OFL.txt', 'public/fonts/Shippori-Mincho-OFL.txt'],
  ['https://raw.githubusercontent.com/DavidHDev/react-bits/7381f14b15e8f9e00b01ce5b6ac4416f7ee360c4/src/ts-tailwind/TextAnimations/DecryptedText/DecryptedText.tsx', 'upstream/spatial/DecryptedText.tsx'],
  ['https://raw.githubusercontent.com/codrops/MagneticButtons/b2ee8ac9cd561e13198335cca5684fe1c31d543c/src/js/demo1/buttonCtrl.js', 'upstream/spatial/codrops-button.js'],
  ['https://raw.githubusercontent.com/codrops/MagneticButtons/master/LICENSE', 'upstream/spatial/codrops-LICENSE'],
  ['https://ui.aceternity.com/registry/3d-card.json', 'upstream/spatial/aceternity-3d-card.json'],
];
const results = await Promise.all(entries.map(async ([url, destination]) => {
  const response = await fetch(url, {signal:AbortSignal.timeout(30000)});
  if (!response.ok) return { url, status: response.status };
  const bytes = Buffer.from(await response.arrayBuffer());
  await fs.mkdir(destination.slice(0, destination.lastIndexOf('/')), { recursive: true });
  await fs.writeFile(destination, bytes);
  return { url, destination, bytes: bytes.length, sha256: crypto.createHash('sha256').update(bytes).digest('hex') };
}));
await fs.writeFile('upstream/spatial-references.json', JSON.stringify(results, null, 2) + '\n');
console.log(JSON.stringify(results, null, 2));
