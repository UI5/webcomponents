import ResponsivePopover from "../../src/ResponsivePopover.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("OpenUI5 Dialog: opening nested WebC ResponsivePopover and closing both with Escape", () => {
		cy.get("#openUI5Button")
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		// Move focus to a button INSIDE the OpenUI5 dialog before opening
		// the WebC ResponsivePopover, so the popover snapshots focus inside
		// the dialog and restores it there on close. Otherwise the second
		// Escape would land outside the dialog and the OpenUI5 Dialog's
		// focus-based Escape handler would not fire.
		cy.get("#openResPopoverButton")
			.should('be.visible')
			.focus()
			.should('be.focused');

		cy.get("#respPopover").invoke("attr", "open", true);

		cy.get<ResponsivePopover>("#respPopover").ui5ResponsivePopoverOpened();

		cy.realPress("Escape");

		cy.get<ResponsivePopover>("#respPopover").ui5ResponsivePopoverClosed();

		cy.get("#openResPopoverButton")
			.should('be.focused');

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Dialog1")
			.should('not.exist');

		cy.get("#openUI5Button")
			.should('be.focused');
	});
});
