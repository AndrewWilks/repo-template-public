export async function run(github, context, core, env) {
  const prNumber = context.payload.issue.number;
  // Create a comment acknowledging the recheck
  await github.rest.issues.createComment({
    owner: context.repo.owner,
    repo: context.repo.repo,
    issue_number: prNumber,
    body: "Re-running PR changelog guard as requested...",
  });

  // Re-run by calling the checks API: request a re-run of the last workflow run for this PR
  const runs = await github.rest.actions.listWorkflowRunsForRepo({
    owner: context.repo.owner,
    repo: context.repo.repo,
    workflow_id: "pr-changelog-guard.yml",
    per_page: 10,
  });
  if (runs.data.workflow_runs.length) {
    const lastRun = runs.data.workflow_runs[0];
    await github.rest.actions.reRunWorkflow({
      owner: context.repo.owner,
      repo: context.repo.repo,
      run_id: lastRun.id,
    });
  }
}
