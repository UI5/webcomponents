import Tree from "../../../src/Tree.js";
import TreeItemCustom from "../../../src/TreeItemCustom.js";
import Button from "../../../src/Button.js";

describe("TreeItemCustom visual", () => {
	it("basic state — custom content", () => {
		cy.mount(
			<Tree>
				<TreeItemCustom>
					<span slot="content">Custom content item 1</span>
				</TreeItemCustom>
				<TreeItemCustom>
					<span slot="content">Custom content item 2</span>
				</TreeItemCustom>
			</Tree>
		);
		cy.screenshot();
	});

	it("with button content", () => {
		cy.mount(
			<Tree>
				<TreeItemCustom>
					<Button slot="content">Action 1</Button>
				</TreeItemCustom>
				<TreeItemCustom>
					<Button slot="content">Action 2</Button>
				</TreeItemCustom>
			</Tree>
		);
		cy.screenshot();
	});

	it("expanded with nested custom items", () => {
		cy.mount(
			<Tree>
				<TreeItemCustom showToggleButton expanded>
					<span slot="content">Level 1</span>
					<TreeItemCustom showToggleButton expanded>
						<span slot="content">Level 2</span>
						<TreeItemCustom>
							<span slot="content">Level 3</span>
						</TreeItemCustom>
					</TreeItemCustom>
				</TreeItemCustom>
			</Tree>
		);
		cy.screenshot();
	});

	it("collapsed with children", () => {
		cy.mount(
			<Tree>
				<TreeItemCustom showToggleButton>
					<span slot="content">Parent item</span>
					<TreeItemCustom>
						<span slot="content">Child item</span>
					</TreeItemCustom>
				</TreeItemCustom>
			</Tree>
		);
		cy.screenshot();
	});

	it("selectionMode Multiple — with hideSelectionElement", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItemCustom>
					<span slot="content">With checkbox</span>
				</TreeItemCustom>
				<TreeItemCustom hideSelectionElement>
					<span slot="content">Without checkbox</span>
				</TreeItemCustom>
			</Tree>
		);
		cy.screenshot();
	});

	it("selectionMode Multiple — selected", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItemCustom selected>
					<span slot="content">Selected item</span>
				</TreeItemCustom>
				<TreeItemCustom>
					<span slot="content">Unselected item</span>
				</TreeItemCustom>
			</Tree>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Tree>
					<TreeItemCustom showToggleButton expanded>
						<Button slot="content">Level 1</Button>
						<TreeItemCustom>
							<Button slot="content">Level 2</Button>
						</TreeItemCustom>
					</TreeItemCustom>
				</Tree>
			</div>
		);
		cy.screenshot();
	});
});
