import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import Label from "../../src/Label.js";
import Bar from "../../src/Bar.js";
import Title from "../../src/Title.js";
import Slider from "../../src/Slider.js";

describe("Table - Keyboard Navigation with Fixed Headers", () => {
	function isDisplayedInsideViewport(element: string) {
		cy.get(element).then($el => {
			const el = $el[0];
			const rect = el.getBoundingClientRect();

			expect(rect.top).to.be.at.least(0);
			expect(rect.left).to.be.at.least(0);
			expect(rect.bottom).to.be.lessThan(Cypress.config("viewportHeight"));
			expect(rect.right).to.be.lessThan(Cypress.config("viewportWidth"));
		});
	}

	it("scrollable container - focused row should always be below the header", () => {
		cy.mount(
			<div style="height:300px; overflow:auto;">
				<Bar id="toolbar" design="Header" style="position: sticky; top: 0; z-index: 2; height: 50px;">
					<Title tabindex={0} level="H3" id="title" slot="startContent">My Selectable Products (3)</Title>
					<Slider id="slider" min={0} max={100} step={1} value={100}
						label-interval="0"/>
				</Bar>
				<Table id="table0" overflowMode="Popin" stickyTop="50px" accessibleNameRef="title" noDataText="No data found">
					<TableHeaderRow sticky slot="headerRow">
						<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
						<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
						<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
						<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
					</TableHeaderRow>
					<TableRow id="row-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-2"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-3"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-4"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-5"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-6"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-7"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-8"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-9"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-10"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-11"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-12"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-13"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-14"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-15"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-16"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-17"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-18"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-19"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-20"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
					<TableRow id="row-21"> <TableCell>A</TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				</Table>
			</div>
		);

		cy.get("#table0").children("ui5-table-row").as("rows");
		cy.get("#table0").children("ui5-table-header-row").as("headerRow");
		cy.get("@rows").get("#row-21").as("lastRow");

		cy.get("@lastRow").scrollIntoView();
		cy.get("@lastRow").click("left");
		cy.get("@lastRow").should("be.focused");

		for (let i = 20; i > 0; i--) {
			cy.realPress("{uparrow}");
			cy.get("@rows").get(`#row-${i}`).should("be.focused");

			isDisplayedInsideViewport("@headerRow");

			cy.get("@headerRow").then($headerRow => {
				cy.get("@rows").get(`#row-${i}`).then($row => {
					const headerRowBottom = $headerRow[0].getBoundingClientRect().bottom;
					const focusedRowTop = $row[0].getBoundingClientRect().top;

					expect(focusedRowTop).to.be.at.least(headerRowBottom);
				});
			});
		}
	});

	it("scrollable table - focused row should always be below the header", () => {
		cy.mount(
			<Table id="table1" overflowMode="Popin" stickyTop="0" accessibleNameRef="title" noDataText="No data found" style="height: 300px; overflow: auto;">
				<TableHeaderRow sticky slot="headerRow">
					<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
					<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
					<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
					<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
				</TableHeaderRow>
				<TableRow id="row-1-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-2-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-3-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-4-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-5-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-6-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-7-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-8-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-9-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-10-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-11-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-12-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-13-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-14-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-15-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-16-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-17-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-18-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-19-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-20-1"> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
				<TableRow id="row-21-1"> <TableCell>A</TableCell> <TableCell></TableCell> <TableCell></TableCell> <TableCell></TableCell> </TableRow>
			</Table>
		);

		cy.get("#table1").children("ui5-table-row").as("rows");
		cy.get("#table1").children("ui5-table-header-row").as("headerRow");
		cy.get("@rows").get("#row-21-1").as("lastRow");

		cy.get("@lastRow").scrollIntoView();
		cy.get("@lastRow").click("left");
		cy.get("@lastRow").should("be.focused");

		for (let i = 20; i > 0; i--) {
			cy.realPress("{uparrow}");
			cy.get("@rows").get(`#row-${i}-1`).should("be.focused");

			isDisplayedInsideViewport("@headerRow");

			cy.get("@headerRow").then($headerRow => {
				cy.get("@rows").get(`#row-${i}-1`).then($row => {
					const headerRowBottom = $headerRow[0].getBoundingClientRect().bottom;
					const focusedRowTop = $row[0].getBoundingClientRect().top;

					expect(focusedRowTop).to.be.at.least(headerRowBottom);
				});
			});
		}
	});

	it("body as scroll container - focused row should always be below the header", () => {
		cy.mount(
			<>
				<Bar id="toolbar2" design="Header" style="position: sticky; top: 0; z-index: 2; height: 50px;">
					<Title tabindex={0} level="H3" id="title" slot="startContent">My Selectable Products (3)</Title>
					<Slider id="slider" min={0} max={100} step={1} value={100}
						label-interval="0"></Slider>
				</Bar>
				<Table id="table2" overflowMode="Popin" stickyTop="50px" accessibleNameRef="title" noDataText="No data found">
					<TableHeaderRow sticky slot="headerRow">
						<TableHeaderCell id="colA" minWidth="300px"><span>ColumnA</span></TableHeaderCell>
						<TableHeaderCell id="colB" minWidth="200px">Column B</TableHeaderCell>
						<TableHeaderCell id="colC" minWidth="200px">Column C</TableHeaderCell>
						<TableHeaderCell id="colD" minWidth="150px">Column D</TableHeaderCell>
					</TableHeaderRow>
					${Array.from({ length: 100 }).map((row, index) =>
						<TableRow id={`row-${index + 1}-2`}>
							<TableCell><Label><b>Notebook Basic ${index + 1}</b><br/>HT-100${index + 1}</Label></TableCell>
							<TableCell><Label>Technocom</Label></TableCell>
							<TableCell><Label>32 x 21 x 4 cm</Label></TableCell>
							<TableCell><Label style="color: #2b7c2b"><b>3.7</b> KG</Label></TableCell>
							<TableCell style="text-align: end;"><Label style="text-align: end;"><b>29</b> EUR</Label></TableCell>
						</TableRow>
					)}
				</Table>
			</>
		);

		cy.get("#table2").children("ui5-table-row").as("rows");
		cy.get("#table2").children("ui5-table-header-row").as("headerRow");
		cy.get("@rows").get("#row-100-2").as("lastRow");

		cy.get("@lastRow").scrollIntoView();
		cy.get("@lastRow").click("left");
		cy.get("@lastRow").should("be.focused");

		for (let i = 99; i > 0; i--) {
			cy.realPress("{uparrow}");
			cy.get("@rows").get(`#row-${i}-2`).should("be.focused");

			isDisplayedInsideViewport("@headerRow");

			cy.get("@headerRow").then($headerRow => {
				cy.get("@rows").get(`#row-${i}-2`).then($row => {
					const headerRowBottom = $headerRow[0].getBoundingClientRect().bottom;
					const focusedRowTop = $row[0].getBoundingClientRect().top;

					expect(focusedRowTop).to.be.at.least(headerRowBottom);
				});
			});
		}
	});
});
