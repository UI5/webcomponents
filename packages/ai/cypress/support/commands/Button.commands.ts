import Button from "../../../src/Button.js";

Cypress.Commands.add("ui5AIButtonCheckAttributeInTextButton", { prevSubject: true }, (subject: JQuery<Button>,  attrName: string, attrValue: string) => {
    cy.wrap(subject)
		.shadow()
		.find("[ui5-split-button]")
		.shadow()
		.find(".ui5-split-text-button")
        .should("be.visible")
        .should("have.attr", attrName, attrValue);
});

Cypress.Commands.add("ui5AIButtonCheckAttributeInArrowButton", { prevSubject: true }, (subject: JQuery<Button>,  attrName: string, attrValue: string) => {
    cy.wrap(subject)
        .shadow()
		.find("[ui5-split-button]")
		.shadow()
		.find(".ui5-split-arrow-button")
		.shadow()
		.find(".ui5-button-root")
        .should("be.visible")
		.should("have.attr", attrName, attrValue);
});

Cypress.Commands.add("ui5AIButtonCheckAttributeSplitButtonRoot", { prevSubject: true }, (subject: JQuery<Button>,  attrName: string, attrValue: string) => {
    cy.wrap(subject)
		.shadow()
		.find("[ui5-split-button]")
		.shadow()
		.find(".ui5-split-button-root")
        .should("be.visible")
        .should("have.attr", attrName, attrValue);
});