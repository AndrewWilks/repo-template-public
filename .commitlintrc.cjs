module.exports = {
  extends: ["@commitlint/config-conventional"],
  rules: {
    // enforce a known set of types
    "type-enum": [
      2,
      "always",
      [
        "feat",
        "fix",
        "docs",
        "style",
        "refactor",
        "perf",
        "test",
        "chore",
        "ci",
        "build",
        "revert",
      ],
    ],
    // allow scope to be any case (user requested case sensitivity allowed)
    "scope-case": [0, "always", []],
    // subject must not be empty
    "subject-empty": [2, "never"],
    // allow any case in the subject (user requested case sensitivity allowed)
    "subject-case": [0, "never"],
    // subject max length
    "subject-max-length": [2, "always", 100],
    // header max length (warning only to avoid annoying devs for older commits)
    "header-max-length": [1, "always", 100],
    // body max line length (warning)
    "body-max-line-length": [1, "always", 100],
  },
  parserPreset: {
    parserOpts: {
      noteKeywords: ["BREAKING CHANGE", "BREAKING CHANGES"],
    },
  },
};
