import { defineConfig, globalIgnores } from "eslint/config";
import typescriptEslint from "@typescript-eslint/eslint-plugin";
import globals from "globals";
import tsParser from "@typescript-eslint/parser";
import eslint from "@eslint/js";
import tseslint from "typescript-eslint";

export default defineConfig([
	globalIgnores(["**/dist"]),
	{
		extends: [
			eslint.configs.recommended,
			tseslint.configs.recommended,
		],

		plugins: {
			"@typescript-eslint": typescriptEslint,
		},

		languageOptions: {
			globals: {
				...globals.browser,
				...globals.webextensions,
			},

			parser: tsParser,
			ecmaVersion: 11,
			sourceType: "module",
		},

		rules: {
			"@typescript-eslint/no-non-null-assertion": 0,
			indent: ["error", "tab"],
			"linebreak-style": ["error", "unix"],
			quotes: ["error", "double"],
			semi: ["error", "always"],
		},
	},
	{
		files: ["*.cjs"],
		languageOptions: {
			sourceType: "commonjs",
		},
	},
]);
