import Dialog from "../../src/Dialog.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("WebC Dialog: opening OpenUI5 Dialog from button with shortcut hint while ComboBox popup is open", () => {
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

		cy.get('#openUI5ButtonWithHint')
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Combobox1-popup")
			.should('not.be.visible');

		cy.get("#openUI5DialogWithButtons")
			.should("be.visible");

		cy.realPress("Escape");

		cy.get("#openUI5DialogWithButtons")
			.should("not.exist");

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.get('#openUI5ButtonWithHint')
			.should('be.focused')

		cy.get('#openUI5Combobox1')
			.find('input')
			.focus();

		cy.get("#openUI5Combobox1")
			.find('input')
			.should('be.focused');

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	});
});
