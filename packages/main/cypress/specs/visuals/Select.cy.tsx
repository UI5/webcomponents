import Select from "../../../src/Select.js";
import Option from "../../../src/Option.js";

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
});
