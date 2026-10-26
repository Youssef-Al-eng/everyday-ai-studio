import { apps } from '../portfolio/apps.js';
import fs from 'node:fs';

const base = process.env.PLATFORM_URL || 'http://127.0.0.1:4173';
const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const status = await (await fetch(`${base}/api/status`)).json();
const results = [];
const excerpt = (value) => {
  if (typeof value === 'string') return value.slice(0, 140);
  if (Array.isArray(value)) return value.slice(0, 3).map((item) => (typeof item === 'string' ? item.slice(0, 80) : JSON.stringify(item).slice(0, 80)));
  return undefined;
};
for (const app of apps) {
  let response, data;
  // Rate limits are a normal Groq condition during a 20-call sweep; retry with backoff.
  for (let attempt = 0; attempt <= 3; attempt += 1) {
    response = await fetch(`${base}/api/run`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id: app.id, input: app.prompt, mode: 'groq' })
    });
    data = await response.json();
    if (data.code !== 'RATE_LIMIT' || attempt === 3) break;
    await sleep(5000 * (attempt + 1));
  }
  await sleep(1500);
  let fieldExcerpts;
  if (response.ok && data.source === 'groq') {
    try { fieldExcerpts = Object.fromEntries(Object.entries(JSON.parse(data.text)).map(([k, v]) => [k, excerpt(v)])); } catch { fieldExcerpts = undefined; }
  }
  results.push({
    id: app.id, name: app.name,
    status: status.configured ? (response.ok && data.source === 'groq' ? 'RESPONSE_RECEIVED_REVIEW_REQUIRED' : 'FAIL') : 'NOT VERIFIED',
    reason: status.configured
      ? (response.ok ? `Response received; content relevance and browser rendering require review (${data.model || 'model not supplied'}).` : `Provider request failed: ${data.code || response.status} — ${data.error || 'unknown error'}`)
      : `No local GROQ_API_KEY configured; backend returned ${data.code || response.status}. No external request was sent.`,
    model: response.ok && data.source === 'groq' ? data.model : undefined,
    usage_tokens: response.ok && data.source === 'groq' && data.usage ? data.usage.total_tokens : undefined,
    response_field_excerpts: fieldExcerpts
  });
}
const report = {
  run_at: new Date().toISOString(), configured: Boolean(status.configured), model: status.model,
  attempted_agents: results.length, live_successes: results.filter(x => x.status === 'RESPONSE_RECEIVED_REVIEW_REQUIRED').length, results
};
fs.writeFileSync('inventory/live-groq-verification.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(JSON.stringify({ configured: report.configured, agents: report.attempted_agents, live_successes: report.live_successes }));
if (status.configured && results.some(x => x.status === 'FAIL')) process.exitCode = 1;
