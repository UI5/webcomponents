import { addCustomCSS, removeCustomCSS } from "@ui5/webcomponents-base/dist/Theming.js";
import Select from "../../src/Select.js";
import Option from "../../src/Option.js";

describe("CustomCSS", () => {
	it("addCustomCSS applies custom styles", () => {
		cy.mount(
			<Select id="sel">
				<Option>Option 1</Option>
			</Select>
		);

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.then($el => {
				addCustomCSS("ui5-select", ".ui5-select-root { background-color: rgb(255, 0, 0) !important; }");
			});

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("have.css", "background-color", "rgb(255, 0, 0)");
	});

	it("addCustomCSS returns a string id", () => {
		const id = addCustomCSS("ui5-select", ":host { /* noop */ }");

		expect(id).to.be.a("string");
		expect(id).to.include("custom-css-");
	});

	it("removeCustomCSS removes the applied custom styles", () => {
		cy.mount(
			<Select id="sel">
				<Option>Option 1</Option>
			</Select>
		);

		let cssId: string;

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.then(() => {
				cssId = addCustomCSS("ui5-select", ".ui5-select-root { outline: 5px solid rgb(0, 128, 0); }");
			});

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("have.css", "outline-color", "rgb(0, 128, 0)")
			.then(() => {
				removeCustomCSS("ui5-select", cssId);
			});

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("not.have.css", "outline-color", "rgb(0, 128, 0)");
	});

	it("removeCustomCSS with invalid id does nothing", () => {
		cy.mount(
			<Select id="sel">
				<Option>Option 1</Option>
			</Select>
		);

		let cssId: string;

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.then(() => {
				cssId = addCustomCSS("ui5-select", ".ui5-select-root { outline: 5px solid rgb(0, 0, 255); }");
			});

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("have.css", "outline-color", "rgb(0, 0, 255)")
			.then(() => {
				removeCustomCSS("ui5-select", "non-existent-id");
			});

		// Style should still be applied
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("have.css", "outline-color", "rgb(0, 0, 255)")
			.then(() => {
				removeCustomCSS("ui5-select", cssId);
			});
	});

	it("removeCustomCSS with non-existent tag does nothing", () => {
		// Should not throw
		removeCustomCSS("ui5-nonexistent", "some-id");
	});

	it("multiple addCustomCSS calls can be individually removed", () => {
		cy.mount(
			<Select id="sel">
				<Option>Option 1</Option>
			</Select>
		);

		let id1: string;
		let id2: string;

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.then(() => {
				id1 = addCustomCSS("ui5-select", ".ui5-select-root { outline: 3px solid rgb(255, 0, 0); }");
				id2 = addCustomCSS("ui5-select", ".ui5-select-root { border: 3px solid rgb(0, 0, 255); }");
			});

		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("have.css", "outline-color", "rgb(255, 0, 0)")
			.should("have.css", "border-color", "rgb(0, 0, 255)")
			.then(() => {
				removeCustomCSS("ui5-select", id1);
			});

		// First style removed, second still present
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("not.have.css", "outline-color", "rgb(255, 0, 0)")
			.should("have.css", "border-color", "rgb(0, 0, 255)")
			.then(() => {
				removeCustomCSS("ui5-select", id2);
			});

		// Both removed
		cy.get("[ui5-select]")
			.shadow()
			.find(".ui5-select-root")
			.should("not.have.css", "border-color", "rgb(0, 0, 255)");
	});
});
