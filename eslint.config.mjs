import prettier from "eslint-plugin-prettier"
import react from "eslint-plugin-react"
import reactNative from "eslint-plugin-react-native"
import globals from "globals"
import path from "node:path"
import { fileURLToPath } from "node:url"
import js from "@eslint/js"
import { FlatCompat } from "@eslint/eslintrc"

const _filename = fileURLToPath(import.meta.url)
const _dirname = path.dirname(_filename)

const compat = new FlatCompat({
  baseDirectory: _dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
})

export default [
  {
    ignores: ["**/metro.config.js"],
  },
  ...compat.extends(
    "standard-with-typescript",
    "plugin:react/recommended",
    "plugin:react/jsx-runtime",
    "eslint-config-prettier",
    "prettier",
  ),
  {
    plugins: {
      prettier,
      react,
      "react-native": reactNative,
    },

    languageOptions: {
      globals: {
        ...globals.browser,
        ...reactNative.environments["react-native"]["react-native"],
      },

      ecmaVersion: "latest",
      sourceType: "module",

      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },

    settings: {
      react: {
        version: "detect",
      },
    },

    rules: {
      "prettier/prettier": "warn",
      "linebreak-style": ["warn", "unix"],
      "@typescript-eslint/quotes": ["warn", "double"],
      quotes: ["warn", "double"],
      "no-unreachable": "warn",
      "@typescript-eslint/space-before-function-paren": "off",
      "@typescript-eslint/consistent-type-imports": "warn",

      "no-unused-expressions": [
        "warn",
        {
          allowShortCircuit: true,
        },
      ],

      "@typescript-eslint/no-non-null-assertion": "warn",
      "@typescript-eslint/no-namespace": 0,
      "@typescript-eslint/consistent-type-definitions": [1, "type"],
      "@typescript-eslint/no-misused-promises": "warn",
      "@typescript-eslint/explicit-function-return-type": "off",
      "react-native/no-unused-styles": 2,
      "react-native/split-platform-components": 2,
      "react-native/no-color-literals": "off",

      "react-native/no-raw-text": [
        2,
        {
          skip: ["HintText", "StyledTextByAbsoluteSize", "Title", "TitleText"],
        },
      ],

      "react-native/no-single-element-style-arrays": 2,
    },
  },
]
