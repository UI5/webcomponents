import Tree from "../../../src/Tree.js";
import TreeItem from "../../../src/TreeItem.js";
import paste from "@ui5/webcomponents-icons/dist/paste.js";
import copy from "@ui5/webcomponents-icons/dist/copy.js";

describe("Tree visual", () => {
	it("basic state — flat items", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Item 1" />
				<TreeItem text="Item 2" />
				<TreeItem text="Item 3" />
			</Tree>
		);
		cy.screenshot();
	});

	it("nested items — collapsed", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" icon={paste}>
					<TreeItem text="Tree 1.1">
						<TreeItem text="Tree 1.1.1" />
						<TreeItem text="Tree 1.1.2" />
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2" icon={copy}>
					<TreeItem text="Tree 2.1" />
					<TreeItem text="Tree 2.2" />
				</TreeItem>
			</Tree>
		);
		cy.screenshot();
	});

	it("nested items — expanded", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" icon={paste} expanded>
					<TreeItem text="Tree 1.1" expanded>
						<TreeItem text="Tree 1.1.1" />
						<TreeItem text="Tree 1.1.2" />
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2" icon={copy} expanded>
					<TreeItem text="Tree 2.1" />
					<TreeItem text="Tree 2.2" />
				</TreeItem>
			</Tree>
		);
		cy.screenshot();
	});

	it("with additionalText and additionalTextState", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree 1" additionalText="Available" additionalTextState="Positive" expanded>
					<TreeItem text="Tree 1.1" additionalText="Re-stock" additionalTextState="Negative" expanded>
						<TreeItem text="Tree 1.1.1" additionalText="Required" additionalTextState="Critical" />
						<TreeItem text="Tree 1.1.2" additionalText="Available" additionalTextState="Positive" />
					</TreeItem>
				</TreeItem>
				<TreeItem text="Tree 2" additionalText="Info" additionalTextState="Information" />
			</Tree>
		);
		cy.screenshot();
	});

	it("selectionMode Single", () => {
		cy.mount(
			<Tree selectionMode="Single">
				<TreeItem text="Item 1" selected />
				<TreeItem text="Item 2" />
				<TreeItem text="Item 3" />
			</Tree>
		);
		cy.screenshot();
	});

	it("selectionMode Multiple", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Item 1" selected indeterminate>
					<TreeItem text="Item 1.1" selected />
					<TreeItem text="Item 1.2" />
				</TreeItem>
				<TreeItem text="Item 2" selected />
				<TreeItem text="Item 3" />
			</Tree>
		);
		cy.screenshot();
	});

	it("selectionMode Delete", () => {
		cy.mount(
			<Tree selectionMode="Delete">
				<TreeItem text="Item 1" />
				<TreeItem text="Item 2" />
				<TreeItem text="Item 3" />
			</Tree>
		);
		cy.screenshot();
	});

	it("noDataText", () => {
		cy.mount(<Tree noDataText="No items available" />);
		cy.screenshot();
	});

	it("headerText and footerText", () => {
		cy.mount(
			<Tree headerText="Tree Header" footerText="Tree Footer">
				<TreeItem text="Item 1" />
				<TreeItem text="Item 2" />
			</Tree>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Tree>
					<TreeItem text="Tree 1" icon={paste} expanded>
						<TreeItem text="Tree 1.1" />
						<TreeItem text="Tree 1.2" />
					</TreeItem>
					<TreeItem text="Tree 2" icon={copy} />
				</Tree>
			</div>
		);
		cy.screenshot();
	});
});
