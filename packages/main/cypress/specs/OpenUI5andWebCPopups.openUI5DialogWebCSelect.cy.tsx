import Dialog from "../../src/Dialog.js";
import ResponsivePopover from "../../src/ResponsivePopover.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("OpenUI5 Dialog: opening WebC Select dropdown and closing with Escape", () => {
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

		// Wait for the Select to regain focus after its picker closes.
		// Without this, the next Escape can be dispatched before focus returns
		// inside the OpenUI5 Dialog and the dialog's Escape handler never fires.
		cy.get("#webCSelect1")
			.should('be.focused');

		cy.realPress("Escape");

		// sap.m.Dialog destroys itself in afterClose, so the element is removed.
		cy.get("#openUI5Dialog1")
			.should('not.exist');

		cy.get("#openUI5Button")
			.should('be.focused');
	});
});
