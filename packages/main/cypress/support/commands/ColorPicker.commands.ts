Cypress.Commands.add("ui5ColorPickerToggleColorMode", { prevSubject: true }, subject => {
	cy.wrap(subject)
		.as("colorPicker")
		.should("be.visible");

	cy.get("@colorPicker")
		.shadow()
		.find("#toggle-picker-mode")
		.realClick();
});

Cypress.Commands.add("ui5ColorPickerUpdateInput", { prevSubject: true }, (subject, name, value) => {
	cy.wrap(subject)
		.as("colorPicker")
		.should("be.visible");

	cy.get("@colorPicker")
		.shadow()
		.find(name)
		.realClick({ clickCount: 2 })
		// eslint-disable-next-line @typescript-eslint/no-unsafe-argument
		.realType(value)
		.realPress("Enter");
});

Cypress.Commands.add("ui5ColorPickerValidateInput", { prevSubject: true }, (subject, name, value) => {
	cy.wrap(subject)
		.as("colorPicker")
		.should("be.visible");

	cy.get("@colorPicker")
		.shadow()
		.find(name)
		.as("input");

	cy.get("@input")
		.should("have.value", value);
});
