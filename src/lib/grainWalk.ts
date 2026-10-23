// Quarter-pixel-count canvas; deterministic generator permits repeatable budget tests.
export const GRAIN_INTERVAL = 1000 / 12;
export function grainDimensions(width: number, height: number) {
  const scale = Math.min(.5, 960 / Math.max(1, width), 540 / Math.max(1, height));
  return {width: Math.max(1, Math.ceil(width * scale)), height: Math.max(1, Math.ceil(height * scale))};
}
export function createGrainWalk(pixels: number, seed = 1019, destination = new Uint8ClampedArray(pixels * 4)) {
  const rgba=destination;
  const words=new Uint32Array(rgba.buffer,rgba.byteOffset,pixels);
  const littleEndian=new Uint8Array(new Uint32Array([0x01020304]).buffer)[0]===4;
  const pack=(value:number)=>littleEndian?(0xff000000|(value*0x010101)):((value*0x010101)<<8)|255;
  let state = seed >>> 0;
  const random = () => {state ^= state << 13; state ^= state >>> 17; state ^= state << 5; return state >>> 0;};
  for (let i=0; i<pixels; i++) words[i]=pack(80+(random()&95));
  return () => {
    for (let i=0; i<pixels; i++) {
      const noise = random();
      // A correlated walk with intermittent fresh grains; no repeating bitmap cells.
      const previous=littleEndian?words[i]&255:words[i]>>>24;
      let value=(noise&3)===0?64+((noise>>>8)&127):previous+((noise>>>16)&63)-32;
      if(value<48)value=48;else if(value>208)value=208;
      words[i]=pack(value);
    }
    return rgba;
  };
}
