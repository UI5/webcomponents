import type DateRangePicker from "../../../src/DateRangePicker.js";
import type ResponsivePopover from "../../../src/ResponsivePopover.js";

Cypress.Commands.add("ui5DateRangePickerOpen", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	cy.wrap(subject).invoke("prop", "open", true);

	cy.wrap(subject).ui5DateRangePickerExpectToBeOpen()
});

Cypress.Commands.add("ui5DateRangePickerGetPopover", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	return cy.wrap(subject)
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]");
});

Cypress.Commands.add("ui5DateRangePickerExpectToBeOpen", { prevSubject: true }, (subject: JQuery<DateRangePicker>) => {
	cy.wrap(subject)
		.should("have.prop", "open", true);

	cy.wrap(subject)
		.ui5DateRangePickerGetPopover()
		.ui5ResponsivePopoverOpened();
});

Cypress.Commands.add("ui5DateRangePickerSelectRange", { prevSubject: true }, (subject: JQuery<DateRangePicker>, startIndex: number, endIndex?: number) => {
	cy.wrap(subject)
		.shadow()
		.find("[ui5-calendar]")
		.shadow()
		.find("[ui5-daypicker]")
		.shadow()
		.find(".ui5-dp-root .ui5-dp-content div > .ui5-dp-item")
		.as("dateItems");

	cy.get("@dateItems")
		.eq(startIndex)
		.realClick();

	if (endIndex) {
		cy.get("@dateItems")
		.eq(endIndex)
		.realClick();
	}
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5DateRangePickerOpen(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<void>;
			ui5DateRangePickerGetPopover(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<JQuery<ResponsivePopover>>;
			ui5DateRangePickerExpectToBeOpen(
				this: Chainable<JQuery<DateRangePicker>>,
			): Chainable<void>;
			ui5DateRangePickerSelectRange(
				this: Chainable<JQuery<DateRangePicker>>,
				startIndex: number,
				endIndex?: number,
			): Chainable<void>;
		}
	}
}