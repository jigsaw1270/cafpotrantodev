import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "prettier"
  ),
  {
    files: ["**/*.{js,jsx,ts,tsx}"],
    ignores: ["git-save*.js", "unlock-admin.js", "node_modules/**", "backend/**"],
    rules: {
      "@typescript-eslint/no-unused-vars": "warn",
      "@typescript-eslint/no-explicit-any": "off", // Disabled to avoid blocking commits
      "prefer-const": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "@next/next/no-img-element": "off",
      "@next/next/no-html-link-for-pages": "warn", // Changed from error to warning
      "react/no-unescaped-entities": "off",
    },
  },
];

export default eslintConfig;
