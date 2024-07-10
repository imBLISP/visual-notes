/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/react-internal.js"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    parser: '@typescript-eslint/parser',
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
};
