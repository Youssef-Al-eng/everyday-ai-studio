# Bug Triage Assistant

Organize a bug report by urgency and identify details needed to reproduce it.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Maintainers keeping a healthy, actionable backlog.

## Things to try

- Estimate severity
- Suggest a team to investigate
- Find missing reproduction steps
- Rewrite a vague report

## Example

The save button spins forever on Firefox; steps: edit profile and click save.

## Input and output

Provide Bug description. The result is Priority, category, routing suggestion and questions. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/github-issue-triager. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/07-github-issue-triager/agent.py (LangChain). Design: Industrial & Monitoring; see DESIGN_SYSTEMS.md.
