import type DateRangePicker from "../../../src/DateRangePicker.js";
import type ResponsivePopover from "../../../src/ResponsivePopover.js";

Cypress.Commands.add("ui5DateRangePickerOpen", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	cy.wrap(subject).invoke("prop", "open", true);

	cy.wrap(subject).ui5DateRangePickerExpectToBeOpen()
});

Cypress.Commands.add("ui5DateRangePickerExpectToBeOpen", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	cy.wrap(subject)
		.should("have.prop", "open", true);

	cy.wrap(subject)
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverOpened();
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5DateRangePickerOpen(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<void>;
			ui5DateRangePickerExpectToBeOpen(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<void>;
		}
	}
}