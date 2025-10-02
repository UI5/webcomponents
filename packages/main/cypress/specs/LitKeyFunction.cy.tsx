import type List from "../../src/List.js";
import MultiComboBox from "../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../src/MultiComboBoxItem.js";

describe("Lit HTML key function for #each", () => {
	it("LIT HTML does not mess up keys when looping over lists", () => {
		cy.mount(
			<MultiComboBox id="mcb">
				<MultiComboBoxItem text="<empty>"></MultiComboBoxItem>
				<MultiComboBoxItem text="Algeria"></MultiComboBoxItem>
				<MultiComboBoxItem text="China"></MultiComboBoxItem>
				<MultiComboBoxItem text="USA"></MultiComboBoxItem>
			</MultiComboBox>
		);

		cy.get("#mcb")
			.as("mcb")
			.realClick();

		cy.realPress("u");
		cy.realPress("s");
		cy.realPress("a");

		cy.get("@mcb")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("rpo");

		cy.get("@rpo")
			.find("[ui5-list]")
			.as("list");

		cy.get("@list")
			.then($el => {
				return ($el[0] as List).getSlottedNodes("items");
			})
			.realClick();

		cy.get("@mcb")
			.shadow()
			.find(".inputIcon")
			.realClick();

		cy.get("@list")
			.then($el => {
				return ($el[0] as List).getSlottedNodes("items")[0];
			})
			.invoke("attr", "text", "<empty>")
			.should("not.have.attr", "selected");

		cy.get("@list")
			.then($el => {
				return ($el[0] as List).getSlottedNodes("items")[3];
			})
			.invoke("attr", "text", "USA")
			.should("have.attr", "selected");
	});
});
