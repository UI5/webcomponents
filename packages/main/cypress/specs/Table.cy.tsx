import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableSelectionSingle from "../../src/TableSelectionSingle.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import Label from "../../src/Label.js";
import Input from "../../src/Input.js";
import TableRowStatus from "../../src/TableRowStatus.js";
import TableHeaderRowStatus from "../../src/TableHeaderRowStatus.js";
import TableGroupRow from "../../src/TableGroupRow.js";

const TRANSPARENT = "rgba(0, 0, 0, 0)";

class TableSlotForwarder extends HTMLElement {
	connectedCallback() {
		if (this.shadowRoot) {
			return;
		}

		const table = new Table();
		table.id = "inner-table";

		const headerRowSlot = this.ownerDocument.createElement("slot");
		headerRowSlot.name = "headerRow";
		headerRowSlot.slot = "headerRow";

		table.append(headerRowSlot, this.ownerDocument.createElement("slot"));
		this.attachShadow({ mode: "open" }).append(table);
	}

	get table() {
		return this.shadowRoot!.querySelector("#inner-table") as Table;
	}
}

if (!customElements.get("table-slot-forwarder")) {
	customElements.define("table-slot-forwarder", TableSlotForwarder);
}

describe("Table - Rendering", () => {

	it("tests if table is rendered", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnB</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("ui5-table").should("exist");
		cy.get("ui5-table-header-row").should("exist");
		cy.get("ui5-table-row").should("exist");
		cy.get("ui5-table-header-cell").should("have.length", 2);
		cy.get("ui5-table-row").should("have.attr", "aria-rowindex", "2");
		cy.get("ui5-table-header-cell").first().should("have.attr", "aria-colindex", "1");
		cy.get("ui5-table-header-cell").last().should("have.attr", "aria-colindex", "2");

		cy.get("#table").shadow().find("#table").as("innerTable");
		cy.get("@innerTable").should("have.attr", "role", "grid");
		cy.get("@innerTable").should("have.attr", "aria-colcount", "2");
		cy.get("@innerTable").should("have.attr", "aria-rowcount", "2");
	});

	it("tests if initial empty table renders without errors", () => {
		cy.window().then(window => {
			window.addEventListener("unhandledrejection", cy.stub().as("rejection"));

			const table = window.document.createElement("ui5-table");
			window.document.body.appendChild(table);

			setTimeout(() => {
				const row = window.document.createElement("ui5-table-row");
				table.appendChild(row);

				cy.get("@rejection").should("not.be.called");

				table.remove();
			}, 100);
		});

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(500);
	});

	it("tests if table is rendered with no data slot", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell></TableHeaderCell>
				</TableHeaderRow>
				<div slot="noData" id="noData">
					<Label>No data found</Label>
				</div>
			</Table>
		);

		cy.get("#table").shadow().find('slot[name=noData]').as("noDataSlot");
		cy.get("@noDataSlot").should("exist");
		cy.get("@noDataSlot").then(($noDataSlot) => {
			const noDataElement = ($noDataSlot[0] as HTMLSlotElement).assignedElements()[0];
			cy.wrap(noDataElement).should("have.attr", "id", "noData")
		});
	});

	it("should alternate rows", () => {
		cy.mount(
			<Table id="table1" alternateRowColors={true}>
				<TableSelectionSingle id="selection" slot="features"></TableSelectionSingle>
				<TableHeaderRow id="hr" slot="headerRow">
					<TableHeaderCell>ColumnA</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="r1" rowKey="r1" interactive>
					<TableCell>R1C1</TableCell>
				</TableRow>
				<TableRow id="r2" rowKey="r2" interactive>
					<TableCell>R2C1</TableCell>
				</TableRow>
				<TableRow id="r3" rowKey="r3" interactive>
					<TableCell>R3C1</TableCell>
				</TableRow>
				<TableRow id="r4" rowKey="r4" interactive>
					<TableCell>R4C1</TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#table1").then($table => {
			const rows = $table.find("[ui5-table-row]").get();
			const rowBackgrounds = rows.map(row => getComputedStyle(row).backgroundColor);
			expect(rowBackgrounds[0]).to.not.equal(rowBackgrounds[1]);
			expect(rowBackgrounds[1]).to.not.equal(rowBackgrounds[2]);
			expect(rowBackgrounds[2]).to.not.equal(rowBackgrounds[3]);
			expect(rowBackgrounds[0]).to.equal(rowBackgrounds[2]);
			expect(rowBackgrounds[1]).to.equal(rowBackgrounds[3]);
		});

		cy.get("#selection").invoke("prop", "selected", "r2"); cy.wait(50);
		cy.get("#table1").then($table => {
			const rows = $table.find("[ui5-table-row]").get();
			const rowBackgrounds = rows.map(row => getComputedStyle(row).backgroundColor);
			expect(rowBackgrounds[1]).to.not.equal(rowBackgrounds[3]);
			expect(rowBackgrounds[0]).to.equal(rowBackgrounds[2]);
		});
	});
});

describe("Table - Popin Mode", () => {
	function checkPopinState(expectedState: { poppedIn: string[], hidden: string[] }) {
		cy.get("ui5-table-header-cell").each(($cell, index) => {
			const id = $cell.attr("id") ?? "";
			const shouldBePoppedIn = expectedState.poppedIn.includes(id);
			const shouldBeHidden = expectedState.hidden.includes(id);
			const roleCondition = shouldBePoppedIn || shouldBeHidden ? "not.have.attr" : "have.attr";

			cy.wrap($cell)
				.should(roleCondition, "role", "columnheader");
			cy.get("ui5-table-header-row")
				.shadow()
				.find(`slot[name=default-${index + 1}]`)
				.should(shouldBePoppedIn || shouldBeHidden ? "not.exist" : "exist");
		});

		cy.get("ui5-table-row").each($row => {
			cy.wrap($row).find("ui5-table-cell").each(($cell, index) => {
				const id = $cell.attr("id") ?? "NOT_FOUND";
				const shouldBeHidden = expectedState.hidden.some(hiddenId => id.includes(hiddenId));
				cy.wrap($row).shadow().find(`slot[name=default-${index + 1}]`)
					.should(shouldBeHidden ? "not.exist" : "exist");
			});
		});
	}

	function mounTable(popinHidden = false) {
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
					<TableHeaderCell id="colD" minWidth="150px" popinText="Column ?" popinHidden={popinHidden}>Column D</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell id="row-1-colA"><Label>Cell A</Label></TableCell>
					<TableCell id="row-1-colB"><Label>Cell B</Label></TableCell>
					<TableCell id="row-1-colC"><Label>Cell C</Label></TableCell>
					<TableCell id="row-1-colD"><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell id="row-2-colA"><Label>Cell A</Label></TableCell>
					<TableCell id="row-2-colB"><Label>Cell B</Label></TableCell>
					<TableCell id="row-2-colC"><Label>Cell C</Label></TableCell>
					<TableCell id="row-2-colD"><Label>Cell D</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell id="row-3-colA"><Label>Cell A</Label></TableCell>
					<TableCell id="row-3-colB"><Label>Cell B</Label></TableCell>
					<TableCell id="row-3-colC"><Label>Cell C</Label></TableCell>
					<TableCell id="row-3-colD"><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);
	}

	it("no pop-in width 'optimal' table width", () => {
		mounTable();
		cy.get("ui5-table").then($table => {
			$table.css("width", "850px");
		});

		cy.get("ui5-table")
			.should("exist")
			.should("have.attr", "overflow-mode", "Popin")
			.should("have.css", "width", "850px");
		cy.get("ui5-table-header-cell")
			.should("have.length", 4);

		checkPopinState({ poppedIn: [], hidden: [] });
	});

	it("test with one by one popping in", () => {
		mounTable();
		const testWidths = [
			{ width: 850, poppedIn: [] },
			{ width: 700, poppedIn: ["colD"] },
			{ width: 500, poppedIn: ["colD", "colC"] },
			{ width: 300, poppedIn: ["colD", "colC", "colB"] },
			{ width: 150, poppedIn: ["colD", "colC", "colB"] },
		];

		testWidths.forEach(({ width, poppedIn }) => {
			cy.get("ui5-table").then($table => {
				$table.css("width", `${width}px`);
			});

			checkPopinState({ poppedIn, hidden: [] });
		});
	});

	it("test with one by one popping out", () => {
		mounTable();
		const testWidths = [
			{ width: 150, poppedIn: ["colD", "colC", "colB"] },
			{ width: 300, poppedIn: ["colD", "colC", "colB"] },
			{ width: 500, poppedIn: ["colD", "colC"] },
			{ width: 700, poppedIn: ["colD"] },
			{ width: 850, poppedIn: [] },
		];

		testWidths.forEach(({ width, poppedIn }) => {
			cy.get("ui5-table").then($table => {
				$table.css("width", `${width}px`);
			});

			checkPopinState({ poppedIn, hidden: [] });
		});
	});

	it("test with random widths", () => {
		mounTable();
		const expectedStates = [
			{ width: 500, poppedIn: ["colD", "colC", "colB"] },
			{ width: 700, poppedIn: ["colD", "colC"] },
			{ width: 850, poppedIn: ["colD"] },
			{ width: Infinity, poppedIn: [] },
		];

		const runs = 10;
		for (let i = 0; i < runs; i++) {
			const randomWidth = Math.floor(Math.random() * 1000) + 1;
			cy.get("ui5-table").then($table => {
				$table.css("width", `${randomWidth}px`);
			});

			const expectedState = expectedStates.find(state => state.width >= randomWidth);
			checkPopinState({ poppedIn: expectedState?.poppedIn ?? [], hidden: [] });
		}
	});
});

describe("Table - Stacking context", () => {

	it("creates a stacking context on the table host", () => {
		cy.mount(
			<Table id="table" accessibleNameRef="title" noDataText="No data found">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
				</TableHeaderRow>
			</Table>,
		);

		cy.get("#table").should("have.css", "z-index", "0");
	});
});

describe("Table - Horizontal Scrolling", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table" overflowMode="Scroll" stickyTop="0px" style={{ width: "300px", overflow: "auto" }} accessibleNameRef="title">
				<TableSelectionMulti id="selection" selected="0 2" slot="features"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow" sticky>
					<TableHeaderCell id="produtCol" width="200px"><span>Product</span></TableHeaderCell>
					<TableHeaderCell id="supplierCol" width="200px">Supplier</TableHeaderCell>
					<TableHeaderCell id="dimensionsCol" width="200px">Dimensions</TableHeaderCell>
					<TableHeaderCell id="weightCol" width="200px">Weight</TableHeaderCell>
					<TableHeaderCell id="priceCol" width="200px">Price</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="firstRow" navigated={true} key="0">
					<TableCell><Label><b>Notebook Basic 15</b><br /><a href="#">HT-1000</a></Label></TableCell>
					<TableCell><Label>Very Best Screens</Label></TableCell>
					<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>4.2</b> KG</Label></TableCell>
					<TableCell id="lastCell"><Label><b>956</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="1">
					<TableCell><Label><b>Notebook Basic 16</b><br /><a href="#">HT-1001</a></Label></TableCell>
					<TableCell><Label>Smartcards</Label></TableCell>
					<TableCell><Input value="29 x 17 x 3.1 cm" accessibleNameRef="dimensionsCol"></Input></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>4.5</b> KG</Label></TableCell>
					<TableCell><Label><b>1249</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="2" interactive>
					<TableCell><Label><b>Notebook Basic 17</b><br /><a href="#">HT-1002</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="3">
					<TableCell><Label><b>Notebook Basic 18</b><br /><a href="#">HT-1003</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="4">
					<TableCell><Label><b>Notebook Basic 19</b><br /><a href="#">HT-1004</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="5">
					<TableCell><Label><b>Notebook Basic 20</b><br /><a href="#">HT-1005</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow key="6" interactive>
					<TableCell><Label><b>Notebook Basic 21</b><br /><a href="#">HT-1006</a></Label></TableCell>
					<TableCell><Label>Technocom</Label></TableCell>
					<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
					<TableCell><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.should("be.visible");
	});

	it("navigated indidcator is fixed to the right", () => {
		cy.get("#lastCell")
			.then($lastCell => {
				$lastCell[0].scrollIntoView();
			});

		cy.get("#firstRow")
			.shadow()
			.find("#navigated-cell")
			.should("have.css", "position", "sticky")
			.should("have.css", "right", "0px")
			.should("have.attr", "aria-hidden", "true")
			.should("have.attr", "data-excluded-from-navigation");
	});

	it("selection column should be fixed to the left", () => {
		cy.get("#lastCell")
			.then($lastCell => {
				$lastCell[0].scrollIntoView();
			});

		cy.get("#firstRow")
			.shadow()
			.find("#selection-cell")
			.should("have.css", "position", "sticky")
			.and($selectionCell => {
				const selectionRect = $selectionCell[0].getBoundingClientRect();
				const tableRect = document.getElementById("table")!.getBoundingClientRect();
				expect(selectionRect.left).to.be.eq(tableRect.left);
			});

		cy.get("#table")
			.shadow()
			.find("#table")
			.should($table => {
				const leftOffset = $table[0].scrollLeft;
				expect(leftOffset).to.be.greaterThan(0);
			});
	});
});

describe("Table Row - Status", () => {
	it("renders no status by default and supports setting and clearing the value", () => {
		cy.mount(
			<Table>
				<TableHeaderRow slot="headerRow">
					<TableHeaderRowStatus slot="status" design="Extended" />
					<TableHeaderCell>Column A</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableRowStatus id="status" slot="status" text="Custom status" icon="information" />
					<TableCell>Cell A</TableCell>
				</TableRow>
			</Table>
		);

		cy.get<TableRowStatus>("#status").should($status => {
			expect($status[0].value).to.equal(undefined);
			expect($status[0]._accessibleText).to.equal(undefined);
		});
		cy.get("#status").shadow().find("#status").should("have.css", "background-color", TRANSPARENT);
		cy.get("#status").shadow().find("#status-icon").should("not.exist");

		cy.get("#status").invoke("prop", "value", "Positive");
		cy.get("#status").shadow().find("#status").should("not.have.css", "background-color", TRANSPARENT);
		cy.get("#status").shadow().find("#status-icon").should("have.attr", "name", "information");
		cy.get("#status").shadow().find("#status-tooltip").should("have.attr", "title", "Custom status");

		cy.get<TableRowStatus>("#status").then($status => { $status[0].value = undefined; });
		cy.get<TableRowStatus>("#status").should($status => {
			expect($status[0]._accessibleText).to.equal(undefined);
		});
		cy.get("#status").shadow().find("#status").should("have.css", "background-color", TRANSPARENT);
		cy.get("#status").should("have.css", "background-color", TRANSPARENT);
		cy.get("#status").shadow().find("#status-tooltip").should("not.exist");
	});

	it("reserves the column from the header element and renders the bar per row", () => {
		cy.mount(
			<Table id="table1">
				<TableHeaderRow slot="headerRow">
					<TableHeaderRowStatus slot="status" />
					<TableHeaderCell id="colA"><span>ColumnA</span></TableHeaderCell>
				</TableHeaderRow>
				<TableGroupRow id="group1">Group A</TableGroupRow>
				<TableRow id="row1">
					<TableRowStatus slot="status" value="Negative" />
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
				<TableRow id="row2">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
			</Table>
		);

		// row with a status paints the bar; a row without the element reserves the column but paints nothing
		cy.get("#row1").find("[ui5-table-row-status]").shadow().find("#status").should($bar => {
			expect(getComputedStyle($bar[0]).backgroundColor).to.not.equal(TRANSPARENT);
			expect($bar[0].getBoundingClientRect().width).to.equal(6);
		});
		cy.get("#row1").find("[ui5-table-row-status]").shadow().find("#status-tooltip").should("not.exist");
		cy.get("#row2").find("[ui5-table-row-status]").should("not.exist");
		cy.get("#row2").shadow().find("#status-cell").should("exist");
		// the column is reserved by header presence, not by any row having a status (virtualization-jump guard)
		cy.get("#table1").shadow().find("#table").should($table => {
			expect($table[0].style.gridTemplateColumns).to.include("table_status_cell_width)");
		});
		// group rows never get a status cell
		cy.get("#group1").shadow().find("#status-cell").should("not.exist");

		// removing the header element removes the whole column
		cy.get("[ui5-table-header-row-status]").then($el => $el[0].remove());
		cy.get("#row1").shadow().find("#status-cell").should("not.exist");
		cy.get("#table1").shadow().find("#table").should($table => {
			expect($table[0].style.gridTemplateColumns).to.not.include("table_status_cell_width)");
		});
	});

	it("renders the extended design with an icon and a wider column", () => {
		cy.mount(
			<Table id="table1">
				<TableHeaderRow slot="headerRow">
					<TableHeaderRowStatus slot="status" design="Extended" />
					<TableHeaderCell id="colA"><span>ColumnA</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableRowStatus slot="status" value="Negative" text="Out of stock" />
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
			</Table>
		);

		// table fans the design down and a default icon is derived from the value
		cy.get("#row1").find("[ui5-table-row-status]").should("have.prop", "_design", "Extended");
		cy.get("#row1").find("[ui5-table-row-status]").shadow().find("#status-icon").should("have.attr", "name", "error");
		cy.get("#row1").find("[ui5-table-row-status]").shadow().find("#status-icon")
			.should("have.attr", "accessible-name", "Out of stock")
			.and("not.have.attr", "show-tooltip");
		cy.get("#row1").find("[ui5-table-row-status]").shadow().find("#status-icon")
			.should("not.have.css", "cursor", "help");
		cy.get("#row1").shadow().find("#status-cell").should("have.css", "width", "32px");
		cy.get("#row1").find("[ui5-table-row-status]").shadow().find("#status").should("have.css", "width", "2px");
		cy.get("#row1").find("[ui5-table-row-status]").shadow().find("#status-tooltip")
			.should($tooltip => {
				expect($tooltip).to.have.attr("title", "Out of stock");
				expect(getComputedStyle($tooltip[0]).cursor).to.not.equal("help");
				const cell = $tooltip[0].getBoundingClientRect();
				const icon = $tooltip[0].querySelector("[ui5-icon]")!.getBoundingClientRect();
				expect(cell.width).to.equal(32);
				expect(icon.x + icon.width / 2).to.equal(cell.x + cell.width / 2);
				expect(icon.y + icon.height / 2).to.equal(cell.y + cell.height / 2);
			});

		cy.get("#table1").invoke("attr", "dir", "rtl");
		cy.get("#row1").find("[ui5-table-row-status]").shadow().find("#status-tooltip").should($tooltip => {
			const cell = $tooltip[0].getBoundingClientRect();
			const icon = $tooltip[0].querySelector("[ui5-icon]")!.getBoundingClientRect();
			expect(icon.x + icon.width / 2).to.equal(cell.x + cell.width / 2);
		});
		// the extended column uses the wider track
		cy.get("#table1").shadow().find("#table").should($table => {
			expect($table[0].style.gridTemplateColumns).to.include("table_status_cell_extended_width)");
		});
	});
});

describe("Table - Slot forwarding", () => {
	beforeEach(() => {
		cy.on("uncaught:exception", () => false);
		cy.mount(
			<table-slot-forwarder id="wrapper">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnB</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow rowKey="1">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
				</TableRow>
				<TableRow rowKey="2">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
				</TableRow>
			</table-slot-forwarder>
		);

		cy.get<TableSlotForwarder>("#wrapper").as("wrapper");
	});

	it("keeps the forwarded rows in the light DOM of the wrapper", () => {
		cy.get<TableSlotForwarder>("@wrapper").should($el => {
			const authoredRow = $el[0].querySelector("[ui5-table-row]")!;

			expect($el[0].table.rows[0]).to.equal(authoredRow);
			expect(authoredRow.parentElement).to.equal($el[0]);
		});
	});

	it("reflects rows added to and removed from the wrapper", () => {
		cy.get("#wrapper").then($el => {
			const row = new TableRow();
			row.rowKey = "3";
			row.appendChild(new TableCell());
			$el[0].appendChild(row);
		});

		cy.get<TableSlotForwarder>("@wrapper").should($el => {
			expect($el[0].table.rows.map(row => row.rowKey)).to.deep.equal(["1", "2", "3"]);
		});

		cy.get("[ui5-table-row]").last().then($el => $el[0].remove());

		cy.get<TableSlotForwarder>("@wrapper").should($el => {
			expect($el[0].table.rows.map(row => row.rowKey)).to.deep.equal(["1", "2"]);
		});
	});
});
