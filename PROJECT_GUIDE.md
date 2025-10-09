# PROJECT_GUIDE.md - repo-template-public

A complete, copy‑ready guide for contributors and maintainers of repo‑template-public. This describes the why, what, and how so anyone can stand up the template from an empty GitHub repository and extend it with confidence.

TL;DR: This template bakes in DevOps hygiene (CI, security, changelogs), Conventional Commits, and optional AI assistance for PRs and release notes. It’s intentionally lightweight so you can adapt it to any Node/TypeScript project.

---

## 1. Goals & Non‑Goals

### Goals

- Provide a professional public starter for Node/TypeScript projects.
- Make automation visible: CI, CodeQL, Dependabot, PR checks, changelog flows.
- Encourage small, well‑documented changes via PR templates and Conventional Commits.
- Offer AI assistance (optional) for PR changelog text and release note drafting.

### Non‑Goals

- This is not a framework; it’s a starter. Swap any tool (pnpm → npm, TS → JS) as needed.
- Not a monorepo by default; you can promote it later into a standards monorepo.

---

## 2. Repository Layout

```text
repo-template-public/
├─ .github/
│  ├─ ISSUE_TEMPLATE/
│  │  ├─ bug_report.yml
│  │  └─ feature_request.yml
│  ├─ PULL_REQUEST_TEMPLATE.md
│  └─ workflows/
│     ├─ ci.yml                   # build/lint/type/test
│     ├─ pr-changelog-guard.yml   # validate PR body and suggest text (AI)
│     ├─ ai-changelog.yml         # on merge: draft CHANGELOG and open PR
│     ├─ codeql.yml               # security scanning
│     └─ dependabot.yml           # weekly updates
├─ .commitlintrc.cjs
├─ .editorconfig
├─ .gitattributes
├─ .gitignore
├─ LICENSE                        # Apache-2.0 (employer‑friendly)
├─ README.md
├─ PROJECT_GUIDE.md               # ← this file
├─ CONTRIBUTING.md
├─ CODE_OF_CONDUCT.md
├─ SECURITY.md
├─ CHANGELOG.md
├─ CHANGELOG_GUIDE.md
├─ package.json
├─ tsconfig.json
├─ docs/
│  ├─ architecture.md             # Mermaid diagram of CI/PR/changelog flow
│  └─ api/auto.md                 # optional AI‑generated docs
├─ scripts/
│  ├─ ai/
│  │  ├─ changelog_check.mjs      # PR body validator + AI suggestions
│  │  └─ changelog_generate.mjs   # draft release notes from commits
│  ├─ metrics/
│  │  └─ log_build.mjs            # optional telemetry demo
│  └─ release/
│     └─ prepare_release.mjs      # optional version hook
└─ src/
    ├─ index.ts
    └─ index.test.ts               # placeholder; swap for Vitest later
```

---

## 3. Prerequisites

- Node 20+ and pnpm 9+ (or switch to npm/yarn)
- A GitHub repository (public). Default branch: main.
- Optional: OPENAI_API_KEY as a repository secret to enable AI features.

Install tools locally:

```sh
corepack enable && corepack prepare pnpm@latest --activate
pnpm -v   # should print v9.x
```

---

## 4. Quickstart (from an empty repo)

1. Create a new repo on GitHub named repo-template-public and clone it locally.
2. Initialise the workspace:

   ```sh
   pnpm init -y
   pnpm add -D typescript @commitlint/cli @commitlint/config-conventional
   pnpm tsc --init
   ```

3. Add the files from this guide (or copy from the canvas kit). Commit and push.
4. In GitHub → Settings → Actions → Secrets and variables → Actions:

   - Add OPENAI_API_KEY (optional; enables AI‑assisted steps).

5. Enable security:

   - Code scanning (CodeQL) → Enable for default branch
   - Dependabot alerts → On

6. Open a test PR to see CI and PR changelog guard in action.

---

## 5. Development Workflow

### Branching

- Default branch: main
- Feature branches: type/short-desc (e.g., feat/ai-changelog) using Conventional Commits in commit messages.

### Commit messages (Conventional Commits)

- Types: feat, fix, docs, refactor, test, chore, perf, ci
- Examples: feat(api): add CSV import, fix(auth): handle expired tokens

### Local scripts

```sh
pnpm verify   # lint + typecheck + test
pnpm build    # compiles to dist/
node dist/index.js
```

### Pull Requests

- Always use the PR template and fill the ## Changelog block.
- The PR guard fails PRs that omit the block; with OPENAI_API_KEY set, it prints suggested text.
- Keep PRs small and focused; include screenshots when relevant.

---

## 6. CI/CD Overview

### 6.1 ci.yml

- Triggers on PR and push to main|master.
- Steps: Checkout → pnpm setup → install → lint → typecheck → test → build.
- Some steps are non‑blocking (|| true) until you add real lint/tests; convert them to blocking as the project matures.

### 6.2 pr-changelog-guard.yml

- Triggers on PR open/edit/sync.
- Reads the PR body; fails if missing ## Changelog.
- If OPENAI_API_KEY exists, calls the OpenAI API to generate a concise changelog suggestion, printed in the logs.

### 6.3 ai-changelog.yml

- Triggers on push to main|master|release/\*\* and via manual dispatch.
- Gathers commits since last tag (if any).
- With OPENAI_API_KEY, drafts a Keep‑a‑Changelog entry and opens a PR updating CHANGELOG.md.
- Without a key, writes a placeholder entry.

### 6.4 Security workflows

- CodeQL runs on PR and weekly schedule.
- Dependabot opens weekly npm update PRs.

Environment variables used in workflows

- OPENAI_API_KEY (secret) - enables AI features
- OPENAI_MODEL (secret/variable) - defaults to gpt-4o-mini
- GITHUB_TOKEN - default token for creating PRs

---

## 7. Changelog Discipline

We follow Keep a Changelog and SemVer. See CHANGELOG_GUIDE.md for category definitions and examples.

- Every PR must include a ## Changelog section in the body.
- The PR guard enforces presence and optionally suggests text.
- On merge to main, the AI changelog workflow drafts entries and opens a PR for human review.

### Examples

```md
## Changelog

- Added: CSV import for CommSec statements
- Fixed: off‑by‑one error in monthly aggregation
```

```md
## Changelog

- Breaking: renamed env `DB_URL` → `DATABASE_URL`
  - Migration: update `.env` files and CI secrets
```

---

## 8. Security & Licensing

- CodeQL scans JavaScript/TypeScript for vulnerabilities and code smells.
- Dependabot checks dependency updates weekly.
- Apache‑2.0 license provides a permissive license with an explicit patent grant (commonly acceptable to employers). Swap to MIT if you prefer.
- Report issues via SECURITY.md (contact: <me@andrewwilks.au>).

---

## 9. Documentation as Code

- README.md contains high‑level overview and quickstart.
- PROJECT_GUIDE.md (this file) is the contributor handbook and design doc.
- docs/architecture.md holds a Mermaid diagram describing the CI → PR → changelog flow.
- Optional AI doc generation can write to docs/api/auto.md from comments/commits.
- Consider publishing docs to GitHub Pages later via a docs workflow.

---

## 10. Observability (Optional Demo)

- scripts/metrics/log_build.mjs writes a JSON line with build metadata. Hook it into CI to simulate telemetry and later push to a dashboard.
- Future: expose metrics via GitHub Pages or a tiny Cloudflare Worker API for a live visual.

---

## 11. Releases & Versioning

- Start with manual tagging for v0.1.0 after the first public milestone.
- Integrate Changesets or semantic‑release later for automatic semver bumps.
- The AI changelog workflow focuses on notes, not version numbers; pair it with your chosen versioning tool.

Manual release checklist

1. Ensure CHANGELOG.md has an entry for the release.
2. Create a Git tag vX.Y.Z and push tags.
3. Optionally create a GitHub Release with the same notes.

---

## 12. Roadmap (suggested next phases)

### Phase 2 - DevOps depth

- Matrix builds (Node 18/20/22)
- SBOM generation (CycloneDX) and license scan
- Preview deploy on develop; release on main

### Phase 3 - AI enhancements

- PR AI summariser that comments key changes and risk
- AI issue triage that proposes labels/size/areas

### Phase 4 - DX polish

- Repo init wizard CLI for quick customization
- Docs publishing pipeline (VitePress/Docusaurus)
- GitHub Project sync automation (issues ↔ project board)

---

## 13. Contribution Guide (Quick)

1. Pick an issue → create a branch type/short-desc.
2. Write small, focused commits with Conventional Commits.
3. Open a PR using the template; fill ## Changelog clearly.
4. Wait for green CI + PR guard; request review.
5. After merge, review the AI changelog PR and finalize notes.

---

## 14. Troubleshooting

- PR guard fails: Ensure the PR body contains a ## Changelog section. If AI suggestions don’t appear, check the OPENAI_API_KEY secret.
- ai‑changelog doesn’t open a PR: Ensure the workflow has contents: write permissions and the default GITHUB_TOKEN is available. Also check that fetch-depth: 0 is set for actions/checkout.
- CI step keeps passing even with problems: Some steps are initially non‑blocking (|| true). Remove those once linters/tests are configured.
- CodeQL not scanning: Go to Security → Code scanning alerts → “Set up” and ensure the workflow is enabled on main.

---

## 15. Maintainers & Contact

- Maintainer: Andrew Wilks (@AndrewWilks)
- Security contact: <me@andrewwilks.au>
- Code of Conduct: Contributor Covenant

---

## 16. License

This project is licensed under the Apache License 2.0. See LICENSE for details.
