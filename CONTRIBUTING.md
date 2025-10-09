# Contributing

Thanks for helping improve this template. A few notes to get started.

## Setup

1. Install dependencies and enable Husky hooks:

```pwsh
pnpm install
```

2. Recommended VS Code extensions (you'll be prompted when opening the workspace):

- `niieani.vscode-commitlint` — live commitlint validation
- `vivaxy.vscode-conventional-commit` — commit message templates and UI

## Commit messages

We use Conventional Commits. Commit messages are validated by `commitlint` on every commit via Husky. If your commit is blocked, follow the guidance printed in the commit hook output or use the recommended VS Code extensions to author messages.

Need the full background and rationale? See the detailed case study: [`docs/case-study/commitlint-case-study.md`](docs/case-study/commitlint-case-study.md).

Local checks:

- Check commits in your branch against `origin/main`:

```pwsh
pnpm commitlint
```

- Validate a message file manually:

```pwsh
pnpm commitlint:msg .git/COMMIT_EDITMSG
```

If you need to bypass the hook for a particular commit (discouraged), you can use `git commit --no-verify`.
