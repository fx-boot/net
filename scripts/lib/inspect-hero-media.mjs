import assert from 'node:assert/strict';

/** ISO BMFF container inspection, independent of filenames or manifest claims. */
export function mp4Boxes(bytes, start = 0, end = bytes.length) {
  const result = [];
  let offset = start;
  while (offset < end) {
    assert.ok(offset + 8 <= end, `Truncated MP4 box at ${offset}`);
    let size = bytes.readUInt32BE(offset), headerSize = 8;
    const type = bytes.toString('ascii', offset + 4, offset + 8);
    if (size === 1) {
      assert.ok(offset + 16 <= end, 'Truncated extended MP4 box');
      const extendedSize = bytes.readBigUInt64BE(offset + 8);
      assert.ok(extendedSize <= BigInt(Number.MAX_SAFE_INTEGER), 'MP4 box size overflow');
      size = Number(extendedSize); headerSize = 16;
    } else if (size === 0) size = end - offset;
    assert.ok(size >= headerSize && offset + size <= end, `Invalid ${type} box size`);
    result.push({ type, start: offset, data: offset + headerSize, end: offset + size, size });
    offset += size;
  }
  assert.equal(offset, end, 'MP4 boxes must fill their parent');
  return result;
}

export function inspectMp4(bytes) {
  const top = mp4Boxes(bytes);
  const find = (boxes, type) => {
    const matches = boxes.filter(box => box.type === type);
    assert.equal(matches.length, 1, `Expected one ${type} box`);
    return matches[0];
  };
  const child = (box, type) => find(mp4Boxes(bytes, box.data, box.end), type);
  const ftyp = find(top, 'ftyp'), moov = find(top, 'moov');
  const mdat = top.find(box => box.type === 'mdat');
  assert.ok(mdat && mdat.size > 8, 'MP4 must contain actual media samples');
  assert.ok(ftyp.start === 0 && ftyp.size >= 16, 'MP4 file type must lead the file');
  const tracks = mp4Boxes(bytes, moov.data, moov.end).filter(box => box.type === 'trak').map(trak => {
    const mdia = child(trak, 'mdia'), hdlr = child(mdia, 'hdlr'), mdhd = child(mdia, 'mdhd');
    assert.ok(hdlr.data + 12 <= hdlr.end, 'Invalid media handler');
    const handler = bytes.toString('ascii', hdlr.data + 8, hdlr.data + 12);
    const version = bytes[mdhd.data];
    assert.ok(version === 0 || version === 1, 'Unsupported media header version');
    const timescale = bytes.readUInt32BE(mdhd.data + (version === 1 ? 20 : 12));
    const durationTicks = version === 1 ? Number(bytes.readBigUInt64BE(mdhd.data + 24)) : bytes.readUInt32BE(mdhd.data + 16);
    assert.ok(timescale > 0 && durationTicks > 0, 'Media clock must be positive');
    const track = { handler, durationSeconds: durationTicks / timescale, timescale };
    if (handler !== 'vide') return track;
    const stbl = child(child(mdia, 'minf'), 'stbl'), stsd = child(stbl, 'stsd');
    const entries = mp4Boxes(bytes, stsd.data + 8, stsd.end);
    assert.equal(bytes.readUInt32BE(stsd.data + 4), entries.length, 'Sample description count mismatch');
    assert.equal(entries.length, 1, 'One video sample description expected');
    const entry = entries[0];
    assert.ok(['avc1', 'avc3'].includes(entry.type), 'Hero must use an actual H.264 sample entry');
    assert.ok(entry.data + 78 <= entry.end, 'Truncated visual sample entry');
    const width = bytes.readUInt16BE(entry.data + 24), height = bytes.readUInt16BE(entry.data + 26);
    const avcC = find(mp4Boxes(bytes, entry.data + 78, entry.end), 'avcC');
    assert.ok(avcC.size >= 15 && bytes[avcC.data] === 1, 'Missing AVC decoder configuration');
    const profile = bytes[avcC.data + 1];
    const stts = child(stbl, 'stts'), stsz = child(stbl, 'stsz');
    const timingEntries = bytes.readUInt32BE(stts.data + 4);
    assert.ok(stts.data + 8 + timingEntries * 8 <= stts.end, 'Truncated sample timing table');
    let samples = 0, ticks = 0;
    for (let index = 0; index < timingEntries; index++) {
      const count = bytes.readUInt32BE(stts.data + 8 + index * 8);
      const delta = bytes.readUInt32BE(stts.data + 12 + index * 8);
      assert.ok(count > 0 && delta > 0, 'Sample durations must be positive');
      samples += count; ticks += count * delta;
    }
    assert.equal(samples, bytes.readUInt32BE(stsz.data + 8), 'Sample size and timing counts differ');
    assert.equal(ticks, durationTicks, 'Video timing table differs from media duration');
    return { ...track, codec: entry.type, profile, width, height, frames: samples, frameRate: samples / track.durationSeconds };
  });
  return { topLevelBoxes: top.map(box => box.type), fastStart: moov.start < mdat.start, tracks };
}

/** Read JPEG frame dimensions rather than trusting the poster's extension. */
export function inspectJpeg(bytes) {
  assert.equal(bytes.readUInt16BE(0), 0xffd8, 'Poster must have a JPEG SOI marker');
  let offset = 2;
  while (offset + 4 <= bytes.length) {
    assert.equal(bytes[offset], 0xff, 'Invalid JPEG marker');
    while (bytes[offset] === 0xff) offset++;
    const marker = bytes[offset++];
    if ([0x01, 0xd8].includes(marker) || (marker >= 0xd0 && marker <= 0xd7)) continue;
    assert.ok(marker !== 0xda && marker !== 0xd9, 'JPEG frame header not found');
    const length = bytes.readUInt16BE(offset);
    assert.ok(length >= 2 && offset + length <= bytes.length, 'Invalid JPEG segment size');
    if ([0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7, 0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf].includes(marker)) {
      assert.ok(length >= 8, 'Truncated JPEG frame header');
      return { precision: bytes[offset + 2], height: bytes.readUInt16BE(offset + 3), width: bytes.readUInt16BE(offset + 5) };
    }
    offset += length;
  }
  throw new Error('JPEG frame dimensions not found');
}
