import Dialog from "../../src/Dialog.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("WebC Dialog: opening nested OpenUI5 Dialog and closing both with Escape", () => {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#dialogButton')
			.should('be.visible')
			.realClick();

		cy.get("#openUI5DialogWithButtons")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5DialogWithButtons")
			.should('not.be.visible');

		cy.get('#dialogButton')
			.should('be.focused');

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	});
});
