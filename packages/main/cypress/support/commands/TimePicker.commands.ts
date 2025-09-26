import Button from "../../../src/Button.js";
import TimePicker from "../../../src/TimePicker.js";

Cypress.Commands.add("ui5TimePickerGetInnerInput", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.shadow()
		.find("[ui5-datetime-input]")
		.shadow()
		.find("input")
		.as("innerInput");

	return cy.get("@innerInput");
});

Cypress.Commands.add("ui5TimePickerValueHelpIconPress", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.shadow()
		.find("[ui5-datetime-input]")
		.find(".ui5-time-picker-input-icon-button")
		.realClick();
});

Cypress.Commands.add("ui5TimePickerGetClock", { prevSubject: true }, (subject, clockType) => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.should("have.attr", "open");

	return cy.get("@timePicker")
		.shadow()
		.find("[ui5-responsive-popover]")
		.find("[ui5-time-selection-clocks]")
		.shadow()
		.find(`ui5-toggle-spin-button[data-ui5-clock="${clockType}"]`);
});

Cypress.Commands.add("ui5TimePickerGetInputsMobile", { prevSubject: true }, (subject) => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.should("not.have.attr", "open");

	return cy.get("@timePicker")
		.shadow()
		.find("[ui5-popover]")
		.find("[ui5-time-selection-inputs]")
		.shadow()
		.find(`[ui5-input]`)
});

Cypress.Commands.add("ui5TimePickerGetSubmitButton", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.should("have.attr", "open");

	return cy.get("@timePicker")
		.shadow()
		.find("[ui5-responsive-popover]")
		.find("#submit");
});

Cypress.Commands.add("ui5TimePickerTypeTime", { prevSubject: true }, (subject: string, time) => {
	cy.wrap(subject)
		.as("timePicker");

	cy.get("@timePicker")
		.ui5TimePickerGetInnerInput()
		.realClick()
		.should("be.focused")

	cy.realType(time);
	cy.realPress("Enter");
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5TimePickerGetInnerInput(
				this: Chainable<JQuery<TimePicker>>
			): Chainable<JQuery<HTMLInputElement>>;
			ui5TimePickerValueHelpIconPress(
				this: Chainable<JQuery<TimePicker>>
			): Chainable<void>;
			ui5TimePickerGetClock(
				this: Chainable<JQuery<TimePicker>>,
				clockType: string
			): Chainable<JQuery<TimePicker>>;
			ui5TimePickerGetInputsMobile(
				this: Chainable<JQuery<TimePicker>>,
			): Chainable<JQuery<TimePicker>>;
			ui5TimePickerGetSubmitButton(
				this: Chainable<JQuery<TimePicker>>
			): Chainable<JQuery<Button>>;
			ui5TimePickerTypeTime(
				this: Chainable<JQuery<TimePicker>>,
				time: string
			): Chainable<void>;
		}
	}
}