import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("OpenUI5 Dialog opens and closes with Escape, focus returns to opener", () => {
		cy.get("#openUI5Button")
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Dialog1")
			.should('not.exist');

		cy.get("#openUI5Button")
			.should('be.focused');
	});
});
