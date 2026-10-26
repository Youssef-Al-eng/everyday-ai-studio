# Implementation status

## Repository and runtime

The single maintainer repository is this workspace root. The upstream shallow clone was preserved as an external sibling archive at `../upstream-500-ai-agents-source`; a clean source export without Git metadata lives at `upstream-source/`. Central revision and mappings are documented in `MIGRATION.md`.

The local server and Groq adapter are implemented. It reads `GROQ_API_KEY` and `GROQ_MODEL` only on the backend; credentials are absent from frontend responses. A deterministic task-aware mode needs no key. Last browser pass: 20/20 app UI routes, 20/20 primary interactions, 0 console errors. Groq status from runtime probe: not configured; no live model request was made.

## Per-agent verification matrix

| Agent | UI | Primary interaction | Demo mode | Real Groq request | Screenshots | Known limitations |
|---|---|---|---|---|---|---|
| 01 Signal Research | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live source search is not connected. |
| 02 Patchwork Review | PASS | PASS · local heuristic | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 03 Margin Notes | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | No actual PDF upload/indexing yet. |
| 04 Query Desk | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Read-only SQL preview is not executed against SQLite. |
| 05 Correspondence | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 06 Newsroom Brief | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 07 Issue Triage | PASS | PASS · local heuristic | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 08 Metric Garden | PASS | PASS · local heuristic | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 09 People Ledger | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 10 Afterword | PASS | PASS · local heuristic | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 11 Fundamentals | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 12 Elsewhere | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 13 Careline | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 14 Small Signal Studio | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 15 Test Bench | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 16 Cleartext Docs | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 17 The Pantry | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 18 Next Chapter | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 19 Market Map | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |
| 20 Counterpoint | PASS | PASS · task-aware fixture | PASS | NOT TESTED · no local credential configured | PASS · desktop/result/mobile | Live external actions and upstream Python entry point are not connected. |

## What was actually verified

See `inventory/browser-verification.json` for individual browser results, `inventory/runtime-tests.txt` for automated runtime/provider tests, and `SCREENSHOT_INDEX.md` for image locations. Mocked provider tests validate request format and error mapping; these are not live AI requests. Groq was not tested because `GROQ_API_KEY` was not available in this process. No credential value was taken from chat content.

## Remaining product limitations

Most demo workflows return fixed task examples. Code review, issue triage, CSV quick profile, and meeting action candidate extraction use local heuristics. The model adapter sends the supplied text to Groq only when configured and selected; uploaded files, live search, actual SQLite execution, provider tool calling, and external send/publish actions are not connected. The API key value pasted into the chat should be rotated before use; enter the replacement only in local `.env`.
