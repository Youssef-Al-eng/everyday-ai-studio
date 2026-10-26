# Migration record

## Repository audit

At start, the portfolio workspace root was not a Git repository. The only directly related repository found was `upstream-500-ai-agents/`, a clean, shallow clone of `https://github.com/ashishpatel26/500-AI-Agents-Projects.git` at `9beeb721c2af551bacaab827a76bddaecaa0ca5e`, branch `main`, remote `origin`. It contained runnable numbered agents 01–21, an upstream web catalog, MIT license, and no local modifications. The existing 20 UI apps and screenshots were untracked static portfolio code outside Git. No other related repository was found in the workspace parent.

## Preserve and consolidate

- Central repository: current project root (initialized after backup/checkpoint).
- Original shallow clone, including its .git history metadata: moved intact to sibling `../upstream-500-ai-agents-source`. It was not deleted or modified.
- Clean tracked export without nested Git metadata: `upstream-source/`; contains the original tracked source files and root MIT license.
- Existing application IDs/source mapping retained in `apps/<id>/README.md` and `PROJECT_CATALOG.md`; existing screenshots were regenerated for the new UI.
- Shared Groq adapter: `packages/model-providers/groq.js`; agent contracts/prompts/tools: `packages/agent-runtime/`; frontend and local API: `portfolio/`.
- Root Git remote is not configured; no push or remote history change was made. Set the intended canonical remote yourself after review.

No prior portfolio Git commit history existed at the project root. The upstream history is a shallow snapshot; its preserved source archive links back to origin and records the exact source commit.
