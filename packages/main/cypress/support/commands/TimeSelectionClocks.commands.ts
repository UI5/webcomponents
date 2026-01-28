Cypress.Commands.add("ui5TimeSelectionClocksInnerButton", (timeSelectionClocks, index) => {
	cy.get(timeSelectionClocks)
		.shadow()
		.find("ui5-toggle-spin-button")
		.as("buttons");

	cy.get("@buttons")
		.eq(index)
		.realClick();

	cy.get("@buttons")
		.eq(index)
		.should("be.focused");
});

Cypress.Commands.add("ui5TimeSelectionClocksIsActiveClock", (timeSelectionClocks, index) => {
	const hoursArg = index === "hours";
	const minutesArg = index === "minutes";
	const secondsArg = index === "seconds";

	cy.get(timeSelectionClocks)
		.shadow()
		.find("ui5-time-picker-clock")
		.as("clocks");

	cy.get("@clocks").eq(0).should("have.prop", "active", hoursArg);
	cy.get("@clocks").eq(1).should("have.prop", "active", minutesArg);
	cy.get("@clocks").eq(2).should("have.prop", "active", secondsArg);

	return cy.wrap(true);
});


declare global {
	namespace Cypress {
		interface Chainable {
			ui5TimeSelectionClocksInnerButton(name: string, index: number): Chainable<JQuery<HTMLElement>>
			ui5TimeSelectionClocksIsActiveClock(name: string, index: "hours" | "minutes" | "seconds"): Chainable<boolean>
		}
	}
}