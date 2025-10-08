# Dev Standards

## Public Repo Template

![CI](https://github.com/AndrewWilks/repo-template-public/actions/workflows/ci.yml/badge.svg)
![CodeQL](https://github.com/AndrewWilks/repo-template-public/actions/workflows/codeql.yml/badge.svg)
![Dependabot](https://img.shields.io/github/dependabot/updates/AndrewWilks/repo-template-public?logo=dependabot)
![License](https://img.shields.io/github/license/AndrewWilks/repo-template-public?logo=apache)
![Conventional Commits](https://img.shields.io/badge/commit-conventional-brightgreen.svg?logo=git)

A public GitHub template repository that bakes in DevOps hygiene and optional AI assistance. Use it to start any Node/TypeScript project with:

- ✅ CI pipeline (pnpm, Node 20): lint → typecheck → test → build
- 🔒 Security-by-default: CodeQL + Dependabot
- 🗒️ Changelog discipline: PR template + guard, Keep a Changelog, AI‑drafted release notes
- 🧭 Conventional Commits enforced via commitlint
- 📚 Docs-as-code with architecture diagram and contributor guides
- ⚖️ Employer‑friendly Apache‑2.0 license

New here? Read the detailed design/build guide: [PROJECT_GUIDE.md](PROJECT_GUIDE.md)

---
## Table of Contents

- [What’s inside](#whats-inside)
- [Quickstart](#quickstart)
- [Scripts](#scripts)
- [AI features (optional)](#ai-features-optional)
- [CI/CD](#cicd)
- [Security](#security)
- [Changelog & releases](#changelog--releases)
- [Contributing](#contributing)
- [Roadmap](#roadmap)
- [FAQ](#faq)
- [License](#license)

---
## What’s inside

```
.github/
	ISSUE_TEMPLATE/         # bug/feature forms
	PULL_REQUEST_TEMPLATE.md
	workflows/
		ci.yml                # lint/type/test/build
		pr-changelog-guard.yml# enforce PR changelog block + AI suggest
		ai-changelog.yml      # draft release notes PR on merge
		codeql.yml            # security scanning
		dependabot.yml        # weekly updates
.commitlintrc.cjs         # Conventional Commits
.editorconfig             # consistent whitespace/newlines
.gitattributes            # LF endings
.gitignore
LICENSE                   # Apache-2.0
README.md                 # you are here
PROJECT_GUIDE.md          # full design/build guide
CONTRIBUTING.md           # PR process & local dev
CODE_OF_CONDUCT.md        # Contributor Covenant
SECURITY.md               # how to report issues
CHANGELOG.md              # Keep a Changelog format
CHANGELOG_GUIDE.md        # how to write entries
package.json              # scripts + dev deps
tsconfig.json             # TS compiler config
docs/
	architecture.md         # Mermaid of CI → PR → changelog flow
scripts/
	ai/changelog_check.mjs  # PR body validator + AI suggestions
	ai/changelog_generate.mjs# create draft notes from commits
	metrics/log_build.mjs   # optional telemetry demo
src/
	index.ts                # sample module
	index.test.ts           # placeholder test
```

---
## Scripts

- `pnpm lint` — lint placeholder (swap in ESLint later)
- `pnpm typecheck` — TypeScript project check
- `pnpm test` — test placeholder (swap in Vitest later)
- `pnpm build` — compile to `dist/`
- `pnpm verify` — run lint + typecheck + test

---
## AI features (optional)

Add **Settings → Secrets and variables → Actions**:

- `OPENAI_API_KEY` (required for AI features)
- `OPENAI_MODEL` (optional; default gpt-4o-mini)

AI‑assisted workflows:

- **PR Changelog Guard** (`.github/workflows/pr-changelog-guard.yml`)
	- Fails PRs missing a `## Changelog` section.
	- Prints a suggested entry based on `CHANGELOG_GUIDE.md` if AI is enabled.
- **AI Changelog on Merge** (`.github/workflows/ai-changelog.yml`)
	- On push to `main|master|release/**`, scans commits since last tag and opens a PR updating `CHANGELOG.md` with draft notes.

Humans remain reviewers. AI suggests text; you approve or edit.

---
## CI/CD

- CI runs on every PR and push to `main|master`.
- Pipeline: checkout → pnpm setup → install → lint → typecheck → test → build.
- CodeQL scans JS/TS on PR and weekly schedule.
- Dependabot opens weekly npm update PRs.

**Recommended next steps (Phase 2):**

- Matrix builds (Node 18/20/22)
- Preview deploy (develop) vs release (main)
- SBOM & license scan

See the Mermaid diagram in [docs/architecture.md](docs/architecture.md).

---
## Security

- Code scanning via CodeQL
- Dependency updates via Dependabot
- Vulnerability reports: see [SECURITY.md](SECURITY.md)

**Branch protection (suggested):**

- Require PR review (≥1)
- Required checks: CI, PR changelog guard

---
## Changelog & releases

We follow [Keep a Changelog](https://keepachangelog.com/) + SemVer.

- Write PRs with a `## Changelog` section (example entries in [CHANGELOG_GUIDE.md](CHANGELOG_GUIDE.md)).
- After merges to main, the AI workflow drafts notes and opens a PR to update `CHANGELOG.md`.
- Tag releases manually at first (`v0.1.0`). Later, consider Changesets or semantic‑release for automated versioning.

---
## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Highlights:

- Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `ci:`)
- Small, focused PRs using the provided template
- Add/Update tests and docs alongside code
- Fill the `## Changelog` block clearly

Code of Conduct: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md)

---
## Roadmap

- **Phase 1:** Public template MVP (CI, security, PR guard, AI release notes)
- **Phase 2:** Matrix builds, SBOM, preview→release environments, docs publishing
- **Phase 3:** AI PR summariser, AI issue triage, telemetry demo & dashboard
- **Phase 4:** Promotion to andrew-dev-standards monorepo with shared packages (eslint/ts/commitlint/changelog tools)

Track enhancements in Issues → Milestones.

---
## FAQ

**Do I have to use pnpm?**  
Nope. Swap to npm/yarn, and update `ci.yml` accordingly.

**What happens if I don’t set an OpenAI key?**  
AI steps are skipped; CI still runs normally.

**Why Apache‑2.0?**  
It’s permissive with an explicit patent grant — friendly for employers. Switch to MIT if you prefer.

**Can I use this for non‑Node projects?**  
Yes. Replace the scripts and TypeScript config; keep the workflows and docs.

---
## License

Copyright © 2025 Andrew Wilks.

Licensed under the Apache License 2.0. See [LICENSE](LICENSE) for details.