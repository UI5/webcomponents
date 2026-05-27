import Table from "../../src/Table.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableColumn from "../../src/TableColumn.js";
import TableGroupRow from "../../src/TableGroupRow.js";

function TableRenderer({ multipleSelection }: { multipleSelection: boolean }) {
	return <Table mode={multipleSelection ? "MultiSelect" : "SingleSelect"}>
		<TableColumn slot="columns">City</TableColumn>
		<TableColumn slot="columns">Supplier</TableColumn>
		<TableColumn slot="columns">Country</TableColumn>

		<TableGroupRow>Country: Bulgaria</TableGroupRow>
		<TableRow>
			<TableCell>Sofia</TableCell>
			<TableCell>Sirenje EOOD</TableCell>
			<TableCell>Bulgaria</TableCell>
		</TableRow>
		<TableRow>
			<TableCell>Plovdiv</TableCell>
			<TableCell>Kashkavali AD</TableCell>
			<TableCell>Bulgaria</TableCell>
		</TableRow>

		<TableGroupRow>Country: USA</TableGroupRow>
		<TableRow>
			<TableCell>Dublin</TableCell>
			<TableCell>J.M. Brothers</TableCell>
			<TableCell>USA</TableCell>
		</TableRow>
		<TableRow>
			<TableCell>Boston</TableCell>
			<TableCell>J.M. Brothers</TableCell>
			<TableCell>USA</TableCell>
		</TableRow>
	</Table>
}

describe("Table general interaction", () => {
	it("Table group rows should be rendered", () => {
		cy.mount(<TableRenderer multipleSelection={false} />);

		cy.get("[ui5-table-group-row]").should("have.length", 2);
	});

	it("Colspan attribute should be calculated correctly for single table mode", () => {
		cy.mount(<TableRenderer multipleSelection={false} />);

		cy.get("[ui5-table-group-row]")
			.first()
			.shadow()
			.find("td")
			.should("have.attr", "colspan", "3");
	});

	it("Colspan attribute should be calculated correctly for multi table mode", () => {
		cy.mount(<TableRenderer multipleSelection={true} />);

		cy.get("[ui5-table-group-row]")
			.first()
			.shadow()
			.find("td")
			.should("have.attr", "colspan", "4");
	});

	it("ARIA - aria-label should be calculated correctly.", () => {
		cy.mount(<TableRenderer multipleSelection={false} />);

		cy.get("[ui5-table-group-row]")
			.eq(0)
			.shadow()
			.find("tr")
			.should("have.attr", "aria-label", "Group Header Row Country: Bulgaria. 2 of 7");

		cy.get("[ui5-table-group-row]")
			.eq(1)
			.shadow()
			.find("tr")
			.should("have.attr", "aria-label", "Group Header Row Country: USA. 5 of 7");
	});
});