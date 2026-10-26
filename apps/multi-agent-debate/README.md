# Pros and Cons Reviewer

Stress-test a proposal with supporting, opposing, and balanced viewpoints from one model response.

Part of Everyday AI Studio — Created by Youssef Alaa.

## Who it helps

Teams pressure-testing a proposal before committing.

## Things to try

- Review a policy change
- Test a product proposal
- Identify risks
- Suggest a reversible pilot

## Example

Should a 10-person team try a four-day work week for one month?

## Input and output

Provide A claim or decision. The result is Pros, concerns and balanced next step. This build accepts pasted text, not file uploads.

## Open and use

Run npm start from the root, then open http://127.0.0.1:4173/#/multi-agent-debate. Review the example, edit the text, and choose Groq AI for a real request or Sample result for an offline demonstration.

## AI and privacy

Real requests use the server-side GROQ_API_KEY in your local .env. No secret is sent to the browser. Groq receives submitted text only in real AI mode. Failed requests show an error and retry button; they never silently become samples.

## Output and history

Copy the result from the page. Recent inputs and outputs are saved in this browser, and can be cleared with Clear history. Screenshots are in screenshots/desktop.png, screenshots/result.png, and screenshots/mobile.png.

## Limitations and verification

Live AI has not been verified without a replacement key. Sample mode uses fixed fixtures or local heuristics. No external sending, publishing, live browsing, SQL execution, or uploaded-file indexing is connected. Consult the root IMPLEMENTATION_STATUS.md and inventory/live-groq-verification.json for actual evidence.

Original source: upstream-source/agents/20-multi-agent-debate/agent.py (LangChain). Design: Research & Editorial; see DESIGN_SYSTEMS.md.
