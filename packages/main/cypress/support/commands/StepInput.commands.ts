Cypress.Commands.add("ui5StepInputChangeValueWithArrowKeys", { prevSubject: true },  (subject, expectedValue: number, decreaseValue?: boolean)  => {
	const key = decreaseValue ? "ArrowDown" : "ArrowUp";

	cy.wrap(subject)
		.as("stepInput")
		.should("be.visible")
		.should("be.focused");

	cy.realPress(key);

	cy.get("@stepInput")
		.should("have.prop", "value", expectedValue);
});

Cypress.Commands.add("ui5StepInputChangeValueWithButtons", { prevSubject: true },  (subject, expectedValue: number, decreaseValue?: boolean)  => {
	const buttonClass = decreaseValue ? ".ui5-step-dec" : ".ui5-step-inc";

	cy.wrap(subject)
		.as("stepInput")
		.should("be.visible");

	cy.get("@stepInput")
		.shadow()
		.find(buttonClass)
		.as("button");

	cy.get("@button")
		.realClick();

	cy.get("@stepInput")
 		.should("have.prop", "value", expectedValue);
});

Cypress.Commands.add("ui5StepInputAttachHandler", { prevSubject: true },  (subject, eventName: string, stubName: string)  => {
	const changeStub = cy.stub().as(stubName);

	cy.wrap(subject)
		.as("stepInput")
		.should("be.visible");

	cy.get("@stepInput")
		.then($el => {
			$el[0].addEventListener(eventName, changeStub);
		});
});

Cypress.Commands.add("ui5StepInputCheckInnerInputProperty", { prevSubject: true }, (subject, propName: string, expectedValue: any) => {
	cy.wrap(subject)
		 .as("stepInput")
		.should("be.visible");

	cy.get("@stepInput")
		.shadow()
		.find("[ui5-input]")
		.shadow()
		.find("input")
		.as("innerInput");

	cy.get("@innerInput")
		.should("have.prop", propName, expectedValue);
});

Cypress.Commands.add("ui5StepInputTypeNumber", { prevSubject: true }, (subject, value: number) => {
	cy.wrap(subject)
		 .as("stepInput")
		.should("be.visible");

	cy.get("@stepInput")
		.shadow()
		.find("[ui5-input]")
		.shadow()
		.find("input")
		.clear()
		.realType(value.toString())
		.realPress("Enter");
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5StepInputChangeValueWithArrowKeys(expectedValue: number, decreaseValue?: boolean): Chainable<void>
			ui5StepInputChangeValueWithButtons(expectedValue: number, decreaseValue?: boolean): Chainable<void>
			ui5StepInputAttachHandler(eventName: string, stubName: string): Chainable<void>
			ui5StepInputCheckInnerInputProperty(propName: string, expectedValue: any): Chainable<void>
			ui5StepInputTypeNumber(value: number): Chainable<void>
		}
	}
}