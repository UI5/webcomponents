import Toolbar from "../../../src/Toolbar.js";
import ToolbarButton from "../../../src/ToolbarButton.js";
import ToolbarSeparator from "../../../src/ToolbarSeparator.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

describe("ToolbarSeparator visual", () => {
	it("basic state — separator between buttons", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton icon={add} text="Add" />
				<ToolbarSeparator />
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
					<ToolbarSeparator />
					<ToolbarButton icon={decline} text="Decline" />
				</Toolbar>
			</div>
		);
		cy.screenshot();
	});

	it("multiple separators", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton icon={add} text="Add" />
				<ToolbarSeparator />
				<ToolbarButton text="Middle" />
				<ToolbarSeparator />
				<ToolbarButton icon={decline} text="Decline" />
			</Toolbar>
		);
		cy.screenshot();
	});
});
