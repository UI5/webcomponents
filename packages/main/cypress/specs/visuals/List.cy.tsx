import List from "../../../src/List.js";
import ListItemStandard from "../../../src/ListItemStandard.js";
import ListItemGroup from "../../../src/ListItemGroup.js";

describe("List visual", () => {
	it("basic state", () => {
		cy.mount(
			<List headerText="Products">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
				<ListItemStandard>Keyboard Logitech</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("no header", () => {
		cy.mount(
			<List>
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("selection mode — Single", () => {
		cy.mount(
			<List selectionMode="Single" headerText="Select Product">
				<ListItemStandard selected>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("selection mode — Multiple", () => {
		cy.mount(
			<List selectionMode="Multiple" headerText="Select Products">
				<ListItemStandard selected>Laptop Lenovo</ListItemStandard>
				<ListItemStandard selected>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
				<ListItemStandard>Keyboard Logitech</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("selection mode — Delete", () => {
		cy.mount(
			<List selectionMode="Delete" headerText="Delete Products">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("with groups", () => {
		cy.mount(
			<List headerText="Inventory">
				<ListItemGroup headerText="Computers">
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>HP Monitor 24</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Phones">
					<ListItemStandard>iPhone 14</ListItemStandard>
					<ListItemStandard>Samsung Galaxy</ListItemStandard>
				</ListItemGroup>
			</List>
		);
		cy.screenshot();
	});

	it("separators — None", () => {
		cy.mount(
			<List separators="None">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("separators — Inner", () => {
		cy.mount(
			<List separators="Inner">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("growing — Button", () => {
		cy.mount(
			<List growing="Button">
				<ListItemStandard>Laptop Lenovo</ListItemStandard>
				<ListItemStandard>iPhone 14</ListItemStandard>
				<ListItemStandard>HP Monitor 24</ListItemStandard>
			</List>
		);
		cy.screenshot();
	});

	it("no data text", () => {
		cy.mount(
			<List noDataText="No items found" headerText="Products">
			</List>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<List selectionMode="Multiple" headerText="Compact Products">
					<ListItemStandard selected>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>iPhone 14</ListItemStandard>
					<ListItemStandard>HP Monitor 24</ListItemStandard>
				</List>
			</div>
		);
		cy.screenshot();
	});
});
