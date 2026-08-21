import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableGroupRow from "../../src/TableGroupRow.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableRowActionNavigation from "../../src/TableRowActionNavigation.js";
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
		cy.get("[ui5-table-row]:not([ui5-table-group-row])").should("have.length", 3);
		cy.get("#group1").should("contain.text", "Country: Germany");
		cy.get("#group2").should("contain.text", "Country: France");
	});

	it("should have aria-roledescription on group rows", () => {
		mountGroupedTable();

		cy.get("#group1").should("have.attr", "aria-roledescription");
		cy.get("#group2").should("have.attr", "aria-roledescription");
	});

	it("should use role=row on group rows", () => {
		mountGroupedTable();

		cy.get("#group1").should("have.attr", "role", "row");
		cy.get("#table")
			.shadow()
			.find("#table")
			.should("have.attr", "role", "grid");
	});

	it("should have group cell spanning all columns", () => {
		mountGroupedTable();

		cy.get("#group1")
			.shadow()
			.find("#group-cell")
			.should("have.attr", "role", "gridcell")
			.and("have.attr", "aria-colindex", "1")
			.and("have.attr", "aria-colspan", "2");
	});

	it("should set aria-rowindex sequentially on all rows", () => {
		mountGroupedTable();

		cy.get("#group1").should("have.attr", "aria-rowindex", "2");
		cy.get("#row1").should("have.attr", "aria-rowindex", "3");
		cy.get("#row2").should("have.attr", "aria-rowindex", "4");
		cy.get("#group2").should("have.attr", "aria-rowindex", "5");
		cy.get("#row3").should("have.attr", "aria-rowindex", "6");
	});

	it("should not be selectable", () => {
		cy.mount(
			<Table id="table">
				<TableSelectionMulti slot="features"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#group1").should("not.have.attr", "aria-selected");
	});

	it("should not affect Select All behavior", () => {
		cy.mount(
			<Table id="table">
				<TableSelectionMulti slot="features" id="selection"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="row-2">
					<TableCell><Text>Munich</Text></TableCell>
				</TableRow>
			</Table>
		);

		// Select all via header checkbox
		cy.get("[ui5-table-header-row]")
			.shadow()
			.find("#selection-component")
			.realClick();

		// Both data rows should be selected
		cy.get("#row1").should("have.attr", "aria-selected", "true");
		cy.get("#row2").should("have.attr", "aria-selected", "true");
		// Group row should NOT be selected
		cy.get("#group1").should("not.have.attr", "aria-selected");
	});

	it("should reset row alternation after each group header row", () => {
		cy.mount(
			<Table id="table" alternateRowColors>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group 1</Text>
				</TableGroupRow>
				<TableRow id="rowA" rowKey="a">
					<TableCell><Text>A</Text></TableCell>
				</TableRow>
				<TableRow id="rowB" rowKey="b">
					<TableCell><Text>B</Text></TableCell>
				</TableRow>
				<TableRow id="rowC" rowKey="c">
					<TableCell><Text>C</Text></TableCell>
				</TableRow>
				<TableGroupRow id="group2">
					<Text>Group 2</Text>
				</TableGroupRow>
				<TableRow id="rowD" rowKey="d">
					<TableCell><Text>D</Text></TableCell>
				</TableRow>
				<TableRow id="rowE" rowKey="e">
					<TableCell><Text>E</Text></TableCell>
				</TableRow>
			</Table>
		);

		// After group1: rowA(1)=not, rowB(2)=alternate, rowC(3)=not
		cy.get("#rowA").should("not.have.attr", "_alternate");
		cy.get("#rowB").should("have.attr", "_alternate");
		cy.get("#rowC").should("not.have.attr", "_alternate");

		// After group2: reset → rowD(1)=not, rowE(2)=alternate
		cy.get("#rowD").should("not.have.attr", "_alternate");
		cy.get("#rowE").should("have.attr", "_alternate");

		// Group rows never get _alternate
		cy.get("#group1").should("not.have.attr", "_alternate");
		cy.get("#group2").should("not.have.attr", "_alternate");
	});

	it("should not throw with popin mode and group rows", () => {
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="300px">City</TableHeaderCell>
					<TableHeaderCell minWidth="200px">Country</TableHeaderCell>
					<TableHeaderCell minWidth="200px">Population</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableCell><Text>Germany</Text></TableCell>
					<TableCell><Text>3,748,148</Text></TableCell>
				</TableRow>
			</Table>
		);

		// Shrink to trigger popin
		cy.get("#table").invoke("css", "width", "300px");

		// Should not throw — table and rows intact
		cy.get("#table").should("exist");
		cy.get("#group1").should("exist");
		cy.get("#row1").should("exist");

		// Expand again
		cy.get("#table").invoke("css", "width", "800px");
		cy.get("#group1").should("contain.text", "Group");
	});

	it("should be keyboard navigable as a single-cell row", () => {
		mountGroupedTable();

		// Click on left edge to focus the row itself (not a cell inside)
		cy.get("#row1").click("left");
		cy.get("#row1").should("be.focused");

		// Arrow up should land on the group row
		cy.get("#row1").type("{uparrow}");
		cy.get("#group1").should("be.focused");
	});

	it("should not move focus on left/right arrow keys", () => {
		mountGroupedTable();

		cy.get("#row1").click("left");
		cy.get("#row1").type("{uparrow}");
		cy.get("#group1").should("be.focused");

		// Left/right should not move focus away from the group row
		cy.get("#group1").type("{leftarrow}");
		cy.get("#group1").should("be.focused");

		cy.get("#group1").type("{rightarrow}");
		cy.get("#group1").should("be.focused");
	});

	it("should preserve column position when navigating through a group row", () => {
		mountGroupedTable();

		// Focus the second cell of row1
		cy.get("#row1").click("left");
		cy.get("#row1").type("{rightarrow}{rightarrow}");
		cy.get("#row1").children("[ui5-table-cell]").eq(1).should("be.focused");

		// Navigate up to the group row
		cy.realPress("ArrowUp");
		cy.get("#group1").should("be.focused");

		// Navigate back down — should return to the same column (2nd cell)
		cy.realPress("ArrowDown");
		cy.get("#row1").children("[ui5-table-cell]").eq(1).should("be.focused");
	});

	it("should expose empty cells array even when children are slotted", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">Col</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group with content</Text>
				</TableGroupRow>
			</Table>
		);

		cy.get("#group1").then(($el) => {
			const groupRow = $el[0] as unknown as TableGroupRow;
			expect(groupRow.cells).to.have.length(0);
		});
	});

	it("should not render actions cell when table has rowActionCount", () => {
		cy.mount(
			<Table id="table" rowActionCount={1}>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">City</TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">
					<Text>Group</Text>
				</TableGroupRow>
				<TableRow id="row1" rowKey="row-1">
					<TableCell><Text>Berlin</Text></TableCell>
					<TableRowActionNavigation slot="actions" interactive></TableRowActionNavigation>
				</TableRow>
			</Table>
		);

		// Data row should have actions cell
		cy.get("#row1")
			.shadow()
			.find("#actions-cell")
			.should("exist");

		// Group row should NOT have actions cell
		cy.get("#group1")
			.shadow()
			.find("#actions-cell")
			.should("not.exist");
	});
});
