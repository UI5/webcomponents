import ResponsivePopover from "../../src/ResponsivePopover.js";
import { mountUI5Fixtures, cleanupUI5Fixtures } from "./OpenUI5andWebCPopups.utils.js";

describe("ui5 and web components integration", () => {
	beforeEach(() => { mountUI5Fixtures(); });
	afterEach(() => { cleanupUI5Fixtures(); });

	it("OpenUI5 Dialog: opening WebC ResponsivePopover with preventInitialFocus and closing with Escape", () => {
		cy.get("#openUI5Button", { timeout: 10000 })
			.should('be.visible')
			.realClick();

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.wait(1000);

		cy.get("#openResPopoverNoInitialFocusButton")
			.should('be.visible')
			.realClick();

		cy.get<ResponsivePopover>("#respPopoverNoInitialFocus").ui5ResponsivePopoverOpened();

		cy.realPress("Escape");

		cy.get<ResponsivePopover>("#respPopoverNoInitialFocus")
			.ui5ResponsivePopoverClosed();

		cy.get("#openResPopoverNoInitialFocusButton")
			.should('be.focused');

		cy.get("#openUI5Dialog1")
			.should('be.visible');

		cy.realPress("Escape");

		cy.get("#openUI5Dialog1")
			.should('not.be.visible');

		cy.get("#openUI5Button")
			.should('be.focused');
	});
});
