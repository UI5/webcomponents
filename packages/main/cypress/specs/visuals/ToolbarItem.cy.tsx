import Toolbar from "../../../src/Toolbar.js";
import ToolbarItem from "../../../src/ToolbarItem.js";
import Button from "../../../src/Button.js";
import Switch from "../../../src/Switch.js";

describe("ToolbarItem visual", () => {
	it("basic state — wrapping a button", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<Button>Custom Action</Button>
				</ToolbarItem>
			</Toolbar>
		);
		cy.screenshot();
	});

	it("wrapping a switch", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem>
					<Switch text="Enable" />
				</ToolbarItem>
			</Toolbar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Toolbar>
					<ToolbarItem>
						<Button>Compact Action</Button>
					</ToolbarItem>
				</Toolbar>
			</div>
		);
		cy.screenshot();
	});

	it("in overflow popover", () => {
		cy.mount(
			<Toolbar>
				<ToolbarItem overflowPriority="AlwaysOverflow">
					<Button>Overflow Button</Button>
				</ToolbarItem>
				<ToolbarItem overflowPriority="AlwaysOverflow">
					<Switch />
				</ToolbarItem>
			</Toolbar>
		);
		cy.get("[ui5-toolbar]").shadow().find(".ui5-tb-overflow-btn").realClick();
		cy.get("[ui5-toolbar]").shadow().find(".ui5-overflow-popover").should("have.attr", "open", "open");
		cy.screenshot();
	});
});
