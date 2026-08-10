import List from "../../../src/List.js";
import ListItemStandard from "../../../src/ListItemStandard.js";
import Avatar from "../../../src/Avatar.js";

describe("ListItemStandard visual", () => {
	it("basic state", () => {
		cy.mount(
			<List>
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("with description", () => {
		cy.mount(
			<List>
				<ListItemStandard description="14-inch display, Intel Core i7">Laptop Lenovo</ListItemStandard>
				<ListItemStandard description="6.1-inch Super Retina XDR display">iPhone 14</ListItemStandard>
				<ListItemStandard description="4K UHD, 27-inch">HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("with icon", () => {
		cy.mount(
			<List>
				<ListItemStandard icon="laptop">Laptop Lenovo</ListItemStandard>
				<ListItemStandard icon="iphone">iPhone 14</ListItemStandard>
				<ListItemStandard icon="monitor-payments">HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("with image — avatar slot", () => {
		cy.mount(
			<List>
				<ListItemStandard>
					<Avatar slot="image" icon="person" />
					John Doe
				</ListItemStandard>
				<ListItemStandard>
					<Avatar slot="image" icon="person" />
					Jane Smith
				</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("type — Active", () => {
		cy.mount(
			<List>
				<ListItemStandard type="Active">Active Item</ListItemStandard>
				<ListItemStandard type="Inactive">Inactive Item</ListItemStandard>
				<ListItemStandard type="Navigation">Navigation Item</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("type — Detail", () => {
		cy.mount(
			<List>
				<ListItemStandard type="Detail">Detail Item 1</ListItemStandard>
				<ListItemStandard type="Detail">Detail Item 2</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("selected state — Single mode", () => {
		cy.mount(
			<List selectionMode="Single">
				<ListItemStandard selected>Selected Item</ListItemStandard>
				<ListItemStandard>Unselected Item</ListItemStandard>
				<ListItemStandard>Another Item</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("selected state — Multiple mode", () => {
		cy.mount(
			<List selectionMode="Multiple">
				<ListItemStandard selected>First Selected</ListItemStandard>
				<ListItemStandard selected>Second Selected</ListItemStandard>
				<ListItemStandard>Unselected Item</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("navigated state", () => {
		cy.mount(
			<List>
				<ListItemStandard navigated>Navigated Item</ListItemStandard>
				<ListItemStandard>Regular Item</ListItemStandard>
				<ListItemStandard>Regular Item</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("icon end", () => {
		cy.mount(
			<List>
				<ListItemStandard icon="laptop" iconEnd>Laptop Lenovo</ListItemStandard>
				<ListItemStandard icon="iphone" iconEnd>iPhone 14</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("delete mode", () => {
		cy.mount(
			<List selectionMode="Delete">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<List selectionMode="Multiple">
					<ListItemStandard selected icon="laptop">Laptop Lenovo</ListItemStandard>
					<ListItemStandard icon="iphone">iPhone 14</ListItemStandard>
					<ListItemStandard icon="monitor-payments">HP Monitor 24</ListItemStandard>
				</List>
			</div>
		);
		cy.screenshot();
	});
});
