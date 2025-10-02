import cypressConfig from "@ui5/cypress-internal/cypress.config.js";

const suites = {
	SUITE1: [
		"**/specs/base/*.cy.{jsx,tsx}",
		"**/specs/[A-I]*.cy.{js,jsx,ts,tsx}",
	],
	SUITE2: [
		"**/specs/[^A-I]*.cy.{js,jsx,ts,tsx}",
	],
};

cypressConfig.component.specPattern = suites[process.env.TEST_SUITE] || ["**/specs/**/*.cy.{js,ts,jsx,tsx}"];

export default cypressConfig;
