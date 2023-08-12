module.exports = {
	root: true,
	parser: "@typescript-eslint/parser",
	extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
	plugins: ["svelte", "@typescript-eslint", "prettier"],
	ignorePatterns: ["*.cjs"],
	overrides: [
		{
			files: ["*.svelte"],
			parser: "svelte-eslint-parser",
			parserOptions: {
				parser: "@typescript-eslint/parser"
			}
		}
	],
	parserOptions: {
		sourceType: "module",
		ecmaVersion: 2020,
	},
	env: {
		browser: true,
		es2017: true,
		node: true,
	},
	rules: {
		"prettier/prettier": [
			"warn",
			{
				useTabs: false,
				singleQuote: false,
				semi: true,
				endOfLine: "crlf",
				bracketSameLine: false,
				trailingComma: "all",
				printWidth: 100,
				plugins: ["prettier-plugin-svelte", "prettier-plugin-tailwindcss"],
				pluginSearchDirs: ["."],
				overrides: [{ files: "*.svelte", options: { parser: "svelte" } }],
			},
		],
	},
};
