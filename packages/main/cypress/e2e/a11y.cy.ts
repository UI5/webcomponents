ui5AccDescribe("Automated accessibility tests", () => {
	it("Icon only", () => {
		cy.ui5CheckA11y()
	})
}, "http://localhost:8080/packages/main/test/pages/Button.html");