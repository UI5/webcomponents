import SplitButton from "../../../src/SplitButton.js";

describe("SplitButton visual", () => {
	it("design — Default", () => {
		cy.mount(<SplitButton>Default</SplitButton>);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<SplitButton>Default</SplitButton>
			</div>
		);
		cy.screenshot();
	});

	it("design — Emphasized", () => {
		cy.mount(<SplitButton design="Emphasized">Emphasized</SplitButton>);
		cy.screenshot();
	});

	it("design — Positive", () => {
		cy.mount(<SplitButton design="Positive">Positive</SplitButton>);
		cy.screenshot();
	});

	it("design — Negative", () => {
		cy.mount(<SplitButton design="Negative">Negative</SplitButton>);
		cy.screenshot();
	});

	it("design — Transparent", () => {
		cy.mount(<SplitButton design="Transparent">Transparent</SplitButton>);
		cy.screenshot();
	});

	it("design — Attention", () => {
		cy.mount(<SplitButton design="Attention">Attention</SplitButton>);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(<SplitButton icon="add">Add Item</SplitButton>);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(<SplitButton disabled>Disabled</SplitButton>);
		cy.screenshot();
	});

	it("all designs in a row", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap" }}>
				<SplitButton>Default</SplitButton>
				<SplitButton design="Emphasized">Emphasized</SplitButton>
				<SplitButton design="Positive">Positive</SplitButton>
				<SplitButton design="Negative">Negative</SplitButton>
				<SplitButton design="Transparent">Transparent</SplitButton>
				<SplitButton design="Attention">Attention</SplitButton>
			</div>
		);
		cy.screenshot();
	});
});
