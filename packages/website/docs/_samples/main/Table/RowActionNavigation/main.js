import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableRowActionNavigation.js";
import "@ui5/webcomponents/dist/Text.js";

const table = document.getElementById("table");
table.addEventListener("row-action-click", (e) => {
	const row = e.detail.row;
	console.log(`Navigate action of row ${row.rowKey} is clicked`);
});