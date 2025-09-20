import eslint from "@eslint/js";
import tseslint from "typescript-eslint";
import eslintReact from "eslint-plugin-react";
import eslintImport from "eslint-plugin-import";
import globals from "globals";

import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export default tseslint.config(
  // Replaces the ignorePatterns key
  {
    ignores: [
      "dist",
      "dev-dist",
      "coverage",
      "node_modules",
      ".vscode",
      ".github",
      "tailwind.config.ts",
      "vite.config.ts",
      "postcss.config.cjs",
      "eslint.config.mjs",
      "eslint.config.js", // Exclude this config file from linting
      "src/tests/**", // Exclude test files
    ],
  },

  eslint.configs.recommended, // Sets up ESLint's recommended config
  ...tseslint.configs.recommended, // Sets up typescript-eslint's requirements and its "recommended-type-checked" config

  // Config object with customizations
  {
    plugins: {
      react: eslintReact,
      import: eslintImport,
      // Other plugins...
    },

    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
          tsconfigRootDir: __dirname,
        },
        node: {
          paths: ["src"],
          extensions: [".js", ".jsx", ".ts", ".tsx"],
          moduleDirectory: ["node_modules"],
        },
      },
      react: {
        version: "detect",
      },
    },
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json", // Path to TypeScript config file
        tsconfigRootDir: __dirname, // Ensure ESLint resolves tsconfig.json correctly
        ecmaVersion: "latest", // Allows parsing the latest ECMAScript features
        sourceType: "module", // To support ES modules
      },
      globals: {
        ...Object.fromEntries(
          Object.entries(globals.browser).map(([key, value]) => [
            key.trim(),
            value,
          ])
        ),
        ...Object.fromEntries(
          Object.entries(globals.node).map(([key, value]) => [
            key.trim(),
            value,
          ])
        ),
      },
    },
    rules: {
      "no-console": ["warn", { allow: ["info", "warn", "error", "debug"] }],
      "prefer-destructuring": ["warn", { object: true, array: false }],
      "no-underscore-dangle": "off",
      "import/prefer-default-export": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "no-nested-ternary": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-var-requires": "off",
      "import/no-extraneous-dependencies": "off",
      "global-require": "off",
      "react/require-default-props": "off",
      "import/no-unresolved": "off",
      "import/no-named-as-default-member": "off",
      "import/default": "off",
      "@typescript-eslint/no-empty-interface": "off",
      "@typescript-eslint/no-unused-vars": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/restrict-template-expressions": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/parser": "off",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-unused-expressions": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "no-constant-binary-expression": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "off",
      "@typescript-eslint/unbound-method": "off",
    },
  }
);
