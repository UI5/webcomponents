import Label from "../../src/Label.js";
import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableSelectionSingle from "../../src/TableSelectionSingle.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";

function mountTestpage(selectionMode: string) {
	cy.mount(
		<>
			<Table id="table0" noDataText="No data found">
				{selectionMode === "Single" && (
					<TableSelectionSingle id="selection" slot="features"></TableSelectionSingle>
				)}
				{selectionMode === "Multiple" && (
					<TableSelectionMulti id="selection" slot="features"></TableSelectionMulti>
				)}
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB">Column B</TableHeaderCell>
					<TableHeaderCell id="colC">Column C</TableHeaderCell>
					<TableHeaderCell id="colD">Column D</TableHeaderCell>
				</TableHeaderRow>
				<TableRow rowKey="0">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow rowKey="1">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow rowKey="2">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow rowKey="3">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow rowKey="4">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		</>
	);

	cy.get("#table0").children("ui5-table-header-row").first().as("headerRow");
	[0, 1, 2, 4].forEach(key => {
		cy.get(`#table0`).children(`ui5-table-row[row-key="${key}"]`).as(`row${key}`);
	});
}

describe("Mode - None", () => {
	before(() => {
		mountTestpage("None");
	});

	it("selection should be not active", () => {
		cy.get("@headerRow").shadow().find("#selection-cell")
			.should("not.exist");
		cy.get("@row0").shadow().find("#selection-cell")
			.should("not.exist");
	});
});

describe("TableSelections - shared rendering", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table1">
				<TableSelectionMulti id="selection" selected="1 2" slot="features"></TableSelectionMulti>
				<TableHeaderRow id="headerRow" slot="headerRow">
					<TableHeaderCell>ColumnA</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" rowKey="1">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="2">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
			</Table>
		);
		cy.get("#headerRow").shadow().find("#selection-cell").as("headerRowSelectionCell");
		cy.get("#selection").invoke("on", "change", cy.stub().as("selectionChangeSpy"));
	});

	it("renderRowSelectionCell does not depend on the feature being activated", () => {
		// On a row's first render the feature may not be activated yet (_table undefined),
		// so the render methods must read i18n from the passed row, not this._table.
		cy.get("#row1").then($row => {
			const row = $row.get(0) as unknown as TableRow;
			const multi = new TableSelectionMulti();
			const single = new TableSelectionSingle();
			expect(() => multi.renderRowSelectionCell(row), "multi row selector").to.not.throw();
			expect(() => multi.renderHeaderSelectionCell(row), "multi header selector").to.not.throw();
			expect(() => single.renderRowSelectionCell(row), "single row selector").to.not.throw();
		});
	});
});
