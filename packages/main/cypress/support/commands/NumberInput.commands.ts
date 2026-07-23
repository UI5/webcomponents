Cypress.Commands.add("ui5NumberInputChangeValueWithArrowKeys", { prevSubject: true }, (subject, expectedValue: number, decreaseValue?: boolean) => {
	const key = decreaseValue ? "ArrowDown" : "ArrowUp";

	cy.wrap(subject)
		.as("numberInput")
		.should("be.visible")
		.should("be.focused");

	cy.realPress(key);

	cy.get("@numberInput")
		.should("have.prop", "value", expectedValue);
});

Cypress.Commands.add("ui5NumberInputAttachHandler", { prevSubject: true }, (subject, eventName: string, stubName: string) => {
	const changeStub = cy.stub().as(stubName);

	cy.wrap(subject)
		.as("numberInput")
		.should("be.visible");

	cy.get("@numberInput")
		.then($el => {
			$el[0].addEventListener(eventName, changeStub);
		});
});

Cypress.Commands.add("ui5NumberInputGetInnerInput", { prevSubject: true }, (subject) => {
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

Cypress.Commands.add("ui5NumberInputCheckInnerInputProperty", { prevSubject: true }, (subject, propName: string, expectedValue: any, shouldBePropagated: boolean = true) => {
	cy.get(subject)
		.ui5NumberInputGetInnerInput()
		.then($innerInput => {
			const condition = shouldBePropagated ? "have.prop" : "not.have.prop";
			cy.wrap($innerInput).should(condition, propName, expectedValue);
		});
});

Cypress.Commands.add("ui5NumberInputTypeNumber", { prevSubject: true }, (subject, value: number) => {
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

Cypress.Commands.add("ui5NumberInputScrollToChangeValue", { prevSubject: true }, (subject, expectedValue: number, decreaseValue: boolean) => {
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
		.find(".ui5-number-input-root")
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
			ui5NumberInputChangeValueWithArrowKeys(expectedValue: number, decreaseValue?: boolean): Chainable<void>
			ui5NumberInputAttachHandler(eventName: string, stubName: string): Chainable<void>
			ui5NumberInputGetInnerInput(): Chainable<JQuery<HTMLElement>>
			ui5NumberInputCheckInnerInputProperty(propName: string, expectedValue: any, shouldBePropagated?: boolean): Chainable<void>
			ui5NumberInputTypeNumber(value: number): Chainable<void>
			ui5NumberInputScrollToChangeValue(expectedValue: number, decreaseValue: boolean): Chainable<void>
		}
	}
}
