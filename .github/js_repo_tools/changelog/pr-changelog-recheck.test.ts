import { describe, it, expect, vi } from "vitest";
import { run as recheckRun } from "./pr-changelog-recheck.mjs";

function makeGithubMock() {
  return {
    rest: {
      issues: {
        createComment: vi.fn(),
      },
      actions: {
        listWorkflowRunsForRepo: vi.fn(),
        reRunWorkflow: vi.fn(),
      },
    },
  };
}

describe("pr-changelog-recheck", () => {
  it("comments and re-runs workflow", async () => {
    const github = makeGithubMock();
    github.rest.actions.listWorkflowRunsForRepo.mockResolvedValue({
      data: { workflow_runs: [{ id: 123 }] },
    });
    const context = {
      repo: { owner: "o", repo: "r" },
      payload: { issue: { number: 5 } },
    };
    const core = {};
    const env = {};

    await recheckRun(github, context, core, env);
    expect(github.rest.issues.createComment).toHaveBeenCalled();
    expect(github.rest.actions.reRunWorkflow).toHaveBeenCalledWith(
      expect.objectContaining({ run_id: 123 })
    );
  });
});
