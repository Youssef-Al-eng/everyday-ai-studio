# Fieldnotes — local AI agent platform

A local-first workspace containing exactly 20 specialist AI-agent experiences inspired by real runnable examples in the upstream MIT repository. The directory, seven interface systems, task-specific workflows, backend-only Groq adapter, local run history, responsive layouts, and screenshot gallery work without installing dependencies.

## Start

Requires Node.js 18+. From the repository root:

```powershell
npm start
```

Open [http://127.0.0.1:4173](http://127.0.0.1:4173). Browse all apps at `/#/` and the screenshot gallery at `/#/gallery`.

## Optional Groq setup

Copy `.env.example` to `.env` and set `GROQ_API_KEY` and optionally `GROQ_MODEL`. The key is read by the Node server only and is never returned by status API. Restart after changing settings. Without a credential, the task-aware demo path is used automatically; a request failure is shown so you can retry or explicitly select demo. A key previously pasted into chat should be rotated before use.

## Agent catalog

| # | Agent | What it does |
|---|---|---|
| 01 | [Signal Research](#/web-research-agent) | Turn a broad question into a structured, source-aware research brief. |
| 02 | [Patchwork Review](#/code-review-agent) | Inspect a snippet for concrete risks, highlight evidence, and suggest safer code. |
| 03 | [Margin Notes](#/pdf-qa-agent) | Search a sample policy collection and inspect the passage behind each answer. |
| 04 | [Query Desk](#/sql-query-agent) | Translate a plain-language question into a read-only query against sample sales data. |
| 05 | [Correspondence](#/email-drafting-agent) | Shape context and tone into a useful draft that remains yours to review. |
| 06 | [Newsroom Brief](#/news-summarizer-agent) | Group a supplied set of headlines into themes and a traceable daily briefing. |
| 07 | [Issue Triage](#/github-issue-triager) | Prioritize a GitHub-style issue and surface the missing details before routing it. |
| 08 | [Metric Garden](#/data-analysis-agent) | Explore a compact sample dataset and compare sales by month. |
| 09 | [People Ledger](#/resume-parser-agent) | Extract a structured candidate profile and inspect confidence before use. |
| 10 | [Afterword](#/meeting-notes-agent) | Turn a short conversation into clear decisions, owners, and next steps. |
| 11 | [Fundamentals](#/stock-research-agent) | Compare basic fictional company metrics and explain the trade-offs. |
| 12 | [Elsewhere](#/travel-planner-agent) | Balance a destination, budget, and pace into a practical sample itinerary. |
| 13 | [Careline](#/customer-support-agent) | Retrieve a policy passage, draft a helpful reply, and flag escalation needs. |
| 14 | [Small Signal Studio](#/social-media-agent) | Adapt one message for three social channels without losing its point. |
| 15 | [Test Bench](#/unit-test-generator) | Draft readable pytest cases that cover ordinary and edge-case behavior. |
| 16 | [Cleartext Docs](#/documentation-writer) | Convert a compact module outline into a useful first README draft. |
| 17 | [The Pantry](#/recipe-agent) | Make something practical with the ingredients already on hand. |
| 18 | [Next Chapter](#/job-application-agent) | Build an interview prep outline from a role and a short profile. |
| 19 | [Market Map](#/competitive-analysis-agent) | Compare three fictional products and make assumptions visible. |
| 20 | [Counterpoint](#/multi-agent-debate) | Watch two distinct roles test a claim, then review a balanced synthesis. |

See [PROJECT_CATALOG.md](PROJECT_CATALOG.md), [WORKSPACE_AUDIT.md](WORKSPACE_AUDIT.md), [DESIGN_SYSTEMS.md](DESIGN_SYSTEMS.md), [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md), [MIGRATION.md](MIGRATION.md), and [LICENSES_AND_ATTRIBUTION.md](LICENSES_AND_ATTRIBUTION.md). Browse [the visual gallery](SCREENSHOT_INDEX.md) or open `/#/gallery` in the running platform.

## Verify and capture

```powershell
npm test
npm run check
npm run screenshots
```

Screenshot capture requires the already-installed Python Playwright package and Google Chrome path documented in `scripts/capture_and_smoke.py`. Tests use mocked Groq responses and deterministic app runs; they do not make paid model calls.

## Groq model setup

Copy .env.example to .env and set GROQ_API_KEY; optionally set GROQ_MODEL. The default openai/gpt-oss-20b is on Groq current supported-model list and is lower priced than GPT-OSS 120B at published rates. When configured, Verify model checks available identifiers. Groq retired llama-3.1-8b-instant for Developer-tier on Aug 16, 2026. See [supported models](https://console.groq.com/docs/models), [GPT-OSS 20B](https://console.groq.com/docs/model/openai/gpt-oss-20b), and [deprecations](https://console.groq.com/docs/deprecations). The key stays on the local backend. A key pasted into chat should be rotated before use.

## Honest limits

Some offline agents provide contextual heuristics while others show a fixed sample output; the page labels the result source. PDF upload, live web/news research, production databases, actual SQL execution, external GitHub/ticket sync, and email/social sending are not connected. Groq availability has not been verified in this workspace because no local key was present. Review the individual app README and status table before relying on a result.
