import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableRowAction.js";
import "@ui5/webcomponents/dist/TableRowActionNavigation.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents-icons/dist/add.js";
import "@ui5/webcomponents-icons/dist/edit.js";
import "@ui5/webcomponents-icons/dist/share.js";
import "@ui5/webcomponents-icons/dist/heart.js";
import "@ui5/webcomponents-icons/dist/delete.js";

const handlers = {
	onAdd: (row) => {
		console.log(`Add action of row ${row.rowKey} is clicked`);
	},
	onEdit: (row) => {
		console.log(`Edit action of row ${row.rowKey} is clicked`);
	},
	onLike: (row) => {
		console.log(`Like action of row ${row.rowKey} is clicked`);
	},
	onDelete: (row) => {
		console.log(`Delete action of row ${row.rowKey} is clicked`);
	},
	onShare: (row) => {
		console.log(`Share action of row ${row.rowKey} is clicked`);
	},
	onNavigate: (row) => {
		console.log(`Navigate action of row ${row.rowKey} is clicked`);
	},
};

const table = document.getElementById("table");
table.addEventListener("row-action-click", (e) => {
	const { action, row } = e.detail;
	const handler = action.getAttribute("handler");
	handlers[handler]?.(row);
})