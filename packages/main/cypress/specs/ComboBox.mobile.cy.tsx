import ComboBox from "../../src/ComboBox.js";
import ComboBoxItem from "../../src/ComboBoxItem.js";
import { COMBOBOX_DIALOG_OK_BUTTON } from "../../src/generated/i18n/i18n-defaults.js";

describe("ComboBox on mobile device", () => {
     beforeEach(() => {
		cy.ui5SimulateDevice("phone");
	});
	it("checks OK button text in dialog on mobile device", () => {

		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria"></ComboBoxItem>
				<ComboBoxItem text="Bulgaria"></ComboBoxItem>
				<ComboBoxItem text="England"></ComboBoxItem>
			</ComboBox>
		);

		cy.get("[ui5-combobox]")
			.as("combo");

		cy.get("@combo")
			.click();

		cy.get("@combo")
			.shadow()
			.find("[ui5-responsive-popover]")
			.as("popover");

		cy.get("@popover")
			.find(".ui5-responsive-popover-footer")
			.find("[ui5-button]")
			.as("footerButton");

		cy.get("@footerButton")
			.should("have.text", COMBOBOX_DIALOG_OK_BUTTON.defaultText);
	});
});