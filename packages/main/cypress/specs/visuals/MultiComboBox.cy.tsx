import MultiComboBox from "../../../src/MultiComboBox.js";
import MultiComboBoxItem from "../../../src/MultiComboBoxItem.js";
import MultiComboBoxItemCustom from "../../../src/MultiComboBoxItemCustom.js";
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

	it("dropdown open — pre-selected items checked", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItem selected text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
				<MultiComboBoxItem selected text="Canada" />
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

	it("value state — Negative — dropdown open", () => {
		cy.mount(
			<MultiComboBox valueState="Negative">
				<span slot="valueStateMessage">Invalid selection</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Negative — focused", () => {
		cy.mount(
			<MultiComboBox valueState="Negative">
				<span slot="valueStateMessage">Invalid selection</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("input").realClick();
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

	it("value state — Critical — dropdown open", () => {
		cy.mount(
			<MultiComboBox valueState="Critical">
				<span slot="valueStateMessage">Please review your selection</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Critical — focused", () => {
		cy.mount(
			<MultiComboBox valueState="Critical">
				<span slot="valueStateMessage">Please review your selection</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("input").realClick();
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

	it("value state — Positive — dropdown open", () => {
		cy.mount(
			<MultiComboBox valueState="Positive">
				<span slot="valueStateMessage">Selection is valid</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Positive — focused", () => {
		cy.mount(
			<MultiComboBox valueState="Positive">
				<span slot="valueStateMessage">Selection is valid</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("input").realClick();
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

	it("value state — Information — dropdown open", () => {
		cy.mount(
			<MultiComboBox valueState="Information">
				<span slot="valueStateMessage">Select up to 3 items</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Information — focused", () => {
		cy.mount(
			<MultiComboBox valueState="Information">
				<span slot="valueStateMessage">Select up to 3 items</span>
				<MultiComboBoxItem text="Algeria" />
				<MultiComboBoxItem text="Bulgaria" />
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("input").realClick();
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

	// MultiComboBoxItemCustom
	it("custom items — basic state", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemCustom text="Algeria">
					<span>Algeria</span>
				</MultiComboBoxItemCustom>
				<MultiComboBoxItemCustom text="Bulgaria">
					<span>Bulgaria</span>
				</MultiComboBoxItemCustom>
				<MultiComboBoxItemCustom text="Canada">
					<span>Canada</span>
				</MultiComboBoxItemCustom>
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("custom items — dropdown open", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemCustom text="Algeria">
					<span>Algeria</span>
				</MultiComboBoxItemCustom>
				<MultiComboBoxItemCustom text="Bulgaria">
					<span>Bulgaria</span>
				</MultiComboBoxItemCustom>
				<MultiComboBoxItemCustom text="Canada">
					<span>Canada</span>
				</MultiComboBoxItemCustom>
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("custom items — dropdown open with pre-selected items checked", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemCustom selected text="Algeria">
					<span>Algeria</span>
				</MultiComboBoxItemCustom>
				<MultiComboBoxItemCustom text="Bulgaria">
					<span>Bulgaria</span>
				</MultiComboBoxItemCustom>
				<MultiComboBoxItemCustom selected text="Canada">
					<span>Canada</span>
				</MultiComboBoxItemCustom>
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	// MultiComboBoxItemGroup
	it("grouped items — basic state", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemGroup headerText="Africa">
					<MultiComboBoxItem text="Algeria" />
					<MultiComboBoxItem text="Egypt" />
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Europe">
					<MultiComboBoxItem text="Bulgaria" />
					<MultiComboBoxItem text="France" />
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);
		cy.screenshot();
	});

	it("grouped items — dropdown open", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemGroup headerText="Africa">
					<MultiComboBoxItem text="Algeria" />
					<MultiComboBoxItem text="Egypt" />
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Europe">
					<MultiComboBoxItem text="Bulgaria" />
					<MultiComboBoxItem text="France" />
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("grouped items — dropdown open with pre-selected items checked", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemGroup headerText="Africa">
					<MultiComboBoxItem selected text="Algeria" />
					<MultiComboBoxItem text="Egypt" />
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Europe">
					<MultiComboBoxItem text="Bulgaria" />
					<MultiComboBoxItem selected text="France" />
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("grouped items — first item focused via arrow key", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemGroup headerText="Africa">
					<MultiComboBoxItem text="Algeria" />
					<MultiComboBoxItem text="Egypt" />
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Europe">
					<MultiComboBoxItem text="Bulgaria" />
					<MultiComboBoxItem text="France" />
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-multi-combobox]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.screenshot();
	});

	it("grouped items — filtering", () => {
		cy.mount(
			<MultiComboBox>
				<MultiComboBoxItemGroup headerText="Africa">
					<MultiComboBoxItem text="Algeria" />
					<MultiComboBoxItem text="Egypt" />
				</MultiComboBoxItemGroup>
				<MultiComboBoxItemGroup headerText="Europe">
					<MultiComboBoxItem text="Bulgaria" />
					<MultiComboBoxItem text="France" />
				</MultiComboBoxItemGroup>
			</MultiComboBox>
		);
		cy.get("[ui5-multi-combobox]").realClick();
		cy.realType("B");
		cy.screenshot();
	});
});
