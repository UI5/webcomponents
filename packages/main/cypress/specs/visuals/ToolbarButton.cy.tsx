import Toolbar from "../../../src/Toolbar.js";
import ToolbarButton from "../../../src/ToolbarButton.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";

describe("ToolbarButton visual", () => {
	it("basic state — text only", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Click Me" />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton icon={add} text="Add" />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("icon only", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton icon={add} />
				<ToolbarButton icon={employee} />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("design variants", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Default" design="Default" />
				<ToolbarButton text="Emphasized" design="Emphasized" />
				<ToolbarButton text="Positive" design="Positive" />
				<ToolbarButton text="Negative" design="Negative" />
				<ToolbarButton text="Transparent" design="Transparent" />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Disabled" icon={add} disabled />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Toolbar>
					<ToolbarButton icon={add} text="Add" />
					<ToolbarButton text="Emphasized" design="Emphasized" />
				</Toolbar>
			</div>
		);
		cy.screenshot();
	});

	it("in overflow popover", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton icon={add} text="Add" overflowPriority="AlwaysOverflow" />
				<ToolbarButton icon={employee} text="Hire" overflowPriority="AlwaysOverflow" />
			</Toolbar>
		);
		cy.get("[ui5-toolbar]").shadow().find(".ui5-tb-overflow-btn").realClick();
		cy.get("[ui5-toolbar]").shadow().find(".ui5-overflow-popover").should("have.attr", "open", "open");
		cy.screenshot();
	});
});
