import Table from "../../src/Table.js";
import TableHeaderRow from "../../src/TableHeaderRow.js";
import TableHeaderCell from "../../src/TableHeaderCell.js";
import TableRow from "../../src/TableRow.js";
import TableCell from "../../src/TableCell.js";
import Label from "../../src/Label.js";

describe("Table - loading", () => {
	it("tests busy indicator is displayed and dims slotted rows", () => {
		cy.mount(
			<>
				<input id="before" />
				<Table loading={true} loadingDelay={0}>
					<TableHeaderRow slot="headerRow">
						<TableHeaderCell ><span>ColumnA</span></TableHeaderCell>
					</TableHeaderRow>
					<TableRow>
						<TableCell><Label>Cell A</Label></TableCell>
					</TableRow>
				</Table>
				<input id="after" />
			</>
		);

		cy.get("[ui5-table]")
			.shadow()
			.find("#loading")
			.shadow()
			.find(".ui5-busy-indicator-busy-area")
			.should("exist");

		cy.get("[ui5-table]")
			.shadow()
			.find("#loading[_is-busy]")
			.should("exist")
			.then(() => {
				cy.get("[ui5-table]")
					.find("[ui5-table-row]")
					.should(($row) => {
						expect(parseFloat(getComputedStyle($row[0]).opacity)).to.be.lessThan(1);
					});
			});

		cy.get("#before")
			.realClick();

		cy.get("#before")
			.should("be.focused");

		cy.realPress("Tab");

		cy.focused()
			.should("have.class", "ui5-busy-indicator-busy-area");

		cy.realPress("Tab");

		cy.get("#after")
			.should("be.focused");
	});
});
