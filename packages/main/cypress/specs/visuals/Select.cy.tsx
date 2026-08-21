import Select from "../../../src/Select.js";
import Option from "../../../src/Option.js";
import OptionCustom from "../../../src/OptionCustom.js";

describe("Select visual", () => {
	it("basic state", () => {
		cy.mount(
			<Select>
				<Option>Apple</Option>
				<Option>Banana</Option>
				<Option>Cherry</Option>
			</Select>
		);
		cy.screenshot();
	});

	it("with selected option", () => {
		cy.mount(
			<Select>
				<Option>Apple</Option>
				<Option selected>Banana</Option>
				<Option>Cherry</Option>
			</Select>
		);
		cy.screenshot();
	});

	it("dropdown open", () => {
		cy.mount(
			<Select>
				<Option>Apple</Option>
				<Option>Banana</Option>
				<Option>Cherry</Option>
				<Option>Date</Option>
				<Option>Elderberry</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("disabled state", () => {
		cy.mount(
			<Select disabled>
				<Option>Apple</Option>
				<Option selected>Banana</Option>
			</Select>
		);
		cy.screenshot();
	});

	it("readonly state", () => {
		cy.mount(
			<Select readonly>
				<Option>Apple</Option>
				<Option selected>Banana</Option>
			</Select>
		);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(
			<Select valueState="Negative">
				<span slot="valueStateMessage">Invalid selection</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.screenshot();
	});

	it("value state — Negative — dropdown open", () => {
		cy.mount(
			<Select valueState="Negative">
				<span slot="valueStateMessage">Invalid selection</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Negative — focused, dropdown closed", () => {
		cy.mount(
			<Select valueState="Negative">
				<span slot="valueStateMessage">Invalid selection</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("Escape");
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<Select valueState="Critical">
				<span slot="valueStateMessage">Please review</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.screenshot();
	});

	it("value state — Critical — dropdown open", () => {
		cy.mount(
			<Select valueState="Critical">
				<span slot="valueStateMessage">Please review</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Critical — focused, dropdown closed", () => {
		cy.mount(
			<Select valueState="Critical">
				<span slot="valueStateMessage">Please review</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("Escape");
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(
			<Select valueState="Positive">
				<span slot="valueStateMessage">Valid selection</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.screenshot();
	});

	it("value state — Positive — dropdown open", () => {
		cy.mount(
			<Select valueState="Positive">
				<span slot="valueStateMessage">Valid selection</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Positive — focused, dropdown closed", () => {
		cy.mount(
			<Select valueState="Positive">
				<span slot="valueStateMessage">Valid selection</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("Escape");
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(
			<Select valueState="Information">
				<span slot="valueStateMessage">Select one option</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.screenshot();
	});

	it("value state — Information — dropdown open", () => {
		cy.mount(
			<Select valueState="Information">
				<span slot="valueStateMessage">Select one option</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("value state — Information — focused, dropdown closed", () => {
		cy.mount(
			<Select valueState="Information">
				<span slot="valueStateMessage">Select one option</span>
				<Option>Apple</Option>
				<Option>Banana</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.realPress("Escape");
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Select>
					<Option>Apple</Option>
					<Option selected>Banana</Option>
					<Option>Cherry</Option>
				</Select>
			</div>
		);
		cy.screenshot();
	});

	// Option
	it("option with icon — dropdown open", () => {
		cy.mount(
			<Select>
				<Option icon="laptop">Laptop</Option>
				<Option icon="iphone" selected>Phone</Option>
				<Option icon="monitor-payments">Monitor</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("option with additional text — dropdown open", () => {
		cy.mount(
			<Select>
				<Option additionalText="EUR">Euro</Option>
				<Option additionalText="USD" selected>US Dollar</Option>
				<Option additionalText="GBP">British Pound</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("disabled option in dropdown", () => {
		cy.mount(
			<Select>
				<Option>Apple</Option>
				<Option disabled>Banana (unavailable)</Option>
				<Option selected>Cherry</Option>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	// OptionCustom
	it("custom options — dropdown open", () => {
		cy.mount(
			<Select>
				<OptionCustom displayText="Option 1">
					<div style={{ padding: "4px 8px" }}>Option 1</div>
				</OptionCustom>
				<OptionCustom displayText="Option 2" selected>
					<div style={{ padding: "4px 8px" }}>Option 2</div>
				</OptionCustom>
				<OptionCustom displayText="Option 3">
					<div style={{ padding: "4px 8px" }}>Option 3</div>
				</OptionCustom>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});

	it("custom options with rich content — dropdown open", () => {
		cy.mount(
			<Select>
				<OptionCustom displayText="John Doe">
					<div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 8px" }}>
						<div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#0070f2", flexShrink: "0" }} />
						<div>
							<div style={{ fontWeight: "bold", fontSize: "14px" }}>John Doe</div>
							<div style={{ fontSize: "12px", color: "#666" }}>Developer</div>
						</div>
					</div>
				</OptionCustom>
				<OptionCustom displayText="Jane Smith" selected>
					<div style={{ display: "flex", alignItems: "center", gap: "8px", padding: "4px 8px" }}>
						<div style={{ width: "32px", height: "32px", borderRadius: "50%", background: "#e9730c", flexShrink: "0" }} />
						<div>
							<div style={{ fontWeight: "bold", fontSize: "14px" }}>Jane Smith</div>
							<div style={{ fontSize: "12px", color: "#666" }}>Designer</div>
						</div>
					</div>
				</OptionCustom>
			</Select>
		);
		cy.get("[ui5-select]").realClick();
		cy.get("[ui5-select]").shadow().find("ui5-responsive-popover").ui5ResponsivePopoverOpened();
		cy.screenshot();
	});
});
