import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { pathToFileURL } from 'node:url';

const portfolioDir=path.dirname(fileURLToPath(import.meta.url));
const projectRoot=path.dirname(portfolioDir);
function loadLocalEnv(){const file=path.join(projectRoot,'.env');if(!fs.existsSync(file))return;for(const line of fs.readFileSync(file,'utf8').split(/\r?\n/)){const m=line.match(/^\s*([A-Z][A-Z0-9_]*)\s*=\s*(.*?)\s*$/);if(m&&!Object.hasOwn(process.env,m[1]))process.env[m[1]]=m[2].replace(/^(['"])(.*)\1$/,'$2')}}
loadLocalEnv();
const {runAgent,agentCount}=await import(pathToFileURL(path.join(projectRoot,'packages/agent-runtime/index.js')));
const {providerStatus,verifyModel}=await import(pathToFileURL(path.join(projectRoot,'packages/model-providers/groq.js')));
const {apps}=await import(pathToFileURL(path.join(portfolioDir,'apps.js')));
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.png':'image/png'};
const safeHeaders={'X-Content-Type-Options':'nosniff','Referrer-Policy':'no-referrer','Content-Security-Policy':"default-src 'self'; img-src 'self' data:; style-src 'self' 'unsafe-inline'; script-src 'self'; connect-src 'self'; base-uri 'none'; frame-ancestors 'none'"};
function reply(res,status,payload){res.writeHead(status,{...safeHeaders,'Content-Type':'application/json; charset=utf-8','Cache-Control':'no-store'});res.end(JSON.stringify(payload))}
function body(req,limit=32_000){return new Promise((resolve,reject)=>{let data='';req.on('data',chunk=>{data+=chunk;if(data.length>limit){reject(Object.assign(new Error('Request is too large.'),{status:413}));req.destroy()}});req.on('end',()=>{try{resolve(JSON.parse(data||'{}'))}catch{reject(Object.assign(new Error('Request body must be valid JSON.'),{status:400}))}});req.on('error',reject)})}
const server=http.createServer(async(req,res)=>{
  try{
    const url=new URL(req.url,'http://localhost');
    if(url.pathname==='/api/status'&&req.method==='GET'){reply(res,200,{...providerStatus(),agents:agentCount(),mode:process.env.GROQ_API_KEY?'live-capable':'demo'});return}
    if(url.pathname==='/api/provider/model'&&req.method==='GET'){const result=await verifyModel();reply(res,200,result);return}
    if(url.pathname==='/api/run'&&req.method==='POST'){
      const data=await body(req);const item=apps.find(a=>a.id===data.id);if(!item){reply(res,404,{error:'Unknown agent.'});return}
      const result=await runAgent({id:item.id,input:data.input,demoOutput:item.output,mode:data.mode==='demo'?'demo':'auto'});
      reply(res,200,{...result,agent:item.id,requestId:crypto.randomUUID()});return
    }
    if(url.pathname.startsWith('/screenshots/')){
      const match=url.pathname.match(/^\/screenshots\/([a-z0-9-]+)\/(desktop|result|mobile)\.png$/);if(!match){res.writeHead(404,safeHeaders);res.end('Not found');return}
      const file=path.join(projectRoot,'apps',match[1],'screenshots',`${match[2]}.png`);if(!apps.some(a=>a.id===match[1])){res.writeHead(404,safeHeaders);res.end('Not found');return}
      fs.readFile(file,(e,buf)=>{if(e){res.writeHead(404,safeHeaders);res.end('Not found');return}res.writeHead(200,{...safeHeaders,'Content-Type':'image/png','Cache-Control':'no-store'});res.end(buf)});return
    }
    const file=path.resolve(portfolioDir,url.pathname==='/'||url.pathname==='/gallery'?'index.html':url.pathname.replace(/^\/+/,''));
    if(!file.startsWith(portfolioDir+path.sep)){res.writeHead(403,safeHeaders);res.end('Forbidden');return}
    fs.readFile(file,(error,data)=>{if(error){res.writeHead(404,safeHeaders);res.end('Not found');return}res.writeHead(200,{...safeHeaders,'Content-Type':mime[path.extname(file)]||'application/octet-stream','Cache-Control':'no-store'});res.end(data)});
  }catch(error){if(!res.headersSent)reply(res,error.status||500,{error:error.message||'Unexpected server error.',code:error.code||'INTERNAL'});else res.destroy()}
});
const port=Number(process.env.PORT||4173);server.listen(port,'127.0.0.1',()=>console.log(`Fieldnotes running at http://127.0.0.1:${port} (${providerStatus().provider} mode; ${agentCount()} agents)`));
