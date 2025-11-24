// eslint.config.mjs
import js from "@eslint/js";
import globals from "globals";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import nextPlugin from "@next/eslint-plugin-next";
import importPlugin from "eslint-plugin-import";
import prettier from "eslint-config-prettier";

export default [
  // 기본 JS 권장 규칙
  js.configs.recommended,

  // Prettier와 충돌하는 규칙 무효화
  prettier,

  {
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: "./tsconfig.json",
        ecmaVersion: "latest",
        sourceType: "module",
      },
      globals: {
        ...globals.browser,
      },
    },

    plugins: {
      react,
      "react-hooks": reactHooks,
      "@typescript-eslint": ts,
      import: importPlugin,
      next: nextPlugin,
    },

    extends: [
      // Airbnb 스타일 (TS 지원)
      "airbnb",
      "airbnb-typescript",

      // TS 권장 규칙
      "plugin:@typescript-eslint/recommended",

      // React 권장 규칙
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",

      // Next.js 규칙
      "next/core-web-vitals",

      // Prettier 충돌 제거
      "prettier",
    ],

    settings: {
      react: {
        version: "detect",
      },
      "import/resolver": {
        typescript: true,
      },
    },

    rules: {
      // --- Airbnb 너무 빡센 규칙 완화 ---
      "import/prefer-default-export": "off",
      "react/jsx-props-no-spreading": "off",
      "react/react-in-jsx-scope": "off",
      "react/jsx-filename-extension": ["error", { extensions: [".tsx"] }],

      // TS rules
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/no-unused-vars": ["warn"],
      "@typescript-eslint/no-explicit-any": "off",

      // console 허용
      "no-console": ["warn", { allow: ["warn", "error"] }],

      // --- Import 자동 정렬 ---
      "import/order": [
        "warn",
        {
          groups: ["builtin", "external", "internal", ["parent", "sibling"], "index", "object"],
          alphabetize: { order: "asc", caseInsensitive: true },
          "newlines-between": "always",
        },
      ],
    },
  },
];
