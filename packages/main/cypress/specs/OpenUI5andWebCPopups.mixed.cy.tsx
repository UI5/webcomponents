import { mountUI5Fixtures, cleanupUI5Fixtures, isOpenUI5DialogOpen } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("Mixed: alternating OpenUI5 and WebC dialogs open in sequence and unwind correctly with Escape", () => {
		cy.get("#openUI5Button", { timeout: 10000 })
			.should('be.visible');

		// Open UI5 Dialog
		cy.get("#openUI5Button")
			.realClick();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		// Open WebC Dialog from UI5 Dialog
		cy.get("#openWebCDialog")
			.should('be.visible')
			.realClick();

		cy.get("#webCDialog1")
			.should('be.visible');

		cy.get("#openUI5Dialog1")
			.should('not.be.visible');

		// Open UI5 Dialog from WebC Dialog
		cy.get("#openUI5DialogFromWebC")
			.should('be.visible')
			.realClick();

		cy.get("#webCDialog1")
			.should('not.be.visible');

		cy.get("#openUI5Dialog1")
			.should('not.be.visible');

		cy.get("#openUI5DialogWithButtons")
			.should('be.visible');

		// Open UI5 Dialog from UI5 Dialog
		cy.get("#openUI5DialogFromUi5")
			.should('be.visible')
			.realClick();

		cy.get("#openUI5DialogFinal")
			.should('be.visible')
			.should(isOpenUI5DialogOpen);

		cy.wait(1000);

		cy.get("#openUI5Dialog1")
			.should('not.be.visible');

		cy.get("#webCDialog1")
			.should('not.be.visible');

		cy.get("#openUI5DialogWithButtons")
			.should('not.be.visible');

		// Close all with Escape
		cy.realPress("Escape");

		cy.get("#openUI5DialogFinal")
			.should('not.exist');

		cy.get("#openUI5DialogWithButtons")
			.should('be.visible')
			.should(isOpenUI5DialogOpen);
		cy.wait(100);

		cy.realPress("Escape");

		cy.get("#openUI5DialogWithButtons")
			.should('not.exist');

		cy.get("#webCDialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openWebCDialog")
			.should('not.exist');
	});
});
