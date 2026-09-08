import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableGrowing from "../../src/TableGrowing.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import TableRowAction from "../../src/TableRowAction.js";
import TableRowActionNavigation from "../../src/TableRowActionNavigation.js";
import Bar from "../../src/Bar.js";
import Title from "../../src/Title.js";

describe("Table - Keyboard Navigation", () => {
	beforeEach(() => {
		cy.mount(
			<>
				<input id="before-table1" type="Number" value="0" />
				<Table id="table0">
					<TableGrowing id="growing" type="Button" slot="features"></TableGrowing>
					<TableHeaderRow slot="headerRow">
						<TableHeaderCell><a id="row0-link" href="test.html">Link</a></TableHeaderCell>
						<TableHeaderCell>Header2</TableHeaderCell>
						<TableHeaderCell>Header3</TableHeaderCell>
						<TableHeaderCell>Header4</TableHeaderCell>
					</TableHeaderRow>
					<TableRow>
						<TableCell>Row1Cell0</TableCell>
						<TableCell><input id="row1-input" /></TableCell>
						<TableCell><button id="row1-button">Button 1</button></TableCell>
						<TableCell>Row1Cell3</TableCell>
					</TableRow>
					<TableRow id="interactive-row" interactive>
						<TableCell>Row2Cell0</TableCell>
						<TableCell><input id="row2-input" /></TableCell>
						<TableCell><button id="row2-button">Button 2</button></TableCell>
						<TableCell>Row2Cell3</TableCell>
					</TableRow>
					<TableRow id="notinteractive-row"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell> Here the table structure is broken. There is only one cell in row 5. </TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				</Table>
				<input id="after-table1" />
			</>
		);

		cy.document().then(doc => {
			const table = doc.getElementById("table0");
			const input = doc.getElementById("before-table1");
			table?.addEventListener("ui5-row-click", () => {
				if (input instanceof HTMLInputElement) {
					input.valueAsNumber++;
				}
			});
		});

		cy.get("#table0").children("ui5-table-row").as("rows");
		cy.get("#table0").children("ui5-table-header-row").as("headerRow");
	});

	function getCell(row: number, cell: number, headerRow: boolean) {
		if (headerRow) {
			return cy.get("@headerRow").children("ui5-table-header-cell").eq(cell);
		}
		return cy.get("@rows").eq(row)
			.children("ui5-table-cell")
			.eq(cell);
	}

	function performActions(actions: { element: Cypress.Chainable, click?: string, condition?: string, conditionValue?: string, type?: string, press?: string | string[] }[]) {
		actions.forEach(action => {
			if (action.click) {
				// @ts-ignore
				action.element.click(action.click);
			}
			if (action.condition) {
				if (action.conditionValue) {
					// timing issue - without wait the check is failing
					action.element.wait(0).should(action.condition, action.conditionValue);
				} else {
					action.element.wait(0).should(action.condition);
				}
			}
			if (action.type) {
				action.element.type(action.type);
			}
			if (action.press) {
				// @ts-ignore
				action.element.realPress(action.press);
			}
		});
	}

	it("should navigate on rows", () => {
		performActions([
			// left click is needed to focus the row
			// otherwise the it would click in the center of the row where an input is
			// resulting in a focus on the input instead of the row
			{ element: cy.get("@rows").eq(0), click: "left" },
			{ element: cy.get("@rows").eq(0), type: "{leftarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@headerRow"), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@headerRow"), type: "{downarrow}{downarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), type: "{pagedown}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(21), type: "{pagedown}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("#growing").shadow().find("#button"), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{pageup}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(4), type: "{pageup}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{end}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{end}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@headerRow"), condition: "be.focused" }
		]);
	});

	it("should navigate on cells", () => {
		performActions([
			{ element: cy.get("@rows").eq(0), click: "left" },
			{ element: cy.get("@rows").eq(0), type: "{rightarrow}", condition: "be.focused" },
			{ element: getCell(0, 0, false), type: "{leftarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{rightarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(0, 1, false), type: "{home}", condition: "be.focused" },
			{ element: getCell(0, 0, false), type: "{end}", condition: "be.focused" },
			{ element: getCell(0, 3, false), type: "{rightarrow}", condition: "be.focused" },
			{ element: getCell(0, 3, false), type: "{end}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{end}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{rightarrow}{rightarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(24, 2, false), type: "{pageup}", condition: "be.focused" },
			{ element: getCell(4, 0, false), type: "{pageup}", condition: "be.focused" },
			{ element: getCell(0, 0, false), type: "{pageup}", condition: "be.focused" },
			{ element: getCell(0, 0, true), type: "{pagedown}", condition: "be.focused" },
			{ element: getCell(19, 0, false), type: "{pagedown}", condition: "be.focused" },
			{ element: getCell(24, 0, false), type: "{pagedown}", condition: "be.focused" },
			// arrow-down from a cell inside the last row stays on the cell (does not hop to growing button)
			{ element: getCell(24, 0, false), type: "{downarrow}", condition: "be.focused" },
			{ element: getCell(24, 0, false), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(24), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{home}", condition: "be.focused" },
			{ element: cy.get("@headerRow"), type: "{downarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(0, 0, false), type: "{downarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(1, 1, false), type: "{downarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(2, 2, false), type: "{downarrow}{rightarrow}", condition: "be.focused" },
			{ element: getCell(3, 3, false), type: "{downarrow}", condition: "be.focused" },
			{ element: getCell(4, 0, false), condition: "be.focused" }
		]);
	});

	it("should handle F2/F7/Enter/Tab/Up/Down", () => {
		cy.get("@rows").eq(0).get("#row1-input").as("row1Input");
		cy.get("@rows").eq(1).get("#row2-input").as("row2Input");

		performActions([
			{ element: cy.get("@rows").eq(0), click: "left" },
			{ element: cy.get("@rows").eq(0), press: "F2", condition: "be.focused" },
			{ element: cy.get("@row1Input"), press: "F2", condition: "be.focused" },
			{ element: getCell(0, 1, false), press: "F2", condition: "be.focused" },
			{ element: cy.get("@row1Input"), press: "F7", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), press: "F7", condition: "be.focused" },
			{ element: cy.get("@row1Input").eq(0), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("@row1Input").eq(0), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@row1Input").eq(0), press: ["F2", "{uparrow}"], condition: "be.focused" },
			{ element: getCell(0, 1, true), press: "F2", condition: "be.focused" },
			{ element: getCell(0, 1, true), type: "{leftarrow}", condition: "be.focused" },
			{ element: getCell(0, 0, true), type: "{enter}", condition: "be.focused" },
			{ element: cy.get("@headerRow").get("#row0-link"), type: "{downarrow}", condition: "be.focused" },
			{ element: getCell(0, 0, false), press: "Tab", condition: "be.focused" },
			{ element: cy.get("#growing").shadow().find("#button"), press: "Tab", condition: "be.focused" },
			{ element: cy.get("#after-table1"), press: ["Shift", "Tab"], condition: "be.focused" },
			{ element: cy.get("#growing").shadow().find("#button"), press: ["Shift", "Tab"], condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), press: "F7", condition: "be.focused" },
			{ element: cy.get("@row2Input").eq(0), press: "Tab", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1).get("#row2-button"), press: "F7", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), type: "{uparrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), press: "F7", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0).get("#row1-button"), type: "{uparrow}", condition: "be.focused" },
			{ element: getCell(0, 2, true), press: "F7", condition: "be.focused" },
			{ element: cy.get("@headerRow"), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), press: "F7", condition: "be.focused" },
			{ element: getCell(0, 2, false), press: "F7", condition: "be.focused" },
			{ element: cy.get("@rows").eq(0), type: "{downarrow}", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), press: "F7", condition: "be.focused" },
			{ element: getCell(1, 2, false), press: ["Shift", "Tab"], condition: "be.focused" },
			{ element: cy.get("#before-table1"), press: "Tab", condition: "be.focused" },
			{ element: cy.get("@rows").eq(1), press: "Tab", condition: "be.focused" }
		]);
	});

	it("should should work correctly for interactive rows", () => {
		cy.get("@rows").eq(1).get("#row2-button").as("row2Button");
		cy.get("#table0").get("#before-table1").as("input");
		cy.get("@rows").get("#interactive-row").as("row");

		performActions([
			{ element: cy.get("@row"), click: "left" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "1" },
			{ element: cy.get("@row"), type: "{enter}" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@rows").get("#notinteractive-row"), click: "left" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@row2Button"), click: "left" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@row2Button"), type: "{enter}" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@row2Button"), press: "F7" },
			{ element: cy.get("@row"), condition: "be.focused" },
			{ element: cy.get("@row"), press: "Space" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "2" },
			{ element: cy.get("@row"), type: "{enter}" },
			{ element: cy.get("@input"), condition: "have.value", conditionValue: "3" }
		]);
	});
});

describe("Table - Keyboard Navigation with Fixed Headers", () => {

	it("scrollable container - focused row should always be below the header", () => {
		cy.mount(<div style="height:300px; overflow:auto;">
			<Bar style="position: sticky; top: 0; z-index: 2; height: 50px;">
				<Title>My Selectable Products (3)</Title>
			</Bar>
			<Table overflowMode="Popin" stickyTop="50px">
				<TableHeaderRow sticky={true} slot="headerRow">
					<TableHeaderCell minWidth="300px">ColumnA</TableHeaderCell>
					<TableHeaderCell minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell minWidth="200px">Column C</TableHeaderCell>
					<TableHeaderCell minWidth="150px">Column D</TableHeaderCell>
				</TableHeaderRow>
				{
					Array.from({ length: 21 }, () => Array(4).fill(0)).map((row, index) => (
						<TableRow id={`row-${index + 1}`}>
							{row.map((_, cellIndex) => {
								return <TableCell>{cellIndex + 1}</TableCell>
							})}
						</TableRow>
					))
				}
			</Table>
		</div>)

		cy.get("#row-21")
			.as("lastRow")
			.scrollIntoView();

		cy.get("@lastRow")
			.realClick();

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("[ui5-table-header-row]")
			.as("headerRow");

		// Scroll to the top one by one
		for (let i = 20; i > 0; i--) {
			cy.realPress("ArrowUp");

			cy.get(`#row-${i}`)
				.as("row")
				.should("be.focused");

			cy.get("@headerRow")
				.should("be.visible");

			cy.get("@headerRow")
				.then($headerRow => {
					return $headerRow[0].getBoundingClientRect().y;
				})
				.as("headerRowLocation");

			cy.get("@row")
				.then($row => {
					return $row[0].getBoundingClientRect().y;
				})
				.as("rowLocation");

			cy.get('@headerRowLocation').then(headerRowLocation => {
				cy.get('@rowLocation').should(rowLocation => {
					expect(headerRowLocation as unknown as number).to.be.lessThan(rowLocation as unknown as number);
				});
			});
		}
	});

	it("scrollable table - focused row should always be below the header", () => {
		cy.mount(<Table overflowMode="Popin" stickyTop="0" style="height: 300px; overflow: auto;">
			<TableHeaderRow sticky slot="headerRow">
				<TableHeaderCell minWidth="300px">Column A</TableHeaderCell>
				<TableHeaderCell minWidth="200px">Column B</TableHeaderCell>
				<TableHeaderCell minWidth="200px">Column C</TableHeaderCell>
				<TableHeaderCell minWidth="150px">Column D</TableHeaderCell>
			</TableHeaderRow>
			{
				Array.from({ length: 21 }, () => Array(4).fill(0)).map((row, index) => (
					<TableRow id={`row-${index + 1}-1`}>
						{row.map((_, cellIndex) => {
							return <TableCell>{cellIndex + 1}</TableCell>
						})}
					</TableRow>
				))
			}
		</Table>)

		cy.get("#row-21-1")
			.as("lastRow")
			.scrollIntoView();

		cy.get("@lastRow")
			.realClick();

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("[ui5-table-header-row]")
			.as("headerRow");

		// Scroll to the top one by one
		for (let i = 20; i > 0; i--) {
			cy.realPress("ArrowUp");

			cy.get(`#row-${i}-1`)
				.as("row")
				.should("be.focused");

			cy.get("@headerRow")
				.should("be.visible");

			cy.get("@headerRow")
				.then($headerRow => {
					return $headerRow[0].getBoundingClientRect().y;
				})
				.as("headerRowLocation");

			cy.get("@row")
				.then($row => {
					return $row[0].getBoundingClientRect().y;
				})
				.as("rowLocation");

			cy.get('@headerRowLocation').then(headerRowLocation => {
				cy.get('@rowLocation').should(rowLocation => {
					expect(headerRowLocation as unknown as number).to.be.lessThan(rowLocation as unknown as number);
				});
			});
		}
	});

	it("body as scroll container - focused row should always be below the header", () => {
		cy.mount(
			<>
				<Bar style="position: sticky; top: 0; z-index: 2; height: 50px;">
					<Title>My Selectable Products (3)</Title>
				</Bar>
				<Table overflowMode="Popin" sticky-top="50px">
					<TableHeaderRow sticky slot="headerRow">
						<TableHeaderCell minWidth="300px">Column A</TableHeaderCell>
						<TableHeaderCell minWidth="200px">Column B</TableHeaderCell>
						<TableHeaderCell minWidth="200px">Column C</TableHeaderCell>
						<TableHeaderCell minWidth="150px">Column D</TableHeaderCell>
					</TableHeaderRow>
					{
						Array.from({ length: 100 }, () => Array(4).fill(0)).map((row, index) => (
							<TableRow id={`row-${index + 1}-2`}>
								{row.map((_, cellIndex) => {
									return <TableCell>cell-{index + 1}-{cellIndex + 1}</TableCell>
								})}
							</TableRow>
						))
					}
				</Table>
			</>
		)

		cy.get("#row-100-2")
			.as("lastRow")
			.scrollIntoView();

		cy.get("@lastRow")
			.realClick();

		cy.get("@lastRow")
			.should("be.focused");

		cy.get("[ui5-table-header-row]")
			.as("headerRow");

		// Scroll to the top one by one
		for (let i = 99; i > 0; i--) {
			cy.realPress("ArrowUp");

			cy.get(`#row-${i}-2`)
				.as("row")
				.should("be.focused");

			cy.get("@headerRow")
				.should("be.visible");

			cy.get("@headerRow")
				.then($headerRow => {
					return $headerRow[0].getBoundingClientRect().y;
				})
				.as("headerRowLocation");

			cy.get("@row")
				.then($row => {
					return $row[0].getBoundingClientRect().y;
				})
				.as("rowLocation");

			cy.get('@headerRowLocation').then(headerRowLocation => {
				cy.get('@rowLocation').should(rowLocation => {
					expect(headerRowLocation as unknown as number).to.be.lessThan(rowLocation as unknown as number);
				});
			});
		}
	});
});

describe("Table - Keyboard Navigation with overflowMode=Scroll", () => {
	const sixColumnHeader = (
		<TableHeaderRow slot="headerRow">
			<TableHeaderCell minWidth="180px">Column A</TableHeaderCell>
			<TableHeaderCell minWidth="180px">Column B</TableHeaderCell>
			<TableHeaderCell minWidth="180px">Column C</TableHeaderCell>
			<TableHeaderCell minWidth="180px">Column D</TableHeaderCell>
			<TableHeaderCell minWidth="180px">Column E</TableHeaderCell>
			<TableHeaderCell minWidth="180px">Column F</TableHeaderCell>
		</TableHeaderRow>
	);

	const wideRow = (rowId: string, keyLabel: string) => (
		<TableRow id={rowId} rowKey={rowId}>
			<TableCell>{keyLabel}-A</TableCell>
			<TableCell>{keyLabel}-B</TableCell>
			<TableCell>{keyLabel}-C</TableCell>
			<TableCell>{keyLabel}-D</TableCell>
			<TableCell>{keyLabel}-E</TableCell>
			<TableCell>{keyLabel}-F</TableCell>
		</TableRow>
	);

	const focusFirstCell = (key: "ArrowRight" | "ArrowLeft", pressesToFirstCell: number) => {
		// Cypress#focus() rejects the custom element, and .click()
		// fail because the sticky column partially covers the row
		cy.get("#row-1").then($row => $row[0].focus());
		for (let p = 0; p < pressesToFirstCell; p++) {
			cy.realPress(key);
		}
		cy.get("#row-1").children("ui5-table-cell").eq(0).should("be.focused");
	};

	const walkAndAssertClearOfSticky = (
		key: "ArrowRight" | "ArrowLeft",
		stickyCellId: string,
		assertClear: (stickyRect: DOMRect, focusedRect: DOMRect) => void,
	) => {
		for (let i = 1; i < 6; i++) {
			cy.realPress(key);
			cy.get("#row-1").children("ui5-table-cell").eq(i).as("focused").should("be.focused");
			cy.get("#row-1").shadow().find(stickyCellId).then($sticky => {
				const stickyRect = $sticky[0].getBoundingClientRect();
				cy.get("@focused").then($f => assertClear(stickyRect, $f[0].getBoundingClientRect()));
			});
		}
	};

	it("horizontal arrow keys keep focus past the sticky selection column (LTR)", () => {
		cy.mount(
			<div style="width:400px;">
				<Table id="table" overflowMode="Scroll">
					<TableSelectionMulti slot="features" />
					{sixColumnHeader}
					{wideRow("row-1", "R1")}
				</Table>
			</div>
		);

		focusFirstCell("ArrowRight", 2);
		walkAndAssertClearOfSticky("ArrowRight", "#selection-cell", (sel, focused) => {
			expect(focused.left).to.be.at.least(sel.right - 0.5);
		});
	});

	it("horizontal arrow keys keep focus past the sticky actions/navigated column (LTR)", () => {
		cy.mount(
			<div style="width:400px;">
				<Table id="table" overflowMode="Scroll" rowActionCount={1}>
					{sixColumnHeader}
					<TableRow id="row-1" rowKey="row-1" navigated={true}>
						<TableCell>R1-A</TableCell>
						<TableCell>R1-B</TableCell>
						<TableCell>R1-C</TableCell>
						<TableCell>R1-D</TableCell>
						<TableCell>R1-E</TableCell>
						<TableCell>R1-F</TableCell>
						<TableRowAction slot="actions" icon="edit" text="Edit" />
						<TableRowActionNavigation slot="actions" />
					</TableRow>
				</Table>
			</div>
		);

		focusFirstCell("ArrowRight", 1);
		walkAndAssertClearOfSticky("ArrowRight", "#actions-cell", (act, focused) => {
			expect(focused.right).to.be.at.most(act.left + 0.5);
		});
	});

	it("horizontal arrow keys keep focus past sticky columns (RTL)", () => {
		cy.mount(
			<div dir="rtl" style="width:400px;">
				<Table id="table" overflowMode="Scroll">
					<TableSelectionMulti slot="features" />
					{sixColumnHeader}
					{wideRow("row-1", "R1")}
				</Table>
			</div>
		);

		// In RTL, ArrowLeft moves to the next logical column.
		focusFirstCell("ArrowLeft", 2);
		walkAndAssertClearOfSticky("ArrowLeft", "#selection-cell", (sel, focused) => {
			expect(focused.right).to.be.at.most(sel.left + 0.5);
		});
	});

	it("cell wider than viewport is aligned to leading edge", () => {
		cy.mount(
			<div style="width:300px;">
				<Table id="table" overflowMode="Scroll">
					<TableSelectionMulti slot="features" />
					<TableHeaderRow slot="headerRow">
						<TableHeaderCell minWidth="600px">Wide Column</TableHeaderCell>
						<TableHeaderCell minWidth="180px">Column B</TableHeaderCell>
					</TableHeaderRow>
					<TableRow id="row-1" rowKey="row-1">
						<TableCell>Wide content that is far wider than the visible viewport</TableCell>
						<TableCell>B</TableCell>
					</TableRow>
				</Table>
			</div>
		);

		focusFirstCell("ArrowRight", 2);
		cy.get("#row-1").shadow().find("#selection-cell").then($sel => {
			const selRight = $sel[0].getBoundingClientRect().right;
			cy.get("#row-1").children("ui5-table-cell").eq(0).then($w => {
				expect(Math.abs($w[0].getBoundingClientRect().left - selRight)).to.be.at.most(1.5);
			});
		});
	});

	const verticalStickyTable = (
		<Table id="table" overflowMode="Scroll" style="height: 150px">
			<TableHeaderRow slot="headerRow" sticky>
				<TableHeaderCell>Column A</TableHeaderCell>
			</TableHeaderRow>
			{Array.from({ length: 30 }).map((_, i) => (
				<TableRow id={`row-${i}`} rowKey={`${i}`}>
					<TableCell>Cell {i}</TableCell>
				</TableRow>
			))}
		</Table>
	);

	// Scrolls down, navigates back up with ArrowUp and asserts the focused row is not hidden under the sticky header.
	const assertFocusedRowNotHiddenUnderHeader = () => {
		cy.get("#row-0").then($row => $row[0].focus());
		for (let i = 0; i < 20; i++) {
			cy.realPress("ArrowDown");
		}
		cy.get("#row-20").should("be.focused");

		for (let i = 0; i < 5; i++) {
			cy.realPress("ArrowUp");
		}
		cy.get("#row-15").should("be.focused");

		cy.get("#table").find("[ui5-table-header-row]").then($header => {
			const headerRect = $header[0].getBoundingClientRect();
			cy.get("#row-15").then($row => {
				expect($row[0].getBoundingClientRect().top).to.be.at.least(headerRect.bottom - 0.5);
			});
		});
	};

	it("focused row is not hidden under the sticky header (table scrolls)", () => {
		cy.mount(verticalStickyTable);
		assertFocusedRowNotHiddenUnderHeader();
	});

	it("focused row is not hidden under the sticky header (wrapper scrolls)", () => {
		cy.mount(<div style="height: 150px; overflow: auto;">{verticalStickyTable}</div>);
		assertFocusedRowNotHiddenUnderHeader();
	});
});