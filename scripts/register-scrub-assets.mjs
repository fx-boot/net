import fs from 'node:fs/promises';
import {createHash} from 'node:crypto';
const file='upstream/media/published-assets.json';
const retired='public/media/texture/silver-grain.png';
const records=JSON.parse(await fs.readFile(file,'utf8')).filter(record=>record.local!==retired);
const sources=JSON.parse(await fs.readFile('upstream/media/scrub-frames.json','utf8'));
for(const film of Object.values(sources))for(const frame of film.frames){
 const local=`public${frame.src}`,bytes=await fs.readFile(local);
 const sha256=createHash('sha256').update(bytes).digest('hex');
 if(sha256!==frame.sha256||bytes.length!==frame.bytes)throw new Error(`Frame provenance mismatch: ${local}`);
 const record={local,bytes:bytes.length,sha256},index=records.findIndex(item=>item.local===local);
 if(index<0)records.push(record);else records[index]=record;
}
await fs.writeFile(file,JSON.stringify(records,null,2)+'\n');
console.log(`Registered ${records.length} assets; retired static grain is not shipped.`);
