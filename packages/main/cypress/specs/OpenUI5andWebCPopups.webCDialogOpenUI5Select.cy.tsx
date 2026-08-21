import Dialog from "../../src/Dialog.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("WebC Dialog: opening OpenUI5 Select dropdown and closing with Escape", () => {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#openUI5Select1')
			.should('be.visible')
			.realClick();

		cy.get("#__popover0")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#__popover0")
			.should('not.be.visible');

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	});
});
