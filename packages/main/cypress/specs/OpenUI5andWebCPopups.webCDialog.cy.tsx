import Dialog from "../../src/Dialog.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("WebC Dialog opens and closes with Escape, focus returns to opener", () => {
		cy.get("#openUI5Button", { timeout: 10000 })
			.should('be.visible');

		cy.get('#myButton')
			.should('be.visible')
			.realClick();

		cy.get<Dialog>("#dialog1").ui5DialogOpened();

		cy.realPress("Escape");

		cy.get('#dialog1')
			.should('not.be.visible');

		cy.get('#myButton')
			.should('be.focused');
	});
});
