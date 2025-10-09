# Changelog Guide

This guide explains how to write and curate entries in `CHANGELOG.md` using the **Keep a Changelog** categories and **SemVer** principles.

## Philosophy

The changelog is for humans first: it should communicate what changed, why it matters (briefly), and any required user action.

## Categories

Use only the standard headings (exact capitalization) in this order:

```text
### Added      # new features
### Changed    # existing behavior updates (non‑breaking)
### Deprecated # discouraged features, not yet removed
### Removed    # permanently removed features (breaking)
### Fixed      # bug fixes
### Security   # vulnerabilities or hardening
```

If a section has no entries for a release, omit it in that release block (keep it in Unreleased as scaffold).

## Mapping Commit Types → Categories

| Commit Type (Conventional) | Typical Changelog Section | Notes                                                    |
| -------------------------- | ------------------------- | -------------------------------------------------------- |
| feat                       | Added / Changed           | Added if new surface; Changed if enhancement to existing |
| fix                        | Fixed                     | Security if vulnerability                                |
| perf                       | Changed                   | If user‑visible; otherwise may omit                      |
| refactor                   | (Usually omit) / Changed  | Include only if user behavior or API affected            |
| docs                       | (Omit)                    | Unless docs shipped as part of feature                   |
| chore / ci / build         | (Omit)                    | Unless impacts consumers (e.g., drop Node version)       |
| deps (chore/deps)          | Changed / Security        | Security if addressing a CVE                             |
| revert                     | Changed / Removed         | Describe net effect                                      |

## Writing Rules

1. Start bullets with a verb in present tense: "Add", "Change", "Fix".
2. No trailing period unless multiple sentences are needed (rare).
3. Avoid internal ticket numbers; link PRs or issues inline: `(#123)`.
4. Breaking changes: add a bold **BREAKING** marker or use `Changed`/`Removed` and append an action note:
   - Example: `Remove legacy configuration flag '--foo' (BREAKING: use '--bar' instead).`
5. Security advisories: include CVE or GHSA identifier if public.
6. Group related minor fixes: `Fix several typos in README and CONTRIBUTING`.
7. Keep Unreleased tidy—squash noise before tagging a release.

## Release Flow

1. PRs include a `## Changelog` block with proposed bullets.
2. On merge, bullets accumulate under `## [Unreleased]`.
3. Before tagging:
   - Curate wording for consistency.
   - Remove empty category headings in the upcoming release block.
   - Update comparison links at bottom.
4. Tag `vX.Y.Z` and update `[Unreleased]` link to point from new tag to `HEAD`.

## Examples

```markdown
## [1.4.0] - 2025-11-03

### Added

- Add CSV importer for broker statements (#142)

### Changed

- Change default log level to 'info' (was 'warn') (#155)

### Fixed

- Fix race condition in cache warm logic (#151)

### Security

- Bump jsonwebtoken to 9.0.2 (GHSA-xxxx) (#160)
```

## Common Pitfalls

- Over‑verbosity: collapse internal refactors that have no external impact.
- Mixing tense: keep present tense for uniformity.
- Duplicating commit subjects verbatim—rewrite for reader clarity.

## Tooling Ideas (Future)

- PR bot that validates `## Changelog` presence.
- Automatic grouping + AI summarisation for large diff sets.
- Conventional Commits → provisional changelog generation script.

---

See current history in [`CHANGELOG.md`](CHANGELOG.md).
