import Dialog from "../../src/Dialog.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it.skip("OpenUI5 Dialog: opening WebC Select dropdown and closing with Escape", () => {
		cy.get("#openUI5Button", { timeout: 10000 })
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.get("#webCSelect1")
			.should('be.visible')
			.realClick();

		cy.get("#webCSelect1")
			.shadow()
			.find<Dialog>("[ui5-responsive-popover]").ui5DialogOpened();

		cy.realPress("Escape");

		cy.get("#webCSelect1")
			.shadow()
			.find<ResponsivePopover>("[ui5-responsive-popover]")
			.ui5ResponsivePopoverClosed();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Dialog1")
			.should('not.exist');

		cy.get("#openUI5Button")
			.should('be.focused');
	});
});
