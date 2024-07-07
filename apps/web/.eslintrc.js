/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js", "turbo"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // project: true,
  },
};
