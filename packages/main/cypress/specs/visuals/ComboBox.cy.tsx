import ComboBox from "../../../src/ComboBox.js";
import ComboBoxItem from "../../../src/ComboBoxItem.js";
import ComboBoxItemCustom from "../../../src/ComboBoxItemCustom.js";
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

	it("dropdown open — first item focused via arrow key", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
				<ComboBoxItem text="Canada" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
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

	it("selected item", () => {
		cy.mount(
			<ComboBox value="Bulgaria">
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" selected />
				<ComboBoxItem text="Canada" />
			</ComboBox>
		);
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

	it("value state — Negative — dropdown open", () => {
		cy.mount(
			<ComboBox value="invalid" valueState="Negative">
				<span slot="valueStateMessage">Invalid value</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Negative — focused", () => {
		cy.mount(
			<ComboBox value="invalid" valueState="Negative">
				<span slot="valueStateMessage">Invalid value</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("input").realClick();
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

	it("value state — Critical — dropdown open", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Critical">
				<span slot="valueStateMessage">Please review</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Critical — focused", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Critical">
				<span slot="valueStateMessage">Please review</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("input").realClick();
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

	it("value state — Positive — dropdown open", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Positive">
				<span slot="valueStateMessage">Valid selection</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Positive — focused", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Positive">
				<span slot="valueStateMessage">Valid selection</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("input").realClick();
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

	it("value state — Information — dropdown open", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Information">
				<span slot="valueStateMessage">Select a country</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Information — focused", () => {
		cy.mount(
			<ComboBox value="Bulgaria" valueState="Information">
				<span slot="valueStateMessage">Select a country</span>
				<ComboBoxItem text="Algeria" />
				<ComboBoxItem text="Bulgaria" />
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("input").realClick();
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

describe("ComboBoxItemCustom visual", () => {
	it("basic state", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemCustom text="Algeria">
					<span>🇩🇿 Algeria</span>
				</ComboBoxItemCustom>
				<ComboBoxItemCustom text="Bulgaria">
					<span>🇧🇬 Bulgaria</span>
				</ComboBoxItemCustom>
				<ComboBoxItemCustom text="Canada">
					<span>🇨🇦 Canada</span>
				</ComboBoxItemCustom>
			</ComboBox>
		);
		cy.screenshot();
	});

	it("dropdown open", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemCustom text="Algeria">
					<span>🇩🇿 Algeria</span>
				</ComboBoxItemCustom>
				<ComboBoxItemCustom text="Bulgaria">
					<span>🇧🇬 Bulgaria</span>
				</ComboBoxItemCustom>
				<ComboBoxItemCustom text="Canada">
					<span>🇨🇦 Canada</span>
				</ComboBoxItemCustom>
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("dropdown open — first item focused via arrow key", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemCustom text="Algeria">
					<span>🇩🇿 Algeria</span>
				</ComboBoxItemCustom>
				<ComboBoxItemCustom text="Bulgaria">
					<span>🇧🇬 Bulgaria</span>
				</ComboBoxItemCustom>
				<ComboBoxItemCustom text="Canada">
					<span>🇨🇦 Canada</span>
				</ComboBoxItemCustom>
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.screenshot();
	});

	it("filtering — type to narrow list", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemCustom text="Algeria">
					<span>🇩🇿 Algeria</span>
				</ComboBoxItemCustom>
				<ComboBoxItemCustom text="Bulgaria">
					<span>🇧🇬 Bulgaria</span>
				</ComboBoxItemCustom>
				<ComboBoxItemCustom text="Canada">
					<span>🇨🇦 Canada</span>
				</ComboBoxItemCustom>
			</ComboBox>
		);
		cy.get("[ui5-combobox]").realClick();
		cy.realType("B");
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ComboBox>
					<ComboBoxItemCustom text="Algeria">
						<span>🇩🇿 Algeria</span>
					</ComboBoxItemCustom>
					<ComboBoxItemCustom text="Bulgaria">
						<span>🇧🇬 Bulgaria</span>
					</ComboBoxItemCustom>
					<ComboBoxItemCustom text="Canada">
						<span>🇨🇦 Canada</span>
					</ComboBoxItemCustom>
				</ComboBox>
			</div>
		);
		cy.screenshot();
	});
});

describe("ComboBoxItemGroup visual", () => {
	it("basic state", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Africa">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Egypt" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Europe">
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="France" />
				</ComboBoxItemGroup>
			</ComboBox>
		);
		cy.screenshot();
	});

	it("dropdown open", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Africa">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Egypt" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Europe">
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="France" />
				</ComboBoxItemGroup>
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("dropdown open — first item focused via arrow key", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Africa">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Egypt" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Europe">
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="France" />
				</ComboBoxItemGroup>
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.screenshot();
	});

	it("dropdown open — group header focused via arrow key", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Africa">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Egypt" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Europe">
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="France" />
				</ComboBoxItemGroup>
			</ComboBox>
		);
		cy.get("[ui5-combobox]").shadow().find("[ui5-icon]").realClick();
		cy.get("[ui5-combobox]").shadow().find("[ui5-responsive-popover]").ui5ResponsivePopoverOpened();
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.realPress("ArrowDown");
		cy.screenshot();
	});

	it("filtering — type to narrow list", () => {
		cy.mount(
			<ComboBox>
				<ComboBoxItemGroup headerText="Africa">
					<ComboBoxItem text="Algeria" />
					<ComboBoxItem text="Egypt" />
				</ComboBoxItemGroup>
				<ComboBoxItemGroup headerText="Europe">
					<ComboBoxItem text="Bulgaria" />
					<ComboBoxItem text="France" />
				</ComboBoxItemGroup>
			</ComboBox>
		);
		cy.get("[ui5-combobox]").realClick();
		cy.realType("B");
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<ComboBox>
					<ComboBoxItemGroup headerText="Africa">
						<ComboBoxItem text="Algeria" />
						<ComboBoxItem text="Egypt" />
					</ComboBoxItemGroup>
					<ComboBoxItemGroup headerText="Europe">
						<ComboBoxItem text="Bulgaria" />
						<ComboBoxItem text="France" />
					</ComboBoxItemGroup>
				</ComboBox>
			</div>
		);
		cy.screenshot();
	});
});
