# Meeting Notes Assistant

Turn a transcript into decisions, tasks, owners, dates, and unanswered questions.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Teams that need reliable follow-through after meetings.

## Things to try

- Summarize decisions
- List action items
- Find unassigned tasks
- Prepare a follow-up

## Example

Maya will send the budget Friday. Lee will book the room by Thursday.

## Input and output

Provide Meeting transcript. The result is Summary and structured action list. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/meeting-notes-agent. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/10-meeting-notes-agent/agent.py (LangChain). Design: Document & Knowledge; see DESIGN_SYSTEMS.md.
