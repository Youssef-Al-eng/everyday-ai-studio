import fs from 'node:fs';import path from 'node:path';
const source=path.resolve('upstream-500-ai-agents'),dest=path.resolve('upstream-source');
if(!fs.existsSync(source)||fs.existsSync(dest))throw Error('Expected source clone and an unused upstream-source destination.');
function copy(dir,out){fs.mkdirSync(out,{recursive:true});for(const ent of fs.readdirSync(dir,{withFileTypes:true})){if(ent.name==='.git'||ent.name==='node_modules'||ent.name==='__pycache__')continue;const from=path.join(dir,ent.name),to=path.join(out,ent.name);if(ent.isDirectory())copy(from,to);else fs.copyFileSync(from,to)}}
copy(source,dest);const count=(d)=>fs.readdirSync(d,{withFileTypes:true}).reduce((n,x)=>n+(x.name==='.git'?0:x.isDirectory()?count(path.join(d,x.name)):1),0);console.log(`Exported ${count(dest)} upstream source files without nested Git metadata to upstream-source/.`);
