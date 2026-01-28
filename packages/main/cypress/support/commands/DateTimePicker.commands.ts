import Button from "../../../src/Button.js";
import type DateTimePicker from "../../../src/DateTimePicker.js";
import type ResponsivePopover from "../../../src/ResponsivePopover.js";

Cypress.Commands.add("ui5DateTimePickerOpen", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	cy.wrap(subject).invoke("prop", "open", true);

	cy.wrap(subject).ui5DateTimePickerExpectToBeOpen()
});

Cypress.Commands.add("ui5DateTimePickerClose", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	cy.wrap(subject).invoke("prop", "open", false);

	cy.wrap(subject).ui5DateTimePickerExpectToBeClosed()
});

Cypress.Commands.add("ui5DateTimePickerGetPopover", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	return cy.wrap(subject)
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]");
});

Cypress.Commands.add("ui5DateTimePickerExpectToBeOpen", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	cy.wrap(subject)
		.should("have.prop", "open", true);

	cy.wrap(subject)
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverOpened();
});

Cypress.Commands.add("ui5DateTimePickerExpectToBeClosed", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	cy.wrap(subject)
		.should("have.prop", "open", false);

	cy.wrap(subject)
		.shadow()
		.find<ResponsivePopover>("[ui5-responsive-popover]")
		.ui5ResponsivePopoverClosed();
});

Cypress.Commands.add("ui5DateTimePickerGetSubmitButton", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	return cy.wrap(subject)
		.shadow()
		.find("[ui5-responsive-popover]")
		.find<Button>("#ok");
});

Cypress.Commands.add("ui5DateTimePickerGetCancelButton", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	return cy.wrap(subject)
		.shadow()
		.find("[ui5-responsive-popover]")
		.find<Button>("#cancel");
});

Cypress.Commands.add("ui5DateTimePickerTimeSelectionClocksCount", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	return cy.wrap(subject)
		.shadow()
		.find("[ui5-responsive-popover]")
		.find("[ui5-time-selection-clocks]")
		.shadow()
		.find("[ui5-time-picker-clock]")
		.its("length");
});

Cypress.Commands.add("ui5DateTimePickerPeriodSegmentedButtonCount", { prevSubject: true }, (subject: JQuery<DateTimePicker>) => {
	return cy.wrap(subject)
		.shadow()
		.find("[ui5-responsive-popover]")
		.find("[ui5-time-selection-clocks]")
		.shadow()
		.find("[ui5-segmented-button]")
		.its("length");
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5DateTimePickerOpen(
				this: Chainable<JQuery<DateTimePicker>>,
			): Chainable<void>;
			ui5DateTimePickerExpectToBeOpen(
				this: Chainable<JQuery<DateTimePicker>>,
			): Chainable<void>;
			ui5DateTimePickerClose(
				this: Chainable<JQuery<DateTimePicker>>
			): Chainable<void>;
			ui5DateTimePickerExpectToBeClosed(
				this: Chainable<JQuery<DateTimePicker>>,
			): Chainable<void>;
			ui5DateTimePickerGetPopover(
				this: Chainable<JQuery<DateTimePicker>>
			): Chainable<JQuery<ResponsivePopover>>;
			ui5DateTimePickerGetSubmitButton(
				this: Chainable<JQuery<DateTimePicker>>
			): Chainable<JQuery<Button>>;
			ui5DateTimePickerGetCancelButton(
				this: Chainable<JQuery<DateTimePicker>>
			): Chainable<JQuery<Button>>;
			ui5DateTimePickerTimeSelectionClocksCount(
				this: Chainable<JQuery<DateTimePicker>>
			): Chainable<number>;
			ui5DateTimePickerPeriodSegmentedButtonCount(
				this: Chainable<JQuery<DateTimePicker>>
			): Chainable<number>;
		}
	}
}