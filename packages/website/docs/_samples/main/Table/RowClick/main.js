import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Toast.js";

const toast = document.getElementById("message");

document.getElementById("row-a").addEventListener("click", () => {
	toast.textContent = "Row A clicked!";
	toast.open = true;
});

document.getElementById("row-b").addEventListener("click", () => {
	toast.textContent = "Row B clicked!";
	toast.open = true;
});
