import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Toast.js";

const table = document.getElementById("table");
const toast = document.getElementById("message");

table.addEventListener("row-click", (e) => {
	toast.textContent = `Row with key "${e.detail.row.rowKey}" was pressed!`;
	toast.open = true;
});