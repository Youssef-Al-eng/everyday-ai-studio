# Project selection and task guide

The 20 maintained applications are the 20 selected numbered runnable examples inspected in the upstream source. Selection retains the portfolio's prior one-to-one mapping; source paths, frameworks, and candidate evidence are in [PROJECT_CATALOG.md](PROJECT_CATALOG.md) and [WORKSPACE_AUDIT.md](WORKSPACE_AUDIT.md). Public titles were simplified to describe each real task.

## 01. Research Assistant

Break a question into a clear research brief using only the information you provide.

**Try:** What are the main trade-offs of remote work for a 10-person company?

**Input:** Question or notes. **Output:** Brief with findings and source limitations.

**Source:** `agents/01-web-research-agent` · **Local route:** `/#/web-research-agent`

## 02. Code Reviewer

Find likely bugs and security risks in code you paste, with evidence and suggested fixes.

**Try:** Review this function for security and correctness.

**Input:** Code text. **Output:** Findings with severity and fixes.

**Source:** `agents/02-code-review-agent` · **Local route:** `/#/code-review-agent`

## 03. Document Question Answerer

Answer questions using document text you paste and show which supplied passages support the answer.

**Try:** From the text below, what is the cancellation deadline?

**Input:** Document text and a question. **Output:** Grounded answer with quoted evidence.

**Source:** `agents/03-pdf-qa-agent` · **Local route:** `/#/pdf-qa-agent`

## 04. Database Query Helper

Turn a data question into a safe, read-only SQL suggestion for the sample sales tables.

**Try:** Show the five regions with the highest sales.

**Input:** Question about the sample database. **Output:** SQL draft and plain-language explanation.

**Source:** `agents/04-sql-query-agent` · **Local route:** `/#/sql-query-agent`

## 05. Email Writer

Draft a clear email from your notes and chosen tone; nothing is sent.

**Try:** Write a friendly follow-up asking for the delivery update by Friday.

**Input:** Message context and desired tone. **Output:** Editable email draft and subject.

**Source:** `agents/05-email-drafting-agent` · **Local route:** `/#/email-drafting-agent`

## 06. News Briefing Assistant

Group headlines you provide into themes and summarize what they say without fetching live news.

**Try:** Group these headlines into themes and note any disagreement.

**Input:** Headlines or article excerpts. **Output:** Theme summary and source limitations.

**Source:** `agents/06-news-summarizer-agent` · **Local route:** `/#/news-summarizer-agent`

## 07. Bug Triage Assistant

Organize a bug report by urgency and identify details needed to reproduce it.

**Try:** The save button spins forever on Firefox; steps: edit profile and click save.

**Input:** Bug description. **Output:** Priority, category, routing suggestion and questions.

**Source:** `agents/07-github-issue-triager` · **Local route:** `/#/github-issue-triager`

## 08. Data Analyst

Analyze figures you provide and explain calculations; the sample dataset is also available in demo mode.

**Try:** Compare revenue: Jan 120, Feb 150, Mar 135.

**Input:** Question and data values. **Output:** Calculated summary with assumptions.

**Source:** `agents/08-data-analysis-agent` · **Local route:** `/#/data-analysis-agent`

## 09. Resume Details Extractor

Pull work history, skills, and education from resume text without guessing missing facts.

**Try:** Extract the roles and skills from this resume text.

**Input:** Resume text. **Output:** Structured profile with uncertainty notes.

**Source:** `agents/09-resume-parser-agent` · **Local route:** `/#/resume-parser-agent`

## 10. Meeting Notes Assistant

Turn a transcript into decisions, tasks, owners, dates, and unanswered questions.

**Try:** Maya will send the budget Friday. Lee will book the room by Thursday.

**Input:** Meeting transcript. **Output:** Summary and structured action list.

**Source:** `agents/10-meeting-notes-agent` · **Local route:** `/#/meeting-notes-agent`

## 11. Company Comparison Helper

Compare company figures you provide and explain trade-offs without giving investment advice.

**Try:** Compare these fictional firms: A growth 18%, margin 12%; B growth 11%, margin 21%.

**Input:** Company figures or notes. **Output:** Neutral comparison and caveats.

**Source:** `agents/11-stock-research-agent` · **Local route:** `/#/stock-research-agent`

## 12. Trip Planner

Create a practical itinerary from your destination, time, budget, and travel preferences.

**Try:** Plan 3 days in Lisbon under €450 at a relaxed pace.

**Input:** Destination, dates, budget and preferences. **Output:** Draft itinerary with assumptions.

**Source:** `agents/12-travel-planner-agent` · **Local route:** `/#/travel-planner-agent`

## 13. Customer Support Reply Helper

Draft a helpful support reply from the customer message and policy text you provide.

**Try:** A replacement has not moved in tracking for five days. Policy: escalate after five business days.

**Input:** Customer message and relevant policy. **Output:** Unsent reply and escalation note.

**Source:** `agents/13-customer-support-agent` · **Local route:** `/#/customer-support-agent`

## 14. Social Post Writer

Adapt a message for social channels while preserving the facts you supplied.

**Try:** Write LinkedIn and Instagram posts for our June 14–15 book fair.

**Input:** Announcement and target channels. **Output:** Editable post drafts.

**Source:** `agents/14-social-media-agent` · **Local route:** `/#/social-media-agent`

## 15. Test Case Writer

Draft test cases for code you provide, including useful edge cases; it does not run them.

**Try:** Write pytest cases for normalize_tag(value), which trims spaces and lowercases text.

**Input:** Code or function description. **Output:** Readable test code and coverage notes.

**Source:** `agents/15-unit-test-generator` · **Local route:** `/#/unit-test-generator`

## 16. Documentation Writer

Turn a project description or code into a practical first README draft.

**Try:** Write a README for a tool that validates required keys in a JSON settings file.

**Input:** Code or project notes. **Output:** Editable documentation draft.

**Source:** `agents/16-documentation-writer` · **Local route:** `/#/documentation-writer`

## 17. Recipe Helper

Suggest a meal from ingredients you have and the time or dietary preferences you specify.

**Try:** I have chickpeas, spinach, tomatoes, and lemon. Suggest a 20-minute dinner.

**Input:** Ingredients and preferences. **Output:** Recipe steps and practical notes.

**Source:** `agents/17-recipe-agent` · **Local route:** `/#/recipe-agent`

## 18. Interview Preparation Coach

Help you prepare honest interview stories and questions using the role and experience you provide.

**Try:** Help me prepare for a senior product designer interview using my checkout redesign experience.

**Input:** Job role and your experience. **Output:** Preparation outline and practice prompts.

**Source:** `agents/18-job-application-agent` · **Local route:** `/#/job-application-agent`

## 19. Market Research Comparator

Compare products using facts you provide and separate evidence from assumptions.

**Try:** Compare these three project tools using the feature notes below.

**Input:** Product notes or comparison data. **Output:** Comparison and evidence gaps.

**Source:** `agents/19-competitive-analysis-agent` · **Local route:** `/#/competitive-analysis-agent`

## 20. Pros and Cons Reviewer

Stress-test a proposal with supporting, opposing, and balanced viewpoints from one model response.

**Try:** Should a 10-person team try a four-day work week for one month?

**Input:** A claim or decision. **Output:** Pros, concerns and balanced next step.

**Source:** `agents/20-multi-agent-debate` · **Local route:** `/#/multi-agent-debate`
