import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import "../../src/TableRow.js";
import "../../src/TableCell.js";

import TableVirtualizer from "../../src/TableVirtualizer.js";
import type { RangeChangeEventDetail } from "../../src/TableVirtualizer.js";

describe("TableVirtualizer", () => {
	function mountTable(rowHeight = 50, rowCount = 100, tableHeight = 250) {
		cy.mount(
			<Table style={{ height: `${tableHeight}px` }}>
				<TableHeaderRow slot="headerRow" hidden>
					<TableHeaderCell>Column</TableHeaderCell>
				</TableHeaderRow>
				<TableVirtualizer slot="features" rowHeight={rowHeight} rowCount={rowCount}></TableVirtualizer>
			</Table>
		);

		cy.get<TableVirtualizer>("[ui5-table-virtualizer]").as("virtualizer").then($virtualizer => {
			$virtualizer[0].addEventListener("range-change", updateRows as EventListener);
			$virtualizer[0].reset();
		});

		cy.get("[ui5-table]").shadow().find("#table").as("innerTable");
		cy.get("[ui5-table]").children("ui5-table-row").as("rows");
		cy.get("@rows").first().as("firstRow");
		cy.get("@rows").last().as("lastRow");
	}

	function updateRows(e: CustomEvent<RangeChangeEventDetail>) {
		const table = document.querySelector("ui5-table") as Table;
		for (let i = e.detail.first; i < e.detail.last; i++) {
			const row = table.rows[i - e.detail.first];
			if (row) {
				row.position = i;
				row.cells[0].textContent = `${i}`;
			} else {
				const newRow = `<ui5-table-row position="${i}"><ui5-table-cell>${i}</ui5-table-cell></ui5-table-row>`;
				table.insertAdjacentHTML("beforeend", newRow);
			}
		}
		for (let i = e.detail.last; i < table.rows.length; i++) {
			table.rows[i].remove();
		}
	}

	function testRows(start: number, end: number) {
		for (let i = start; i < end; i++) {
			cy.get("[ui5-table-row]")
				.eq(i - start)
				.should("have.attr", "position", `${i}`)
				.should("have.attr", "aria-rowindex", `${i + 2}`)
				.find("ui5-table-cell")
				.should("have.text", `${i}`);
		}

		cy.get("[ui5-table]")
			.shadow()
			.find("#spacer")
			.then($spacer => {
				const transform = getComputedStyle($spacer[0]).transform;
				return new DOMMatrix(transform);
			})
			.its("f")
			.should("equal", start * 50);
	}

	describe("Rendering", () => {
		it("should render initially 5 rows", () => {
			mountTable();

			cy.get("@innerTable")
				.should("have.attr", "aria-rowcount", "100")
				.should("have.css", "overflow-y", "auto")
				.then($innerTable => window.getComputedStyle($innerTable[0]))
				.invoke("getPropertyValue", "--row-height")
				.and("equal", "50px");

			cy.get("@innerTable")
				.children("#rows")
				.should("have.css", "height", "5000px");

			cy.get("@innerTable")
				.find("#spacer")
				.should("have.css", "will-change", "transform");

			testRows(0, 5);
		});

		it("should react to rowHeight changes", () => {
			mountTable();

			cy.get("@virtualizer").invoke("attr", "row-height", "60");

			cy.get("@innerTable")
				.then($innerTable => window.getComputedStyle($innerTable[0]))
				.invoke("getPropertyValue", "--row-height")
				.and("equal", "60px");

			cy.get("@innerTable")
				.children("#rows")
				.should("have.css", "height", "6000px");
		});

		it("should react to rowCount changes", () => {
			mountTable();

			cy.get("@virtualizer").invoke("attr", "row-count", "200");

			cy.get("@innerTable")
				.should("have.attr", "aria-rowcount", "200")
				.children("#rows")
				.should("have.css", "height", "10000px");
		});

		it("should update rows on scroll", () => {
			mountTable();

			cy.get("@innerTable").scrollTo(0, 250);
			testRows(5, 10);

			cy.get("@innerTable").scrollTo("bottom");
			testRows(95, 100);

			cy.get("@innerTable").scrollTo(0, 4000);
			testRows(80, 85);

			cy.get("@innerTable").scrollTo("top");
			testRows(0, 5);
		});

		it("should update rows via keyboard while focus is on the row", () => {
			mountTable();

			cy.get("@firstRow").realClick();
			cy.get("@firstRow").should("have.focus");

			cy.realPress("PageDown");
			cy.get("@lastRow").should("have.focus");

			cy.realPress("PageDown");
			testRows(5, 10);

			cy.realPress("ArrowDown");
			testRows(6, 11);

			cy.realPress("PageUp");
			cy.get("@firstRow").should("have.focus");

			cy.realPress("PageUp");
			testRows(1, 6);

			cy.realPress("ArrowUp");
			testRows(0, 5);

			cy.realPress("End");
			cy.get("@lastRow").should("have.focus");

			cy.realPress("End");
			testRows(95, 100);

			cy.realPress("Home");
			cy.get("@firstRow").should("have.focus");

			cy.realPress("Home");
			testRows(0, 5);
		});

		it("should update rows via keyboard while focus is on the cell", () => {
			mountTable();

			cy.get("@firstRow").find("ui5-table-cell").first().as("firstRowFirstCell");
			cy.get("@lastRow").find("ui5-table-cell").first().as("lastRowFirstCell");

			cy.get("@firstRow").realClick().realPress("ArrowRight");
			cy.get("@firstRowFirstCell").should("have.focus");

			cy.realPress("PageDown");
			cy.get("@lastRowFirstCell").should("have.focus");

			cy.realPress("PageDown");
			testRows(5, 10);

			cy.realPress("ArrowDown");
			testRows(6, 11);

			cy.realPress("PageUp");
			cy.get("@firstRowFirstCell").should("have.focus");

			cy.realPress("PageUp");
			testRows(1, 6);

			cy.realPress("ArrowUp");
			testRows(0, 5);

			cy.realPress("End");
			cy.get("@firstRow").should("have.focus");

			cy.realPress("End");
			cy.get("@lastRow").should("have.focus");

			cy.realPress("End");
			testRows(95, 100);

			cy.get("@lastRow").realPress("ArrowRight");
			cy.get("@lastRowFirstCell").should("have.focus");

			cy.realPress("Home");
			cy.get("@lastRow").should("have.focus");

			cy.realPress("Home");
			cy.get("@firstRow").should("have.focus");

			cy.realPress("Home");
			testRows(0, 5);
		});

		it("should have the reset() API", () => {
			mountTable();

			cy.get("@virtualizer").then($virtualizer => {
				$virtualizer[0].addEventListener("range-change", cy.stub().as("rangeChange"));
			});

			cy.get("@innerTable").scrollTo("bottom");
			cy.get("@rangeChange").should("have.been.calledOnce");
			testRows(95, 100);

			cy.get("@virtualizer").invoke("get", 0).invoke("reset");
			cy.get("@rangeChange").should("have.been.calledTwice");
			testRows(0, 5);

			cy.get("@virtualizer").invoke("get", 0).invoke("reset");
			cy.get("@rangeChange").should("have.been.calledThrice");

			cy.get("@virtualizer").invoke("attr", "row-count", "2");
			cy.get("@virtualizer").invoke("get", 0).invoke("reset");
			testRows(0, 2);
		});
	});
});
