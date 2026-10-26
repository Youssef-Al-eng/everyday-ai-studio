# Database Query Helper

Turn a data question into a safe, read-only SQL suggestion for the sample sales tables.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Operators exploring structured business data.

## Things to try

- Find top regions by revenue
- Count monthly orders
- Explain a query
- Check a query for unsafe changes

## Example

Show the five regions with the highest sales.

## Input and output

Provide Question about the sample database. The result is SQL draft and plain-language explanation. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/sql-query-agent. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/04-sql-query-agent/agent.py (LangChain). Design: Data & Analytics; see DESIGN_SYSTEMS.md.
