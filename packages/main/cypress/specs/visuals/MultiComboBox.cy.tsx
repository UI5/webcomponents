import MultiComboBox from "../../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../../src/MultiComboBoxItem.js";
import MultiComboBoxItemGroup from "../../../src/MultiComboBoxItemGroup.js";

describe("MultiComboBox visual", () => {
	it("basic state", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
				<MultiComboBoxItem text="Denmark" />
				<MultiComboBoxItem text="Estonia" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("with selected tokens", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected text="Algeria" />
				<MultiComboBoxItem selected text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
				<MultiComboBoxItem text="Denmark" />
				<MultiComboBoxItem text="Estonia" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("dropdown open", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
				<MultiComboBoxItem text="Denmark" />
				<MultiComboBoxItem text="Estonia" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("dropdown open — first item focused via arrow key", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.screenshot();
	});

	it("filtering — type to narrow list", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem text="Canada" />
				<MultiComboBoxItem text="Denmark" />
				<MultiComboBoxItem text="Estonia" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").realClick();
		cy.realType("B");
		cy.screenshot();
	});

	it("with grouped items — dropdown open", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemGroup headerText="Africa">
					<MultiComboBoxItem text="Algeria" />
					<MultiComboBoxItem text="Egypt" />
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Europe">
					<MultiComboBoxItem text="Bulgaria" />
					<MultiComboBoxItem text="Denmark" />
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<MultiComboBox valueState="Negative">
				<span slot="valueStateMessage">Invalid selection</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<MultiComboBox valueState="Critical">
				<span slot="valueStateMessage">Please review your selection</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<MultiComboBox valueState="Positive">
				<span slot="valueStateMessage">Selection is valid</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<MultiComboBox valueState="Information">
				<span slot="valueStateMessage">Select up to 3 items</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(
			<MultiComboBox disabled>
				<MultiComboBoxItem selected text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("readonly state", () => {
		cy.mount(
			<MultiComboBox readonly>
				<MultiComboBoxItem selected text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("no items — empty dropdown open", () => {
		cy.mount(<MultiComboBox />);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<MultiComboBox>
					<MultiComboBoxItem selected text="Algeria" />
					<MultiComboBoxItem selected text="Bulgaria" />
					<MultiComboBoxItem text="Canada" />
				</MultiComboBox>
			</div>
		);
		cy.screenshot();
	});
});
