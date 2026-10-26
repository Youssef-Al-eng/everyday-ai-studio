import fs from 'node:fs';
import { apps } from '../portfolio/apps.js';
for (const file of ['portfolio/app.js','portfolio/apps.js','portfolio/server.mjs','packages/model-providers/groq.js','packages/agent-runtime/index.js','packages/agent-runtime/demo-tools.js']) {
  const {status=0}=await new Promise(resolve=>{import('node:child_process').then(({spawnSync})=>resolve(spawnSync(process.execPath,['--check',file],{encoding:'utf8'}))) });
  if(status!==0)throw Error(`Syntax check failed: ${file}`);
}
if(apps.length!==20||new Set(apps.map(a=>a.id)).size!==20)throw Error('Expected exactly 20 unique projects');
for(const a of apps){if(!fs.existsSync(`apps/${a.id}/README.md`))throw Error(`Missing project README ${a.id}`);if(!a.prompt||!a.output||!a.origin)throw Error(`Incomplete application fixture ${a.id}`);for(const n of ['desktop','result','mobile'])if(!fs.existsSync(`apps/${a.id}/screenshots/${n}.png`))throw Error(`Missing ${n} screenshot for ${a.id}`)}
console.log(`PASS: JavaScript syntax, ${apps.length} unique projects, fixture, README and three screenshot slots for every app.`);
