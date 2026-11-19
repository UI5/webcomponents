import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import "../../src/TableRow.js";
import type TableRow from "../../src/TableRow.js";
import "../../src/TableCell.js";

import TableVirtualizer from "../../src/TableVirtualizer.js";
import type { RangeChangeEventDetail } from "../../src/TableVirtualizer.js";
import { getPositionalRange, setText, setMarkup } from "../../test/pages/modules/TableVirtualizerRenderer.js";

type MountOptions = {
	rowCount?: number,
	tableHeight?: number,
	overscan?: number,
	rowHeight?: (index: number) => number,
	renderDelay?: number,
};

const fixedHeight = () => 50;

describe("TableVirtualizer", () => {
	function mountTable({
		rowCount = 100, tableHeight = 250, overscan = 0, rowHeight = fixedHeight, renderDelay = -1,
	}: MountOptions = {}) {
		cy.mount(
			<Table style={{ height: `${tableHeight}px` }}>
				<TableHeaderRow slot="headerRow" hidden>
					<TableHeaderCell>Column</TableHeaderCell>
				</TableHeaderRow>
				<TableVirtualizer slot="features" estimatedRowHeight={50} rowCount={rowCount} overscan={overscan}></TableVirtualizer>
			</Table>
		);

		cy.get<TableVirtualizer>("[ui5-table-virtualizer]").as("virtualizer").then($virtualizer => {
			$virtualizer[0].addEventListener("range-change", ((e: CustomEvent<RangeChangeEventDetail>) => {
				const { first, last } = e.detail;
				const render = () => updateRows(first, last, rowHeight);
				renderDelay < 0 ? render() : setTimeout(render, renderDelay);
			}) as EventListener);
			$virtualizer[0].reset();
		});

		cy.get("[ui5-table]").shadow().find("#table").as("innerTable");
		cy.get("[ui5-table]").children("ui5-table-row").as("rows");
		cy.get("@rows").first().as("firstRow");
		cy.get("@rows").last().as("lastRow");
	}

	// rows are reused positionally: the n-th row element always renders the n-th row of the range
	function updateRows(first: number, last: number, rowHeight: (index: number) => number) {
		const table = document.querySelector("ui5-table") as Table;
		const rows = Array.from(table.children).filter(child => child.hasAttribute("ui5-table-row"));
		for (let i = first; i < last; i++) {
			const row = rows[i - first] as HTMLElement & { position: number };
			const style = `height: ${rowHeight(i)}px; box-sizing: border-box;`;
			if (row) {
				row.position = i;
				row.setAttribute("style", style);
				row.querySelector("ui5-table-cell")!.textContent = `${i}`;
			} else {
				table.insertAdjacentHTML("beforeend", `<ui5-table-row position="${i}" style="${style}"><ui5-table-cell>${i}</ui5-table-cell></ui5-table-row>`);
			}
		}
		rows.slice(last - first).forEach(row => row.remove());
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
				return new DOMMatrix(transform === "none" ? undefined : transform);
			})
			.its("f")
			.should("equal", start * 50);
	}

	function testFocusedRow(position: number, cell = false) {
		cy.focused().then($focused => {
			const row = cell ? $focused[0].closest("[ui5-table-row]") : $focused[0];
			expect(row).to.have.attr("position", `${position}`);
			cell && expect($focused[0]).to.have.attr("ui5-table-cell");
		});
	}

	describe("Rendering", () => {
		it("should keep a positional pool connected across range size changes and at the end", () => {
			mountTable({ overscan: 100 });
			cy.get("@virtualizer").then($virtualizer => {
				const virtualizer = $virtualizer[0];
				const table = virtualizer._table!;
				const render = (first: number, last: number) => {
					const range = getPositionalRange(table, virtualizer, first, last, table.rows.length);
					updateRows(range.first, range.last, fixedHeight);
				};
				render(0, 7);
				cy.get("[ui5-table-row]").then($rows => {
					const rows = Array.from($rows);
					render(1, 9);
					render(5, 10);
					render(98, 100);
					cy.get("[ui5-table-row]").should($current => {
						expect(Array.from($current)).to.deep.equal(rows);
						rows.forEach(row => expect(row.isConnected).to.be.true);
						expect(Number($current.first().attr("position"))).to.equal(100 - rows.length);
						expect($current.last()).to.have.attr("position", "99");
					});
				});
			});
		});

		it("should limit a positional pool to the reduced row count", () => {
			mountTable({ overscan: 100 });
			cy.get("@virtualizer").then($virtualizer => {
				const virtualizer = $virtualizer[0];
				const table = virtualizer._table!;
				virtualizer.rowCount = 3;
				const range = getPositionalRange(table, virtualizer, 0, 3, 20);
				updateRows(range.first, range.last, fixedHeight);
			});
			cy.get("[ui5-table-row]").should("have.length", 3).last().should("have.attr", "position", "2");
		});

		it("should patch demo text and rich content without replacing matching nodes", () => {
			mountTable();
			cy.get("@firstRow").then($row => {
				const cell = $row[0].querySelector("[ui5-table-cell]")!;
				setText(cell, "SO-104310");
				const text = cell.firstChild;
				setText(cell, "SO-104311");
				expect(cell.firstChild).to.equal(text);
				expect(text!.textContent).to.equal("SO-104311");

				setMarkup(cell, '<p class="old" title="old">First</p><ul><li>One</li></ul>');
				const paragraph = cell.firstChild as HTMLElement;
				const paragraphText = paragraph.firstChild;
				const list = cell.lastChild;
				setMarkup(cell, '<p class="new">Second</p><ul><li>Two</li><li>Three</li></ul>');
				expect(cell.firstChild).to.equal(paragraph);
				expect(paragraph.firstChild).to.equal(paragraphText);
				expect(paragraphText!.textContent).to.equal("Second");
				expect(paragraph.className).to.equal("new");
				expect(paragraph.hasAttribute("title")).to.be.false;
				expect(cell.lastChild).to.equal(list);
				expect(cell.querySelectorAll("li")).to.have.length(2);
				expect(paragraph.isConnected).to.be.true;
			});
		});

		it("should update demo markup when content changes structure or becomes empty", () => {
			mountTable();
			cy.get("@firstRow").then($row => {
				const cell = $row[0].querySelector("[ui5-table-cell]")!;
				setMarkup(cell, "<p>Short</p><ul><li>Detail</li></ul>");
				const paragraph = cell.firstChild;
				setMarkup(cell, "<p>Updated</p><p>Different structure</p><p>Extra</p>");
				expect(cell.firstChild).to.equal(paragraph);
				expect(cell.innerHTML).to.equal("<p>Updated</p><p>Different structure</p><p>Extra</p>");
				setMarkup(cell, "<p>Short again</p>");
				expect(cell.firstChild).to.equal(paragraph);
				expect(cell.childNodes).to.have.length(1);
				setMarkup(cell, "");
				expect(cell.childNodes).to.have.length(0);
				setMarkup(cell, "<p>Data returned</p>");
				expect(cell.textContent).to.equal("Data returned");
			});
		});

		it("should render initially 5 rows", () => {
			mountTable();

			cy.get("@innerTable")
				.should("have.attr", "aria-rowcount", "100")
				.should("have.css", "overflow-y", "auto")
				.should("have.css", "overflow-anchor", "none");

			cy.get("@innerTable")
				.children("#rows")
				.should("have.css", "height", "5000px")
				.should($rows => {
					const rows = $rows[0];
					const fallback = getComputedStyle(rows, "::before");
					expect(parseFloat(fallback.height)).to.equal(rows.parentElement!.clientHeight);
					expect(fallback.backgroundImage).to.include("linear-gradient");
					expect(fallback.opacity).to.equal("1");
					expect(fallback.animationName).to.equal("none");
					expect(getComputedStyle(rows).backgroundImage).to.equal("none");
				});

			cy.get("@innerTable")
				.find("#spacer")
				.should("have.css", "will-change", "transform");

			testRows(0, 5);
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

		it("should render the overscan in the scroll direction", () => {
			mountTable({ overscan: 100 });

			cy.get("@virtualizer").should("have.prop", "_last", 7);
			cy.get("@innerTable").scrollTo(0, 1000);
			cy.get("@virtualizer").should("have.prop", "_first", 19);
			cy.get("@virtualizer").should("have.prop", "_last", 27);
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

		it("should have the scrollToIndex() API", () => {
			mountTable();

			cy.get("@virtualizer").invoke("get", 0).invoke("scrollToIndex", 40, "Start");
			testRows(40, 45);

			cy.get("@virtualizer").invoke("get", 0).invoke("scrollToIndex", 60, "End");
			testRows(56, 61);

			cy.get("@virtualizer").invoke("get", 0).invoke("scrollToIndex", 58, "Nearest");
			testRows(56, 61);
		});
	});

	describe("Variable row heights", () => {
		const variableHeight = (index: number) => 30 + (index % 4) * 20;

		it("should measure the rows and reach both ends", () => {
			mountTable({ rowHeight: variableHeight });

			cy.get("@innerTable").scrollTo("bottom");
			cy.get("@virtualizer").should($virtualizer => {
				expect($virtualizer[0]._model.isMeasured(99)).to.be.true;
			});
			cy.get("@innerTable").scrollTo("bottom"); // the scroll height is corrected once the last rows are measured
			cy.get("@innerTable").should($table => {
				const table = $table[0];
				const rows = (table.getRootNode() as ShadowRoot).host.querySelectorAll("[ui5-table-row]");
				const lastRow = rows[rows.length - 1];
				expect(lastRow).to.have.attr("position", "99");
				expect(lastRow.getBoundingClientRect().bottom).to.be.closeTo(table.getBoundingClientRect().top + table.clientHeight, 1);
			});

			cy.get("@innerTable").scrollTo("top");
			cy.get("[ui5-table-row]").first().should("have.attr", "position", "0");
			cy.get("@virtualizer").should("have.prop", "_drift", 0);
		});

		it("should keep the visible rows in place when a row above the viewport changes its height", () => {
			mountTable({ rowHeight: variableHeight, overscan: 200 });

			cy.get("@innerTable").scrollTo(0, 1500);
			cy.get("@virtualizer").its("0._visibleFirst").should("be.greaterThan", 10).then(visibleFirst => {
				cy.get(`[ui5-table-row][position="${visibleFirst + 1}"]`).then($visibleRow => {
					const top = $visibleRow[0].getBoundingClientRect().top;
					cy.get("[ui5-table-row]").first().should($row => {
						expect(Number($row.attr("position"))).to.be.lessThan(visibleFirst);
					}).invoke("css", "height", "200px");
					cy.get("@virtualizer").its("0._stats.anchorCorrections").should("be.greaterThan", 0);
					cy.wrap($visibleRow).should($row => {
						expect($row[0].getBoundingClientRect().top).to.be.closeTo(top, 1);
					});
				});
			});
		});
	});

	describe("Loading rows", () => {
		it("should render loading rows with the estimated row height without using it for the estimation", () => {
			mountTable();

			cy.get("@firstRow").then($row => {
				const row = $row[0] as TableRow;
				row.removeAttribute("style"); // the height of the row is defined by its content
				row.loading = true;
			});

			cy.get("@firstRow").should("have.attr", "aria-busy", "true");
			cy.get("@firstRow").should($row => {
				expect(getComputedStyle($row[0], "::before").content).to.not.equal("none");
			});
			cy.get("@firstRow").find("ui5-table-cell").should($cell => {
				expect(getComputedStyle($cell[0], "::before").content).to.equal("none");
				expect(getComputedStyle($cell[0]).contentVisibility).to.equal("hidden");
				expect($cell[0].textContent).to.equal("0");
			});
			cy.get("@firstRow").invoke("outerHeight").should("equal", 50);
			cy.get("@virtualizer").should($virtualizer => {
				expect($virtualizer[0]._model.isProvisional(0)).to.be.true;
				expect($virtualizer[0]._model.estimate).to.equal(50);
			});

			cy.get("@firstRow").then($row => {
				($row[0] as TableRow).loading = false;
			});

			cy.get("@firstRow").should("not.have.attr", "aria-busy");
			cy.get("@firstRow").should($row => {
				expect(getComputedStyle($row[0], "::before").content).to.equal("none");
			});
			cy.get("@firstRow").find("ui5-table-cell").should($cell => {
				expect(getComputedStyle($cell[0]).contentVisibility).to.equal("visible");
				expect($cell[0].textContent).to.equal("0");
			});
			cy.get("@virtualizer").should($virtualizer => {
				expect($virtualizer[0]._model.isProvisional(0)).to.be.false;
			});
		});

	});

	describe("Keyboard Navigation", () => {
		it("should navigate with logical row indices while the focus is on the row", () => {
			mountTable();

			cy.get("@firstRow").realClick();
			testFocusedRow(0);

			cy.realPress("PageDown");
			testFocusedRow(4);

			cy.realPress("PageDown");
			testRows(4, 9);
			testFocusedRow(8);

			cy.realPress("ArrowDown");
			testRows(5, 10);
			testFocusedRow(9);

			cy.realPress("PageUp");
			testFocusedRow(5);

			cy.realPress("PageUp");
			testRows(1, 6);
			testFocusedRow(1);

			cy.realPress("ArrowUp");
			testRows(0, 5);
			testFocusedRow(0);

			cy.realPress("End");
			testRows(95, 100);
			testFocusedRow(99);

			cy.realPress("Home");
			testRows(0, 5);
			testFocusedRow(0);
		});

		it("should navigate with logical row indices while the focus is on the cell", () => {
			mountTable();

			cy.get("@firstRow").realClick().realPress("ArrowRight");
			testFocusedRow(0, true);

			cy.realPress("PageDown");
			testFocusedRow(4, true);

			cy.realPress("PageDown");
			testRows(4, 9);
			testFocusedRow(8, true);

			cy.realPress("ArrowDown");
			testRows(5, 10);
			testFocusedRow(9, true);

			cy.realPress("PageUp");
			testFocusedRow(5, true);

			cy.realPress("PageUp");
			testRows(1, 6);
			testFocusedRow(1, true);

			cy.realPress("ArrowUp");
			testRows(0, 5);
			testFocusedRow(0, true);

			cy.realPress("Home");
			testFocusedRow(0);

			cy.realPress("End");
			testRows(95, 100);
			testFocusedRow(99);
		});

		it("should not lose keyboard input while the application renders asynchronously", () => {
			mountTable({ renderDelay: 50 });

			cy.get("@firstRow").realClick();
			cy.realPress("PageDown");
			cy.realPress("PageDown");
			cy.realPress("PageDown");
			cy.realPress("ArrowDown");

			testRows(9, 14);
			testFocusedRow(13);
			cy.get("@virtualizer").should($virtualizer => {
				expect($virtualizer[0]._focusPending).to.be.undefined;
			});
		});

		it("should keep the focus in the table when the focused row is scrolled out and recycled", () => {
			mountTable();

			cy.get("@firstRow").realClick();
			testFocusedRow(0);

			cy.get("@innerTable").scrollTo(0, 2000);
			testRows(40, 45);
			cy.get("@innerTable").should("match", ":focus");

			cy.realPress("ArrowDown");
			testRows(1, 6);
			testFocusedRow(1);
		});
	});
});
