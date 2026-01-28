import Label from "../../src/Label.js";
import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import TableSelectionSingle from "../../src/TableSelectionSingle.js";
import TableSelectionMulti from "../../src/TableSelectionMulti.js";
import type TableSelectionBase from "../../src/TableSelectionBase.js";
import * as Translations from "../../src/generated/i18n/i18n-defaults.js";

const {
	ACC_STATE_DISABLED: { defaultText: DISABLED },
	CHECKBOX_CHECKED: { defaultText: CHECKED },
	CHECKBOX_NOT_CHECKED: { defaultText: NOT_CHECKED },
	TABLE_SELECT_ALL_ROWS: { defaultText: SELECT_ALL_ROWS },
	TABLE_DESELECT_ALL_ROWS: { defaultText: DESELECT_ALL_ROWS },
  	TABLE_COLUMNHEADER_CLEARALL_DESCRIPTION: { defaultText: CLEAR_ALL_BUTTON },
	TABLE_COLUMNHEADER_SELECTALL_DESCRIPTION: { defaultText: SELECT_ALL_CHECKBOX },
} = Translations;

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

const testConfig = {
	"Single": {
		"config": {
			"mode": "Single",
		},
		"cases": {
			"ARIA_DESCRIPTION": "Single Selection Table",
			"BOXES": {
				"header": {
					"exists": true,
					"checkbox": false,
				},
				"row": {
					"exists": true,
					"checkbox": true,
				},
			},
			"SPACE": {
				"space_0": "0",
				"space_4": "4",
			},
			"ARROWS_BOX": {
				"arrow_initial": "0",
				"arrow_down": "1",
				"arrow_up": "0",
			},
			"MOUSE": {
				"mouse_0": "0",
				"mouse_4": "4",
			},
			"RANGE_MOUSE": {
				"range_mouse_initial": "0",
				"range_mouse_final": "4",
				"range_mouse_edge": "0",
			},
			"RANGE_KEYBOARD": {
				"initial": "0",
				"block_1": "0",
				"block_2": "3",
			},
			"ROWONLY": {
				"click": "0",
				"space": "1",
				"enter": "2"
			}
		}
	},
	"Multiple": {
		"config": {
			"mode": "Multiple",
		},
		"cases": {
			"ARIA_DESCRIPTION": "Multi Selection Table",
			"BOXES": {
				"header": {
					"exists": true,
					"checkbox": true
				},
				"row": {
					"exists": true,
					"checkbox": true
				}
			},
			"SPACE": {
				"space_0": "0",
				"space_4": "0 4"
			},
			"ARROWS_BOX": {
				"arrow_initial": "0",
				"arrow_down": "0",
				"arrow_up": "0"
			},
			"MOUSE": {
				"mouse_0": "0",
				"mouse_4": "0 4"
			},
			"RANGE_MOUSE": {
				"range_mouse_initial": "0",
				"range_mouse_final": "0 1 2 3 4",
				"range_mouse_edge": "0 1 2 3 4"
			},
			"RANGE_KEYBOARD": {
				"initial": "0",
				"block_1": "0 1",
				"block_2": "0 1 3 4"
			},
			"ROWONLY": {
				"click": "0",
				"space": "0 1",
				"enter": "0 1 2"
			}
		}
	}
};

// I've had to check the attribute this way because
// should("have.attr"... and similar functions always returned '' instead of the actual value
// It could be a timing issue but .wait didn't help either
function checkSelection(expectedSelected: string) {
	cy.get("#selection").then($selection => {
		const selection = $selection.get(0) as TableSelectionBase;
		expect(selection.getAttribute("selected")).to.equal(expectedSelected);

		if (selection.isMultiSelectable()) {
			const selectedRows = (selection as TableSelectionMulti).getSelectedRows();
			expect(selectedRows.map(row => selection.getRowKey(row)).join(" ")).to.equal(expectedSelected);
			const selectedAsSet = (selection as TableSelectionMulti).getSelectedAsSet();
			expect([...selectedAsSet].join(" ")).to.equal(expectedSelected);
		} else {
			const selectedRow = (selection as TableSelectionSingle).getSelectedRow();
			expect(selectedRow!.rowKey).to.equal(expectedSelected);
			expect(selectedRow).to.equal(selection.getRowByKey(expectedSelected));
		}
	});
}

function checkSelectionChangeSpy(expectedCalls: number) {
	cy.get("@selectionChangeSpy").should("have.callCount", expectedCalls);
}

Object.entries(testConfig).forEach(([mode, testConfigEntry]) => {
	describe(`Mode - ${mode}`, () => {
		beforeEach(() => {
			mountTestpage(testConfigEntry.config.mode);
			cy.get("#selection").as("selection");
			cy.get("@selection").then($selection => {
				$selection.get(0)?.addEventListener("change", cy.stub().as("selectionChangeSpy"));
			});
			cy.get("#table0").shadow().find("#table").as("innerTable");
			cy.get("@innerTable").should("have.attr", "aria-colcount", "5");
		});

		it("sets the correct aria-description", () => {
			cy.get("@innerTable").should("have.attr", "aria-description", testConfigEntry.cases.ARIA_DESCRIPTION);
		});

		it("Correct boxes are shown", () => {
			cy.get("@headerRow").shadow().find("#selection-cell")
				.should("have.attr", "aria-colindex", "1")
				.should("have.attr", "aria-label", "Selection")
				.should(testConfigEntry.cases.BOXES.header.exists ? "exist" : "not.exist");
			cy.get("@row0").shadow().find("#selection-cell")
				.should(testConfigEntry.cases.BOXES.row.exists ? "exist" : "not.exist");

			cy.get("@headerRow").shadow().find("#selection-component")
				.should(testConfigEntry.cases.BOXES.header.checkbox ? "exist" : "not.exist");
			cy.get("@row0").shadow().find("#selection-component")
				.should(testConfigEntry.cases.BOXES.row.checkbox ? "exist" : "not.exist");
		});

		it("select row via SPACE", () => {
			cy.get("@row0").realClick();
			cy.get("@row0").realPress("Space");
			checkSelection(testConfigEntry.cases.SPACE.space_0);
			checkSelectionChangeSpy(1);

			cy.get("@row4").realClick();
			cy.get("@row4").realPress("Space");
			checkSelection(testConfigEntry.cases.SPACE.space_4);
			checkSelectionChangeSpy(2);
		});

		it("select row via arrows (radio focus)", () => {
			cy.get("@row0").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.ARROWS_BOX.arrow_initial);
			checkSelectionChangeSpy(1);

			cy.realPress("ArrowDown");
			checkSelection(testConfigEntry.cases.ARROWS_BOX.arrow_down);
			let callCount = mode === "Single" ? 2 : 1;
			checkSelectionChangeSpy(callCount);

			cy.realPress("ArrowUp");
			checkSelection(testConfigEntry.cases.ARROWS_BOX.arrow_up);
			callCount = mode === "Single" ? 3 : 1;
			checkSelectionChangeSpy(callCount);
		});

		it("select row via mouse", () => {
			cy.get("@row0").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.MOUSE.mouse_0);
			checkSelectionChangeSpy(1);

			cy.get("@row4").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.MOUSE.mouse_4);
			checkSelectionChangeSpy(2);
		});

		it("range selection with mouse", () => {
			cy.get("@row0").shadow().find("#selection-component").realClick();
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_initial);
			checkSelectionChangeSpy(1);

			cy.get("@row4").shadow().find("#selection-component").realClick({ shiftKey: true });
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_final);
			checkSelectionChangeSpy(2);

			cy.get("@row0").shadow().find("#selection-component").realClick({ shiftKey: true });
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_edge);
			let callCount = mode === "Single" ? 3 : 2;
			checkSelectionChangeSpy(callCount);
		});

		it("range selection with mouse with SHIFT constantly pressed", () => {
			cy.get("@row0").shadow().find("#selection-component").realClick({ shiftKey: true });
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_initial);
			checkSelectionChangeSpy(1);

			cy.get("@row4").shadow().find("#selection-component").realClick({ shiftKey: true });
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_final);
			checkSelectionChangeSpy(2);

			cy.get("@row0").shadow().find("#selection-component").realClick({ shiftKey: true });
			checkSelection(testConfigEntry.cases.RANGE_MOUSE.range_mouse_edge);
			let callCount = mode === "Single" ? 3 : 2;
			checkSelectionChangeSpy(callCount);
		});

		it("range selection with keyboard", () => {
			cy.get("@row0").realClick({ position: "center" });
			cy.get("@row0").realPress("Space");
			checkSelection(testConfigEntry.cases.RANGE_KEYBOARD.initial);
			checkSelectionChangeSpy(1);

			cy.realPress(["Shift", "ArrowDown", "ArrowDown", "ArrowDown", "ArrowUp", "ArrowUp"]);
			checkSelection(testConfigEntry.cases.RANGE_KEYBOARD.block_1);
			let callCount = mode === "Single" ? 1 : 6;
			checkSelectionChangeSpy(callCount);

			cy.realPress(["ArrowDown", "ArrowDown", "Space"]);
			cy.realPress(["Shift", "ArrowDown"]);
			checkSelection(testConfigEntry.cases.RANGE_KEYBOARD.block_2);
			callCount = mode === "Single" ? 2 : 8;
			checkSelectionChangeSpy(callCount);
		});
	});

	describe(`Behavior - ${mode}`, () => {
        beforeEach(() => {
            mountTestpage(testConfigEntry.config.mode);

			cy.get("@row0").invoke("prop", "interactive", true);
			cy.get("@row1").invoke("prop", "interactive", true);
			cy.get("@row2").invoke("prop", "interactive", true);
			cy.get("#selection").invoke("attr", "behavior", "RowWÓnly");
			cy.get("#table0").invoke("on", "row-click", cy.stub().as("rowClickSpy"));
			cy.get("#selection").invoke("on", "change", cy.stub().as("selectionChangeSpy"));
			cy.get("#table0").shadow().find("#table").should("have.attr", "aria-colcount", "4");
        });

		it("renders neither selection cell nor selection component", () => {
			cy.get("@headerRow").shadow().find("#selection-cell").should("not.exist");
			cy.get("@row0").shadow().find("#selection-cell").should("not.exist");

			cy.get("@headerRow").shadow().find("#selection-component").should("not.exist");
			cy.get("@row0").shadow().find("#selection-component").should("not.exist");
		});

		it("selects row via click, space or enter", () => {
			cy.get("@row0").realClick();
			checkSelection(testConfigEntry.cases.ROWONLY.click);
			checkSelectionChangeSpy(1);

			cy.get("@row0").realPress("ArrowDown");
			cy.get("@row1").realPress("Space");
			checkSelection(testConfigEntry.cases.ROWONLY.space);
			checkSelectionChangeSpy(2);

			cy.get("@row1").realPress("ArrowDown");
			cy.get("@row2").realPress("Enter");
			checkSelection(testConfigEntry.cases.ROWONLY.enter);
			checkSelectionChangeSpy(3);

			cy.get("@rowClickSpy").should("not.have.callCount");
		});
    });

});

describe("TableSelectionSingle", () => {
	beforeEach(() => {
		cy.mount(
			<Table id="table1">
				<TableSelectionSingle id="selection" slot="features"></TableSelectionSingle>
				<TableHeaderRow id="headerRow" slot="headerRow">
					<TableHeaderCell>ColumnA</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row1">
					<TableCell><Label>Cell A</Label></TableCell>
				</TableRow>
			</Table>
		);
	});

	it("updates the header row selection cell when rows are added or removed", () => {
		cy.get("#headerRow").shadow().find("#selection-cell").should("exist");

		cy.get("#row1").invoke("remove");
		cy.get("#headerRow").shadow().find("#selection-cell").should("not.exist");

		cy.get("#table1").then($table => {
			$table.append(
				`<ui5-table-row id="row1">
					<ui5-table-cell>Cell A</ui5-table-cell>
				</ui5-table-row>
				<ui5-table-row id="row2">
					<ui5-table-cell>Cell A</ui5-table-cell>
				</ui5-table-row>`
			);
		});
		cy.get("#headerRow").shadow().find("#selection-cell").should("exist");

		cy.get("#row1").invoke("remove");
		cy.get("#row2").invoke("remove");
		cy.get("#headerRow").shadow().find("#selection-cell").should("not.exist");
	});
});


describe("TableSelectionMulti", () => {
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

	it("updates the header row checkbox when rows are added or removed", () => {
		cy.get("@headerRowSelectionCell").should("have.attr", "aria-description", `${SELECT_ALL_CHECKBOX} ${CHECKED}`);
		cy.get("@headerRowSelectionCell").children().first().as("headerRowCheckBox");
		cy.get("@headerRowCheckBox").should("have.attr", "checked");
		cy.get("@headerRowCheckBox").should("have.attr", "title", DESELECT_ALL_ROWS);
		cy.get("#table1").then($table => {
			$table.append(
				`<ui5-table-row id="row3" row-key="3">
					<ui5-table-cell>Cell A</ui5-table-cell>
					<ui5-table-cell>Cell B</ui5-table-cell>
				</ui5-table-row>`
			);
		});
		cy.get("@headerRowSelectionCell").should("have.attr", "aria-description", `${SELECT_ALL_CHECKBOX} ${NOT_CHECKED}`);
		cy.get("@headerRowCheckBox").should("not.have.attr", "checked");
		cy.get("@headerRowCheckBox").should("have.attr", "title", SELECT_ALL_ROWS);
		cy.get("#row3").invoke("remove");
		cy.get("@headerRowSelectionCell").should("have.attr", "aria-description", `${SELECT_ALL_CHECKBOX} ${CHECKED}`);
		cy.get("@headerRowCheckBox").should("have.attr", "checked");
		cy.get("@headerRowCheckBox").should("have.attr", "title", DESELECT_ALL_ROWS);
		cy.get("#row2").invoke("remove");
		cy.get("@headerRowCheckBox").should("have.attr", "checked");
		cy.get("#row1").invoke("remove");
		cy.get("#headerRow").shadow().find("#selection-cell").should("not.exist");
	});

	it("should handle header-selector=ClearAll", () => {
		cy.get("@headerRowSelectionCell").children().first().as("headerRowIcon");
		function checkClearAll(hasSelection: boolean) {
			cy.get("@headerRowIcon").should("have.attr", "name", "clear-all");
			cy.get("@headerRowIcon").should("have.attr", "mode", "Decorative");
			cy.get("@headerRowIcon").should("have.attr", "show-tooltip");
			cy.get("@headerRowIcon").should("have.attr", "accessible-name", DESELECT_ALL_ROWS);
			cy.get("@headerRowIcon").should("have.attr", "design", hasSelection ? "Default" : "NonInteractive");
			cy.get("@headerRowSelectionCell").should("have.attr", "aria-description", hasSelection ? CLEAR_ALL_BUTTON : `${CLEAR_ALL_BUTTON} ${DISABLED}`);
		}

		cy.get("#selection").invoke("attr", "header-selector", "ClearAll");
		checkClearAll(true);
		checkSelectionChangeSpy(0);

		cy.get("@headerRowIcon").realClick();
		checkClearAll(false)
		checkSelection("");
		checkSelectionChangeSpy(1);

		cy.get("@headerRowIcon").realClick();
		checkClearAll(false)
		checkSelection("");
		checkSelectionChangeSpy(1);

		cy.get("#row1").shadow().find("#selection-component").realClick();
		checkClearAll(true);
		checkSelection("1");
		checkSelectionChangeSpy(2);

		cy.get("@headerRowIcon").realPress("Space");
		checkClearAll(false)
		checkSelection("");
		checkSelectionChangeSpy(3);

		cy.get("#row2").invoke("remove");
		cy.get("#row1").invoke("remove");
		cy.get("#headerRow").shadow().find("#selection-cell").should("not.exist");
	});
});
