# Afterword

Finds candidate action lines in supplied meeting notes. It does not establish whether the statement is a commitment; review owners and dates. Demo recognizes simple “will”/“action” phrasing.

## Who it helps

Teams that need reliable follow-through after meetings.

## Open and run

Start the platform from its root using `npm start`, then open `http://127.0.0.1:4173/#/meeting-notes-agent`. Paste the input shown in the workspace and choose **Groq if configured** or **Deterministic demo only**.

## AI, integrations and privacy

The offline path runs locally and needs no API key. When a local `.env` contains `GROQ_API_KEY`, the backend can send the prompt text to Groq. The browser never receives the secret. Use your own permitted credential and review Groq's terms before sending sensitive text. This app does not call its upstream Python entry point. Upstream framework: LangChain.

## Files and outputs

The result can be copied from the browser. Recent prompts/results are stored in this browser's localStorage. Screenshots are in `screenshots/` (desktop, result and mobile). No output file is generated automatically.

## Limitations

Finds candidate action lines in supplied meeting notes. It does not establish whether the statement is a commitment; review owners and dates. Demo recognizes simple “will”/“action” phrasing. See the platform's `IMPLEMENTATION_STATUS.md` for current test evidence.
