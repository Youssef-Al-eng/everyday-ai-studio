# Project catalog

Exactly 20 primary agents. Every route is available from the local directory and gallery. The upstream source entry is preserved in the vendored source export.

| # | Agent | Practical task | Design system | Upstream framework | Local and upstream location |
|---|---|---|---|---|---|
| 01 | Signal Research | Turn a broad question into a structured, source-aware research brief. | Research & Editorial | LangGraph | `apps/web-research-agent/` · `upstream-source/agents/01-web-research-agent/agent.py` |
| 02 | Patchwork Review | Inspect a snippet for concrete risks, highlight evidence, and suggest safer code. | Developer IDE | LangChain | `apps/code-review-agent/` · `upstream-source/agents/02-code-review-agent/agent.py` |
| 03 | Margin Notes | Search a sample policy collection and inspect the passage behind each answer. | Document & Knowledge | LlamaIndex | `apps/pdf-qa-agent/` · `upstream-source/agents/03-pdf-qa-agent/agent.py` |
| 04 | Query Desk | Translate a plain-language question into a read-only query against sample sales data. | Data & Analytics | LangChain | `apps/sql-query-agent/` · `upstream-source/agents/04-sql-query-agent/agent.py` |
| 05 | Correspondence | Shape context and tone into a useful draft that remains yours to review. | Communication & Operations | CrewAI | `apps/email-drafting-agent/` · `upstream-source/agents/05-email-drafting-agent/agent.py` |
| 06 | Newsroom Brief | Group a supplied set of headlines into themes and a traceable daily briefing. | Research & Editorial | LangChain | `apps/news-summarizer-agent/` · `upstream-source/agents/06-news-summarizer-agent/agent.py` |
| 07 | Issue Triage | Prioritize a GitHub-style issue and surface the missing details before routing it. | Industrial & Monitoring | LangChain | `apps/github-issue-triager/` · `upstream-source/agents/07-github-issue-triager/agent.py` |
| 08 | Metric Garden | Explore a compact sample dataset and compare sales by month. | Data & Analytics | LangChain | `apps/data-analysis-agent/` · `upstream-source/agents/08-data-analysis-agent/agent.py` |
| 09 | People Ledger | Extract a structured candidate profile and inspect confidence before use. | Document & Knowledge | LangChain | `apps/resume-parser-agent/` · `upstream-source/agents/09-resume-parser-agent/agent.py` |
| 10 | Afterword | Turn a short conversation into clear decisions, owners, and next steps. | Document & Knowledge | LangChain | `apps/meeting-notes-agent/` · `upstream-source/agents/10-meeting-notes-agent/agent.py` |
| 11 | Fundamentals | Compare basic fictional company metrics and explain the trade-offs. | Data & Analytics | LangChain | `apps/stock-research-agent/` · `upstream-source/agents/11-stock-research-agent/agent.py` |
| 12 | Elsewhere | Balance a destination, budget, and pace into a practical sample itinerary. | Creative & Learning | CrewAI | `apps/travel-planner-agent/` · `upstream-source/agents/12-travel-planner-agent/agent.py` |
| 13 | Careline | Retrieve a policy passage, draft a helpful reply, and flag escalation needs. | Communication & Operations | LangGraph | `apps/customer-support-agent/` · `upstream-source/agents/13-customer-support-agent/agent.py` |
| 14 | Small Signal Studio | Adapt one message for three social channels without losing its point. | Communication & Operations | CrewAI | `apps/social-media-agent/` · `upstream-source/agents/14-social-media-agent/agent.py` |
| 15 | Test Bench | Draft readable pytest cases that cover ordinary and edge-case behavior. | Developer IDE | LangChain | `apps/unit-test-generator/` · `upstream-source/agents/15-unit-test-generator/agent.py` |
| 16 | Cleartext Docs | Convert a compact module outline into a useful first README draft. | Developer IDE | LangChain | `apps/documentation-writer/` · `upstream-source/agents/16-documentation-writer/agent.py` |
| 17 | The Pantry | Make something practical with the ingredients already on hand. | Creative & Learning | LangChain | `apps/recipe-agent/` · `upstream-source/agents/17-recipe-agent/agent.py` |
| 18 | Next Chapter | Build an interview prep outline from a role and a short profile. | Creative & Learning | CrewAI | `apps/job-application-agent/` · `upstream-source/agents/18-job-application-agent/agent.py` |
| 19 | Market Map | Compare three fictional products and make assumptions visible. | Research & Editorial | LangGraph | `apps/competitive-analysis-agent/` · `upstream-source/agents/19-competitive-analysis-agent/agent.py` |
| 20 | Counterpoint | Watch two distinct roles test a claim, then review a balanced synthesis. | Research & Editorial | LangChain | `apps/multi-agent-debate/` · `upstream-source/agents/20-multi-agent-debate/agent.py` |
