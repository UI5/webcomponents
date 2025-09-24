import cypressConfig from "@ui5/cypress-internal/cypress.config.js";

const suites = {
	SUITE1: [
		"**/specs/base/*.cy.{jsx,tsx}",
		"**/specs/[A-D]*.cy.{js,jsx,ts,tsx}",
	],
	SUITE2: [
		"**/specs/[E-L]*.cy.{js,jsx,ts,tsx}",
	],
    SUITE3: [
        "**/specs/[M-R]*.cy.{js,jsx,ts,tsx}",
    ],
    SUITE4: [
        "**/specs/[S-Z]*.cy.{js,jsx,ts,tsx}",
    ],
};

cypressConfig.component.specPattern = suites[process.env.TEST_SUITE] || ["**/specs/**/*.cy.{js,ts,jsx,tsx}"];

export default cypressConfig;
