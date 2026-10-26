# Customer Support Reply Helper

Draft a helpful support reply from the customer message and policy text you provide.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Support teams responding consistently to common requests.

## Things to try

- Respond to a delayed order
- Summarize a complaint
- Flag a policy exception
- Suggest an escalation

## Example

A replacement has not moved in tracking for five days. Policy: escalate after five business days.

## Input and output

Provide Customer message and relevant policy. The result is Unsent reply and escalation note. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/customer-support-agent. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/13-customer-support-agent/agent.py (LangGraph). Design: Communication & Operations; see DESIGN_SYSTEMS.md.
