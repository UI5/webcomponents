import "../../src/Table.js";
import "../../src/TableCell.js";
import "../../src/TableRow.js";
import "../../src/TableHeaderRow.js";
import "../../src/TableHeaderCell.js";


describe("DOMObserver", () => {
	it("insertion order still fires DOMObserver", () => {
		cy.mount(<div id="test-observer"></div>);

		cy.get("#test-observer").then(($testObserver) => {
			const testObserver = $testObserver[0];

			// prepare the table
			const table = document.createElement("ui5-table");
			const col1 = document.createElement("ui5-table-header-row");
			const cel1 = document.createElement("ui5-table-header-cell");
			col1.appendChild(cel1);
			cel1.appendChild(document.createTextNode("Column 1"));
			col1.slot = "headerRow";
			table.appendChild(col1);

			testObserver.appendChild(table);
		});

		cy.get("[ui5-table]").then(($table) => {
			const table = $table[0];
			const row1 = document.createElement("ui5-table-row");
			// adding a row calls its connectedCallback, but there are async steps so the cell bellow should always trigger its mutationObserver
			table.appendChild(row1);

			// add the cell synchronously after the row's connectedCallback
			const cell1 = document.createElement("ui5-table-cell");
			cell1.appendChild(document.createTextNode("Cell 1"));
			row1.appendChild(cell1);
		});

		cy.get("[ui5-table-row]")
			.shadow()
			.find("slot")
			.should("have.length", 1);
	});
});