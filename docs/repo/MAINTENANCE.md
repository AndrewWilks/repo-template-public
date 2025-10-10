# Maintenance and Cleanup Notes

This document records non-invasive cleanup actions taken as part of the pre‑M1 audit and suggests next safe steps.

Actions already applied on branch `chore/cleanup-pre-m1`:

- Added `CAN_BE_REMOVED.md` at repository root documenting safe-to-remove/generated files.
- Removed empty placeholder files: `configs/.gitkeep`, `docs/.gitkeep` and replaced them with `configs/README.md` and `docs/README.md`.
- Consolidated documentation: moved `CHANGELOG_GUIDE.md` and `cspell.README.md` into `docs/`.
- Added small README placeholders for `configs/` and `docs/`.
- Created this `docs/MAINTENANCE.md` to record actions and next steps.

Recommended next non-invasive actions (for review):

1. Convert draft PR to open and request review from the Issue #35 assignees.
2. Keep `dist/` untracked — builds are reproducible with `pnpm build`.
3. Defer larger doc restructures (e.g., moving `PROJECT_GUIDE.md`) until reviewers confirm.

Notes for reviewers:

- No source code behavior changes were made in this branch. Changes are limited to documentation and removing empty placeholders.
- Nothing dangerous was deleted; local-only directories such as `.pnpm/` remain untouched on local machines and are ignored by default.
