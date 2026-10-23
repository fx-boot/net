import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
import {createHash} from 'node:crypto';
import assert from 'node:assert/strict';
const revision=process.argv[2]??'HEAD';
const published=JSON.parse(await fs.readFile('upstream/media/published-assets.json','utf8'));
const upstream=JSON.parse(await fs.readFile('upstream/manifest.json','utf8'));
const spatial=JSON.parse(await fs.readFile('upstream/spatial-references.json','utf8')).filter(item=>item.destination);
const records=[...published.map(item=>({path:item.local,sha:item.sha256})),...[...upstream,...spatial].map(item=>({path:item.destination,sha:item.sha256})),{path:'docs/01-research-architecture.md',sha:'9006d3a3eee685c2815be9feb61c46894491e2601b8317f31c9e4f82684a3642'}];
for(const record of records){
 const spec=revision==='index'?`:${record.path}`:`${revision}:${record.path}`;
 const bytes=execFileSync('git',['show',spec],{maxBuffer:64*1024*1024});
 assert.equal(createHash('sha256').update(bytes).digest('hex'),record.sha,`Git normalization changed ${record.path}`);
}
console.log(`Verified ${records.length} exact-byte records in Git ${revision}.`);
