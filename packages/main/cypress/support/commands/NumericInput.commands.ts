Cypress.Commands.add("ui5NumericInputChangeValueWithArrowKeys", { prevSubject: true }, (subject, expectedValue: number, decreaseValue?: boolean) => {
	const key = decreaseValue ? "ArrowDown" : "ArrowUp";

	cy.wrap(subject)
		.as("numberInput")
		.should("be.visible")
		.should("be.focused");

	cy.realPress(key);

	cy.get("@numberInput")
		.should("have.prop", "value", expectedValue);
});

Cypress.Commands.add("ui5NumericInputAttachHandler", { prevSubject: true }, (subject, eventName: string, stubName: string) => {
	const changeStub = cy.stub().as(stubName);

	cy.wrap(subject)
		.as("numberInput")
		.should("be.visible");

	cy.get("@numberInput")
		.then($el => {
			$el[0].addEventListener(eventName, changeStub);
		});
});

Cypress.Commands.add("ui5NumericInputGetInnerInput", { prevSubject: true }, (subject) => {
	cy.wrap(subject)
		.as("numberInput")
		.should("be.visible");

	cy.get("@numberInput")
		.shadow()
		.find("[ui5-input]")
		.shadow()
		.find("input")
		.as("innerInput");

	return cy.get("@innerInput");
});

Cypress.Commands.add("ui5NumericInputCheckInnerInputProperty", { prevSubject: true }, (subject, propName: string, expectedValue: any, shouldBePropagated: boolean = true) => {
	cy.get(subject)
		.ui5NumericInputGetInnerInput()
		.then($innerInput => {
			const condition = shouldBePropagated ? "have.prop" : "not.have.prop";
			cy.wrap($innerInput).should(condition, propName, expectedValue);
		});
});

Cypress.Commands.add("ui5NumericInputTypeNumber", { prevSubject: true }, (subject, value: number) => {
	cy.wrap(subject)
		.as("numberInput")
		.should("be.visible");

	cy.get("@numberInput")
		.shadow()
		.find("[ui5-input]")
		.shadow()
		.find("input")
		.clear()
		.realType(value.toString())
		.realPress("Enter");
});

Cypress.Commands.add("ui5NumericInputScrollToChangeValue", { prevSubject: true }, (subject, expectedValue: number, decreaseValue: boolean) => {
	const deltaY = decreaseValue ? 100 : -100;

	cy.wrap(subject)
		.as("numberInput")
		.should("be.visible");

	cy.get("@numberInput")
		.realClick();

	cy.get("@numberInput")
		.should("be.focused");

	cy.get("@numberInput")
		.shadow()
		.find(".ui5-numeric-input-root")
		.then($el => {
			const wheelEvent = new WheelEvent("wheel", { deltaY, bubbles: true, cancelable: true });
			$el[0].dispatchEvent(wheelEvent);
		});

	cy.realPress("Tab"); // To trigger change event

	cy.get("@numberInput")
		.should("have.prop", "value", expectedValue);
});

declare global {
	namespace Cypress {
		interface Chainable {
			ui5NumericInputChangeValueWithArrowKeys(expectedValue: number, decreaseValue?: boolean): Chainable<void>
			ui5NumericInputAttachHandler(eventName: string, stubName: string): Chainable<void>
			ui5NumericInputGetInnerInput(): Chainable<JQuery<HTMLElement>>
			ui5NumericInputCheckInnerInputProperty(propName: string, expectedValue: any, shouldBePropagated?: boolean): Chainable<void>
			ui5NumericInputTypeNumber(value: number): Chainable<void>
			ui5NumericInputScrollToChangeValue(expectedValue: number, decreaseValue: boolean): Chainable<void>
		}
	}
}
