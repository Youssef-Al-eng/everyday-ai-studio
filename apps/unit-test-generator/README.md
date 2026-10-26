# Test Bench

Drafts proposed pytest tests from supplied Python code. Generated code is not executed; run it in your own test environment and inspect it first.

## Who it helps

Developers finding useful cases before a test run.

## Open and run

Start the platform from its root using `npm start`, then open `http://127.0.0.1:4173/#/unit-test-generator`. Paste the input shown in the workspace and choose **Groq if configured** or **Deterministic demo only**.

## AI, integrations and privacy

The offline path runs locally and needs no API key. When a local `.env` contains `GROQ_API_KEY`, the backend can send the prompt text to Groq. The browser never receives the secret. Use your own permitted credential and review Groq's terms before sending sensitive text. This app does not call its upstream Python entry point. Upstream framework: LangChain.

## Files and outputs

The result can be copied from the browser. Recent prompts/results are stored in this browser's localStorage. Screenshots are in `screenshots/` (desktop, result and mobile). No output file is generated automatically.

## Limitations

Drafts proposed pytest tests from supplied Python code. Generated code is not executed; run it in your own test environment and inspect it first. See the platform's `IMPLEMENTATION_STATUS.md` for current test evidence.
