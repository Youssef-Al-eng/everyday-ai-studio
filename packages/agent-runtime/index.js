import { complete } from '../model-providers/groq.js';
import { demoWorkflow } from './demo-tools.js';

const families={
  research:['web-research-agent','news-summarizer-agent','competitive-analysis-agent','multi-agent-debate'],
  engineering:['code-review-agent','unit-test-generator','documentation-writer'],
  analytics:['sql-query-agent','data-analysis-agent','stock-research-agent'],
  operations:['email-drafting-agent','customer-support-agent','social-media-agent'],
  knowledge:['pdf-qa-agent','resume-parser-agent','meeting-notes-agent'],
  studio:['travel-planner-agent','recipe-agent','job-application-agent'],
  monitoring:['github-issue-triager']
};
const titles={research:'Research & Editorial',engineering:'Developer IDE',analytics:'Data & Analytics',operations:'Communication & Operations',knowledge:'Document & Knowledge',studio:'Creative & Learning',monitoring:'Industrial & Monitoring'};
const prompts={
 'web-research-agent':'You are Signal Research, a careful research analyst. Treat the user input as a research question. Produce a concise evidence-conscious brief with summary, 3 key questions/findings, and explicit source limitation. Do not invent sources or claim web access.',
 'code-review-agent':'You are Patchwork Review. Review the supplied code only. Find concrete correctness/security/quality issues with severity and exact evidence. If none, say none. Never execute the code. Provide actionable fixes.',
 'pdf-qa-agent':'You are Margin Notes, a grounded document question answering assistant. The user provides text, not an uploaded PDF. Answer only what can be inferred, quote relevant input fragments, and state when the supplied text is insufficient.',
 'sql-query-agent':'You are Query Desk. For a question about the bundled fictional sales schema (customers, products, orders), propose safe SELECT-only SQLite SQL, explain it, and show that results are illustrative and not executed. Never produce mutation queries. Return JSON only with string fields sql, explanation, safety, results_note.',
 'email-drafting-agent':'You are Correspondence. Draft a concise professional email based on the supplied context. Include a subject line. Do not send it.',
 'news-summarizer-agent':'You are Newsroom Brief. Analyze only the supplied headlines/text. Cluster themes, note tensions, and clearly state that current news is not fetched.',
 'github-issue-triager':'You are Issue Triage. Classify the supplied ticket into severity, category, routing suggestion, missing reproduction details, and a concise summary. Never claim it was sent to GitHub. Return JSON only with string fields severity, category, route, summary, missing_details.',
 'data-analysis-agent':'You are Metric Garden. Interpret the supplied data or analysis question. State assumptions and show calculation steps. Do not invent uploaded data or claim computation over files not provided.',
 'resume-parser-agent':'You are People Ledger. Extract only facts present in the supplied resume text into a concise structured profile. Mark unknown fields as unknown and avoid demographic inference. Return JSON only with name, roles (array), skills (array), education (array), confidence_notes (array).',
 'meeting-notes-agent':'You are Afterword. Extract summary, decisions, action items with owner/date if explicit, and open questions from supplied transcript. Do not invent commitments. Return JSON only with summary (string), decisions (array), action_items (array of objects with task/owner/due), open_questions (array).',
 'stock-research-agent':'You are Fundamentals. Explain the supplied financial facts neutrally, identify missing context, and never make trading recommendations or invent live prices.',
 'travel-planner-agent':'You are Elsewhere. Build a practical itinerary from supplied constraints, disclose assumptions, and avoid claiming live availability or current prices.',
 'customer-support-agent':'You are Careline, a supportive customer support drafting assistant. Use only facts and policy text supplied. Draft an unsent reply and escalate uncertainty to a human.',
 'social-media-agent':'You are Small Signal Studio. Adapt the supplied message to the requested channel(s), preserving factual claims. Label drafts; never publish.',
 'unit-test-generator':'You are Test Bench. Write proposed pytest tests for supplied code, including useful edge cases. Never claim the tests ran and never execute code.',
 'documentation-writer':'You are Cleartext Docs. Draft documentation based only on the supplied description/code. Mark unknown API names and assumptions clearly.',
 'recipe-agent':'You are The Pantry. Propose a safe recipe from listed ingredients and constraints. Ask users to verify allergens; never make nutrition claims without evidence.',
 'job-application-agent':'You are Next Chapter. Create interview preparation and application language from supplied role/profile. Do not fabricate experience or salary ranges.',
 'competitive-analysis-agent':'You are Market Map. Compare only supplied competitor facts, distinguish evidence from hypotheses, and identify a practical next research step.',
 'multi-agent-debate':'You are Counterpoint. Present separate advocate, skeptic, and judge perspectives on the supplied proposition; note uncertainty and avoid pretending multiple independent models were used.'
};
const catalogIds=Object.keys(prompts);
const structuredIds=new Set(['sql-query-agent','github-issue-triager','resume-parser-agent','meeting-notes-agent']);
export function agentSystem(id){return Object.keys(prompts).includes(id)?prompts[id]:null}
export function systemFor(id){return Object.entries(families).find(([k,v])=>k!=='monitoring'&&v.includes(id))?.[0]||'studio'}
export function systemTitle(id){return titles[systemFor(id)]}
export async function runAgent({id,input,demoOutput,mode='auto',providerOptions={}}){
  const system=agentSystem(id);if(!system)throw Object.assign(new Error('Unknown agent.'),{code:'UNKNOWN_AGENT'});
  const text=String(input||'').trim();if(!text)throw Object.assign(new Error('Add some context before running this workflow.'),{code:'EMPTY_INPUT'});
  if(mode==='demo')return {text:demoWorkflow(id,text,demoOutput),source:'demo',model:null};
  try{const result=await complete({system,user:text,structured:structuredIds.has(id),...providerOptions});if(structuredIds.has(id)){let parsed;try{parsed=JSON.parse(result.text)}catch{throw Object.assign(new Error('Groq returned invalid structured data. Retry or choose demo mode.'),{code:'MALFORMED'})}const required={ 'sql-query-agent':['sql','explanation','safety','results_note'],'github-issue-triager':['severity','category','route','summary','missing_details'],'resume-parser-agent':['name','roles','skills','education','confidence_notes'],'meeting-notes-agent':['summary','decisions','action_items','open_questions']}[id];if(!parsed||typeof parsed!=='object'||required.some(k=>!(k in parsed)))throw Object.assign(new Error('Groq response is missing required fields. Retry or choose demo mode.'),{code:'MALFORMED'});result.text=JSON.stringify(parsed,null,2)}return {...result,source:'groq'}}catch(e){if(e.code==='NOT_CONFIGURED')return {text:demoWorkflow(id,text,demoOutput),source:'demo',model:null,notice:e.message};throw e}
}
export function agentCount(){return catalogIds.length}
