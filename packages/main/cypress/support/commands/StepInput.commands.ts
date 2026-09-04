Cypress.Commands.add("ui5StepInputChangeValueWithButtons", { prevSubject: true }, (subject, expectedValue: number, decreaseValue?: boolean) => {
	const buttonClass = decreaseValue ? ".ui5-step-dec" : ".ui5-step-inc";

	cy.wrap(subject)
		.as("stepInput")
		.should("be.visible");

	cy.get("@stepInput")
		.shadow()
		.find("[ui5-number-input]")
		.shadow()
		.find(buttonClass)
		.as("button");

	cy.get("@button")
		.realClick();

	cy.get("@stepInput")
		.should("have.prop", "value", expectedValue);
});

Cypress.Commands.add("ui5StepInputAttachHandler", { prevSubject: true }, (subject, eventName: string, stubName: string) => {
	const changeStub = cy.stub().as(stubName);

	cy.wrap(subject)
		.as("stepInput")
		.should("be.visible");

	cy.get("@stepInput")
		.then($el => {
			$el[0].addEventListener(eventName, changeStub);
		});
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5StepInputChangeValueWithButtons(expectedValue: number, decreaseValue?: boolean): Chainable<void>
			ui5StepInputAttachHandler(eventName: string, stubName: string): Chainable<void>
		}
	}
}
