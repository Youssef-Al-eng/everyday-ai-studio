# Data Analyst

Analyze figures you provide and explain calculations; the sample dataset is also available in demo mode.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Small teams getting oriented in unfamiliar data.

## Things to try

- Summarize a CSV excerpt
- Compare monthly totals
- Calculate averages
- Identify outliers

## Example

Compare revenue: Jan 120, Feb 150, Mar 135.

## Input and output

Provide Question and data values. The result is Calculated summary with assumptions. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/data-analysis-agent. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/08-data-analysis-agent/agent.py (LangChain). Design: Data & Analytics; see DESIGN_SYSTEMS.md.
