import Dialog from "../../src/Dialog.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("WebC Dialog: opening OpenUI5 ComboBox suggestion popup and closing with Escape", () => {
		cy.get("#openUI5Button")
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#openUI5Combobox1')
			.should('be.visible')
			.realClick()
			.type("I");

		cy.get("#openUI5Combobox1-popup")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Combobox1-popup")
			.should('not.be.visible');

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.realPress("Escape");

		// combo box value is reset, dialog stays open
		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	});
});
