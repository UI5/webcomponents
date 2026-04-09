import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableGroupRow from "../../src/TableGroupRow.js";
import Text from "../../src/Text.js";

describe("Table - Group Rows", () => {
	function mountGroupedTable() {
		cy.mount(
			<Table id="table" accessible-name="Grouped Table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" width="200px">City</TableHeaderCell>
					<TableHeaderCell id="colB" width="200px">Country</TableHeaderCell>
					<TableHeaderCell id="colC" width="150px">Population</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Country: Germany</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
					<TableCell><Text>3,748,148</Text></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="row-2">
					<TableCell><Text>Munich</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
					<TableCell><Text>1,471,508</Text></TableCell>
				</TableRow>
				<TableGroupRow id="group2">
					<Text>Country: France</Text>
				</TableGroupRow>
				<TableRow id="row3" rowKey="row-3">
					<TableCell><Text>Paris</Text></TableCell>
					<TableCell><Text>France</Text></TableCell>
					<TableCell><Text>2,161,000</Text></TableCell>
				</TableRow>
			</Table>
		);
	}

	it("should render group rows and data rows", () => {
		mountGroupedTable();

		cy.get("[ui5-table-group-row]").should("have.length", 2);
		cy.get("[ui5-table-row]").should("have.length", 3);
		cy.get("#group1").should("contain.text", "Country: Germany");
		cy.get("#group2").should("contain.text", "Country: France");
	});

	it("should use treegrid role when group rows are present", () => {
		mountGroupedTable();

		cy.get("#table")
			.shadow()
			.find("#table")
			.should("have.attr", "role", "treegrid");
	});

	it("should use grid role when no group rows are present", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell>City</TableHeaderCell>
				</TableHeaderRow>
				<TableRow rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#table")
			.shadow()
			.find("#table")
			.should("have.attr", "role", "grid");
	});

	it("should set aria-level=1 on group rows and aria-level=2 on data rows", () => {
		mountGroupedTable();

		cy.get("#group1").should("have.attr", "aria-level", "1");
		cy.get("#group2").should("have.attr", "aria-level", "1");
		cy.get("#row1").should("have.attr", "aria-level", "2");
		cy.get("#row2").should("have.attr", "aria-level", "2");
		cy.get("#row3").should("have.attr", "aria-level", "2");
	});

	it("should set aria-expanded=true on group rows", () => {
		mountGroupedTable();

		cy.get("#group1").should("have.attr", "aria-expanded", "true");
		cy.get("#group2").should("have.attr", "aria-expanded", "true");
	});

	it("should have group cell spanning all columns", () => {
		mountGroupedTable();

		cy.get("#group1")
			.shadow()
			.find("#group-cell")
			.should("have.attr", "role", "gridcell")
			.and("have.attr", "aria-colindex", "1")
			.and("have.attr", "aria-colspan", "3");
	});

	it("should not have aria-level on data rows when no group rows exist", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell>City</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#row1").should("not.have.attr", "aria-level");
	});

	it("should not throw when group rows are added dynamically", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
					<TableHeaderCell width="200px">Country</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#table")
			.shadow()
			.find("#table")
			.should("have.attr", "role", "grid");

		// Dynamically add a group row
		cy.get("#table").then($table => {
			const table = $table[0] as Table;
			const groupRow = document.createElement("ui5-table-group-row") as TableGroupRow;
			groupRow.id = "dynamicGroup";
			groupRow.textContent = "Group: Germany";
			table.insertBefore(groupRow, table.querySelector("[ui5-table-row]"));
		});

		// Should switch to treegrid and not throw errors
		cy.get("#table")
			.shadow()
			.find("#table")
			.should("have.attr", "role", "treegrid");

		cy.get("#dynamicGroup").should("have.attr", "aria-level", "1");
	});

	it("should not throw with popin mode and group rows", () => {
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" minWidth="300px">City</TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Country</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px">Population</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Country: Germany</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
					<TableCell><Text>3,748,148</Text></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="row-2">
					<TableCell><Text>Munich</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
					<TableCell><Text>1,471,508</Text></TableCell>
				</TableRow>
			</Table>
		);

		// Shrink table to trigger popin - should not throw
		cy.get("#table").invoke("css", "width", "300px");

		// Table and rows should still be intact
		cy.get("#table").should("exist");
		cy.get("#group1").should("exist");
		cy.get("#row1").should("exist");
		cy.get("#row2").should("exist");

		// Expand again
		cy.get("#table").invoke("css", "width", "800px");

		cy.get("#group1").should("contain.text", "Country: Germany");
	});
});
