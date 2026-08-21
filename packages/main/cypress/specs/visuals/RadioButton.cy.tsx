import RadioButton from "../../../src/RadioButton.js";

describe("RadioButton visual", () => {
	it("basic state — unchecked", () => {
		cy.mount(<RadioButton text="Option A" name="group1" />);
		cy.screenshot();
	});

	it("group — one checked", () => {
		cy.mount(
			<div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
				<RadioButton text="Option A" name="group1" checked />
				<RadioButton text="Option B" name="group1" />
				<RadioButton text="Option C" name="group1" />
			</div>
		);
		cy.screenshot();
	});

	it("disabled — unchecked", () => {
		cy.mount(<RadioButton text="Disabled option" name="group2" disabled />);
		cy.screenshot();
	});

	it("disabled — checked", () => {
		cy.mount(<RadioButton text="Disabled checked" name="group3" checked disabled />);
		cy.screenshot();
	});

	it("readonly — checked", () => {
		cy.mount(<RadioButton text="Readonly checked" name="group4" checked readonly />);
		cy.screenshot();
	});

	it("value state — Negative", () => {
		cy.mount(<RadioButton text="Error option" name="group5" valueState="Negative" />);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(<RadioButton text="Warning option" name="group6" valueState="Critical" />);
		cy.screenshot();
	});

	it("value state — Positive", () => {
		cy.mount(<RadioButton text="Success option" name="group7" checked valueState="Positive" />);
		cy.screenshot();
	});

	it("value state — Information", () => {
		cy.mount(<RadioButton text="Info option" name="group8" valueState="Information" />);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
				<RadioButton text="Compact A" name="groupC" checked />
				<RadioButton text="Compact B" name="groupC" />
				<RadioButton text="Compact C" name="groupC" />
			</div>
		);
		cy.screenshot();
	});
});
