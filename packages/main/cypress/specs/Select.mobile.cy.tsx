import Select from "../../src/Select.js";
import Option from "../../src/Option.js";

describe("Select mobile general interaction", () => {
	it("Changes selection in Dialog", () => {
		cy.get("html").viewport("iphone-x");

		cy.mount(
			<Select>
				<Option value="Cozy">Cozy</Option>
				<Option value="Compact">Compact</Option>
				<Option value="Condensed" selected>Condensed</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.as("select")
			.then(($select) => {
				$select[0].addEventListener("ui5-change", cy.stub().as("changeStub"));
			});

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Condensed");

		cy.get("@select").realClick();

		cy.get("@select").realPress("ArrowUp");
		cy.get("@select").realPress("ArrowUp");

		cy.get("@select").realPress("Enter");

		cy.get("@select")
			.shadow()
			.find(".ui5-select-label-root")
			.should("contain.text", "Cozy");

		cy.get("@changeStub").should("have.been.calledOnce");

		cy.get("@select").should("have.prop", "value", "Cozy");
	});
});