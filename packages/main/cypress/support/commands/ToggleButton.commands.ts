import ToggleButton from "../../../src/ToggleButton.js";
import { ModifierKey } from "./common/types.js";

Cypress.Commands.add("ui5ToggleButtonRealClick", { prevSubject: true }, (subject: JQuery<ToggleButton>, isClickPrevented: boolean, pressedKey?: ModifierKey) => {
	const assertion = isClickPrevented ? "not.have.attr" : "have.attr";
	const args = pressedKey ? { [pressedKey]: true } : undefined;

	cy.wrap(subject)
		.as("toggleButton")
		.should("be.visible");

	cy.get("@toggleButton")
		.realClick(args);

	cy.get("@toggleButton")
		.should(assertion, "pressed");
});