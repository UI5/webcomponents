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

Cypress.Commands.add("ui5StepInputGetInnerInput", { prevSubject: true }, (subject) => {
	cy.wrap(subject)
		 .as("stepInput")
		.should("be.visible");

	cy.get("@stepInput")
		.shadow()
		.find("[ui5-input]")
		.shadow()
		.find("input")
		.as("innerInput");

	return cy.get("@innerInput");
});

Cypress.Commands.add("ui5StepInputCheckInnerInputProperty", { prevSubject: true }, (subject, propName: string, expectedValue: any, shouldBePropagated: boolean = true) => {
	cy.get(subject)
        .ui5StepInputGetInnerInput()
        .then($innerInput => {
            const condition = shouldBePropagated ? "have.prop" : "not.have.prop";
            cy.wrap($innerInput).should(condition, propName, expectedValue);
        });
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

Cypress.Commands.add("ui5StepInputScrollToChangeValue", { prevSubject: true }, (subject, expectedValue: number, decreaseValue: boolean) => {
	const deltaY = decreaseValue ? 100 : -100;

	cy.wrap(subject)
		.as("stepInput")
		.should("be.visible");
	
	cy.get("@stepInput")
		.realClick();

	cy.get("@stepInput")
		.should("be.focused");

	cy.get("@stepInput")
		.shadow()
		.find(".ui5-step-input-root")
		.then($el => {
			const wheelEvent = new WheelEvent("wheel", { deltaY, bubbles: true, cancelable: true });
			$el[0].dispatchEvent(wheelEvent);
		});

	cy.realPress("Tab"); // To trigger change event

	cy.get("@stepInput")
		.should("have.prop", "value", expectedValue);
});



declare global {
	namespace Cypress {
		interface Chainable {
			ui5StepInputChangeValueWithArrowKeys(expectedValue: number, decreaseValue?: boolean): Chainable<void>
			ui5StepInputChangeValueWithButtons(expectedValue: number, decreaseValue?: boolean): Chainable<void>
			ui5StepInputAttachHandler(eventName: string, stubName: string): Chainable<void>
			ui5StepInputGetInnerInput(): Chainable<JQuery<HTMLElement>>
			ui5StepInputCheckInnerInputProperty(propName: string, expectedValue: any, shouldBePropagated?: boolean): Chainable<void>
			ui5StepInputTypeNumber(value: number): Chainable<void>
			ui5StepInputScrollToChangeValue(expectedValue: number, decreaseValue: boolean): Chainable<void>
		}
	}
}