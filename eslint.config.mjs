// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import importPlugin from "eslint-plugin-import";
import nextPlugin from "@next/eslint-plugin-next";

export default [
  { ignores: ["**/.next/**"] },
  { settings: { react: { version: "detect" } } },
  js.configs.recommended,
  ...tsPlugin.configs["flat/recommended"],
  reactPlugin.configs.flat.recommended,
  reactHooksPlugin.configs.flat["recommended-latest"],
  nextPlugin.configs["core-web-vitals"],
  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: { project: "./tsconfig.json", ecmaVersion: "latest", sourceType: "module" },
      globals: { ...globals.browser },
    },
    plugins: {
      import: importPlugin,
    },
    rules: {
      "react/jsx-no-bind": [
        "error",
        {
          allowArrowFunctions: true,
          ignoreDOMComponents: true,
        },
      ],
      "react/jsx-key": [
        "error",
        {
          checkFragmentShorthand: true,
          warnOnDuplicates: true,
        },
      ],
      "no-param-reassign": [
        "error",
        {
          props: true,
          ignorePropertyModificationsFor: ["state"], // Zustand state 예외
        },
      ],
      "no-new-func": "error",
      "no-eval": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      "no-var": "error",
      "prefer-const": "error",
      "no-return-await": "off", // TS에서는 필요할 수 있음
      "@typescript-eslint/return-await": ["warn", "in-try-catch"],
      "import/no-default-export": "off",
      "import/no-cycle": "error",
      "import/no-duplicates": "error",
      "react/self-closing-comp": "error",
      "react/no-unstable-nested-components": "error",
      "react/no-array-index-key": "warn",
      "@typescript-eslint/prefer-optional-chain": "error",
      "@typescript-eslint/no-unnecessary-condition": "warn",
      "@typescript-eslint/no-misused-promises": "error",
      "@typescript-eslint/no-floating-promises": "error",
      "import/prefer-default-export": "error",
      "react/jsx-props-no-spreading": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["error"],
      "@typescript-eslint/no-explicit-any": "error",
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index", "object"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
      "prefer-arrow-callback": [
        "warn",
        {
          allowNamedFunctions: false,
        },
      ],
      "func-style": [
        "warn",
        "expression",
        {
          allowArrowFunctions: true,
        },
      ],
      "arrow-body-style": ["warn", "as-needed"],
    },
  },
];
