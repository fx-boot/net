// Original deterministic 8-bit photographic-grain tile. One decoded texture;
// no runtime turbulence, animated noise canvas, filter or blend mode.
import fs from 'node:fs/promises';
import { deflateSync } from 'node:zlib';
const size = 192;
const raw = Buffer.alloc((size + 1) * size);
let seed = 1019;
for (let y = 0; y < size; y++) {
  for (let x = 0; x < size; x++) {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    raw[y * (size + 1) + x + 1] = seed >>> 24;
  }
}
function crc32(bytes) {
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc ^= byte;
    for (let bit = 0; bit < 8; bit++) crc = (crc >>> 1) ^ (0xedb88320 & -(crc & 1));
  }
  return (crc ^ 0xffffffff) >>> 0;
}
function chunk(type, data) {
  const name = Buffer.from(type), length = Buffer.alloc(4), checksum = Buffer.alloc(4);
  length.writeUInt32BE(data.length);
  checksum.writeUInt32BE(crc32(Buffer.concat([name, data])));
  return Buffer.concat([length, name, data, checksum]);
}
const header = Buffer.alloc(13);
header.writeUInt32BE(size, 0); header.writeUInt32BE(size, 4); header[8] = 8;
await fs.mkdir('public/media/texture', {recursive: true});
await fs.writeFile('public/media/texture/silver-grain.png', Buffer.concat([
  Buffer.from([137,80,78,71,13,10,26,10]), chunk('IHDR', header), chunk('IDAT', deflateSync(raw)), chunk('IEND', Buffer.alloc(0)),
]));
