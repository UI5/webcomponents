import Toolbar from "../../../src/Toolbar.js";
import ToolbarSelect from "../../../src/ToolbarSelect.js";
import ToolbarSelectOption from "../../../src/ToolbarSelectOption.js";

describe("ToolbarSelect visual", () => {
	it("basic state", () => {
		cy.mount(
			<Toolbar>
				<ToolbarSelect>
					<ToolbarSelectOption>Option 1</ToolbarSelectOption>
					<ToolbarSelectOption selected>Option 2</ToolbarSelectOption>
					<ToolbarSelectOption>Option 3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Toolbar>
					<ToolbarSelect>
						<ToolbarSelectOption>Option 1</ToolbarSelectOption>
						<ToolbarSelectOption selected>Option 2</ToolbarSelectOption>
						<ToolbarSelectOption>Option 3</ToolbarSelectOption>
					</ToolbarSelect>
				</Toolbar>
			</div>
		);
		cy.screenshot();
	});

	it("disabled", () => {
		cy.mount(
			<Toolbar>
				<ToolbarSelect disabled>
					<ToolbarSelectOption>Option 1</ToolbarSelectOption>
					<ToolbarSelectOption selected>Option 2</ToolbarSelectOption>
					<ToolbarSelectOption>Option 3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);
		cy.screenshot();
	});

	it("value state — Critical", () => {
		cy.mount(
			<Toolbar>
				<ToolbarSelect valueState="Critical">
					<ToolbarSelectOption>Option 1</ToolbarSelectOption>
					<ToolbarSelectOption selected>Option 2</ToolbarSelectOption>
					<ToolbarSelectOption>Option 3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);
		cy.screenshot();
	});

	it("dropdown open", () => {
		cy.mount(
			<Toolbar>
				<ToolbarSelect>
					<ToolbarSelectOption>Option 1</ToolbarSelectOption>
					<ToolbarSelectOption selected>Option 2</ToolbarSelectOption>
					<ToolbarSelectOption>Option 3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);
		cy.get("[ui5-toolbar-select]").shadow().find("[ui5-select]").realClick();
		cy.screenshot();
	});

	it("in overflow popover", () => {
		cy.mount(
			<Toolbar>
				<ToolbarSelect overflowPriority="AlwaysOverflow">
					<ToolbarSelectOption>Option 1</ToolbarSelectOption>
					<ToolbarSelectOption selected>Option 2</ToolbarSelectOption>
					<ToolbarSelectOption>Option 3</ToolbarSelectOption>
				</ToolbarSelect>
			</Toolbar>
		);
		cy.get("[ui5-toolbar]").shadow().find(".ui5-tb-overflow-btn").realClick();
		cy.get("[ui5-toolbar]").shadow().find(".ui5-overflow-popover").should("have.attr", "open", "open");
		cy.screenshot();
	});
});
