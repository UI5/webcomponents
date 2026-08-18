import List from "../../../src/List.js";
import ListItemStandard from "../../../src/ListItemStandard.js";
import ListItemGroup from "../../../src/ListItemGroup.js";

describe("ListItemGroup visual", () => {
	it("basic state — with header text", () => {
		cy.mount(
			<List>
				<ListItemGroup headerText="Computers">
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>HP Monitor 24</ListItemStandard>
					<ListItemStandard>Keyboard Logitech</ListItemStandard>
				</ListItemGroup>
			</List>
		);
		cy.screenshot();
	});

	it("without header text", () => {
		cy.mount(
			<List>
				<ListItemGroup>
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>iPhone 14</ListItemStandard>
					<ListItemStandard>HP Monitor 24</ListItemStandard>
				</ListItemGroup>
			</List>
		);
		cy.screenshot();
	});

	it("multiple groups", () => {
		cy.mount(
			<List>
				<ListItemGroup headerText="Computers">
					<ListItemStandard>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>HP Monitor 24</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Phones">
					<ListItemStandard>iPhone 14</ListItemStandard>
					<ListItemStandard>Samsung Galaxy</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Accessories">
					<ListItemStandard>Keyboard Logitech</ListItemStandard>
					<ListItemStandard>Mouse MX Master</ListItemStandard>
				</ListItemGroup>
			</List>
		);
		cy.screenshot();
	});

	it("with selection mode — Multiple", () => {
		cy.mount(
			<List selectionMode="Multiple">
				<ListItemGroup headerText="Computers">
					<ListItemStandard selected>Laptop Lenovo</ListItemStandard>
					<ListItemStandard>HP Monitor 24</ListItemStandard>
				</ListItemGroup>
				<ListItemGroup headerText="Phones">
					<ListItemStandard selected>iPhone 14</ListItemStandard>
					<ListItemStandard>Samsung Galaxy</ListItemStandard>
				</ListItemGroup>
			</List>
		);
		cy.screenshot();
	});

	it("compact mode", () => {
		cy.mount(
			<div data-ui5-compact-size>
				<List>
					<ListItemGroup headerText="Computers">
						<ListItemStandard>Laptop Lenovo</ListItemStandard>
						<ListItemStandard>HP Monitor 24</ListItemStandard>
					</ListItemGroup>
					<ListItemGroup headerText="Phones">
						<ListItemStandard>iPhone 14</ListItemStandard>
						<ListItemStandard>Samsung Galaxy</ListItemStandard>
					</ListItemGroup>
				</List>
			</div>
		);
		cy.screenshot();
	});
});
