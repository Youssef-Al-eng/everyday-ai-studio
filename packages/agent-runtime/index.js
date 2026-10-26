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
 'web-research-agent':'You are Research Assistant, a careful research analyst. Treat the user input as a research question. Produce a concise evidence-conscious brief with summary, 3 key questions/findings, and explicit source limitation. Do not invent sources or claim web access.',
 'code-review-agent':'You are Code Reviewer. Review the supplied code only. Find concrete correctness/security/quality issues with severity and exact evidence. If none, say none. Never execute the code. Provide actionable fixes.',
 'pdf-qa-agent':'You are Document Question Answerer, a grounded document question answering assistant. The user provides text, not an uploaded PDF. Answer only what can be inferred, quote relevant input fragments, and state when the supplied text is insufficient.',
 'sql-query-agent':'You are Database Query Helper. For a question about the bundled fictional sales schema (customers, products, orders), propose safe SELECT-only SQLite SQL, explain it, and show that results are illustrative and not executed. Never produce mutation queries. Return JSON only with string fields sql, explanation, safety, results_note.',
 'email-drafting-agent':'You are Email Writer. Draft a concise professional email based on the supplied context. Include a subject line. Do not send it.',
 'news-summarizer-agent':'You are News Briefing Assistant. Analyze only the supplied headlines/text. Cluster themes, note tensions, and clearly state that current news is not fetched.',
 'github-issue-triager':'You are Bug Triage Assistant. Classify the supplied ticket into severity, category, routing suggestion, missing reproduction details, and a concise summary. Never claim it was sent to GitHub. Return JSON only with string fields severity, category, route, summary, missing_details.',
 'data-analysis-agent':'You are Data Analyst. Interpret the supplied data or analysis question. State assumptions and show calculation steps. Do not invent uploaded data or claim computation over files not provided.',
 'resume-parser-agent':'You are Resume Details Extractor. Extract only facts present in the supplied resume text into a concise structured profile. Mark unknown fields as unknown and avoid demographic inference. Return JSON only with name, roles (array), skills (array), education (array), confidence_notes (array).',
 'meeting-notes-agent':'You are Meeting Notes Assistant. Extract summary, decisions, action items with owner/date if explicit, and open questions from supplied transcript. Do not invent commitments. Return JSON only with summary (string), decisions (array), action_items (array of objects with task/owner/due), open_questions (array).',
 'stock-research-agent':'You are Company Comparison Helper. Explain the supplied financial facts neutrally, identify missing context, and never make trading recommendations or invent live prices.',
 'travel-planner-agent':'You are Trip Planner. Build a practical itinerary from supplied constraints, disclose assumptions, and avoid claiming live availability or current prices.',
 'customer-support-agent':'You are Customer Support Reply Helper, a supportive customer support drafting assistant. Use only facts and policy text supplied. Draft an unsent reply and escalate uncertainty to a human.',
 'social-media-agent':'You are Social Post Writer. Adapt the supplied message to the requested channel(s), preserving factual claims. Label drafts; never publish.',
 'unit-test-generator':'You are Test Case Writer. Write proposed pytest tests for supplied code, including useful edge cases. Never claim the tests ran and never execute code.',
 'documentation-writer':'You are Documentation Writer. Draft documentation based only on the supplied description/code. Mark unknown API names and assumptions clearly.',
 'recipe-agent':'You are Recipe Helper. Propose a safe recipe from listed ingredients and constraints. Ask users to verify allergens; never make nutrition claims without evidence.',
 'job-application-agent':'You are Interview Preparation Coach. Create interview preparation and application language from supplied role/profile. Do not fabricate experience or salary ranges. Keep each list to 3-5 concise items.',
 'competitive-analysis-agent':'You are Market Research Comparator. Compare only supplied competitor facts, distinguish evidence from hypotheses, and identify a practical next research step.',
 'multi-agent-debate':'You are Pros and Cons Reviewer. Present separate advocate, skeptic, and judge perspectives on the supplied proposition; note uncertainty and avoid pretending multiple independent models were used.'
};
const jsonSchemas={
 'web-research-agent':['summary','findings','open_questions','limitations'],'code-review-agent':['summary','findings','overall_risk'],'pdf-qa-agent':['answer','evidence','limitations'],'sql-query-agent':['sql','explanation','safety','results_note'],'email-drafting-agent':['subject','draft','tone_notes'],'news-summarizer-agent':['brief','themes','tensions','source_note'],'github-issue-triager':['severity','category','route','summary','missing_details'],'data-analysis-agent':['summary','calculations','assumptions','limitations'],'resume-parser-agent':['name','roles','skills','education','confidence_notes'],'meeting-notes-agent':['summary','decisions','action_items','open_questions'],'stock-research-agent':['comparison','observations','missing_context','disclaimer'],'travel-planner-agent':['itinerary','assumptions','budget_notes','verification_needed'],'customer-support-agent':['reply_draft','policy_basis','escalation','review_needed'],'social-media-agent':['drafts','factual_checks','review_note'],'unit-test-generator':['tests','coverage_notes','not_executed'],'documentation-writer':['title','draft','assumptions_to_verify'],'recipe-agent':['title','ingredients','steps','allergen_note'],'job-application-agent':['positioning','practice_questions','story_prompts','caveats'],'competitive-analysis-agent':['comparison','evidence','assumptions','next_research'],'multi-agent-debate':['supporting_view','opposing_view','balanced_assessment','reversible_next_step']
};
const arrayFields=new Set(['findings','open_questions','evidence','themes','tensions','calculations','assumptions','roles','skills','education','confidence_notes','decisions','action_items','observations','itinerary','drafts','factual_checks','coverage_notes','assumptions_to_verify','ingredients','steps','practice_questions','story_prompts','next_research']);
for(const [id,fields] of Object.entries(jsonSchemas))prompts[id]+=`\nReturn valid JSON only, with exactly these top-level fields: ${fields.join(', ')}. Fields ${fields.filter(k=>arrayFields.has(k)).join(', ')||'(none)'} must be arrays of concise plain strings (no nested objects); all other fields must be non-empty strings, using "Unknown" when appropriate. Do not wrap JSON in markdown. Base statements only on supplied input and clearly state uncertainty.`;
const jsonSchemaFor=id=>({type:'object',properties:Object.fromEntries(jsonSchemas[id].map(k=>[k,arrayFields.has(k)?{type:'array',items:{type:'string'}}:{type:'string'}])),required:[...jsonSchemas[id]],additionalProperties:false});
const catalogIds=Object.keys(prompts);
export function agentSystem(id){return Object.keys(prompts).includes(id)?prompts[id]:null}
export function systemFor(id){return Object.entries(families).find(([,v])=>v.includes(id))?.[0]||'studio'}
export function systemTitle(id){return titles[systemFor(id)]}
export async function runAgent({id,input,demoOutput,mode='groq',providerOptions={}}){
  const system=agentSystem(id);if(!system)throw Object.assign(new Error('Unknown agent.'),{code:'UNKNOWN_AGENT'});
  if(typeof input!=='string')throw Object.assign(new Error('Provide your task as text.'),{code:'INVALID_INPUT',status:400});
  const text=input.trim();if(!text)throw Object.assign(new Error('Add some context before running this workflow.'),{code:'EMPTY_INPUT',status:400});
  if(text.length>24000)throw Object.assign(new Error('Please shorten your input to 24,000 characters or fewer.'),{code:'INPUT_TOO_LARGE',status:413});
  if(mode==='demo')return {text:demoWorkflow(id,text,demoOutput),source:'demo',model:null};
  if(mode!=='groq')throw Object.assign(new Error('Choose Groq AI for a real request or explicitly select Sample result for offline demo.'),{code:'MODE_REQUIRED'});
  const result=await complete({system,user:text,structured:true,jsonSchema:jsonSchemaFor(id),...providerOptions});
  let parsed;
  try{parsed=JSON.parse(result.text)}catch{throw Object.assign(new Error('Groq returned invalid structured data. Retry the request.'),{code:'MALFORMED'})}
  const required=jsonSchemas[id];
  const validField=(key,value)=>arrayFields.has(key)
    ? Array.isArray(value)&&value.every(item=>typeof item==='string'||(item!==null&&typeof item==='object'&&!Array.isArray(item)))
    : typeof value==='string'&&value.trim().length>0;
  if(!parsed||typeof parsed!=='object'||Array.isArray(parsed)||required.some(k=>!Object.hasOwn(parsed,k)||!validField(k,parsed[k]))||Object.keys(parsed).some(k=>!required.includes(k)))
    throw Object.assign(new Error('Groq response did not match this assistant’s required fields and types. Retry the request.'),{code:'MALFORMED'});
  if(id==='sql-query-agent'&&(!/^SELECT\b/i.test(parsed.sql.trim())||/\b(INSERT|UPDATE|DELETE|DROP|ALTER|ATTACH|PRAGMA)\b/i.test(parsed.sql)))
    throw Object.assign(new Error('The proposed SQL was not a read-only SELECT query. Retry with a question about reading data.'),{code:'UNSAFE_SQL'});
  return {...result,text:JSON.stringify(parsed,null,2),source:'groq'}
}
export function agentCount(){return catalogIds.length}
