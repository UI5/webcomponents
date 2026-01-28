module.exports = {
	"files": ["**/cypress/**/*.ts", "**/cypress/**/*.tsx"],

	"plugins": [
		"cypress"
	],
	extends: [
		"plugin:cypress/recommended"
	],
	"env": {
		"cypress/globals": true
	},
	"rules": {
		"max-nested-callbacks": 0,
		"no-unused-expressions": 0,
		"@typescript-eslint/no-namespace": "off",
		"cypress/no-assigning-return-values": "error",
		"cypress/no-unnecessary-waiting": "error",
		"cypress/assertion-before-screenshot": "warn",
		"cypress/no-force": "warn",
		"cypress/no-async-tests": "error",
		"cypress/no-async-before": "error",
		"cypress/no-pause": "error",
		"import/no-extraneous-dependencies": [
			"error",
			{
				"devDependencies": [
					"**/cypress/**/*.ts"
				]
			}
		]
	}
};