# cspell in this repository

- cspell CLI installed as a devDependency: cspell@9.2.1
- Config file: `cspell.json` (language set to en-AU)

## Usage

```pwsh
pnpm install
pnpm -s spell
# or run directly:
npx cspell "docs/**" "src/**" "*.md"
```

## Notes

- The config uses `en-AU` (Australian English). If you change cspell versions, update this file to reflect the installed version.
- Add repository-specific words to `cspell.json` under the `words` array to avoid false positives.
