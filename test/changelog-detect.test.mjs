import { describe, it, expect } from "vitest";
import { hasChangelog } from "../scripts/changelog-detect.mjs";

describe("changelog-detect", () => {
  it("detects a changelog with a bullet", () => {
    const body = `## Changelog\n### Added\n- Add new feature\n`;
    expect(hasChangelog(body)).toBe(true);
  });

  it("fails when heading present but no bullet", () => {
    const body = `## Changelog\n### Added\n`;
    expect(hasChangelog(body)).toBe(false);
  });

  it("accepts different heading styles", () => {
    const body = `### Changelog:\n### Fixed\n- Fix bug\n`;
    expect(hasChangelog(body)).toBe(true);
  });

  it("fails when no changelog present", () => {
    const body = `Some description\nNo changelog here\n`;
    expect(hasChangelog(body)).toBe(false);
  });
});
