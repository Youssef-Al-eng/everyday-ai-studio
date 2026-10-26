# Research Assistant

Break a question into a clear research brief using only the information you provide.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Analysts who need a first-pass briefing.

## Things to try

- Compare two approaches
- Summarize research notes
- List open questions
- Draft a sourced outline

## Example

What are the main trade-offs of remote work for a 10-person company?

## Input and output

Provide Question or notes. The result is Brief with findings and source limitations. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/web-research-agent. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/01-web-research-agent/agent.py (LangGraph). Design: Research & Editorial; see DESIGN_SYSTEMS.md.
