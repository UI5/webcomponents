import Toolbar from "../../../src/Toolbar.js";
import ToolbarButton from "../../../src/ToolbarButton.js";
import ToolbarSelect from "../../../src/ToolbarSelect.js";
import ToolbarSelectOption from "../../../src/ToolbarSelectOption.js";
import ToolbarSeparator from "../../../src/ToolbarSeparator.js";
import ToolbarSpacer from "../../../src/ToolbarSpacer.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import employee from "@ui5/webcomponents-icons/dist/employee.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

describe("Toolbar visual", () => {
	it("basic state — buttons, separator, select", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton icon={add} text="Add" />
				<ToolbarButton icon={employee} text="Hire" />
				<ToolbarSeparator />
				<ToolbarSelect>
					<ToolbarSelectOption>Option 1</ToolbarSelectOption>
					<ToolbarSelectOption selected>Option 2</ToolbarSelectOption>
					<ToolbarSelectOption>Option 3</ToolbarSelectOption>
				</ToolbarSelect>
				<ToolbarButton icon={decline} text="Decline" />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Toolbar>
					<ToolbarButton icon={add} text="Add" />
					<ToolbarButton icon={employee} text="Hire" />
					<ToolbarSeparator />
					<ToolbarButton icon={decline} text="Decline" />
				</Toolbar>
			</div>
		);
		cy.screenshot();
	});

	it("with spacer — right-aligned item", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton icon={add} text="Add" />
				<ToolbarButton icon={employee} text="Hire" />
				<ToolbarSpacer />
				<ToolbarButton icon={decline} text="Decline" />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("overflow popover open — AlwaysOverflow items", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Visible" overflowPriority="NeverOverflow" />
				<ToolbarButton icon={add} text="Add" overflowPriority="AlwaysOverflow" />
				<ToolbarButton icon={employee} text="Hire" overflowPriority="AlwaysOverflow" />
			</Toolbar>
		);
		cy.get("[ui5-toolbar]").shadow().find(".ui5-tb-overflow-btn").realClick();
		cy.get("[ui5-toolbar]").shadow().find(".ui5-overflow-popover").should("have.attr", "open", "open");
		cy.screenshot();
	});
});
