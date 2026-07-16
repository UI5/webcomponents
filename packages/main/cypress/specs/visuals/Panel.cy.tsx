import Panel from "../../../src/Panel.js";
import Title from "../../../src/Title.js";
import Label from "../../../src/Label.js";

describe("Panel visual", () => {
	it("basic state — expanded with headerText", () => {
		cy.mount(
			<Panel headerText="Panel Header">
				<Label>Panel content goes here.</Label>
			</Panel>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Panel headerText="Panel Header">
					<Label>Panel content goes here.</Label>
				</Panel>
			</div>
		);
		cy.screenshot();
	});

	it("collapsed state", () => {
		cy.mount(
			<Panel headerText="Panel Header" collapsed>
				<Label>Panel content goes here.</Label>
			</Panel>
		);
		cy.screenshot();
	});

	it("fixed panel — no toggle arrow", () => {
		cy.mount(
			<Panel headerText="Fixed Panel" fixed>
				<Label>Panel content goes here.</Label>
			</Panel>
		);
		cy.screenshot();
	});

	it("custom header slot", () => {
		cy.mount(
			<Panel>
				<div slot="header">
					<Title>Custom Header Title</Title>
				</div>
				<Label>Panel content with custom header.</Label>
			</Panel>
		);
		cy.screenshot();
	});

	it("custom header — collapsed", () => {
		cy.mount(
			<Panel collapsed>
				<div slot="header">
					<Title>Custom Header Title</Title>
				</div>
				<Label>Panel content with custom header.</Label>
			</Panel>
		);
		cy.screenshot();
	});

	it("collapsed via header click", () => {
		cy.mount(
			<Panel headerText="Panel Header">
				<Label>Panel content goes here.</Label>
			</Panel>
		);
		cy.get("[ui5-panel]").shadow().find(".ui5-panel-header").realClick();
		cy.wait(300);
		cy.screenshot();
	});
});
