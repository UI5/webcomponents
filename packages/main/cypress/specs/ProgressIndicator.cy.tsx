import ProgressIndicator from "../../src/ProgressIndicator.js";
import { setAnimationMode } from "@ui5/webcomponents-base/dist/config/AnimationMode.js";

describe("API", () => {
    before(() => {
        cy.wrap({ setAnimationMode })
            .then(api => {
                return api.setAnimationMode("none");
            });
    })

	it("tests value validation", () => {
		cy.mount(<ProgressIndicator></ProgressIndicator>);

		cy.get("[ui5-progress-indicator]").invoke("prop", "value", 50);
		cy.get("[ui5-progress-indicator]").should("have.prop", "validatedValue", 50);

		cy.get("[ui5-progress-indicator]").invoke("prop", "value", -10);
		cy.get("[ui5-progress-indicator]").should("have.prop", "validatedValue", 0);

		cy.get("[ui5-progress-indicator]").invoke("prop", "value", 110);
		cy.get("[ui5-progress-indicator]").should("have.prop", "validatedValue", 100);
	});

	it("tests displayValue property", () => {
		cy.mount(<ProgressIndicator value={50}></ProgressIndicator>);

		const customDisplayValue = "Custom Display Value";

		cy.get("[ui5-progress-indicator]").should("have.prop", "validatedValue", 50);

		cy.get("[ui5-progress-indicator]").invoke("attr", "display-value", customDisplayValue);

		cy.get("[ui5-progress-indicator]")
			.shadow()
			.find(".ui5-progress-indicator-value")
			.should("contain.text", customDisplayValue);

		cy.get("[ui5-progress-indicator]").invoke("attr", "display-value", "");

		cy.get("[ui5-progress-indicator]")
			.shadow()
			.find(".ui5-progress-indicator-value")
			.should("contain.text", "50%");
	});

	it("tests accessibleName property", () => {
		const accName = "Hello world";
		const accNameNew = "Hello world 2";

		cy.mount(<ProgressIndicator value={100} accessibleName={accName}></ProgressIndicator>);

		cy.get("[ui5-progress-indicator]").should("have.prop", "accessibleName", accName);
		
		cy.get("[ui5-progress-indicator]")
			.shadow()
			.find("div")
			.should("have.attr", "aria-label", accName);

		cy.get("[ui5-progress-indicator]").invoke("prop", "accessibleName", accNameNew);

		cy.get("[ui5-progress-indicator]").should("have.prop", "accessibleName", accNameNew);

		cy.get("[ui5-progress-indicator]")
			.shadow()
			.find("div")
			.should("have.attr", "aria-label", accNameNew);
	});
});