# Contributing

Thanks for helping improve this template. This document covers local setup, workflow, commit conventions, and how to get help.

Related docs: [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md) • [SECURITY.md](SECURITY.md) • [README.md](README.md)

## Quick Start

```pwsh
pnpm install     # install deps + set up Husky hooks
pnpm verify      # lint + typecheck + build + test
pnpm test        # run placeholder tests
pnpm build       # compile TypeScript to dist/
```

Edit `src/index.ts`, re-run `pnpm build`, then execute:

```pwsh
node dist/index.js
```

## Development Workflow

1. Branch from `main`: `git switch -c feat/short-description`
2. Make focused commits (see Conventional Commits below).
3. Keep PRs small (prefer < ~400 line diffs excluding generated files).
4. Write or update tests alongside code changes.
5. Add a `## Changelog` section to your PR description following [CHANGELOG_GUIDE.md](CHANGELOG_GUIDE.md).
6. Ensure `pnpm verify` passes locally before pushing.

## Tooling & Scripts

See `package.json` for full list. Common scripts:

- `pnpm lint` – placeholder lint (swap in ESLint later)
- `pnpm typecheck` – TypeScript project validation
- `pnpm test` – runs the simple assertion test harness
- `pnpm build` – emits JS to `dist/`
- `pnpm verify` – run the full local CI pipeline
- `pnpm spell` – spell check markdown + src

## Commit Messages (Conventional Commits)

Commit messages are validated by `commitlint` (Husky hook). If blocked, adjust the header line.

Format:

```text
<type>[optional scope]: <description>
```

Common types: `feat`, `fix`, `docs`, `refactor`, `test`, `chore`, `ci`, `perf`, `style`.

Examples:

- feat(api): add CSV import for CommSec statements
- fix(auth): handle expired tokens in refresh flow
- docs: update README with contributing guidelines

Need deeper rationale? Case study: [`docs/case-study/commitlint-case-study.md`](docs/case-study/commitlint-case-study.md)

### Local Commit Checks

Check commits in your branch against `origin/main`:

```pwsh
pnpm commitlint
```

Validate a message file manually:

```pwsh
pnpm commitlint:msg .git/COMMIT_EDITMSG
```

Bypass (discouraged): `git commit --no-verify`

## Pull Requests

Include in the PR description:

- Purpose / context
- `## Changelog` section (Added / Changed / Fixed etc.)
- Screenshots for UI changes (if applicable)
- Follow-up tasks (if any)

CI must be green before review merge.

## Code of Conduct

Participation is governed by the [Code of Conduct](CODE_OF_CONDUCT.md). Behaviors that violate it may be reported per [SECURITY.md](SECURITY.md).

## Security Issues

Do not file public issues for vulnerabilities. Follow the private reporting process in [SECURITY.md](SECURITY.md).

## Getting Help

Open a discussion or issue for architecture questions or improvement ideas. For commit style help, see the VS Code extensions below.

## Recommended VS Code Extensions

- `niieani.vscode-commitlint` – live commitlint validation
- `vivaxy.vscode-conventional-commit` – commit message UI

---

Thank you for contributing! 🎉
