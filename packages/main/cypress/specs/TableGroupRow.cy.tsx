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

	it("should set aria-rowindex on group rows and data rows", () => {
		mountGroupedTable();

		// Header row is aria-rowindex="1" (set by TableHeaderRow)
		// group1 is rows[0] → index 0 + 2 = 2
		cy.get("#group1").should("have.attr", "aria-rowindex", "2");
		// row1 is rows[1] → index 1 + 2 = 3
		cy.get("#row1").should("have.attr", "aria-rowindex", "3");
		// row2 is rows[2] → index 2 + 2 = 4
		cy.get("#row2").should("have.attr", "aria-rowindex", "4");
		// group2 is rows[3] → index 3 + 2 = 5
		cy.get("#group2").should("have.attr", "aria-rowindex", "5");
		// row3 is rows[4] → index 4 + 2 = 6
		cy.get("#row3").should("have.attr", "aria-rowindex", "6");
	});

	it("should reset row alternation after each group header row", () => {
		cy.mount(
			<Table id="table" alternateRowColors>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
					<TableHeaderCell width="200px">Country</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Country: Germany</Text>
				</TableGroupRow>
				<TableRow id="rowDE1" rowKey="de1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
				</TableRow>
				<TableRow id="rowDE2" rowKey="de2">
					<TableCell><Text>Munich</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
				</TableRow>
				<TableRow id="rowDE3" rowKey="de3">
					<TableCell><Text>Hamburg</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
				</TableRow>
				<TableGroupRow id="group2">
					<Text>Country: France</Text>
				</TableGroupRow>
				<TableRow id="rowFR1" rowKey="fr1">
					<TableCell><Text>Paris</Text></TableCell>
					<TableCell><Text>France</Text></TableCell>
				</TableRow>
				<TableRow id="rowFR2" rowKey="fr2">
					<TableCell><Text>Lyon</Text></TableCell>
					<TableCell><Text>France</Text></TableCell>
				</TableRow>
			</Table>
		);

		// After group1, alternation resets: rowDE1 → alternate (0), rowDE2 → not (1), rowDE3 → alternate (2)
		cy.get("#rowDE1").should("have.attr", "_alternate");
		cy.get("#rowDE2").should("not.have.attr", "_alternate");
		cy.get("#rowDE3").should("have.attr", "_alternate");

		// After group2, alternation resets again: rowFR1 → alternate (0), rowFR2 → not (1)
		cy.get("#rowFR1").should("have.attr", "_alternate");
		cy.get("#rowFR2").should("not.have.attr", "_alternate");
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
