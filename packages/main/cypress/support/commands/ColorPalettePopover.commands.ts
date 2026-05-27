Cypress.Commands.add("ui5ColorPalettePopoverOpen", { prevSubject: true }, (prevSubject, options) => {
	cy.wrap(prevSubject)
		.as("colorPalettePopover")
		.then($colorPalettePopover => {
			if (options?.opener) {
				cy.wrap($colorPalettePopover)
					.invoke("attr", "opener", options.opener);
			}

			cy.wrap($colorPalettePopover)
				.invoke("attr", "open", true);
		});

	cy.get("@colorPalettePopover")
		.ui5ColorPalettePopoverOpened();
});

Cypress.Commands.add("ui5ColorPalettePopoverOpened", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("colorPalettePopover");

	cy.get("@colorPalettePopover")
		.should("have.attr", "open");

	cy.get("@colorPalettePopover")
		.shadow()
		.find("[ui5-responsive-popover]")
		.should(respPopover => {
			expect(respPopover.is(":popover-open")).to.be.true;
			expect(respPopover.width()).to.not.equal(0);
			expect(respPopover.height()).to.not.equal(0);
		})
		.and("have.attr", "open");
});

Cypress.Commands.add("ui5GetColorPaletteInPopover", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("colorPalettePopover");

	cy.get("@colorPalettePopover")
		.shadow()
		.find("[ui5-responsive-popover]")
		.as("popover");

	return cy.get("@popover")
		.find("[ui5-color-palette]");
});

Cypress.Commands.add("ui5GetColorPaletteDefaultButton", { prevSubject: true }, subject => {
	return cy.wrap(subject)
		.shadow()
		.find(".ui5-cp-default-color-button")
		.should("be.visible");
});

/* Returns the color palette item at the specified index, or the first one if no index is provided. */
Cypress.Commands.add("ui5GetColorPaletteItem", { prevSubject: true },  (subject, index)  => {
	const i = index ? index : 0;
	return cy.wrap(subject)
		.find("[ui5-color-palette-item]")
		.eq(i)
		.should("be.visible");
});

Cypress.Commands.add("ui5GetColorPaletteMoreColorsButton", { prevSubject: true }, subject => {
	return cy.wrap(subject)
		.shadow()
		.find(".ui5-cp-more-colors")
		.should("be.visible");
});

Cypress.Commands.add("ui5ColorPalettePopoverClose", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("colorPalettePopover");

	// close the popover
	cy.get("@colorPalettePopover")
		.realPress("Escape");

	cy.get("@colorPalettePopover")
		.should("not.have.attr", "open");
});


declare global {
	namespace Cypress {
		interface Chainable {
			ui5ColorPalettePopoverOpen(options?: { opener: string }): Chainable<void>
			ui5ColorPalettePopoverOpened(): Chainable<JQuery<HTMLElement>>
			ui5GetColorPaletteInPopover(): Chainable<JQuery<HTMLElement>>
			ui5GetColorPaletteDefaultButton(): Chainable<JQuery<HTMLElement>>
			ui5GetColorPaletteItem(index?: number): Chainable<JQuery<HTMLElement>>
			ui5GetColorPaletteMoreColorsButton(): Chainable<JQuery<HTMLElement>>
			ui5ColorPalettePopoverClose(): Chainable<void>
		}
	}
}