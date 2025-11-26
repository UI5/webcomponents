const fs = require("fs");
const path = require("path");
const tsMode = fs.existsSync(path.join(process.cwd(), "tsconfig.json"));

/**
 * Returns eslint rules specific to typescript files
 * @returns
 */
const getTsModeOverrides = () => {
	const tsConfiguration = {
		files: ["*.ts"],
		parser: "@typescript-eslint/parser",
		plugins: ["@typescript-eslint"],
		extends: [
			"plugin:@typescript-eslint/recommended",
			"plugin:@typescript-eslint/recommended-requiring-type-checking"
		],
		parserOptions: {
			"project": [
				"./tsconfig.json"
			],
			EXPERIMENTAL_useSourceOfProjectReferenceRedirect: true,
		},
		rules: {
			"no-shadow": "off",
			"@typescript-eslint/consistent-type-imports": "error",
			"import/consistent-type-specifier-style": ["error", "prefer-top-level"],
			"@typescript-eslint/no-shadow": ["error"],
			"@typescript-eslint/no-unsafe-member-access": "off",
			"@typescript-eslint/no-floating-promises": "off",
			"@typescript-eslint/no-explicit-any": "off",
			"@typescript-eslint/no-unsafe-assignment": "off",
			"@typescript-eslint/ban-ts-comment": "off",
			"@typescript-eslint/no-unsafe-call": "off",
			"@typescript-eslint/no-non-null-assertion": "off",
			"@typescript-eslint/no-empty-function": "off",
			"@typescript-eslint/no-empty-interface": "off",
			"lines-between-class-members": "off",
		}
	};

	const tsxConfiguration = JSON.parse(JSON.stringify(tsConfiguration));
	tsxConfiguration.files = ["*.tsx"];
	tsxConfiguration.plugins.push("jsx-no-leaked-values");
	tsxConfiguration.rules = {
		...tsxConfiguration.rules,
		"jsx-no-leaked-values/jsx-no-leaked-values": "error",
		"@typescript-eslint/unbound-method": "off", // to be able to attach on* listeners
		"@typescript-eslint/no-misused-promises": "off", // to be able to have async event listeners
		"operator-linebreak": "off",
		"no-nested-ternary": "off",
		"implicit-arrow-linebreak": "off",
		"function-paren-newline": "off",
		"comma-dangle": "off"
	};

	return [
		tsConfiguration,
		tsxConfiguration
	];
}

module.exports = {
	"env": {
		"browser": true,
		"es6": true
	},
	"root": true,
	"extends": "airbnb-base",
	"overrides": tsMode ? getTsModeOverrides() : [],
	"parserOptions": {
		"ecmaVersion": 2018,
		"sourceType": "module"
	},
	"rules": {
		"comma-dangle": [2, "always-multiline"], // difference from openui5
		"no-cond-assign": 2,
		"no-console": 2,
		"no-constant-condition": 2,
		"no-control-regex": 2,
		"no-debugger": 2,
		"no-dupe-args": 2,
		"no-dupe-keys": 2,
		"no-duplicate-case": 2,
		"no-empty-character-class": 2,
		"no-empty": 2,
		"no-ex-assign": 2,
		"no-extra-boolean-cast": 1,
		"no-extra-parens": [2, "functions"],
		"no-extra-semi": 2,
		"no-func-assign": 2,
		"no-inner-declarations": [2, "functions"],
		"no-invalid-regexp": 2,
		"no-irregular-whitespace": 2,
		"no-negated-in-lhs": 2,
		"no-obj-calls": 2,
		"no-regex-spaces": 2,
		"no-sparse-arrays": 2,
		"no-trailing-spaces": 2,
		"no-unreachable": 2,
		"use-isnan": 2,
		// "valid-jsdoc": [1, { removed for UI5 WebComponents
		// 	"requireReturn": false
		// }],
		"valid-typeof": 2,
		"no-restricted-imports": ["error", {
			"allowTypeImports": true, // TODO: check if barrel reexport
			"patterns": [
				"@ui5/webcomponents-base/dist/*",
				"@ui5/webcomponents-theming/dist/*",
				"@ui5/webcomponents-localization/dist/*",
				"@ui5/webcomponents/dist/*",
			],
		}],
		"object-curly-newline": ["error", { "ImportDeclaration": "never", "ExportDeclaration": "never" }],

		"accessor-pairs": 2,
		"block-scoped-var": 1,
		// "consistent-return": 1, // removed for UI5 WebComponents
		"curly": [2, "all"],
		// "default-case": 1, // removed for UI5 WebComponents
		"import/extensions": ["error", "always"], // override for UI5 WebComponents
		"import/order": "off",
		"no-alert": 2,
		"no-caller": 2,
		"no-div-regex": 2,
		"no-eval": 2,
		"no-extend-native": 2,
		"no-extra-bind": 2,
		"no-fallthrough": 2,
		"no-floating-decimal": 2,
		"no-implied-eval": 2,
		"no-iterator": 2,
		"no-labels": 2,
		"no-lone-blocks": 2,
		"no-loop-func": 2,
		"no-native-reassign": 2,
		"no-new-func": 2,
		"no-new-wrappers": 1,
		"no-new": 1,
		"no-octal-escape": 2,
		"no-octal": 2,
		"no-proto": 2,
		"no-redeclare": 1,
		"no-return-assign": 2,
		"no-script-url": 2,
		"no-self-compare": 2,
		"no-sequences": 2,
		"no-unused-expressions": [1, { allowShortCircuit: true }],
		"no-void": 2,
		"no-warning-comments": 1,
		"no-with": 2,
		"radix": [2, "as-needed"],
		"wrap-iife": [2, "any"],
		"yoda": 2,

		"strict": [2, "function"],

		"no-catch-shadow": 2,
		"no-delete-var": 2,
		"no-label-var": 2,
		"no-shadow-restricted-names": 2,
		"no-undef-init": 2,
		"no-undef": 2,
		"no-unused-vars": [2, { "vars": "all", "args": "none" }],

		"brace-style": [2, "1tbs", { "allowSingleLine": true }],
		"camelcase": [1, { "properties": "never" }], // added for UI5 WebComponents
		"consistent-this": [1, "that"],
		"linebreak-style": 2,
		"max-nested-callbacks": [1, 3],
		"new-cap": 1,
		"new-parens": 2,
		"no-array-constructor": 2,
		"no-lonely-if": 1,
		"no-mixed-spaces-and-tabs": [2, "smart-tabs"],
		"no-nested-ternary": 2,
		"no-new-object": 2,
		"no-spaced-func": 2,
		"quote-props": [2, "as-needed", { "keywords": true, "unnecessary": false }],
		"semi-spacing": [1, { "before": false, "after": true }],
		"semi": 2,
		"keyword-spacing": 2,
		"space-infix-ops": 2,
		"space-unary-ops": [2, { "words": true, "nonwords": false }],
		// airbnb overrides
		"indent": [2, "tab"],
		"no-underscore-dangle": 0,
		"no-tabs": 0,
		"quotes": [2, "double", { "allowTemplateLiterals": true }],
		"no-useless-constructor": 0,
		"no-param-reassign": 0,
		"one-var": 0,
		"max-len": 0,
		"arrow-parens": [2, "as-needed"],
		"class-methods-use-this": 0,
		"no-plusplus": 0,
		"default-case": 0,
		"consistent-return": 0,
		"prefer-destructuring": 0,
		"arrow-body-style": 0,
		"import/no-unresolved": 0,
		"no-use-before-define": 0
	}
};
