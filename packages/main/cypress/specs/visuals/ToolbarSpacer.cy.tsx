import Toolbar from "../../../src/Toolbar.js";
import ToolbarButton from "../../../src/ToolbarButton.js";
import ToolbarSpacer from "../../../src/ToolbarSpacer.js";
import add from "@ui5/webcomponents-icons/dist/add.js";
import decline from "@ui5/webcomponents-icons/dist/decline.js";

describe("ToolbarSpacer visual", () => {
	it("flexible spacer — pushes item to the right", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton icon={add} text="Add" />
				<ToolbarSpacer />
				<ToolbarButton icon={decline} text="Decline" />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("fixed-width spacer", () => {
		cy.mount(
			<Toolbar>
				<ToolbarButton text="Left" />
				<ToolbarSpacer width="80px" />
				<ToolbarButton text="Right" />
			</Toolbar>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Toolbar>
					<ToolbarButton icon={add} text="Add" />
					<ToolbarSpacer />
					<ToolbarButton icon={decline} text="Decline" />
				</Toolbar>
			</div>
		);
		cy.screenshot();
	});
});
