Cypress.Commands.add("ui5DynamicDateRangeOpen", { prevSubject: true }, (prevSubject) => {
	cy.wrap(prevSubject)
		.as("ddr")
		.shadow()
		.find("[ui5-input]")
		.as("input");

	cy.get("@input")
		.shadow()
		.find("input")
		.as("innerInput");

	cy.get("@input")
		.find('[ui5-icon]')
		.as("icon");

	cy.get("@icon")
		.realClick();

	cy.get("@ddr")
		.ui5DynamicDateRangeOpened();

	return cy.wrap(prevSubject);
});

Cypress.Commands.add("ui5DynamicDateRangeOpened", { prevSubject: true }, (subject) => {
	cy.wrap(subject)
		.as("ddr");

	cy.get("@ddr")
		.should("have.attr", "open");

	cy.get("@ddr")
		.shadow()
		.find("[ui5-responsive-popover]")
		.as("popover")
		.should("have.attr", "open");

	cy.get("@popover")
		.find("[ui5-list]")
		.as("list")
		.should("be.visible");
});

Cypress.Commands.add("ui5DynamicDateRangeGetOptionsList", { prevSubject: true }, (subject) => {
	cy.wrap(subject)
		.as("ddr");

	cy.get("@ddr")
		.shadow()
		.find("[ui5-responsive-popover]")
		.as("popover");

	cy.get("@popover")
		.should('exist');

	cy.get("@popover")
		.find("[ui5-list]")
		.as("list");

	return cy.get('@list')
		.find("[ui5-li]");
});

Cypress.Commands.add("ui5DynamicDateRangeSelectOption", { prevSubject: true }, (prevSubject, index?: number) => {
	const optionIndex = index ?? 0;
	
	cy.wrap(prevSubject)
		.as("ddr");

	cy.get("@ddr")
		.ui5DynamicDateRangeGetOptionsList()
		.eq(optionIndex)
		.realClick();

	return cy.wrap(prevSubject);
});

Cypress.Commands.add("ui5DynamicDateRangeSetDateTime", { prevSubject: true }, (prevSubject, pickerId: string, dateTimeValue: string) => {
	cy.wrap(prevSubject)
		.as("ddr");

	cy.get("@ddr")
		.shadow()
		.find("[ui5-responsive-popover]")
		.find(`[ui5-datetime-picker]#${pickerId}`)
		.as("picker");

	cy.get("@picker")
		.shadow()
		.find("[ui5-datetime-input]")
		.as("input");

	cy.get("@input")
		.shadow()
		.find("input")
		.as("innerInput");

	cy.get("@innerInput")
		.clear()
		.realType(dateTimeValue)
		.realPress("Enter");

	return cy.wrap(prevSubject);
});

Cypress.Commands.add("ui5DynamicDateRangeSetInput", { prevSubject: true }, (prevSubject, input: string) => {
	cy.wrap(prevSubject)
		.as("ddr");

	 cy.get("@ddr")
		.shadow()
		.find("[ui5-input]")
		.as("input");

	cy.get("@input")
		.shadow()
		.find("input")
		.as("innerInput");

	cy.get("@innerInput")
		.clear()
		.realType(input)
		.realPress("Enter");
		
	return cy.wrap(prevSubject);
});

Cypress.Commands.add("ui5DynamicDateRangeSubmit", { prevSubject: true }, (prevSubject) => {
	cy.wrap(prevSubject)
		.as("ddr");

	cy.get("@ddr")
		.shadow()
		.find("[ui5-responsive-popover]")
		.as("popover");

	cy.get("@popover")
		.find("[ui5-button][design='Emphasized']")
		.as("submitButton");

	cy.get("@submitButton")
		.should("have.text", "Submit")
		.should("be.visible")
		.should("not.be.disabled")
		.realClick();
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5DynamicDateRangeOpen(): Chainable<JQuery<HTMLElement>>
			ui5DynamicDateRangeOpened(): Chainable<void>
			ui5DynamicDateRangeGetOptionsList(): Chainable<JQuery<HTMLElement>>
			ui5DynamicDateRangeSelectOption(index?: number): Chainable<JQuery<HTMLElement>>
			ui5DynamicDateRangeSetInput(input: string): Chainable<JQuery<HTMLElement>>
			ui5DynamicDateRangeSetDateTime(pickerId: string, dateTimeValue: string): Chainable<JQuery<HTMLElement>>
			ui5DynamicDateRangeSubmit(): Chainable<void>
		}
	}
}