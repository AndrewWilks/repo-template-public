# Case study — Enforcing Conventional Commits for repo-template-public

This case study describes the design decisions and implementation steps taken to add Conventional Commits enforcement to `repo-template-public`. Use it to understand our choices and to copy patterns into your own projects.

## Goals

- Enforce Conventional Commits in a developer-friendly way.
- Provide both local feedback (in-editor + commit-time) and repository-level enforcement (CI on PRs).
- Make it easy for forked repositories and contributors to adopt the rules.
- Keep the developer experience pleasant (allow reasonable header lengths and capitalisation).

## What we added

- 1. commitlint configuration

- File: `.commitlintrc.cjs`
- Extends `@commitlint/config-conventional` and specifies rules such as allowed types, subject non-empty, and line length guidance.
- We allow any case in scope and subject to avoid friction for developers who prefer sentence-case or Title Case.

1. Local hooks and UX

- Husky installed and configured via `prepare` script (`pnpm install` runs `husky install`).
- A `commit-msg` hook lives at `.husky/commit-msg`. It runs `npx --no-install commitlint --edit "$1"` and prints a friendly, formatted message with examples and links when validation fails.
- Two VS Code extensions are recommended in `.vscode/extensions.json`:
  - `niieani.vscode-commitlint` for live validation while typing commit messages.
  - `vivaxy.vscode-conventional-commit` for templates and quick authoring.

1. Developer tools

- Commitizen (cz-conventional-changelog) added to make compliant commits easier via `pnpm cz`.
- Helpful scripts in `package.json`:
  - `pnpm commitlint` — validate commits on your branch against `origin/main`.
  - `pnpm commitlint:msg` — validate a message file (useful in tests and local checks).
  - `pnpm cz` — guided commit creation.

1. CI enforcement

- GitHub Actions workflow: `.github/workflows/commitlint.yml` runs on pull requests and executes `pnpm commitlint` after a full checkout (`fetch-depth: 0`) so the action can examine the commit range in the PR.

1. Documentation

- `CONTRIBUTING.md` explains `pnpm install`, recommended extensions, and how to run local checks.
- This case study file explains the design and trade-offs.

## Developer experience notes

- Hooks will block invalid commits in the terminal and the VS Code Source Control UI (Git runs the same hooks).
- If a developer clones the repo and forgets to run `pnpm install`, CI will still catch bad commit messages on PRs.
- The commit hook prints raw commitlint output in addition to a friendly guide so fixing is straightforward.

## Safety & maintenance

- The CI job ensures repository-level enforcement (cannot be bypassed by skipping hooks locally).
- Rules are intentionally permissive on casing and lenient on header length (warning only) to avoid annoying developers and to ease adoption for forks.
- When upgrading Husky in future, remove deprecated `husky.sh` sourcing if migrating to Husky v10; hooks were authored to be forward-compatible.

## How to adopt in your project

1. Copy `.commitlintrc.cjs`, `.husky/commit-msg`, the `commitlint` scripts in `package.json`, and the CI workflow.
2. Add `@commitlint/cli` and `@commitlint/config-conventional` to devDependencies.
3. Add `husky` and run `pnpm install` to enable hooks.

## Acknowledgements

This case study is part of `repo-template-public` by Andrew Wilks and is intended to make commit discipline easy and reliable for public projects.
