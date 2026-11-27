import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import Label from "../../src/Label.js";
import Button from "../../src/Button.js";

describe("TableRow - Rendering", () => {
	it("prevents page breaks inside the row", () => {
		cy.mount(
			<Table>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell>Column A</TableHeaderCell>
				</TableHeaderRow>
				<TableRow><TableCell>Cell A</TableCell></TableRow>
			</Table>
		);

		cy.get("[ui5-table-row]").should($row => {
			expect(getComputedStyle($row[0]).breakInside).to.equal("avoid");
		});
	});
});

describe("TableRow - Navigated", () => {
	it("Navigated cell is rendered", () => {
		cy.mount(
			<Table id="table1">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA"><span>ColumnA</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" navigated={true}>
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
				<TableRow id="row2">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
			</Table>
		);

		// Navigated cell rendered on all rows and header row
		cy.get("[ui5-table-header-row]").shadow().find("#navigated-cell")
			.should("exist")
			.should("have.attr", "aria-hidden", "true");
		cy.get("[ui5-table-header-row]").shadow().find("#navigated-cell")
			.should("have.attr", "data-excluded-from-navigation");

		cy.get("#row1").shadow().find("#navigated-cell")
			.should("exist")
			.should("have.attr", "data-excluded-from-navigation");

		cy.get("#row2").shadow().find("#navigated-cell")
			.should("exist")
			.should("have.attr", "data-excluded-from-navigation");

		cy.get("#row1").shadow().find("#navigated").should("exist");
		cy.get("#row2").shadow().find("#navigated").should("not.exist");

		cy.get("#table1")
			.shadow()
			.find("#table")
			.should($table => {
				const gridTemplateColumns = $table[0].style.gridTemplateColumns;
				// eslint-disable-next-line no-unused-expressions
				expect(gridTemplateColumns.endsWith("table_navigated_cell_width)")).to.be.true;
			});
	});
});

describe("TableRow - Interactive", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table11">
				<TableSelectionMulti id="selection" selected="1 2" slot="features"></TableSelectionMulti>
				<TableHeaderRow id="headerRow" slot="headerRow">
					<TableHeaderCell>ColumnA</TableHeaderCell>
					<TableHeaderCell>ColumnB</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row11" rowKey="1">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Button>Cell B</Button></TableCell>
				</TableRow>
				<TableRow id="row12" rowKey="2" interactive={true}>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Button>Cell B</Button></TableCell>
				</TableRow>
			</Table>
		);
		cy.get("#table11").invoke("on", "row-click", cy.stub().as("rowClickHandler"));
	});

	it("does not fire row-click for non-interactive rows", () => {
		cy.get("#row11").realClick();
		cy.get("@rowClickHandler").should("not.have.been.called");
		cy.get("#row11").realPress("Enter");
		cy.get("@rowClickHandler").should("not.have.been.called");
	});

	it("applies and removes _active state on mousedown/mouseup", () => {
		cy.get("#row12").realMouseDown();
		cy.get("#row12").should("have.attr", "_active");
		cy.get("#row11").realMouseUp();
		cy.get("#row12").should("not.have.attr", "_active");
	});

	it("fires row-click on click, Enter, and child element click", () => {
		cy.get("#row12").realClick();
		cy.get("@rowClickHandler").invoke("getCall", 0).its("args.0.detail.row").as("clickedRow");
		cy.get("@clickedRow").should("have.attr", "id", "row12");
		cy.get("#row12").realPress("Enter");
		cy.get("@rowClickHandler").should("have.been.calledTwice");
		cy.get("#row12").find("[ui5-label]").realClick();
		cy.get("@rowClickHandler").should("have.been.calledThrice");
	});

	it("does not activate row or fire row-click when interacting with a child button", () => {
		cy.get("#row12").find("[ui5-button]").as("row2button");
		cy.get("@row2button").realMouseDown();
		cy.get("#row12").should("not.have.attr", "_active");
		cy.get("@row2button").realMouseUp();
		cy.get("#row12").should("not.have.attr", "_active");
		cy.get("@row2button").invoke("on", "click", cy.stub().as("buttonClickHandler"));
		cy.get("@row2button").realClick();
		cy.get("@buttonClickHandler").should("have.been.calledOnce");
		cy.get("@rowClickHandler").should("not.have.been.called");
		cy.get("@row2button").realPress("Enter");
		cy.get("@buttonClickHandler").should("have.been.calledTwice");
		cy.get("@rowClickHandler").should("not.have.been.called");
		cy.get("@row2button").realPress("Space");
		cy.get("@buttonClickHandler").should("have.been.calledThrice");
		cy.get("@rowClickHandler").should("not.have.been.called");
	});
});

describe("TableRow - Movable", () => {
	beforeEach(() => {
		cy.viewport(1920, 1080);
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnB</span></TableHeaderCell>
				</TableHeaderRow>
				{Array.from({ length: 10 }).map((_, index) =>
					<TableRow rowKey={`${index}`} movable={true}>
						<TableCell><Label>Cell A</Label></TableCell>
						<TableCell><Label>Cell B</Label></TableCell>
					</TableRow>
				)}
				<TableRow rowKey="10">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.should("be.visible");
	});

	it("tests if draggable=true is set", () => {
		cy.get("[ui5-table-row]")
			.should("have.length", 11)
			.each(($row, index) => {
				if (index === 10) {
					cy.wrap($row).should("not.have.attr", "draggable");
				} else {
					cy.wrap($row).should("have.attr", "draggable", "true");
				}
			});
	});
});
