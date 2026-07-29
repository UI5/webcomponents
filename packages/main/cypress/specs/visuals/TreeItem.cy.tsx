import Tree from "../../../src/Tree.js";
import TreeItem from "../../../src/TreeItem.js";
import Icon from "../../../src/Icon.js";
import paste from "@ui5/webcomponents-icons/dist/paste.js";
import copy from "@ui5/webcomponents-icons/dist/copy.js";
import bell from "@ui5/webcomponents-icons/dist/bell.js";

describe("TreeItem visual", () => {
	it("basic state", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Tree item" />
			</Tree>
		);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Item with icon" icon={paste} />
				<TreeItem text="Another icon" icon={copy} />
				<TreeItem text="Bell icon" icon={bell} />
			</Tree>
		);
		cy.screenshot();
	});

	it("with image slot", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Item with image">
					<Icon name={bell} slot="image" />
				</TreeItem>
				<TreeItem text="Another item" />
			</Tree>
		);
		cy.screenshot();
	});

	it("with additionalText — all states", () => {
		cy.mount(
			<Tree>
				<TreeItem text="None state" additionalText="Default" additionalTextState="None" />
				<TreeItem text="Positive state" additionalText="Available" additionalTextState="Positive" />
				<TreeItem text="Negative state" additionalText="Error" additionalTextState="Negative" />
				<TreeItem text="Critical state" additionalText="Warning" additionalTextState="Critical" />
				<TreeItem text="Information state" additionalText="Info" additionalTextState="Information" />
			</Tree>
		);
		cy.screenshot();
	});

	it("expanded with children", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Parent" expanded>
					<TreeItem text="Child 1" />
					<TreeItem text="Child 2" />
				</TreeItem>
			</Tree>
		);
		cy.screenshot();
	});

	it("collapsed with children", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Parent">
					<TreeItem text="Child 1" />
					<TreeItem text="Child 2" />
				</TreeItem>
			</Tree>
		);
		cy.screenshot();
	});

	it("selected", () => {
		cy.mount(
			<Tree selectionMode="Single">
				<TreeItem text="Selected item" selected />
				<TreeItem text="Not selected" />
			</Tree>
		);
		cy.screenshot();
	});

	it("indeterminate — Multiple mode", () => {
		cy.mount(
			<Tree selectionMode="Multiple">
				<TreeItem text="Indeterminate" selected indeterminate expanded>
					<TreeItem text="Child selected" selected />
					<TreeItem text="Child not selected" />
				</TreeItem>
			</Tree>
		);
		cy.screenshot();
	});

	it("deeply nested — multiple levels", () => {
		cy.mount(
			<Tree>
				<TreeItem text="Level 1" icon={paste} expanded>
					<TreeItem text="Level 2" expanded>
						<TreeItem text="Level 3" expanded>
							<TreeItem text="Level 4" />
						</TreeItem>
					</TreeItem>
				</TreeItem>
			</Tree>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<Tree>
					<TreeItem text="Item with icon" icon={paste} additionalText="Available" additionalTextState="Positive" expanded>
						<TreeItem text="Child 1" />
						<TreeItem text="Child 2" />
					</TreeItem>
					<TreeItem text="Second item" icon={copy} />
				</Tree>
			</div>
		);
		cy.screenshot();
	});
});
