import ComboBox from "../../../src/ComboBox.js";
import ComboBoxItem from "../../../src/ComboBoxItem.js";
import ComboBoxItemGroup from "../../../src/ComboBoxItemGroup.js";

describe("ComboBox visual", () => {
	it("basic state", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Canada" />
				<ComboBoxItem text="Denmark" />
				<ComboBoxItem text="Estonia" />
			</ComboBox>
		);
		cy.screenshot();
	});

	it("with value", () => {
		cy.mount(
			<ComboBox value="Bulgaria">
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Canada" />
			</ComboBox>
		);
		cy.screenshot();
	});

	it("dropdown open", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Canada" />
				<ComboBoxItem text="Denmark" />
				<ComboBoxItem text="Estonia" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("filtering — type to narrow list", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Canada" />
				<ComboBoxItem text="Denmark" />
				<ComboBoxItem text="Estonia" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").realClick();
		cy.realType("B");
		cy.screenshot();
	});

	it("with grouped items — dropdown open", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Africa">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Egypt" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Europe">
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="Denmark" />
				</ComboBoxItemGroup>
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(
			<ComboBox value="Bulgaria" disabled>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.screenshot();
	});

	it("readonly state", () => {
		cy.mount(
			<ComboBox value="Bulgaria" readonly>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<ComboBox value="invalid" valueState="Negative">
				<span slot="valueStateMessage">Invalid value</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Critical">
				<span slot="valueStateMessage">Please review</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Positive">
				<span slot="valueStateMessage">Valid selection</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Information">
				<span slot="valueStateMessage">Select a country</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ComboBox value="Bulgaria">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="Canada" />
				</ComboBox>
			</div>
		);
		cy.screenshot();
	});
});
