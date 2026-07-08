import Tag from "../../../src/Tag.js";
import Icon from "../../../src/Icon.js";
import "@ui5/webcomponents-icons/dist/employee.js";

describe("Tag visual", () => {
	it("all designs", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
				<Tag design="Neutral">Neutral</Tag>
				<Tag design="Information">Information</Tag>
				<Tag design="Positive">Positive</Tag>
				<Tag design="Negative">Negative</Tag>
				<Tag design="Critical">Critical</Tag>
				<Tag design="Set1">Set1</Tag>
				<Tag design="Set2">Set2</Tag>
			</div>
		);
		cy.screenshot();
	});

	it("design — Neutral", () => {
		cy.mount(<Tag design="Neutral">Neutral</Tag>);
		cy.screenshot();
	});

	it("design — Information", () => {
		cy.mount(<Tag design="Information">Information</Tag>);
		cy.screenshot();
	});

	it("design — Positive", () => {
		cy.mount(<Tag design="Positive">Positive</Tag>);
		cy.screenshot();
	});

	it("design — Negative", () => {
		cy.mount(<Tag design="Negative">Negative</Tag>);
		cy.screenshot();
	});

	it("design — Critical", () => {
		cy.mount(<Tag design="Critical">Critical</Tag>);
		cy.screenshot();
	});

	it("design — Set1", () => {
		cy.mount(<Tag design="Set1">Set1</Tag>);
		cy.screenshot();
	});

	it("design — Set2", () => {
		cy.mount(<Tag design="Set2">Set2</Tag>);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<div style={{ display: "flex", gap: "8px" }}>
				<Tag design="Positive"><Icon name="employee" slot="icon" />With icon</Tag>
				<Tag design="Negative"><Icon name="employee" slot="icon" />With icon</Tag>
			</div>
		);
		cy.screenshot();
	});

	it("interactive state", () => {
		cy.mount(<Tag design="Information" interactive>Interactive tag</Tag>);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
				<Tag design="Neutral">Neutral</Tag>
				<Tag design="Positive">Positive</Tag>
				<Tag design="Negative">Negative</Tag>
			</div>
		);
		cy.screenshot();
	});
});
