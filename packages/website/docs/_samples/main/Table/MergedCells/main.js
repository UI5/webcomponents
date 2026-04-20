import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableSelectionMulti.js";
import "@ui5/webcomponents/dist/Label.js";
import "@ui5/webcomponents/dist/Text.js";
import "@ui5/webcomponents/dist/Bar.js";
import "@ui5/webcomponents/dist/SegmentedButton.js";

const table = document.getElementById("table");
const sizeBtn = document.getElementById("sizeBtn");

sizeBtn.addEventListener("selection-change", (e) => {
	const selectedItem = e.detail.selectedItems[0];
	table.style.width = selectedItem.textContent;
});
