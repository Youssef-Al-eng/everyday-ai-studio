const keep=(s,n=2200)=>String(s).slice(0,n);
export function demoWorkflow(id,input,fallback){
  const text=keep(input,12000);
  if(id==='code-review-agent'){
    const findings=[];
    if(/execute\s*\([^\n]*(\+|\.format\(|%s)/i.test(text)||/f["'][^"']*(select|insert|update|delete)/i.test(text))findings.push('HIGH · Possible SQL injection: query construction appears to interpolate values. Bind parameters rather than concatenating user input.');
    if(/\beval\s*\(|\bexec\s*\(/.test(text))findings.push('HIGH · Dynamic code execution found. Avoid eval/exec on untrusted input.');
    if(/(?:api[_-]?key|password|secret)\s*=\s*["'][^"']{6,}/i.test(text))findings.push('CRITICAL · A credential-like literal appears in source. Rotate it and load it from a secret store.');
    if(!findings.length)findings.push('No supported high-risk pattern detected by the local heuristic scan. This is not a full code review.');
    return `PATCHWORK STATIC SCAN · ${findings.length} signal(s)\n\n${findings.map(x=>'• '+x).join('\n\n')}\n\nLimit: regex heuristics only; no code execution and not a substitute for review.`;
  }
  if(id==='sql-query-agent')return `READ-ONLY SQL PREVIEW · sample e-commerce schema\n\nSELECT region, SUM(revenue) AS revenue\nFROM sample_orders\nGROUP BY region\nORDER BY revenue DESC\nLIMIT 5;\n\nSample result: West $48,200 · Northeast $41,750 · South $36,100\nQuery is illustrative and not run against a database.`;
  if(id==='data-analysis-agent'){
    const rows=text.split(/\r?\n/).filter(x=>x.includes(','));
    if(rows.length>=2){const header=rows[0].split(',').map(x=>x.trim()), numeric=header.map((h,i)=>({h,i})).filter(({i})=>rows.slice(1).some(r=>Number.isFinite(Number(r.split(',')[i]))));if(numeric.length){const stats=numeric.map(({h,i})=>{const values=rows.slice(1).map(r=>Number(r.split(',')[i])).filter(Number.isFinite);const sum=values.reduce((s,x)=>s+x,0);return `${h}: ${values.length} values · sum ${sum.toFixed(2)} · mean ${(sum/values.length).toFixed(2)} · min ${Math.min(...values)} · max ${Math.max(...values)}`});return `LOCAL CSV QUICK PROFILE · ${rows.length-1} data rows\n\n${stats.join('\n')}\n\nParsed directly from the comma-separated text in your input. Basic parser: quoted delimiters are not supported.`}}
  }
  if(id==='meeting-notes-agent'){
    const actions=text.split(/\r?\n/).filter(line=>/\b(will|shall|action:|todo:|to-do:)\b/i.test(line));if(actions.length)return `MEETING ACTION CANDIDATES · extracted from supplied text\n\n${actions.map((x,i)=>`${i+1}. ${x.trim()}`).join('\n')}\n\nThese are candidate action lines, not verified commitments. Review owner and due date.`
  }
  if(id==='github-issue-triager'){
    const severity=/security|data loss|crash|cannot login|outage|production/i.test(text)?'HIGH':'MEDIUM';const category=/feature|could we|please add|request/i.test(text)?'feature':'bug';
    return `LOCAL ISSUE TRIAGE\n\nSeverity: ${severity}\nCategory: ${category}\nRoute: ${/login|button|browser|css|visual/i.test(text)?'frontend':'review required'}\n\nSummary: ${text.split(/[.!?\n]/)[0].slice(0,200)}\n\nFollow-up: request exact browser/OS version, expected behavior, and a minimal reproduction when missing.\n\nHeuristic classification only; not synced to GitHub.`
  }
  return fallback;
}
