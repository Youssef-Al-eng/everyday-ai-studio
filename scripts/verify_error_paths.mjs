import { spawn } from 'node:child_process';
import fs from 'node:fs';

const base = process.env.PLATFORM_URL || 'http://127.0.0.1:4173';
const results = [];
const post = async (payload, port = base) => {
  const response = await fetch(`${port}/api/run`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
  return { status: response.status, body: await response.json() };
};
const record = (name, pass, detail) => { results.push({ name, result: pass ? 'PASS' : 'FAIL', detail }); console.log(`${pass ? 'PASS' : 'FAIL'} ${name} — ${detail}`); };

// On the live-configured server: input and routing guards (no external request needed).
const empty = await post({ id: 'web-research-agent', input: '   ', mode: 'groq' });
record('empty_input_rejected', empty.status === 400 && empty.body.code === 'EMPTY_INPUT', `HTTP ${empty.status} ${empty.body.code || ''}`);

const unknown = await post({ id: 'not-a-real-agent', input: 'hello', mode: 'groq' });
record('unknown_agent_rejected', unknown.status === 404, `HTTP ${unknown.status}`);

const badMode = await post({ id: 'web-research-agent', input: 'hello', mode: 'magic' });
record('invalid_mode_rejected', badMode.status === 400 && badMode.body.code === 'MODE_REQUIRED', `HTTP ${badMode.status} ${badMode.body.code || ''}`);

const oversized = await post({ id: 'web-research-agent', input: 'x'.repeat(25000), mode: 'groq' });
record('oversized_input_rejected', oversized.status === 413 && oversized.body.code === 'INPUT_TOO_LARGE', `HTTP ${oversized.status} ${oversized.body.code || ''}`);

// With a deliberately invalid credential on a second instance: Groq must reject it and the
// backend must surface an honest AUTH error instead of a demo fallback.
const child = spawn(process.execPath, ['portfolio/server.mjs'], {
  env: { ...process.env, PORT: '4175', GROQ_API_KEY: 'gsk_invalid_local_test_key_000000000000000000000000' },
  stdio: 'ignore'
});
try {
  await new Promise((resolve, reject) => { child.on('error', reject); child.stdout?.on('data', resolve); setTimeout(resolve, 3000); });
  const auth = await post({ id: 'web-research-agent', input: 'Test the error path with a bad credential.', mode: 'groq' }, 'http://127.0.0.1:4175');
  record('invalid_key_returns_auth_error', auth.body.code === 'AUTH' && /rejected the credential/.test(auth.body.error || ''), `HTTP ${auth.status} ${auth.body.code || ''} — ${(auth.body.error || '').slice(0, 60)}`);
  const model = await fetch('http://127.0.0.1:4175/api/provider/model');
  const modelBody = await model.json();
  record('model_verification_surfaces_auth', modelBody.code === 'AUTH', `HTTP ${model.status} ${modelBody.code || ''}`);
  const status = await (await fetch('http://127.0.0.1:4175/api/status')).json();
  record('invalid_key_never_silently_falls_back_to_demo', status.provider === 'groq' && status.configured === true && status.mode === 'live-capable', 'key present but invalid — real requests fail with AUTH instead of demo fallback');
  const demo = await post({ id: 'web-research-agent', input: 'Compare on-device and cloud AI for a small clinic.', mode: 'demo' }, 'http://127.0.0.1:4175');
  record('demo_mode_still_works_without_valid_key', demo.status === 200 && demo.body.source === 'demo', `HTTP ${demo.status} source=${demo.body.source}`);
} finally {
  child.kill();
}

const report = { run_at: new Date().toISOString(), model: process.env.GROQ_MODEL || 'openai/gpt-oss-20b', checked: results.length, failures: results.filter(r => r.result === 'FAIL').length, results };
fs.writeFileSync('inventory/error-path-verification.json', `${JSON.stringify(report, null, 2)}\n`);
console.log(`${report.failures === 0 ? 'ALL PASS' : report.failures + ' FAILURES'} (${report.checked} checks) -> inventory/error-path-verification.json`);
if (report.failures > 0) process.exitCode = 1;
