import "@ui5/webcomponents/dist/Table.js";
import "@ui5/webcomponents/dist/TableRow.js";
import "@ui5/webcomponents/dist/TableCell.js";
import "@ui5/webcomponents/dist/TableHeaderRow.js";
import "@ui5/webcomponents/dist/TableHeaderCell.js";
import "@ui5/webcomponents/dist/TableSelectionSingle.js";
import "@ui5/webcomponents/dist/Label.js";

const selectionFeature = document.getElementById("selection");
selectionFeature.addEventListener("change", (e) => {
	console.log("Selected key", selectionFeature.selected);
	console.log("Selected row", selectionFeature.getRowByKey(selectionFeature.selected));
});

const selectionBehavior = document.getElementById("selectionBehavior");
selectionBehavior.addEventListener("change", (e) => {
	selectionFeature.behavior = e.target.text;
});