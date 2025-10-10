# Dev Standards

## Public Repo Template

![CI](https://github.com/AndrewWilks/repo-template-public/actions/workflows/ci.yml/badge.svg)
[![CodeQL](https://github.com/AndrewWilks/repo-template-public/actions/workflows/codeql.yml/badge.svg)](https://github.com/AndrewWilks/repo-template-public/security/code-scanning)
![Security](https://img.shields.io/badge/security-CodeQL%20%2B%20Dependabot-blue?logo=github)
![License](https://img.shields.io/github/license/AndrewWilks/repo-template-public?logo=apache)
![Conventional Commits](https://img.shields.io/badge/commit-conventional-brightgreen.svg?logo=git)
![Commitlint](https://github.com/AndrewWilks/repo-template-public/actions/workflows/commitlint.yml/badge.svg)
![Commitizen](https://img.shields.io/badge/commitizen-enabled-blue.svg)

A public GitHub template repository that bakes in DevOps hygiene and optional AI assistance. Use it to start any Node/TypeScript project with:

- ✅ CI pipeline (pnpm, Node 20): lint → typecheck → test → build
- 🔒 Security-by-default: CodeQL + Dependabot
- 🗒️ Changelog discipline: PR template + guard, Keep a Changelog, AI‑drafted release notes
- 🧭 Conventional Commits enforced via commitlint
- 📚 Docs-as-code with architecture diagram and contributor guides
- ⚖️ Employer‑friendly Apache‑2.0 license

New here? Read the detailed design/build guide: [PROJECT_GUIDE.md](PROJECT_GUIDE.md)

Case study and docs: see `docs/case-study/commitlint-case-study.md` for an in-depth write-up and examples (you can remove it from your fork if you prefer a smaller template).

---

## Table of Contents

- [Dev Standards](#dev-standards)
  - [Public Repo Template](#public-repo-template)
  - [Table of Contents](#table-of-contents)
  - [What’s inside](#whats-inside)
  - [Quickstart](#quickstart)
  - [Scripts](#scripts)
  - [Copilot features (optional)](#copilot-features-optional)
  - [CI/CD](#cicd)
  - [Security](#security)
  - [Changelog \& releases](#changelog--releases)
    - [PR changelog guard](#pr-changelog-guard)
  - [Contributing](#contributing)
    - [Conventional Commits](#conventional-commits)
  - [Roadmap](#roadmap)
  - [FAQ](#faq)
  - [Using this template](#using-this-template)
  - [License](#license)

---

## What’s inside

```text
 TODO: add tree output
```

---

## Quickstart

Clone (or use this as a template) then:

```pwsh
pnpm install     # install deps + setup husky hooks
pnpm verify      # run lint + typecheck + test + build
pnpm build       # compile TypeScript
node dist/index.js
```

Open `src/index.ts`, make a change, re-run `pnpm build` and execute again. For commit message help run `pnpm commitlint` after a few local commits.

See contribution details in [docs/repo/CONTRIBUTING.md](docs/repo/CONTRIBUTING.md). For conduct expectations read [docs/repo/CODE_OF_CONDUCT.md](docs/repo/CODE_OF_CONDUCT.md). Security reporting process: [docs/repo/SECURITY.md](docs/repo/SECURITY.md).

## Scripts

- `pnpm lint` — lint placeholder (swap in ESLint later)
- `pnpm typecheck` — TypeScript project check
- `pnpm test` — test placeholder (swap in Vitest later)
- `pnpm build` — compile to `dist/`
- `pnpm verify` — run lint + typecheck + test

## Copilot features (optional)

Enable GitHub Copilot (org or user level) — no repository secret required.

Copilot-assisted flows:

- **In-editor suggestions**: accelerate implementation & tests.
- **PR summaries (beta/feature flagged)**: generate a summary of changes; adapt into the `## Changelog` block.
- **Release note drafting**: when creating a GitHub Release, use "Generate release notes" then refine with Copilot Chat.
- **Changelog bullets**: ask Copilot Chat: _"Summarise the diff for PR #123 into Keep a Changelog Added/Changed/Fixed bullets"_.

Planned automation (optional): a future workflow can collect commits since last tag and open a draft PR; you then use Copilot to polish wording.

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

## Security

- Code scanning via CodeQL
- Dependency updates via Dependabot
- Vulnerability reports: see [docs/repo/SECURITY.md](docs/repo/SECURITY.md)

Case study: A short write-up describing the commitlint design and trade-offs is available at `docs/case-study/commitlint-case-study.md`. You can keep it as documentation for maintainers or remove it from template projects if you prefer a leaner repo.

**Branch protection (suggested):**

- Require PR review (≥1)
- Required checks: CI, PR changelog guard

## Changelog & releases

We follow [Keep a Changelog](https://keepachangelog.com/) + SemVer. See [docs/repo/CHANGELOG.md](docs/repo/CHANGELOG.md) for history and [CHANGELOG_GUIDE.md](./docs/CHANGELOG_GUIDE.md) for how to write entries.

- Write PRs with a `## Changelog` section (example entries in [CHANGELOG_GUIDE.md](./docs/CHANGELOG_GUIDE.md)).
- After merges to main, the Copilot-assisted workflow drafts notes and opens a PR to update `docs/repo/CHANGELOG.md`.
- Tag releases manually at first (`v0.1.0`). Later, consider Changesets or semantic‑release for automated versioning.

### PR changelog guard

This template includes a PR changelog guard that helps ensure every merged change has a human-readable entry in `docs/repo/CHANGELOG.md`.

- When a PR is opened or edited, the guard checks the PR body for a `## Changelog` block. If missing or empty, the guard:

  - Posts an actionable comment with a ready-to-copy changelog scaffold and a link to [CHANGELOG_GUIDE.md](CHANGELOG_GUIDE.md).
  - Adds the label `needs-changelog` to help triage.
  - Fails the workflow so branch protection can block merges until the changelog is added.

- Once the author adds the changelog, editing the PR body will re-run checks automatically. You can also trigger a manual recheck by commenting `/recheck-changelog` (if enabled) — see repo workflows.

- Maintainers can bypass the guard by applying a configured bypass label (for example `no-changelog-needed`) or when the PR carries an allowlisted label such as `chore` or `dependabot`.

- The guard also supports lightweight category detection and can add triage labels (for example `security`, `feature`, `fix`) when the changelog contains the corresponding `### Security` / `### Added` / `### Fixed` sections.

Note: enable GitHub Copilot for Pull Requests in the repository settings (Settings → Copilot → Pull requests) to get AI suggestions for drafting PR descriptions and changelog bullets directly in the PR UI.

## Contributing

See [docs/repo/CONTRIBUTING.md](docs/repo/CONTRIBUTING.md). Highlights:

- Conventional Commits (`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `ci:`)
- Small, focused PRs using the provided template
- Add/Update tests and docs alongside code
- Fill the `## Changelog` block clearly

Code of Conduct: [docs/repo/CODE_OF_CONDUCT.md](docs/repo/CODE_OF_CONDUCT.md)

### Conventional Commits

This repository follows the Conventional Commits convention and enforces it with `commitlint` using the `@commitlint/config-conventional` ruleset (see `.commitlintrc.cjs`).

Looking for the deeper rationale, rule tuning, UX decisions, and CI layering? Read the dedicated case study at [`docs/case-study/commitlint-case-study.md`](docs/case-study/commitlint-case-study.md).

Commit message format (one-line header):

```text
<type>[optional scope]: <description>
```

Where `type` is one of the following:

- feat: A new feature
- fix: A bug fix
- docs: Documentation only changes
- style: Formatting, missing semi-colons, etc (no code change)
- refactor: Code change that neither fixes a bug nor adds a feature
- perf: A code change that improves performance
- test: Adding or updating tests
- chore: Build process or auxiliary tools changes
- ci: Continuous Integration config and scripts
- revert: Reverts a previous commit

Examples:

- feat(api): add CSV import for CommSec statements
- fix(auth): handle expired tokens in refresh flow
- docs: update README with contributing guidelines
- refactor(db): simplify query builder for clarity
- chore(deps): bump devDependencies

Scope (optional) should be a short noun describing the area affected (for example `api`, `auth`, `ci`).

Keep the header short (≤72 chars). If you need a longer explanation, add a blank line and then body paragraphs after the header. For breaking changes include a footer with `BREAKING CHANGE: description`.

For local setup, install commitlint dev dependencies and use a git hook (husky is a common choice) to run `npx --no-install commitlint --edit "$1"` on commit messages, or rely on CI to validate commit messages on PRs.

## Roadmap

- **Phase 1:** Public template MVP (CI, security, PR guard, AI release notes)
- **Phase 2:** Matrix builds, SBOM, preview→release environments, docs publishing
- **Phase 3:** AI PR summariser, AI issue triage, telemetry demo & dashboard
- **Phase 4:** Promotion to andrew-dev-standards monorepo with shared packages (eslint/ts/commitlint/changelog tools)

Track enhancements in Issues → Milestones.

## FAQ

**Do I have to use pnpm?**  
Nope. Swap to npm/yarn, and update `ci.yml` accordingly.

**What if Copilot is disabled?**  
All automation still works; you just lose AI drafting aids (write changelog/release notes manually).

**Why Apache‑2.0?**  
It’s permissive with an explicit patent grant — friendly for employers. Switch to MIT if you prefer.

**Can I use this for non‑Node projects?**  
Yes. Replace the scripts and TypeScript config; keep the workflows and docs.

## Using this template

You can copy, fork, and strip down anything here under Apache-2.0. Attribution is appreciated but not required. If you keep a credit, something like:

> Based on <https://github.com/AndrewWilks/repo-template-public>

Please retain the `LICENSE` file and update `NOTICE` if you add third‑party components needing attribution.

## License

Copyright © 2025 Andrew Wilks.

Licensed under the Apache License 2.0. See [LICENSE](LICENSE) for full terms and [NOTICE](/docs/repo/NOTICE) for attribution updates.
