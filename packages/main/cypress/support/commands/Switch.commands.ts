import Switch from "../../../src/Switch.js";

Cypress.Commands.add("ui5SwitchCheckAttributeInShadowDomRoot", { prevSubject: true }, (subject: JQuery<Switch>,  attrName: string, attrValue: string) => {
    cy.wrap(subject)
        .shadow()
        .find(".ui5-switch-root")
        .should("be.visible")
        .invoke("attr", attrName)
		.should("eq", attrValue);
});