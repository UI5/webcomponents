import CheckBox from "../../../src/CheckBox.js";

describe("CheckBox visual", () => {
	it("basic state — unchecked", () => {
		cy.mount(<CheckBox text="Default checkbox" />);
		cy.screenshot();
	});

	it("checked state", () => {
		cy.mount(<CheckBox text="Checked checkbox" checked />);
		cy.screenshot();
	});

	it("indeterminate state", () => {
		cy.mount(<CheckBox text="Indeterminate checkbox" indeterminate />);
		cy.screenshot();
	});

	it("disabled — unchecked", () => {
		cy.mount(<CheckBox text="Disabled unchecked" disabled />);
		cy.screenshot();
	});

	it("disabled — checked", () => {
		cy.mount(<CheckBox text="Disabled checked" checked disabled />);
		cy.screenshot();
	});

	it("readonly — checked", () => {
		cy.mount(<CheckBox text="Readonly checked" checked readonly />);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(<CheckBox text="Error checkbox" valueState="Negative" />);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(<CheckBox text="Warning checkbox" valueState="Critical" />);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(<CheckBox text="Success checkbox" checked valueState="Positive" />);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(<CheckBox text="Info checkbox" valueState="Information" />);
		cy.screenshot();
	});

	it("wrapping — long text", () => {
		cy.mount(
			<div style={{ width: "200px" }}>
				<CheckBox text="This is a very long checkbox label that should wrap onto multiple lines in normal wrapping mode" />
			</div>
		);
		cy.screenshot();
	});

	it("no wrapping — text truncated", () => {
		cy.mount(
			<div style={{ width: "200px" }}>
				<CheckBox wrappingType="None" text="This is a very long checkbox label that should be truncated" />
			</div>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
				<CheckBox text="Compact unchecked" />
				<CheckBox text="Compact checked" checked />
				<CheckBox text="Compact indeterminate" indeterminate />
			</div>
		);
		cy.screenshot();
	});
});
