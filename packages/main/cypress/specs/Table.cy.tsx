import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableSelectionSingle from "../../src/TableSelectionSingle.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableHeaderCellActionAI from "../../src/TableHeaderCellActionAI.js";
import Label from "../../src/Label.js";
import Input from "../../src/Input.js";
import TableRowAction from "../../src/TableRowAction.js";
import Bar from "../../src/Bar.js";
import Title from "../../src/Title.js";
import Slider from "../../src/Slider.js";
import Button from "../../src/Button.js";

const TRANSPARENT = "rgba(0, 0, 0, 0)";

describe("Table - Rendering", () => {
	function checkWidth(id: string, expectedWidth: number) {
		cy.get(id).then($cell => {
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});
	};

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
		cy.get("ui5-table-header-row").should("have.attr", "aria-roledescription", "Column Header Row");
		cy.get("ui5-table-header-row").should("have.attr", "aria-rowindex", "1");
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

	it("columns have equal widths width default width", () => {
		cy.mount(
			<Table style="width: 400px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		const expectedWidth = 100;
		cy.get("ui5-table-header-cell").each(($cell) => {
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});
	});

	it("columns have width set", () => {
		cy.mount(
			<Table style="width: 200px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="100px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell width="100px"><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell width="100px"><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell width="100px"><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		const expectedWidth = 100;
		cy.get("ui5-table-header-cell").each(($cell) => {
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});
	});

	it("columns have relative width set", () => {
		cy.mount(
			<Table style="width: 200px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" width="10%"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" width="25%"><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell id="colC" width="25%"><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell id="colD" width="40%"><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		checkWidth("#colA", 48);
		checkWidth("#colB", 50);
		checkWidth("#colC", 50);
		checkWidth("#colD", 80);

		cy.get("ui5-table").then($table => {
			$table.css("width", "800px");
		});

		checkWidth("#colA", 80);
		checkWidth("#colB", 200);
		checkWidth("#colC", 200);
		checkWidth("#colD", 320);
	});

	it("columns have min-width set", () => {
		cy.mount(
			<Table style="width: 800px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="100px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell minWidth="100px"><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell minWidth="100px"><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell minWidth="100px"><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("ui5-table-header-cell").each(($cell) => {
			const expectedWidth = 200;
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});

		cy.get("ui5-table").then($table => {
			$table.css("width", "400px");
		});

		cy.get("ui5-table-header-cell").each(($cell) => {
			const expectedWidth = 100;
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});

		cy.get("ui5-table").then($table => {
			$table.css("width", "100px");
		});

		cy.get("ui5-table-header-cell").each(($cell) => {
			const expectedWidth = 100;
			expect($cell.outerWidth()).to.be.equal(expectedWidth);
		});
	});

	it("column width settings combined", () => {
		cy.mount(
			<Table style="width: 800px;" id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" minWidth="50px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" width="300px"><span>ColumnB</span></TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px" width="50%"><span>ColumnC</span></TableHeaderCell>
					<TableHeaderCell id="colD" width="2fr"><span>ColumnD</span></TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Label>Cell B</Label></TableCell>
					<TableCell><Label>Cell C</Label></TableCell>
					<TableCell><Label>Cell D</Label></TableCell>
				</TableRow>
			</Table>
		);

		checkWidth("#colA", 50);
		checkWidth("#colB", 300);
		checkWidth("#colC", 400);
		checkWidth("#colD", 50);

		cy.get("ui5-table").then($table => {
			$table.css("width", "200px");
		});

		checkWidth("#colA", 50);
		checkWidth("#colB", 300);
		checkWidth("#colC", 200);
		// 2fr is being ignored
		checkWidth("#colD", 48);
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

	it("should show the popin-text in the popin area", () => {
		mounTable();
		cy.get("ui5-table").then($table => {
			$table.css("width", "150px");
		});

		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("ui5-table").then($table => {
			let popinCellCount = 0;
			let validPopinTextCount = 0;
			const table = $table[0] as Table;
			// eslint-disable-next-line no-restricted-syntax
			for (const row of table.rows) {
				// eslint-disable-next-line no-restricted-syntax
				for (const cell of row.cells) {
					if (cell._popin) {
						popinCellCount++;
						const popinText = cell._headerCell!.popinText || cell._headerCell!.textContent;
						if (cell.shadowRoot!.textContent === `${popinText}:`) {
							validPopinTextCount++;
						}
					}
				}
			}
			return popinCellCount && popinCellCount === validPopinTextCount;
		}).should("be.true");
	});

	it("should hide column in popin if popinHidden is set", () => {
		mounTable(true);

		const testWidths = [
			{ width: 150, poppedIn: ["colC", "colB"], hidden: ["colD"] },
			{ width: 300, poppedIn: ["colC", "colB"], hidden: ["colD"] },
			{ width: 500, poppedIn: ["colC"], hidden: ["colD"] },
			{ width: 700, poppedIn: [], hidden: ["colD"] },
			{ width: 850, poppedIn: [], hidden: [] },
		];

		testWidths.forEach(({ width, poppedIn, hidden }) => {
			cy.get("ui5-table").then($table => {
				$table.css("width", `${width}px`);
			});

			checkPopinState({ poppedIn, hidden });
		});
	});

	it("should hide popin if popinHidden, shows it if changed on runtime", () => {
		mounTable(true);
		cy.get("ui5-table").then($table => {
			$table.css("width", "150px");
		});

		checkPopinState({ poppedIn: ["colC", "colB"], hidden: ["colD"] });

		cy.get("#colD")
			.invoke("removeAttr", "popin-hidden");

		checkPopinState({ poppedIn: ["colC", "colB", "colD"], hidden: [] });
	});
});

describe("Table - Horizontal alignment of cells", () => {
	function check(id: string, index: number, alignment: string) {
		cy.get(id)
			.should("have.css", "justify-content", alignment)
			.should("have.css", "text-align", alignment === "normal" ? "start" : alignment);

		cy.get("ui5-table-row")
			.get(`ui5-table-cell:nth-of-type(${index})`)
			.should("have.css", "justify-content", alignment)
			.should("have.css", "text-align", alignment === "normal" ? "start" : alignment);
	}

	beforeEach(() => {
		cy.mount(
			<Table id="table" overflowMode="Popin" style={{ width: "1120px" }}>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="productCol" width="300px"><span>Product</span></TableHeaderCell>
					<TableHeaderCell id="supplierCol" horizontalAlign="Center" width="200px">Supplier</TableHeaderCell>
					<TableHeaderCell id="dimensionsCol" horizontalAlign="Right" width="300px">Dimensions</TableHeaderCell>
					<TableHeaderCell id="weightCol" width="100px">Weight</TableHeaderCell>
					<TableHeaderCell id="priceCol" width="220px">Price</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell><Label><b>Notebook Basic 15</b><br></br>HT-1000</Label></TableCell>
					<TableCell><Label>Very Best Screens</Label></TableCell>
					<TableCell><Label>30 x 18 x 3 cm</Label></TableCell>
					<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.2</b> KG</Label></TableCell>
					<TableCell><Label><b>956</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell><Label><b>Notebook Basic 17</b><br></br>HT-1001</Label></TableCell>
					<TableCell><Label>Smartcards</Label></TableCell>
					<TableCell><Label>29 x 17 x 3.1 cm</Label></TableCell>
					<TableCell><Label style={{ color: "#2b7c2b" }}><b>4.5</b> KG</Label></TableCell>
					<TableCell><Label><b>1249</b> EUR</Label></TableCell>
				</TableRow>
				<TableRow>
					<TableCell class="productCol"><Label><b>Notebook Basic 18</b><br></br>HT-1002</Label></TableCell>
					<TableCell class="supplierCol"><Label>Technocom</Label></TableCell>
					<TableCell class="dimensionsCol"><Label>32 x 21 x 4 cm</Label></TableCell>
					<TableCell class="weightCol"><Label style={{ color: "#2b7c2b" }}><b>3.7</b> KG</Label></TableCell>
					<TableCell class="priceCol"><Label><b>29</b> EUR</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table]")
			.should("be.visible");
	});

	it("default alignment when horizotal align is not set", () => {
		check("#productCol", 1, "normal");
	});

	it("alignment is set correctly during runtime", () => {
		const alignments = ["Left", "Start", "Right", "End", "Center"];

		alignments.forEach(alignment => {
			cy.get("#productCol")
				.invoke("attr", "horizontal-align", alignment)
				.should("have.attr", "horizontal-align", alignment);
			check("#productCol", 1, alignment.toLowerCase());
		});
	});

	it("alignment is normal if set to unknown value", () => {
		cy.get("#productCol")
			.invoke("attr", "horizontal-align", "UnknownValue")
			.should("have.attr", "horizontal-align", "UnknownValue");
		check("#productCol", 1, "normal");
	});

	it("alignment cells have same alignment as header cell on init time", () => {
		check("#supplierCol", 2, "center");
		check("#dimensionsCol", 3, "right");
	});

	it("cells should change alignment when changing headerCell alignment", () => {
		check("#supplierCol", 2, "center");

		cy.get("#supplierCol")
			.invoke("attr", "horizontal-align", "End");

		cy.get("#supplierCol")
			.should("have.attr", "horizontal-align", "End");

		check("#supplierCol", 2, "end");
	});

	it("single cell alignment does not affect other cells and is not affected by header cell alignment", () => {
		check("#supplierCol", 2, "center");

		cy.get("ui5-table-row:nth-of-type(2) > ui5-table-cell:nth-child(2)")
			.invoke("attr", "horizontal-align", "Start");

		cy.get("ui5-table-row:nth-of-type(2) > ui5-table-cell:nth-child(2)")
			.should("have.attr", "horizontal-align", "Start")
			.should("have.css", "justify-content", "start");

		cy.get("#supplierCol")
			.should("have.css", "justify-content", "center");

		cy.get("ui5-table-row:nth-of-type(3) > ui5-table-cell:nth-child(2)")
			.should("have.css", "justify-content", "center");

		cy.get("ui5-table-row:nth-of-type(1) > ui5-table-cell:nth-child(2)")
			.should("have.css", "justify-content", "center");

		// Change alignment of header cell => should not affect custom cell alignment
		cy.get("#supplierCol")
			.invoke("attr", "horizontal-align", "End");

		cy.get("#supplierCol")
			.should("have.attr", "horizontal-align", "End");

		cy.get("ui5-table-row:nth-of-type(2) > ui5-table-cell:nth-child(2)")
			.should("have.attr", "horizontal-align", "Start")
			.should("have.css", "justify-content", "start");

		cy.get("ui5-table-row:nth-of-type(3) > ui5-table-cell:nth-child(2)")
			.should("have.css", "justify-content", "end");

		cy.get("ui5-table-row:nth-of-type(1) > ui5-table-cell:nth-child(2)")
			.should("have.css", "justify-content", "end");
	});

	it("alignment with popin", () => {
		const testWidths = [
			{ width: 1120, poppedIn: [] },
			{ width: 900, poppedIn: ["priceCol"] },
			{ width: 800, poppedIn: ["priceCol", "weightCol"] },
			{ width: 500, poppedIn: ["priceCol", "weightCol", "dimensionsCol"] },
			{ width: 300, poppedIn: ["priceCol", "weightCol", "dimensionsCol", "supplierCol"] },
		];
		const alignments = {
			"productCol": "normal",
			"supplierCol": "center",
			"dimensionsCol": "right",
			"weightCol": "normal",
			"priceCol": "normal",
			"none": "",
		};

		testWidths.forEach(({ width, poppedIn }) => {
			cy.get("ui5-table").then($table => {
				$table.css("width", `${width}px`);
			});

			cy.get("ui5-table-header-cell").each(($cell, index) => {
				const id = $cell.attr("id") as keyof typeof alignments ?? "none";
				const shouldBePoppedIn = poppedIn.includes(id);

				if (shouldBePoppedIn) {
					check(`#${id}`, index + 1, "normal");
					cy.get(`.${id}`).should("have.css", "justify-content", "normal");
				} else {
					check(`#${id}`, index + 1, alignments[id]);
					cy.get(`.${id}`).should("have.css", "justify-content", alignments[id]);
				}
			});
		});
	});
});

describe("Table - Fixed Header", () => {
	function check(topOffset: number, lastRow: string) {
		cy.get("ui5-table-header-row")
			.should("have.css", "position", "sticky")
			.should("have.css", "top", `${topOffset}px`);

		cy.get(lastRow)
			.scrollIntoView();

		cy.get("ui5-table-header-row")
			.then($header => {
				const headerRect = $header[0].getBoundingClientRect();
				expect(headerRect.top).to.be.eq(topOffset);
			});
	}

	beforeEach(() => {
		cy.window().then(window => {
			window.document.body.style.margin = "0";
			window.document.body.style.padding = "0";
		});
	});

	it("fixed header with scrollable wrapping container", () => {
		cy.mount(
			<div style={{ height: "300px", overflow: "auto" }}>
				<Bar
					id="toolbar"
					design="Header"
					style={{
						position: "sticky",
						top: 0,
						"z-index": 2,
						height: "50px"
					}}>
					<Title tabindex={0} level="H3" id="title" slot="startContent">My Selectable Products (3)</Title>
					<Slider id="slider" min={0} max={100} step={1} value={100} labelInterval={0}></Slider>
				</Bar>
				<Table id="table0" overflowMode="Popin" stickyTop="50px" accessibleNameRef="title" noDataText="No data found">
					<TableHeaderRow sticky slot="headerRow">
						<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
						<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
						<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
						<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
					</TableHeaderRow>
					${Array.from({ length: 20 }).map((val, index) =>
						<TableRow id={`row-${index + 1}`}><TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					)}
				</Table>
			</div>
		);

		check(50, "#row-20");
	});

	it("fixed header with table being scrollable", () => {
		cy.mount(
			<Table id="table" overflowMode="Popin" stickyTop="0" accessibleNameRef="title" noDataText="No data found" style={{ height: "300px", overflow: "auto" }}>
				<TableHeaderRow sticky slot="headerRow">
					<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
					<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
				</TableHeaderRow>
				${Array.from({ length: 20 }).map((val, index) =>
					<TableRow id={`row-${index + 1}`}><TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				)}
			</Table>
		);

		check(0, "#row-20");
	});

	it("fixed header with body being scroll container", () => {
		cy.mount(
			<>
				<Bar
					id="toolbar2"
					design="Header"
					style={{
						position: "sticky",
						top: 0,
						"z-index": 2,
						height: "50px"
					}}>
					<Title tabindex={0} level="H3" id="title" slot="startContent">My Selectable Products (3)</Title>
					<Slider id="slider" min={0} max={100} step={1} value={100} labelInterval={0}></Slider>
				</Bar>
				<Table id="table" overflowMode="Popin" stickyTop="50px" accessibleNameRef="title" noDataText="No data found">
					<TableHeaderRow sticky slot="headerRow">
						<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
						<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
						<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
						<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
					</TableHeaderRow>
					${Array.from({ length: 100 }).map((val, index) =>
						<TableRow id={`row-${index + 1}`}><TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					)}
				</Table>
			</>
		);

		check(50, "#row-100");
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
				expect(selectionRect.left).to.be.eq(0);
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

describe("Table - Navigated Rows", () => {
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

		// Navigated indicator differs between navigated and non-navigated rows
		cy.get("#row1").shadow().find("#navigated").as("navigated1");
		cy.get("#row2").shadow().find("#navigated")
			.then($navigated2 => {
				cy.get("@navigated1")
					.should($navigated1 => {
						const nav1BG = getComputedStyle($navigated1[0]).backgroundColor;
						const nav2BG = getComputedStyle($navigated2[0]).backgroundColor;
						expect(nav1BG).to.not.be.eq(nav2BG);
					});
			});

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

describe("Table - Interactive Rows", () => {
	it("fires the row-click event", () => {
		cy.mount(
			<Table id="table1">
				<TableSelectionMulti id="selection" selected="1 2" slot="features"></TableSelectionMulti>
				<TableHeaderRow id="headerRow" slot="headerRow">
					<TableHeaderCell>ColumnA</TableHeaderCell>
					<TableHeaderCell>ColumnB</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1" rowKey="1">
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Button>Cell B</Button></TableCell>
				</TableRow>
				<TableRow id="row2" rowKey="2" interactive={true}>
					<TableCell><Label>Cell A</Label></TableCell>
					<TableCell><Button>Cell B</Button></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("#table1").invoke("on", "row-click", cy.stub().as("rowClickHandler"));
		cy.get("#row1").realClick();
		cy.get("@rowClickHandler").should("not.have.been.called");
		cy.get("#row1").realPress("Enter");
		cy.get("@rowClickHandler").should("not.have.been.called");

		cy.get("#row2").realMouseDown();
		cy.get("#row2").should("have.attr", "_active");
		cy.get("#row1").realMouseUp();
		cy.get("#row2").should("not.have.attr", "_active");

		cy.get("#row2").realClick();
		cy.get("@rowClickHandler").invoke("getCall", 0).its("args.0.detail.row").as("clickedRow");
		cy.get("@clickedRow").should("have.attr", "id", "row2");
		cy.get("#row2").realPress("Enter");
		cy.get("@rowClickHandler").should("have.been.calledTwice");

		cy.get("#row2").find("ui5-label").realClick();
		cy.get("@rowClickHandler").should("have.been.calledThrice");

		cy.get("#row2").find("ui5-button").as("row2button");
		cy.get("@row2button").realMouseDown();
		cy.get("#row2").should("not.have.attr", "_active");
		cy.get("@row2button").realMouseUp();
		cy.get("#row2").should("not.have.attr", "_active");
		cy.get("@row2button").invoke("on", "click", cy.stub().as("buttonClickHandler"));
		cy.get("@row2button").realClick();
		cy.get("@buttonClickHandler").should("have.been.calledOnce");
		cy.get("@rowClickHandler").should("have.been.calledThrice");

		cy.get("@row2button").realPress("Enter");
		cy.get("@buttonClickHandler").should("have.been.calledTwice");
		cy.get("@rowClickHandler").should("have.been.calledThrice");

		cy.get("@row2button").realPress("Space");
		cy.get("@buttonClickHandler").should("have.been.calledThrice");
		cy.get("@rowClickHandler").should("have.been.calledThrice");
	});
});

describe("Table - HeaderCell", () => {
	beforeEach(() => {
		cy.mount(
			<Table overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell minWidth="300px">Column A</TableHeaderCell>
					<TableHeaderCell minWidth="200px" sortIndicator="Ascending">
						<Label required wrappingType="None">Column B</Label>
						<TableHeaderCellActionAI slot="action"></TableHeaderCellActionAI>
					</TableHeaderCell>
					<TableHeaderCell minWidth="150px" popinText="Popin Text">
						<Label required>Column C</Label>
					</TableHeaderCell>
				</TableHeaderRow>
				<TableRow>
					<TableCell>Cell A</TableCell>
					<TableCell>Cell B</TableCell>
					<TableCell>Cell C</TableCell>
				</TableRow>
				<TableRow>
					<TableCell>Cell A</TableCell>
					<TableCell>Cell B</TableCell>
					<TableCell>Cell C</TableCell>
				</TableRow>
			</Table>
		);
		cy.get("[ui5-table]").as("table").children("ui5-table-row").as("rows");
		cy.get("@table").children("ui5-table-header-row").first().as("headerRow");
		cy.get("@headerRow").get("ui5-table-header-cell").each(($headerCell, index) => {
			cy.wrap($headerCell).as(`headerCell${index + 1}`);
		});
		cy.get("@rows").each(($row, index) => {
			cy.wrap($row).as(`row${index + 1}`);
		});
	});

	it("should render header-cell correctly", () => {
		cy.get("@headerCell1").contains("Column A");
		cy.get("@headerCell2").should("have.attr", "aria-sort", "ascending");
		cy.get("@headerCell2").find("ui5-table-header-cell-action-ai").as("actionB");
		cy.get("@actionB").should("not.have.attr", "_popin");
		cy.get("@actionB").shadow().find("ui5-button").as("actionBbutton");
		cy.get("@actionBbutton").should("have.attr", "icon", "ai");
		cy.get("@actionBbutton").should("have.attr", "tooltip", "Generated by AI");
		cy.get("@actionB").invoke("on", "click", cy.stub().as("actionBclick"));
		cy.get("@actionBbutton").realClick();
		cy.get("@actionBclick").should("have.been.calledOnce");
		cy.get("@headerCell2").shadow().find("ui5-icon").as("actionBicon");
		cy.get("@actionBicon").should("have.attr", "name", "sort-ascending");

		cy.get("@headerCell2").invoke("attr", "sort-indicator", "Descending");
		cy.get("@headerCell2").shadow().find("ui5-icon").should("have.attr", "name", "sort-descending");
		cy.get("@actionBicon").should("have.attr", "name", "sort-descending");
		cy.get("@headerCell2").should("have.attr", "aria-sort", "descending");

		cy.get("@headerCell2").invoke("attr", "sort-indicator", "None");
		cy.get("@headerCell2").shadow().find("ui5-icon").should("not.exist");
		cy.get("@headerCell2").should("not.have.attr", "aria-sort");

		cy.get("@table").invoke("css", "width", "250px");
		cy.wait(50);

		cy.get("@row1").find("ui5-table-cell[_popin]").as("row1popins");
		cy.get("@row1popins").first().as("row1popinB");
		cy.get("@row1popinB").shadow().find("ui5-table-header-cell-action-ai").as("row1popinBaction");
		cy.get("@row1popinBaction").should("have.attr", "_popin");
		cy.get("@row1popinBaction").shadow().find("ui5-button").as("row1popinBbutton");
		cy.get("@row1popinBbutton").should("have.attr", "icon", "ai");
		cy.get("@row1popinBbutton").should("have.attr", "design", "Transparent");
		cy.get("@row1popinBbutton").should("have.attr", "tooltip", "Generated by AI");
		cy.get("@row1popinBbutton").realClick();
		cy.get("@actionBclick").invoke("getCall", 1).its("args.0.detail.targetRef").as("actionBclickTarget");
		cy.get("@actionBclickTarget").should("have.attr", "icon", "ai");
		cy.get("@actionBclickTarget").should("have.attr", "design", "Transparent");
		cy.get("@actionBclickTarget").should("have.attr", "tooltip", "Generated by AI");

		cy.get("@row1popinB").shadow().find("ui5-label").as("row1popinBlabel");
		cy.get("@row1popinBlabel").contains("Column B");
		cy.get("@row1popinBlabel").should("have.attr", "wrapping-type", "None");
		cy.get("@row1popinBlabel").should("have.attr", "required");

		cy.get("@row1popins").last().as("row1popinC");
		cy.get("@row1popinC").shadow().find("ui5-label").should("not.exist");
		cy.get("@row1popinC").shadow().should("have.text", "Popin Text:");
		cy.get("@row1popinC").should("have.text", "Cell C");

		cy.get("@row2").find("ui5-table-cell[_popin]").as("row2popins");
		cy.get("@row2popins").first().as("row2popinB");
		cy.get("@row2popinB").shadow().find("ui5-table-header-cell-action-ai").as("row2popinBaction");
		cy.get("@row2popinBaction").shadow().find("ui5-button").as("row2popinBbutton");
		cy.get("@row2popinBbutton").should("have.attr", "icon", "ai");
		cy.get("@row2popinBbutton").should("have.attr", "tooltip", "Generated by AI");
		cy.get("@row2popinBbutton").realClick();
		cy.get("@actionBclick").invoke("getCall", 2).its("args.0.detail.targetRef").as("actionBclickTarget");
		cy.get("@actionBclickTarget").should("have.attr", "icon", "ai");
		cy.get("@actionBclickTarget").should("have.attr", "design", "Transparent");
		cy.get("@actionBclickTarget").should("have.attr", "tooltip", "Generated by AI");
	});
});

describe("Table - Cell Merging", () => {
	function mountMergedTable(overflowMode: "Scroll" | "Popin" = "Scroll") {
		cy.mount(
			<Table id="table" overflowMode={overflowMode}>
				<TableSelectionMulti id="selection" slot="features"></TableSelectionMulti>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell id="colA" minWidth="200px">Column A</TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="150px">Column C</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell id="r1cA"><Label>SAP</Label></TableCell>
					<TableCell id="r1cB"><Label>100</Label></TableCell>
					<TableCell id="r1cC"><Label>X</Label></TableCell>
				</TableRow>
				<TableRow id="row2">
					<TableCell id="r2cA" merged><Label>SAP</Label></TableCell>
					<TableCell id="r2cB"><Label>200</Label></TableCell>
					<TableCell id="r2cC" merged><Label>X</Label></TableCell>
				</TableRow>
				<TableRow id="row3">
					<TableCell id="r3cA" merged><Label>SAP</Label></TableCell>
					<TableCell id="r3cB"><Label>300</Label></TableCell>
					<TableCell id="r3cC"><Label>Y</Label></TableCell>
				</TableRow>
			</Table>
		);
	}

	it("should have transparent border on merged cells and selection cell", () => {
		mountMergedTable();

		// Merged cell should have transparent top border
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);
		cy.get("#r2cA").find("ui5-label").should("have.css", "opacity", "0");

		// Non-merged cell should not have transparent border
		cy.get("#r2cB").should("not.have.css", "border-top-color", TRANSPARENT);
		cy.get("#r2cB").find("ui5-label").should("have.css", "opacity", "1");

		// Selection cell should have transparent border when first cell is merged
		cy.get("#row2").shadow().find("#selection-cell").should("have.attr", "data-border-merged");
		cy.get("#row2").shadow().find("#selection-cell").should("have.css", "border-top-color", TRANSPARENT);

		// Selection cell should NOT have transparent border when first cell is not merged
		cy.get("#row1").shadow().find("#selection-cell").should("not.have.attr", "data-border-merged");
		cy.get("#row1").shadow().find("#selection-cell").should("not.have.css", "border-top-color", TRANSPARENT);
	});

	it("should disable merged styles when row has popin", () => {
		mountMergedTable("Popin");

		// At full width, merged styles should be active
		cy.get("ui5-table").invoke("css", "width", "600px");
		cy.get("#r2cA").find("ui5-label").should("have.css", "opacity", "0");
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);
		cy.get("#row2").shadow().find("#selection-cell").should("have.css", "border-top-color", TRANSPARENT);

		// Shrink table to trigger popin
		cy.get("ui5-table").invoke("css", "width", "250px");
		cy.wait(50);

		// Merged cell border should fall back to normal border color (not transparent)
		cy.get("#row2").should("have.attr", "_haspopin");
		cy.get("#r2cA").should("not.have.css", "border-top-color", TRANSPARENT);
		cy.get("#row2").shadow().find("#selection-cell").should("not.have.css", "border-top-color", TRANSPARENT);

		// Merged cell content should be fully visible (opacity back to 1)
		cy.get("#r2cA").find("ui5-label").should("have.css", "opacity", "1");

		// Expand table again, merged styles should re-activate
		cy.get("ui5-table").invoke("css", "width", "600px");
		cy.wait(50);

		cy.get("#r2cA").find("ui5-label").should("have.css", "opacity", "0");
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);
		cy.get("#row2").shadow().find("#selection-cell").should("have.css", "border-top-color", TRANSPARENT);
	});

	it("should toggle merged styles at runtime", () => {
		mountMergedTable();

		// Initially merged
		cy.get("#r3cA").find("ui5-label").should("have.css", "opacity", "0");

		// Remove merged attribute
		cy.get("#r3cA").invoke("removeAttr", "merged");
		cy.get("#r3cA").find("ui5-label").should("have.css", "opacity", "1");
		cy.get("#r3cA").should("not.have.css", "border-top-color", TRANSPARENT);

		// Re-add merged attribute
		cy.get("#r3cA").invoke("prop", "merged", true);
		cy.get("#r3cA").find("ui5-label").should("have.css", "opacity", "0");
		cy.get("#r3cA").should("have.css", "border-top-color", TRANSPARENT);
	});

	it("should disable merged styles on focus", () => {
		mountMergedTable();

		// Before hover: merged styles active
		cy.get("#r2cA").find("ui5-label").should("have.css", "opacity", "0");
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);

		// On focus: merged cell content should become visible but border should remain transparent
		cy.get("#row2").realClick();
		cy.get("#r2cA").find("ui5-label").should("not.have.css", "opacity", "0");
		cy.get("#r2cA").should("have.css", "border-top-color", TRANSPARENT);
		cy.get("#row2").shadow().find("#selection-cell").should("have.css", "border-top-color", TRANSPARENT);
	});
});

describe("Table - Dummy Cell", () => {
	it("should render dummy cell with border and nofocus when all columns have fixed widths", () => {
		cy.mount(
			<Table id="table">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px">Product</TableHeaderCell>
					<TableHeaderCell width="40%">Supplier</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell><Label>Product 1</Label></TableCell>
					<TableCell><Label>Supplier 1</Label></TableCell>
				</TableRow>
				<TableRow id="row2" interactive>
					<TableCell><Label>Product 2</Label></TableCell>
					<TableCell><Label>Supplier 2</Label></TableCell>
				</TableRow>
			</Table>
		);

		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell").should("exist");
		cy.get("#row1").shadow().find("#dummy-cell").should("exist");

		// Should have left border
		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell")
			.should("not.have.css", "border-inline-start-width", "0px");
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("not.have.css", "border-inline-start-width", "0px");

		// Should have data-excluded-from-navigation="nofocus" and data-border-merged when no popin
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("have.attr", "data-excluded-from-navigation", "nofocus")
			.should("have.attr", "data-border-merged");

		// Should not focus row or fire row-click when clicking dummy cell
		cy.get("#table").invoke("on", "row-click", cy.stub().as("rowClickHandler"));
		cy.get("#row2").shadow().find("#dummy-cell").realClick();
		cy.get("#row2").should("not.be.focused");
		cy.get("#row2").should("not.have.attr", "_active");
		cy.get("@rowClickHandler").should("not.have.been.called");
	});

	it("should not render dummy cell when columns are flexible", () => {
		const cases = [
			{ widths: ["200px", "auto"] },
			{ widths: ["Auto"] },
			{ widths: ["200px", undefined] },
		];

		cases.forEach(({ widths }) => {
			cy.mount(
				<Table id="table">
					<TableHeaderRow slot="headerRow">
						{widths.map((w, i) => (
							<TableHeaderCell width={w}>{`Col ${i}`}</TableHeaderCell>
						))}
					</TableHeaderRow>
					<TableRow id="row1">
						{widths.map((_, i) => (
							<TableCell><Label>{`Cell ${i}`}</Label></TableCell>
						))}
					</TableRow>
				</Table>
			);

			cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell").should("not.exist");
			cy.get("#row1").shadow().find("#dummy-cell").should("not.exist");
		});
	});

	it("should render dummy cell after actions when no popin and before actions when popin", () => {
		cy.mount(
			<Table id="table" rowActionCount={2} overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px" minWidth="200px">Product</TableHeaderCell>
					<TableHeaderCell width="200px" minWidth="200px">Supplier</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell><Label>Product 1</Label></TableCell>
					<TableCell><Label>Supplier 1</Label></TableCell>
					<TableRowAction slot="actions" icon="edit" text="Edit"></TableRowAction>
					<TableRowAction slot="actions" icon="delete" text="Delete"></TableRowAction>
				</TableRow>
			</Table>
		);

		// No popin: dummy cell is after actions cell (rightmost) in both row and header row
		cy.get("#row1").shadow().then($shadow => {
			const dummyCell = $shadow.find("#dummy-cell")[0];
			const actionsCell = $shadow.find("#actions-cell")[0];
			const position = dummyCell.compareDocumentPosition(actionsCell);
			// eslint-disable-next-line no-bitwise
			expect(position & Node.DOCUMENT_POSITION_PRECEDING).to.be.greaterThan(0);
		});
		cy.get("[ui5-table-header-row]").shadow().then($shadow => {
			const dummyCell = $shadow.find("#dummy-cell")[0];
			const actionsCell = $shadow.find("#actions-cell")[0];
			const position = dummyCell.compareDocumentPosition(actionsCell);
			// eslint-disable-next-line no-bitwise
			expect(position & Node.DOCUMENT_POSITION_PRECEDING).to.be.greaterThan(0);
		});

		// Shrink to trigger popin: dummy cell moves before actions cell
		cy.get("ui5-table").invoke("css", "width", "250px");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("#row1").should("have.attr", "_haspopin");
		cy.get("#row1").shadow().then($shadow => {
			const dummyCell = $shadow.find("#dummy-cell")[0];
			const actionsCell = $shadow.find("#actions-cell")[0];
			const position = dummyCell.compareDocumentPosition(actionsCell);
			// eslint-disable-next-line no-bitwise
			expect(position & Node.DOCUMENT_POSITION_FOLLOWING).to.be.greaterThan(0);
		});
		cy.get("[ui5-table-header-row]").shadow().then($shadow => {
			const dummyCell = $shadow.find("#dummy-cell")[0];
			const actionsCell = $shadow.find("#actions-cell")[0];
			const position = dummyCell.compareDocumentPosition(actionsCell);
			// eslint-disable-next-line no-bitwise
			expect(position & Node.DOCUMENT_POSITION_FOLLOWING).to.be.greaterThan(0);
		});
	});

	it("should adapt dummy cell border and navigation attribute when row has popin", () => {
		cy.mount(
			<Table id="table" overflowMode="Popin">
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell width="200px" minWidth="200px">Product</TableHeaderCell>
					<TableHeaderCell width="200px" minWidth="200px">Supplier</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell><Label>Product 1</Label></TableCell>
					<TableCell><Label>Supplier 1</Label></TableCell>
				</TableRow>
			</Table>
		);

		// At full width: left border visible, nofocus attribute on both row and header row
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("not.have.css", "border-inline-start-width", "0px")
			.should("have.attr", "data-excluded-from-navigation", "nofocus");
		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell")
			.should("have.attr", "data-excluded-from-navigation", "nofocus");

		// Shrink to trigger popin
		cy.get("ui5-table").invoke("css", "width", "250px");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("#row1").should("have.attr", "_haspopin");

		// Left border removed, data-excluded-from-navigation without nofocus
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("have.css", "border-inline-start-width", "0px")
			.should("have.attr", "data-excluded-from-navigation", "");
		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell")
			.should("have.attr", "data-excluded-from-navigation", "");

		// Expand again, border and nofocus should return
		cy.get("ui5-table").invoke("css", "width", "800px");
		// eslint-disable-next-line cypress/no-unnecessary-waiting
		cy.wait(50);

		cy.get("#row1").should("not.have.attr", "_haspopin");
		cy.get("#row1").shadow().find("#dummy-cell")
			.should("not.have.css", "border-inline-start-width", "0px")
			.should("have.attr", "data-excluded-from-navigation", "nofocus");
		cy.get("[ui5-table-header-row]").shadow().find("#dummy-cell")
			.should("have.attr", "data-excluded-from-navigation", "nofocus");
	});
});
