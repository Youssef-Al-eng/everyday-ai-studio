# Company Comparison Helper

Compare company figures you provide and explain trade-offs without giving investment advice.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Learners practicing evidence-led financial comparison.

## Things to try

- Compare growth and margins
- Explain missing context
- Summarize a filing excerpt
- List comparison questions

## Example

Compare these fictional firms: A growth 18%, margin 12%; B growth 11%, margin 21%.

## Input and output

Provide Company figures or notes. The result is Neutral comparison and caveats. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/stock-research-agent. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/11-stock-research-agent/agent.py (LangChain). Design: Data & Analytics; see DESIGN_SYSTEMS.md.
