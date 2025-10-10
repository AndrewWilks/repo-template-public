import { describe, it, expect, vi } from "vitest";
import { run as guardRun } from "./pr-changelog-guard.mjs";

function makeGithubMock() {
  return {
    rest: {
      pulls: {
        get: vi.fn(),
      },
      issues: {
        listLabelsOnIssue: vi.fn(),
        createComment: vi.fn(),
        addLabels: vi.fn(),
        removeLabel: vi.fn(),
      },
    },
  };
}

describe("pr-changelog-guard", () => {
  it("comments and labels when changelog missing", async () => {
    const github = makeGithubMock();
    const prData = { data: { body: "", user: { login: "alice" } } };
    github.rest.pulls.get.mockResolvedValue(prData);
    github.rest.issues.listLabelsOnIssue.mockResolvedValue({ data: [] });

    const context = {
      repo: { owner: "o", repo: "r" },
      payload: { pull_request: { number: 1 } },
    };
    const core = { info: () => {}, warning: () => {} };
    const env = { BYPASS_LABELS: "", AUTHOR_ALLOWLIST: "" };

    await expect(guardRun(github, context, core, env)).rejects.toThrow(
      "PR is missing a required ## Changelog section."
    );

    expect(github.rest.issues.createComment).toHaveBeenCalled();
    expect(github.rest.issues.addLabels).toHaveBeenCalledWith(
      expect.objectContaining({ labels: ["needs-changelog"] })
    );
  });

  it("removes label when changelog present", async () => {
    const github = makeGithubMock();
    const body = "## Changelog\n\n### Added\n- something";
    const prData = { data: { body, user: { login: "alice" } } };
    github.rest.pulls.get.mockResolvedValue(prData);
    github.rest.issues.listLabelsOnIssue.mockResolvedValue({
      data: [{ name: "needs-changelog" }],
    });

    const context = {
      repo: { owner: "o", repo: "r" },
      payload: { pull_request: { number: 2 } },
    };
    const core = { info: () => {}, warning: () => {} };
    const env = { BYPASS_LABELS: "", AUTHOR_ALLOWLIST: "" };

    await expect(guardRun(github, context, core, env)).resolves.toBeUndefined();
    expect(github.rest.issues.removeLabel).toHaveBeenCalledWith(
      expect.objectContaining({ name: "needs-changelog" })
    );
  });
});
