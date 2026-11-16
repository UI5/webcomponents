import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableCell from "../../src/TableCell.js";
import TableRow from "../../src/TableRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import Bar from "../../src/Bar.js";
import Title from "../../src/Title.js";
import Slider from "../../src/Slider.js";

describe("TableHeaderRow - Rendering", () => {
	it("renders the cells slot and column-header row semantics", () => {
		cy.mount(
			<Table>
				<TableHeaderRow slot="headerRow">
					<TableHeaderCell>Column A</TableHeaderCell>
					<TableHeaderCell>Column B</TableHeaderCell>
				</TableHeaderRow>
			</Table>
		);

		cy.get("[ui5-table-header-row]")
			.should("have.attr", "role", "row")
			.should("have.attr", "aria-roledescription", "Column Header Row")
			.should("have.attr", "aria-rowindex", "1")
			.find("[ui5-table-header-cell]")
			.should("have.length", 2);
	});
});

describe("TableHeaderRow - Sticky", () => {
	function check(topOffset: number, lastRow: string) {
		cy.get("[ui5-table-header-row]")
			.should("have.css", "position", "sticky")
			.should("have.css", "top", `${topOffset}px`);

		cy.get(lastRow)
			.scrollIntoView();

		cy.get("[ui5-table-header-row]")
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
