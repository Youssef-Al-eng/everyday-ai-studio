# Market Research Comparator

Compare products using facts you provide and separate evidence from assumptions.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Product teams organizing hypotheses before new research.

## Things to try

- Compare product features
- Map audience differences
- List unknowns
- Suggest next research questions

## Example

Compare these three project tools using the feature notes below.

## Input and output

Provide Product notes or comparison data. The result is Comparison and evidence gaps. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/competitive-analysis-agent. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/19-competitive-analysis-agent/agent.py (LangGraph). Design: Research & Editorial; see DESIGN_SYSTEMS.md.
