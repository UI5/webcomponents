import Label from "@ui5/webcomponents/dist/Label.js";
import Table from "../../src/Table.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableColumn from "../../src/TableColumn.js";

describe("Table", () => {
	it("tests doesn't fire loadMore with ArrowDown on last row", () => {
		cy.mount(
			<Table>
				<TableColumn slot="columns" minWidth={350}>
					<Label>Product</Label>
				</TableColumn>

				<TableColumn slot="columns" minWidth={800} popinText="Supplier">
					<Label>Supplier</Label>
				</TableColumn>

				<TableColumn slot="columns" minWidth={600} popinText="Dimensions" demandPopin>
					<Label>Dimensions</Label>
				</TableColumn>

				<TableRow>
					<TableCell>
						<Label>Product 1</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 1</Label>
					</TableCell>
					<TableCell>
						<Label>10x20x30</Label>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell>
						<Label>Product 2</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 2</Label>
					</TableCell>
					<TableCell>
						<Label>15x25x35</Label>
					</TableCell>
				</TableRow>

				<TableRow id="row-3">
					<TableCell>
						<Label>Product 3</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 3</Label>
					</TableCell>
					<TableCell>
						<Label>20x30x40</Label>
					</TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.then(table => table.get(0).addEventListener("load-more", cy.stub().as("loadMore")));

		cy.get("#row-3")
			.shadow()
			.find(".ui5-table-row-root")
			.as("lastRow")

		cy.get("@lastRow")
			.realClick();

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("@lastRow")
			.realPress("ArrowDown");
			
		cy.get("@loadMore")
			.should("not.have.been.calledOnce");
	});

	it("tests fire loadMore with ArrowDown on last row", () => {
		cy.mount(
			<Table growing="Scroll">
				<TableColumn slot="columns" minWidth={350}>
					<Label>Product</Label>
				</TableColumn>

				<TableColumn slot="columns" minWidth={800} popinText="Supplier">
					<Label>Supplier</Label>
				</TableColumn>

				<TableColumn slot="columns" minWidth={600} popinText="Dimensions" demandPopin>
					<Label>Dimensions</Label>
				</TableColumn>

				<TableRow>
					<TableCell>
						<Label>Product 1</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 1</Label>
					</TableCell>
					<TableCell>
						<Label>10x20x30</Label>
					</TableCell>
				</TableRow>

				<TableRow>
					<TableCell>
						<Label>Product 2</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 2</Label>
					</TableCell>
					<TableCell>
						<Label>15x25x35</Label>
					</TableCell>
				</TableRow>

				<TableRow id="row-3">
					<TableCell>
						<Label>Product 3</Label>
					</TableCell>
					<TableCell>
						<Label>Supplier 3</Label>
					</TableCell>
					<TableCell>
						<Label>20x30x40</Label>
					</TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.then(tableGrowing => tableGrowing.get(0).addEventListener("load-more", cy.stub().as("loadMore")));

		cy.get("#row-3")
			.shadow()
			.find(".ui5-table-row-root")
			.as("lastRow")

		cy.get("@lastRow")
			.realClick();

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("@lastRow")
			.realPress("ArrowDown");
			
		cy.get("@loadMore")
			.should("have.been.calledOnce");
	});
});
