# Everyday AI Studio

**Created by Youssef Alaa**

Everyday AI Studio is a local website with 20 practical helpers for research, writing, documents, code, data, planning, and everyday work. Pick a task, paste the information it needs, and review the result. Each helper has its own workspace.

## Run it

Requires Node.js 18 or newer. From this folder run:

```powershell
npm start
```

Open http://127.0.0.1:4173. Use **Sample result** without setting up an account or API key.

## Use real Groq AI (optional)

1. Copy `.env.example` to `.env`.
2. Add your replacement key after `GROQ_API_KEY=` in that local file. Never put the key in source files or browser code.
3. Restart the app, open a helper, choose **Groq AI · real request**, and submit your task. Your text is sent to Groq for that request.

**Live status (verified 2026-10-26):** all 20 helpers were tested against the real Groq API with a locally configured `GROQ_API_KEY` — every one received a valid, labeled `GROQ RESPONSE` from `openai/gpt-oss-20b`, rendered in the browser (evidence: `inventory/live-groq-verification.json` and `inventory/browser-verification.json`). Failure handling was also verified: an invalid credential returns an honest `AUTH` error, never a fake success. Any key shared in chat should still be rotated once testing is done; keep the replacement only in the local `.env`. [Groq model details](https://console.groq.com/docs/model/openai/gpt-oss-20b).

## The 20 helpers

| # | Helper | What it does | Try an example |
|---|---|---|---|
| 01 | [Research Assistant](http://127.0.0.1:4173/#/web-research-agent) | Break a question into a clear research brief using only the information you provide. | Example: What are the main trade-offs of remote work for a 10-person company? |
| 02 | [Code Reviewer](http://127.0.0.1:4173/#/code-review-agent) | Find likely bugs and security risks in code you paste, with evidence and suggested fixes. | Example: Review this function for security and correctness. |
| 03 | [Document Question Answerer](http://127.0.0.1:4173/#/pdf-qa-agent) | Answer questions using document text you paste and show which supplied passages support the answer. | Example: From the text below, what is the cancellation deadline? |
| 04 | [Database Query Helper](http://127.0.0.1:4173/#/sql-query-agent) | Turn a data question into a safe, read-only SQL suggestion for the sample sales tables. | Example: Show the five regions with the highest sales. |
| 05 | [Email Writer](http://127.0.0.1:4173/#/email-drafting-agent) | Draft a clear email from your notes and chosen tone; nothing is sent. | Example: Write a friendly follow-up asking for the delivery update by Friday. |
| 06 | [News Briefing Assistant](http://127.0.0.1:4173/#/news-summarizer-agent) | Group headlines you provide into themes and summarize what they say without fetching live news. | Example: Group these headlines into themes and note any disagreement. |
| 07 | [Bug Triage Assistant](http://127.0.0.1:4173/#/github-issue-triager) | Organize a bug report by urgency and identify details needed to reproduce it. | Example: The save button spins forever on Firefox; steps: edit profile and click save. |
| 08 | [Data Analyst](http://127.0.0.1:4173/#/data-analysis-agent) | Analyze figures you provide and explain calculations; the sample dataset is also available in demo mode. | Example: Compare revenue: Jan 120, Feb 150, Mar 135. |
| 09 | [Resume Details Extractor](http://127.0.0.1:4173/#/resume-parser-agent) | Pull work history, skills, and education from resume text without guessing missing facts. | Example: Extract the roles and skills from this resume text. |
| 10 | [Meeting Notes Assistant](http://127.0.0.1:4173/#/meeting-notes-agent) | Turn a transcript into decisions, tasks, owners, dates, and unanswered questions. | Example: Maya will send the budget Friday. Lee will book the room by Thursday. |
| 11 | [Company Comparison Helper](http://127.0.0.1:4173/#/stock-research-agent) | Compare company figures you provide and explain trade-offs without giving investment advice. | Example: Compare these fictional firms: A growth 18%, margin 12%; B growth 11%, margin 21%. |
| 12 | [Trip Planner](http://127.0.0.1:4173/#/travel-planner-agent) | Create a practical itinerary from your destination, time, budget, and travel preferences. | Example: Plan 3 days in Lisbon under €450 at a relaxed pace. |
| 13 | [Customer Support Reply Helper](http://127.0.0.1:4173/#/customer-support-agent) | Draft a helpful support reply from the customer message and policy text you provide. | Example: A replacement has not moved in tracking for five days. Policy: escalate after five business days. |
| 14 | [Social Post Writer](http://127.0.0.1:4173/#/social-media-agent) | Adapt a message for social channels while preserving the facts you supplied. | Example: Write LinkedIn and Instagram posts for our June 14–15 book fair. |
| 15 | [Test Case Writer](http://127.0.0.1:4173/#/unit-test-generator) | Draft test cases for code you provide, including useful edge cases; it does not run them. | Example: Write pytest cases for normalize_tag(value), which trims spaces and lowercases text. |
| 16 | [Documentation Writer](http://127.0.0.1:4173/#/documentation-writer) | Turn a project description or code into a practical first README draft. | Example: Write a README for a tool that validates required keys in a JSON settings file. |
| 17 | [Recipe Helper](http://127.0.0.1:4173/#/recipe-agent) | Suggest a meal from ingredients you have and the time or dietary preferences you specify. | Example: I have chickpeas, spinach, tomatoes, and lemon. Suggest a 20-minute dinner. |
| 18 | [Interview Preparation Coach](http://127.0.0.1:4173/#/job-application-agent) | Help you prepare honest interview stories and questions using the role and experience you provide. | Example: Help me prepare for a senior product designer interview using my checkout redesign experience. |
| 19 | [Market Research Comparator](http://127.0.0.1:4173/#/competitive-analysis-agent) | Compare products using facts you provide and separate evidence from assumptions. | Example: Compare these three project tools using the feature notes below. |
| 20 | [Pros and Cons Reviewer](http://127.0.0.1:4173/#/multi-agent-debate) | Stress-test a proposal with supporting, opposing, and balanced viewpoints from one model response. | Example: Should a 10-person team try a four-day work week for one month? |

## How the helpers differ

They share a local server and optional Groq connection, but each has a separate task prompt, validated output fields, and purpose-built workspace. Seven interface families organize the layouts: research/editorial, developer, data, communications, documents, guided learning, and monitoring. The real provider produces a single model response for a specialist task; role-based perspectives are formatted by that task prompt, not independent models.

## Test and screenshots

```powershell
npm test
npm run check
npm run screenshots
npm run live-test
npm run error-test
```

The live-test command checks all 20 workflows against the local provider path. With no configured key it records NOT VERIFIED without sending external requests; with a configured key it sends real Groq requests and records response excerpts as evidence. The error-test command verifies failure handling, including that an invalid key produces an honest AUTH error instead of a fake success. Automated provider tests use mocked responses and are reported separately from successful live AI tests. See [implementation and per-agent verification](IMPLEMENTATION_STATUS.md), [screenshots](SCREENSHOT_INDEX.md), and the in-app review at `/#/gallery`.

## Project files

- `portfolio/` — browser UI and local Node server.
- `apps/` — 20 agent READMEs and their screenshots.
- `packages/agent-runtime/` — per-agent workflows and response contracts.
- `packages/model-providers/` — server-side Groq adapter.
- `upstream-source/` — attributed upstream source export.
- `PROJECT_CATALOG.md`, `DESIGN_SYSTEMS.md`, `WORKSPACE_AUDIT.md`, `LICENSES_AND_ATTRIBUTION.md` — catalog and development notes.

The app works without paid services in sample mode. Document uploads, live browsing/news collection, actual database execution, and external email/ticket publishing are not connected.
