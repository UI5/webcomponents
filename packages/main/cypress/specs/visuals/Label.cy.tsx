import Label from "../../../src/Label.js";

describe("Label visual", () => {
	it("basic state", () => {
		cy.mount(<Label>Basic Label</Label>);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Label>Basic Label</Label>
			</div>
		);
		cy.screenshot();
	});

	it("required", () => {
		cy.mount(<Label required>Required Label</Label>);
		cy.screenshot();
	});

	it("show-colon", () => {
		cy.mount(<Label showColon>Label with Colon</Label>);
		cy.screenshot();
	});

	it("required and show-colon", () => {
		cy.mount(<Label required showColon>Required Label with Colon</Label>);
		cy.screenshot();
	});

	it("wrapping — long text", () => {
		cy.mount(
			<Label style="width: 200px">
				Reprehenderit amet cillum tempor ex eu dolor adipisicing reprehenderit pariatur.
			</Label>
		);
		cy.screenshot();
	});

	it("truncated — wrappingType None", () => {
		cy.mount(
			<Label wrappingType="None" style="width: 200px">
				Reprehenderit amet cillum tempor ex eu dolor adipisicing reprehenderit pariatur.
			</Label>
		);
		cy.screenshot();
	});
});
